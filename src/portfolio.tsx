import {
  faBirthdayCake,
  faMapMarkerAlt,
  faEnvelope,
  faFileImage,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

export default {
  profileData: {
    contract: [
      {
        icon: faMapMarkerAlt,
        text: "91/84 Pruksa Villa, Lam Luk Ka Rd. (Khlong 7), Lam Luk Ka, Pathum Thani 12150, Thailand",
      },
      {
        icon: faBirthdayCake,
        text: `${moment().diff(moment("30/03/1996", "DD/MM/YYYY"), "year")} years old`,
      },
      {
        icon: faEnvelope,
        text: "punchkub147@gmail.com",
      },
      {
        icon: faFile,
        text: "Resume",
        link: `${process.env.PUBLIC_URL}/kittapard-puaime-resume.pdf`,
      },
      {
        icon: faFileImage,
        text: "Portfolio",
        link: "https://drive.google.com/file/d/1iFISiWeWbAi-m5QEayAnU3JssF8fmIqB/view?usp=sharing",
      },
      {
        icon: faGithub,
        text: "punchkub147",
        link: "https://github.com/punchkub147",
      },
      {
        icon: faLinkedin,
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/kittapard-puaime-6553b4146/",
      },
    ],
  },
  skillsData: [
    {
      name: "Frontend",
      items: ["TypeScript", "NextJS", "TanStack", "Zod", "Jotai", "Playwright"],
    },
    {
      name: "Backend",
      items: ["Rust", "Axum", "Tokio", "sqlx", "Redis", "Kafka", "AWS (RDS, S3, ECR, etc.)"],
    },
    {
      name: "AI Engineering",
      items: ["OMP (Pi Harness)", "Hermes Agent", "Superpowers"],
    },
    {
      name: "DevOps",
      items: ["Docker", "GitLab CI/CD", "Terraform (IaC)", "ArgoCD", "Kubernetes"],
    },
    {
      name: "DevSecOps",
      items: ["Trivy (SCA)", "Semgrep (SAST)"],
    },
  ],
  interesData: [
    {
      name: "Investing",
      items: ["Cryptocurrency", "ETFs"],
    },
    {
      name: "Hobbies",
      items: ["PS5 Games", "Pets"],
    },
  ],

  worksData: [
    {
      locationName: "AI & Robotics Ventures",
      link: "https://arv.co.th/en/",
      time: "Aug 2022 – Present",
      position: "Senior Fullstack Developer",
      workDetail: "Own and drive products end to end across the company",
      highlights: [
        "Applied modern AI engineering workflows (Superpowers, Pi Harness, Hermes remote workflow) to accelerate day-to-day delivery",
        "Researched context and token optimization techniques for agent harnesses (RTK, context-mode, Ponytail, etc.)",
        "Acted as domain champion for the authorization service and implemented Casbin for domain-scoped RBAC",
        "Migrated the security scanning pipeline to Trivy, reducing tooling cost previously spent on Snyk",
        "Optimized the PDF generation service to render 1,000+ page documents in significantly less time",
        "Performed full-loop root cause analysis across microservices and delivered corrective solutions",
        "Built an inspection platform on Rust microservices",
        "Implemented and maintained a shared UI library across multiple repositories",
        "Developed a micro-frontend for the data storage product",
        "Defined the structure and architecture of frontend projects",
      ],
    },
    {
      locationName: "Perceptra",
      link: "https://www.perceptra.tech/",
      time: "Aug 2021 – Jul 2022",
      position: "Fullstack Developer",
      workDetail: "Developed an on-premise web platform for hospitals",
      highlights: [
        "Bootstrapped a ReactJS project from scratch",
        "Deployed services using Docker Compose and Nginx",
        "Automated end-to-end tests with Selenium",
        "Designed the microservices architecture",
      ],
    },
    {
      locationName: "True-e Logistics",
      link: "https://www.linkedin.com/company/true-e-logistics/",
      time: "Sep 2019 – Jul 2021",
      position: "Fullstack Developer",
      workDetail: "Delivered production systems and resolved issues across the platform",
      highlights: [
        "Collaborated in a cross-functional team of 5–8 (Developers, QA, PO, UX/UI, IT Support)",
        "Delivered logistics platforms (Sendit, ANNY, CP-ALL)",
      ],
    },
    {
      locationName: "Buzzfreeze Solutions Co., Ltd.",
      link: "http://buzzfreeze.com/web/",
      time: "2018 – 2019",
      position: "Fullstack Developer",
      workDetail:
        "Gained hands-on backend experience with NodeJS and Sequelize, and built interfaces with React Hooks and React Native",
      highlights: [
        "Designed and developed a stock inventory dashboard",
        <>
          BMW Sales Steering -{" "}
          <a href="https://mybmwreward.com" target="_blank" rel="noreferrer">
            User
          </a>
          {" & "}
          <a href="https://mybmwreward.com" target="_blank" rel="noreferrer">
            Admin
          </a>
        </>,
        <>
          Lanexang Tourism -{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.lanxangapp&hl=en_US"
            target="_blank"
            rel="noreferrer"
          >
            Android
          </a>
          {" & "}
          <a
            href="https://apps.apple.com/ar/app/lanexang-tourism/id1448354702"
            target="_blank"
            rel="noreferrer"
          >
            iOS
          </a>
        </>,
        "Developed the logistics routing algorithm",
      ],
    },
  ],
  educationsData: [
    {
      locationName: "Silpakorn University",
      link: "https://ict.su.ac.th/",
      time: "2014 – 2017",
      position: "Information and Communication Technology - Web & Interactive Media Design",
      workDetail: "",
      highlights: [
        "Graduated with Second-Class Honours, GPA 3.39",
        <>
          Final year project -{" "}
          <a
            href="http://ictsilpakorn.com/im12/comeraam/project_detail.php?id=13570110"
            target="_blank"
            rel="noreferrer"
          >
            view project
          </a>
        </>,
      ],
    },
  ],
};
