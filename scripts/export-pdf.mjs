#!/usr/bin/env node
/**
 * Renders the built portfolio to public/kittapard-puaime-resume.pdf.
 *
 * The "10/12/26, 6:07 PM React App" line and the URL/page-number line of a
 * browser print are the browser's own header/footer; the "Headers and footers"
 * checkbox of the print dialog is browser-level and CSS cannot switch it off.
 * Driving Chrome over CDP with `displayHeaderFooter: false` skips it entirely,
 * so the exported PDF has no browser chrome at all.
 *
 * Usage: npm run export:pdf   (runs `npm run build` first)
 * Override the browser with: CHROME=/path/to/chrome npm run export:pdf
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const OUTPUT = path.join(ROOT, "public", "kittapard-puaime-resume.pdf");

const CHROME_CANDIDATES = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const MIME_TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".map": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryFor(timeoutMs, attempt) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const value = await attempt().catch(() => undefined);
    if (value !== undefined) return value;
    if (Date.now() > deadline) throw new Error("timed out");
    await sleep(100);
  }
}

/** Serves build/ over http so the page loads with real module/asset URLs. */
async function serveBuild() {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, "http://127.0.0.1");
    const file = path.join(BUILD_DIR, pathname === "/" ? "/index.html" : pathname);
    if (!file.startsWith(BUILD_DIR)) {
      res.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, {
        "content-type":
          MIME_TYPES[path.extname(file)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { server, port: server.address().port };
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    const listeners = new Map();
    let nextId = 1;

    const send = (method, params = {}) =>
      new Promise((resolveSend, rejectSend) => {
        const id = nextId++;
        pending.set(id, { resolve: resolveSend, reject: rejectSend });
        socket.send(JSON.stringify({ id, method, params }));
      });

    const once = (method, timeoutMs = 30000) =>
      new Promise((resolveOnce, rejectOnce) => {
        const timer = setTimeout(() => {
          listeners.delete(method);
          rejectOnce(new Error(`timed out waiting for ${method}`));
        }, timeoutMs);
        listeners.set(method, () => {
          clearTimeout(timer);
          listeners.delete(method);
          resolveOnce();
        });
      });

    socket.addEventListener("open", () => resolve({ send, once }));
    socket.addEventListener("error", () =>
      reject(new Error(`cannot connect to ${wsUrl}`)),
    );
    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.id !== undefined && pending.has(message.id)) {
        const { resolve: resolveSend, reject: rejectSend } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) rejectSend(new Error(message.error.message));
        else resolveSend(message.result);
        return;
      }
      listeners.get(message.method)?.();
    });
  });
}

async function takePdf(browser, url) {
  const userDataDir = await mkdtemp(path.join(tmpdir(), "portfolio-pdf-"));
  const chrome = spawn(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      // Without these two, Chrome paints LCD-hinted glyphs that do not survive
      // PDF export — the pages come out blank.
      "--font-render-hinting=none",
      "--force-color-profile=srgb",
      "--hide-scrollbars",
      "--mute-audio",
      "--remote-debugging-port=0",
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  try {
    const port = await retryFor(20000, async () => {
      const raw = await readFile(path.join(userDataDir, "DevToolsActivePort"), "utf8");
      return Number(raw.split("\n")[0]) || undefined;
    });

    const targets = await retryFor(10000, async () => {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      return list.find((target) => target.type === "page") ?? undefined;
    });

    const cdp = await connect(targets.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url });
    await loaded;

    // Fonts and images must be laid out before the page is measured for print,
    // and the React tree must have mounted — loadEventFired fires too early.
    const rendered = await cdp.send("Runtime.evaluate", {
      awaitPromise: true,
      expression: `(async () => {
        const deadline = Date.now() + 20000;
        while (!document.body.innerText.includes("CONTACT") && Date.now() < deadline) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        await document.fonts.ready;
        await Promise.all([...document.images].map((image) =>
          image.complete ? null : new Promise((done) => { image.onload = image.onerror = done; })
        ));
        return document.body.innerText.length;
      })()`,
    });
    const renderedChars = rendered.result?.value ?? 0;
    if (renderedChars < 500) {
      throw new Error(
        `page rendered only ${renderedChars} characters — refusing to write an empty PDF`,
      );
    }

    // Chrome needs a painted frame before it will render text into the PDF;
    // without this the first printToPDF can come back blank.
    await cdp.send("Runtime.evaluate", {
      awaitPromise: true,
      expression: `new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(() => done(true))))`,
    });
    await sleep(200);

    for (let attempt = 1; ; attempt++) {
      const { data } = await cdp.send("Page.printToPDF", {
        printBackground: true,
        displayHeaderFooter: false,
        preferCSSPageSize: true,
      });
      const pdf = Buffer.from(data, "base64");
      if (process.env.DEBUG_PDF) {
        console.error(
          `  debug: attempt ${attempt}, rendered=${renderedChars} chars, pdf=${pdf.length} bytes, fonts=${(pdf.toString("latin1").match(/\/Font\b/g) ?? []).length}`,
        );
      }
      // A blank export still has pages, so byte size proves nothing: a page with
      // text embeds font objects, a blank one has none.
      if (pdf.toString("latin1").includes("/Font")) return pdf;
      if (attempt === 3) {
        throw new Error(
          "exported PDF contains no text — Chrome painted nothing, re-run the export",
        );
      }
      await sleep(1000);
    }
  } finally {
    const exited =
      chrome.exitCode === null
        ? new Promise((resolve) => chrome.once("exit", resolve))
        : Promise.resolve();
    chrome.kill();
    await Promise.race([exited, sleep(5000)]);
    // Chrome may still be flushing its profile; a leftover temp dir is not an error.
    await rm(userDataDir, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 200,
    }).catch(() => {});
  }
}

const browser = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!browser) {
  console.error(
    `No Chrome/Chromium found. Set CHROME=/path/to/chrome.\nTried:\n  ${CHROME_CANDIDATES.join("\n  ")}`,
  );
  process.exit(1);
}
if (!existsSync(path.join(BUILD_DIR, "index.html"))) {
  console.error(`No build at ${BUILD_DIR}. Run \`npm run build\` first.`);
  process.exit(1);
}

const { server, port } = await serveBuild();
try {
  const pdf = await takePdf(browser, `http://127.0.0.1:${port}/`);
  await writeFile(OUTPUT, pdf);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)} (${pdf.length} bytes)`);
} finally {
  server.close();
}
