# kittap_portfolio

Personal portfolio page — React 18 + TypeScript (Create React App).
Content lives in `src/portfolio.tsx`; the page (and the Print / Download
toolbar) lives in `src/pages/index.tsx`.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server on http://localhost:3000 |
| `npm run build` | Production bundle in `build/` |
| `npm run export:pdf` | Builds, then writes `public/kittapard-puaime-resume.pdf` |

Use Node 18+ — `react-scripts` 5 cannot run on the older `/usr/local/bin/node`
(v10). Set `CHROME=/path/to/chrome` to override the browser used by the export.

## Exporting / printing

- **Download PDF** in the toolbar serves the pre-rendered
  `public/kittapard-puaime-resume.pdf`: A4, no browser header or footer, selectable
  text, clickable links. `npm run export:pdf` renders it with headless Chrome over
  CDP (`displayHeaderFooter: false`), so re-run it after editing the content — the
  CONTACT → *Resume* link points at the same file.
- **Print** calls `window.print()` and uses the `@media print` rules in
  `src/styles.css`, `src/pages/index.tsx`, `src/components/Layout` and
  `src/components/Header`. Two of those rules exist for output quality:
  `html body` swaps the macOS system font for an embeddable one (Chrome cannot
  embed SF Pro, a variable font, and falls back to Type3 glyphs that viewers
  render washed out), and `html .page` disables the container's fade-in
  animation, which a print snapshot can otherwise capture mid-flight and dim the
  whole page to a few percent opacity. The date/title line at the top of a print
  and the URL/page-number line at the bottom are the browser's own header and
  footer; they are controlled by the "Headers and footers" checkbox of the print
  dialog, which CSS cannot switch off. Uncheck it there (Chrome remembers the
  choice) or use **Download PDF** instead.
