import { ProjectData } from "@/components/ProjectsGrid";

export const projectsData: ProjectData[] = [
  {
    id: "1",
    type: "project",
    category: "Latest Project",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include payment integration, admin dashboard, and real-time inventory management.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    mockupImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    gradient: {
      from: "from-emerald-500",
      via: "via-teal-500",
      to: "to-cyan-500",
    },
    links: {
      demo: "https://your-ecommerce-demo.com",
      github: "https://github.com/yourusername/ecommerce-platform",
    },
  },
  {
    id: "2",
    type: "featured",
    title: "Real-Time Chat Application",
    description:
      "Modern chat application built with Next.js and Socket.io. Features include message encryption, file sharing, and group conversations with real-time updates.",
    tags: ["Next.js", "Socket.io", "MongoDB", "TypeScript"],
    mockupImage:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    gradient: {
      from: "from-blue-500",
      via: "via-purple-500",
      to: "to-pink-500",
    },
    links: {
      demo: "https://your-chat-app.com",
      github: "https://github.com/yourusername/chat-app",
    },
  },
  {
    id: "3",
    type: "project",
    category: "Mobile App",
    title: "Task Management App",
    description:
      "Cross-platform mobile app using React Native with offline support, push notifications, and team collaboration features.",
    tags: ["React Native", "Firebase", "AsyncStorage"],
    mockupImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    gradient: {
      from: "from-violet-500",
      via: "via-purple-500",
      to: "to-fuchsia-500",
    },
    links: {
      demo: "https://your-task-app.com",
      github: "https://github.com/yourusername/task-manager",
    },
  },
];

export const articlesData: ProjectData[] = [
  {
    id: "4",
    type: "article",
    category: "Technical Article",
    title: "Building Scalable APIs with Node.js",
    description:
      "A comprehensive guide on building RESTful APIs with proper error handling, authentication, and database optimization techniques.",
    tags: ["Node.js", "API", "MongoDB", "Express"],
    links: {
      article: "https://your-blog.com/scalable-apis",
    },
  },
  {
    id: "5",
    type: "featured",
    title: "Modern React Patterns & Best Practices",
    description:
      "Deep dive into advanced React patterns including custom hooks, context optimization, and performance techniques for large-scale applications.",
    tags: ["React", "Hooks", "Performance", "TypeScript"],
    gradient: {
      from: "from-green-500",
      via: "via-teal-500",
      to: "to-blue-500",
    },
    links: {
      article: "https://your-blog.com/react-patterns",
    },
  },
  {
    id: "6",
    type: "article",
    category: "Tutorial",
    title: "Docker & Kubernetes for Developers",
    description:
      "Complete guide to containerization and orchestration, from basic Docker concepts to deploying applications on Kubernetes clusters.",
    tags: ["Docker", "Kubernetes", "DevOps", "CI/CD"],
    links: {
      article: "https://your-blog.com/docker-kubernetes",
    },
  },
];

// Alternative content ideas you can use:

export const openSourceData: ProjectData[] = [
  {
    id: "7",
    type: "project",
    category: "Open Source",
    title: "React Component Library",
    description:
      "Reusable UI component library built with TypeScript and Storybook. Published on NPM with comprehensive documentation.",
    tags: ["React", "TypeScript", "Storybook", "NPM"],
    links: {
      demo: "https://your-component-library.com",
      github: "https://github.com/yourusername/react-components",
    },
  },
  {
    id: "8",
    type: "featured",
    title: "CLI Development Tool",
    description:
      "Command-line tool for automating development workflows. Built with Node.js and published as an NPM package with 1k+ downloads.",
    tags: ["Node.js", "CLI", "NPM", "Automation"],
    gradient: {
      from: "from-orange-500",
      via: "via-red-500",
      to: "to-pink-500",
    },
    links: {
      github: "https://github.com/yourusername/dev-cli-tool",
    },
  },
  {
    id: "9",
    type: "project",
    category: "API Integration",
    title: "Multi-Platform Analytics Dashboard",
    description:
      "Dashboard aggregating data from multiple APIs (Google Analytics, GitHub, etc.) with real-time charts and export functionality.",
    tags: ["Vue.js", "D3.js", "API", "Charts"],
    links: {
      demo: "https://your-analytics.com",
      github: "https://github.com/yourusername/analytics-dashboard",
    },
  },
];
