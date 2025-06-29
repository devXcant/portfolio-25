"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration while preserving essential styling
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased bg-black text-white";
  }, []);

  return <>{children}</>;
}
