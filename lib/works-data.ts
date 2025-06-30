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
    id: "ithub",
    period: "2022 -",
    duration: "1 year 5 months",
    company: "ITHUB",
    position: "Frontend developer",
    technologies: "React & Vue",
    isActive: false,
  },
  {
    id: "vk-dev",
    period: "2021 - 2022",
    duration: "8 months",
    company: "VK Development Lab",
    position: "Frontend developer",
    technologies: "React",
    isActive: true,
  },
  {
    id: "sn-inc",
    period: "2020 - 2021",
    duration: "9 months",
    company: "SN Inc.",
    position: "Fullstack developer",
    technologies: "JavaScript & Python",
    isActive: false,
  },
  {
    id: "business-up",
    period: "2018 - 2020",
    duration: "1 year 11 months",
    company: "Business Up",
    position: "Fullstack developer",
    technologies: "JavaScript & Python",
    isActive: false,
  },
];

export const workSummary = {
  totalExperience: "4 years 9 months",
  title: "Work experience",
};
