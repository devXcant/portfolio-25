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
      "React / Next.js / React Native /",
      "Vue / Nuxt / TypeScript / JavaScript",
    ],
    link: "https://github.com/yourusername", // Replace with your actual GitHub
  },
  {
    id: "styles",
    title: "Styling & Animation",
    skills: [
      "Tailwind CSS / SCSS / SASS / CSS3 /",
      "GSAP / Framer Motion / Styled Components",
    ],
    link: "https://codepen.io/yourusername", // Replace with your Codepen
  },
  {
    id: "backend",
    title: "Back-end",
    skills: [
      "Node.js / Express / Hono /",
      "TypeORM / Django / REST APIs",
    ],
    link: "https://github.com/yourusername",
  },
  {
    id: "testing",
    title: "Testing",
    skills: [
      "Cypress / Jest / Mocha / React Testing Library",
    ],
    link: "https://github.com/yourusername",
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    skills: [
      "Docker / Azure / Ngrok / Postman / Git / Caprover / ",
    ],
    link: "https://github.com/yourusername",
  },
];
