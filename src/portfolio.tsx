import { action, thunk } from "easy-peasy";
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
        text: "91/84 pruksa villa lumlooka Rd. klong 7 Khwaeng lumlooka Khet lumlooka Pathumthani 12150",
      },
      {
        icon: faBirthdayCake,
        text: `${moment().diff(moment("30/03/1996", "DD/MM/YYYY"), "year")} yo`,
      },
      {
        icon: faEnvelope,
        text: "punchkub147@gmail.com",
      },
      {
        icon: faFile,
        text: "Resume",
        link: "https://github.com/punchkub147",
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
        text: "Linkedin",
        link: "https://www.linkedin.com/in/kittapard-puaime-6553b4146/",
      },
    ],
  },
  skillsData: [
    {
      name: "Frontend",
      items: ["Typescript", "NextJS", "Tanstack", "Zod", "Jotai", "Playwright"],
      // items: ["Typescript", "React&Redux", "Storybook", "Selenium"],
    },
    // {
    //   name: "Frontend",
    //   level: "Learning",
    //   items: ["NextJS", "Testing Lib"],
    // },
    {
      name: "Backend",
      // items: [
      //   "NodeJS",
      //   "Koa",
      //   "MySQL",
      //   "Sequelize",
      //   "Socket",
      //   "Redis",
      //   "Docker",
      //   "Nginx",
      // ],
      items: ["Rust", "Axum", "Tokio", "sqlx", "Redis", "Kafka", "AWS (RDS, S3, ECR, ETC.)"],
    },
    {
      name: "AI Skills & Tools",
      items: ["OMP (Pi Harness)", "Hermes agent", "Superpowers"],
    },
    // {
    //   name: "Backend",
    //   level: "Learning",
    //   items: ["AWS (RDS, S3, ECR, EC2)"],
    // },
    {
      name: "DevOps",
      items: ["Docker", "Gitlab CI/CD", "Terraform IaC", "ArgoCD", "K8S"],
    },
        {
      name: "DevSecOps",
      items: ["Trivy SCA", "Semgrep SAST"],
    },
    // {
    //   name: "Etc.",
    //   items: ["Figma", "Git", "Notion", "Jira", "Agile & Scrum"],
    // },
  ],
  interesData: [
    {
      name: "Investing",
      items: ["Crypto", "ETF"],
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
      time: "Oct 2022 - Oct 2026",
      position: "Senior Fullstack Developer",
      workDetail: "Develop and drive products across the company",
      highlights: [
        "AI Engineering using modern skills and tools (superpowers, pi harness, hermes remote workflow)",
        "Token optimization researhing for harness (RTK, context-mode, ponytail, etc.)",
        "Domain champion for Authorization service and implement Casbin for RBAC + domain",
        "Migrate security pipeline using Trivy for optimize cost from snyk",
        "Implement PDF generation service performance with 1000+ pages in less time",
        "Full loop Root cause analysis in micro-services and provide solutions",
        "Develop the inpsection platform using micro-servvices in rust",
        "Implement & maintain ui library for multiple repos",
        "Develop a micro-frontend of datastorage product",
        "Structure and archetechture of the frontend project",
      ]
    },
    {
      locationName: "Perceptra",
      link: "https://www.perceptra.tech/",
      time: "Sep 2021 - Sep 2022",
      position: "Fullstack Developer",
      workDetail: "Develop a web on-premise for hospitals",
      highlights: [
        "Start ReactJS project from zero",
        "Deploy services using docker-compose & nginx",
        "Automate test by selenium",
        "Microservices Design",
      ],
    },
    {
      locationName: "True-e Logistics",
      link: "https://www.linkedin.com/company/true-e-logistics/",
      time: "Sep 2019 - Sep 2021",
      position: "Fullstack Developer",
      workDetail: "Develop a production project & Problem solving",
      highlights: [
        "Work as a team of 5-8 people (Dev, QA, PO, UX/UI, IT Support)",
        "Logistic platform (Sendit, ANNY, CP-ALL)",
      ],
    },
    {
      locationName: "Buzzfreeze Solutions Co., Ltd.",
      link: "http://buzzfreeze.com/web/",
      time: "2018 - 2019",
      position: "Fullstack Developer",
      workDetail:
        "Open the world of backend with NodeJS, Sequelize and Experience of React Hooks, React Native",
      highlights: [
        "Design & Develop a Stock Inventories Dashboard",
        <>
          BMW Sale steering{" "}
          <a href="https://mybmwreward.com" target="_blank">
            User
          </a>
          {" & "}
          <a href="https://mybmwreward.com" target="_blank">
            Admin
          </a>
        </>,
        <>
          LANEXANG Tourism{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.lanxangapp&hl=en_US"
            target="_blank"
          >
            Android
          </a>
          {" & "}
          <a
            href="https://apps.apple.com/ar/app/lanexang-tourism/id1448354702"
            target="_blank"
          >
            IOS
          </a>
        </>,
        "Develop Logistic Algorithm",
      ],
    },
  ],
  educationsData: [
    {
      locationName: "Silpakorn University",
      link: "https://ict.su.ac.th/",
      time: "2014 - 2017",
      position: "ICT Web & Interactive media Design",
      workDetail: "",
      highlights: [
        "Second-class Honors GPA 3.39",
        <>
          <a
            href="http://ictsilpakorn.com/im12/comeraam/project_detail.php?id=13570110"
            target="_blank"
          >
            Final Project
          </a>{" "}
          Design & Develop
        </>,
      ],
    },
  ],
};
