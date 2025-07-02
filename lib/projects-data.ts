"use client";

import { ProjectData } from "@/components/ProjectsGrid";

export const projectsData: ProjectData[] = [
  {
    id: "kwalede",
    type: "project",
    category: "Retail",
    title: "Kwalede E-Commerce Store",
    description:
      "Retailing store in Ghana offering an e-commerce platform built with Next.js, Node.js and Korapay. Includes payment integration and clean UI with TailwindCSS.",
    tags: ["Next.js", "Node.js", "Korapay", "TailwindCSS"],
    mockupImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    gradient: {
      from: "from-emerald-500",
      via: "via-green-500",
      to: "to-lime-500",
    },
    links: {
      demo: "https://kwaledeonline-frontend-user.onrender.com/users",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "streamz",
    type: "project",
    category: "Entertainment",
    title: "Streamz Movie App",
    description:
      "A React Native app for streaming movies. Features modern UI built with TailwindCSS and uses Appwrite for backend services.",
    tags: ["React Native", "TailwindCSS", "Appwrite"],
    mockupImage:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    gradient: {
      from: "from-purple-500",
      via: "via-indigo-500",
      to: "to-blue-500",
    },
    links: {
      demo: "https://streamz-demo.vercel.app",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "ola",
    type: "project",
    category: "Blockchain",
    title: "Ola Blockchain App",
    description:
      "A modern blockchain app for managing ERC20 and ERC721 (NFT) transactions. Features wallet integration and transaction history.",
    tags: ["Next.js", "TailwindCSS", "WalletConnect"],
    mockupImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    gradient: {
      from: "from-gray-600",
      via: "via-neutral-700",
      to: "to-black",
    },
    links: {
      demo: "https://www.ozura.dev/",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "store",
    type: "project",
    category: "Fashion",
    title: "No CMS Fashion Store",
    description:
      "Fashion store platform built with Next.js and integrated Stripe for payments. Backend also handled with Next.js APIs.",
    tags: ["Next.js", "Stripe", "TailwindCSS"],
    mockupImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=600&fit=crop",
    gradient: {
      from: "from-pink-500",
      via: "via-rose-500",
      to: "to-red-500",
    },
    links: {
      demo: "https://store-nocms.vercel.app/",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "bill-reminder",
    type: "project",
    category: "Utility",
    title: "Bill Reminder App",
    description:
      "Mobile app for tracking user bills and sending timely reminders. Built with React Native, Node.js backend using Hono.",
    tags: ["React Native", "Node.js", "Hono", "TailwindCSS"],
    mockupImage:
      "https://images.unsplash.com/photo-1603980985829-27c511d921d0?w=800&h=600&fit=crop",
    gradient: {
      from: "from-blue-500",
      via: "via-cyan-500",
      to: "to-sky-500",
    },
    links: {
      demo: "https://bill-reminder-demo.vercel.app",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "real-estate",
    type: "project",
    category: "Real Estate",
    title: "Real Estate Mobile App",
    description:
      "A mobile app for finding homes to buy, rent, lease or book via Airbnb. Fully functional with Appwrite and TailwindCSS.",
    tags: ["React Native", "TailwindCSS", "Appwrite"],
    mockupImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    gradient: {
      from: "from-orange-500",
      via: "via-yellow-500",
      to: "to-amber-500",
    },
    links: {
      demo: "https://real-estate-demo.vercel.app",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "gefe",
    type: "project",
    category: "Marketplace",
    title: "Gefe Thrift Marketplace",
    description:
      "Online thrift marketplace using Next.js and Stripe for payments. Focused on clean design and ease of use.",
    tags: ["Next.js", "TailwindCSS", "Stripe"],
    mockupImage:
      "https://images.unsplash.com/photo-1616627982454-d868f6c1f286?w=800&h=600&fit=crop",
    gradient: {
      from: "from-amber-500",
      via: "via-yellow-500",
      to: "to-lime-500",
    },
    links: {
      demo: "https://gefe-marketplace.vercel.app",
      github: "https://github.com/devxcant",
    },
  },
];
