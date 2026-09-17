"use client";

import { ProjectData } from "@/components/ProjectsGrid";

export const projectsData: ProjectData[] = [
  {
    id: "gefeafrica",
    type: "project",
    category: "E-Commerce",
    title: "GeFe Africa Thrift Marketplace",
    description:
      "Thrift e-commerce marketplace for sustainable fashion. Full-featured marketplace with payments, listings, and clean UI.",
    tags: ["Next.js", "Node.js", "E-Commerce"],
    mockupImage: "/sites/gefeafrica.png",
    gradient: {
      from: "from-amber-500",
      via: "via-yellow-500",
      to: "to-lime-500",
    },
    links: {
      demo: "https://www.gefeafrica.com/",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "apeing-poly-predict",
    type: "project",
    category: "Blockchain",
    title: "Apeing Polymarket Prediction",
    description:
      "Polymarket prediction platform for crypto and event forecasting. Built with real-time data and decentralized prediction markets.",
    tags: ["Next.js", "Blockchain", "Polymarket"],
    mockupImage: "/sites/apeing-poly-predict.png",
    gradient: {
      from: "from-amber-500",
      via: "via-orange-500",
      to: "to-red-500",
    },
    links: {
      demo: "https://apeing-poly-predict.vercel.app/",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "apeing-trade",
    type: "project",
    category: "Blockchain",
    title: "Apeing Decentralized Platform",
    description:
      "Decentralized trading platform. Real-time token analytics, charts, and trading across multiple DEXs.",
    tags: ["Next.js", "Blockchain", "Rust"],
    mockupImage: "/sites/apeing-trade.png",
    gradient: {
      from: "from-cyan-500",
      via: "via-blue-500",
      to: "to-indigo-500",
    },
    links: {
      demo: "https://trade.apeing.ai/",
      github: "https://github.com/devxcant",
    },
  },
  {
    id: "apeing-prize-market",
    type: "project",
    category: "Blockchain",
    title: "Apeing Prize Market",
    description:
      "Prize market platform for predictions and rewards. Users predict outcomes of event and win prizes if they are correct.",
    tags: ["Next.js", "Blockchain","Rust"],
    mockupImage: "/sites/apeing-prize-market.png",
    gradient: {
      from: "from-violet-500",
      via: "via-purple-500",
      to: "to-fuchsia-500",
    },
    links: {
      demo: "https://prize-market-staging.vercel.app/",
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
    tags: ["Next.js", "FastApi", "WalletConnect"],
    mockupImage: "/sites/ola.png",
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
    id: "stabley",
    type: "project",
    category: "Fintech",
    title: "Stabley",
    description:
      "Swapping, sending and buying between real money and stablecoins.",
    tags: ["ACH", "Reown", "1inch aggregators"],
    mockupImage: "/sites/stabley.png",
    gradient: {
      from: "from-slate-500",
      via: "via-zinc-500",
      to: "to-neutral-600",
    },
    links: {
      demo: "https://stabley.onrender.com/",
      github: "https://github.com/devxcant",
    },
  },
];
