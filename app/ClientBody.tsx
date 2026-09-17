"use client";

import { useEffect } from "react";
import { AnimationProvider } from "@/lib/animation-context";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased bg-black text-white";
  }, []);

  return <AnimationProvider>{children}</AnimationProvider>;
}
