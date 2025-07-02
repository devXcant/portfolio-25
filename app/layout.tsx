import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientBody from "./ClientBody";

// Google Fonts
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Local Fonts
const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayobamidele Ogunkuade | Software Developer",
  description:
    "Software developer with 5+ years experience. Vast experience in React, Vue, React Native, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${satoshi.variable} ${clashDisplay.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/Satoshi-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-black text-white font-satoshi"
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
