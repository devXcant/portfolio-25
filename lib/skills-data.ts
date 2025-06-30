export interface SkillData {
  id: string;
  title: string;
  skills: string[];
  link?: string;
}

export const skillsData: SkillData[] = [
  {
    id: "frontend",
    title: "Front-end",
    skills: [
      "TypeScript / React / Vue / Vuex / Redux Toolkit / NextJs /",
      "Nuxt / Jest / GraphQL / React Native / Puppeteer / Enzyme",
    ],
    link: "https://github.com/devxcant",
  },
  {
    id: "styles",
    title: "Styles",
    skills: ["SCSS / SASS / PostCSS /", "Ant.d / MUI / Material UI"],
    link: "https://codepen.io/devxcant",
  },
  {
    id: "backend",
    title: "Back-end",
    skills: [
      "Golang / Gin / GORM / PostgreSQL / MySQL / MongoDB / gRPC /",
      "Redis / Kafka / Node / Nest / TypeORM / Microservices",
    ],
    link: "https://github.com/devxcant",
  },
  {
    id: "devops",
    title: "DevOps",
    skills: ["Nginx / Brotli / Docker /", "(CI/CD) / k8s / Bash"],
    link: "https://github.com/devxcant",
  },
];
