export interface MobileApp {
  id: string;
  name: string;
  kicker: string;
  title: string;
  description: string;
  points: string[];
  tags: string[];
  github: string;
  images: string[];
}

export const mobileApps: MobileApp[] = [
  {
    id: "bills",
    name: "Bills",
    kicker: "TMM",
    title: "TMM, on device.",
    description:
      "Bills is TMM — smart money management for modern UK life. Cream canvas, Open Banking, and Firebase, captured from the running iOS app on version2-ui.",
    points: [
      "Welcome, planning, and insights from the live iOS build",
      "Open Banking plus on-device records",
      "version2-ui on the Bills repo",
    ],
    tags: ["React Native", "Expo", "Firebase", "Open Banking"],
    github: "https://github.com/devXcant/Bills/tree/version2-ui",
    images: [
      "/mobile/bills-1.png",
      "/mobile/bills-2.png",
      "/mobile/bills-3.png",
    ],
  },
  {
    id: "vibecode",
    name: "Vibecode",
    kicker: "Matching",
    title: "Match the vibe.",
    description:
      "VIBECODER is VibeCodes — connect with developers who match your vibe. These frames are the live iOS app: landing, jobs, and matches.",
    points: [
      "Landing with Get Started into the product",
      "Job listings with apply and filters",
      "Match cards with skills and availability",
    ],
    tags: ["React Native", "Expo", "TanStack Query"],
    github: "https://github.com/devXcant/VIBECODER",
    images: [
      "/mobile/vibe-1.png",
      "/mobile/vibe-2.png",
      "/mobile/vibe-3.png",
    ],
  },
  {
    id: "streamz",
    name: "Streamz",
    kicker: "Entertainment",
    title: "MovieHub, in your pocket.",
    description:
      "Streamz is MovieHub — a React Native movie app on TMDB. The phone shows the live iOS screens: home, search, and a title.",
    points: [
      "Latest movies grid from TMDB",
      "Search across the catalog",
      "Poster-led title pages with ratings",
    ],
    tags: ["React Native", "Expo", "TMDB", "Appwrite"],
    github: "https://github.com/devXcant/Streamz",
    images: [
      "/mobile/streamz-1.png",
      "/mobile/streamz-2.png",
      "/mobile/streamz-3.png",
    ],
  },
];
