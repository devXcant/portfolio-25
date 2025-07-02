export interface WorkData {
  id: string;
  period: string;
  duration: string;
  company: string;
  position: string;
  technologies: string;
  isActive?: boolean;
}

export const worksData: WorkData[] = [
  {
    id: "KWALEDE",
    period: "2025",
    duration: "Freelance",
    company: "KWALEDE",
    position: "Fullstack Developer",
    technologies: "React,Next.js,Node.js",
    isActive: false,
  },
  {
    id: "STELLUS",
    period: "2025",
    duration: "4 months",
    company: "STELLUS",
    position: "Software Developer",
    technologies: "React,Next.js,Typescript,Node.js,Python,Azure",
    isActive: false,
  },
  {
    id: "ATLAS",
    period: "2024",
    duration: "8 months",
    company: " ATLAS",
    position: "Software Developer",
    technologies: "React,Next.js,Typescript,Node.js,Python,Azure",
    isActive: false,
  },
  {
    id: "INTERRA NETWORKS",
    period: "2024",
    duration: "1 year ",
    company: "INTERRA NETWORKS",
    position: "Frontend & Mobile Developer",
    technologies: "React Native & Vue",
    isActive: false,
  },
  // {
  //   id: "...",
  //   period: "...",
  //   duration: "...",
  //   company: "...",
  //   position: "...",
  //   technologies: "...",
  //   isActive: false,
  // },
];

export const workSummary = {
  totalExperience: "5 years ",
  title: "Work experience",
};
