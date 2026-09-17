"use client";

import type { ReactNode } from "react";

export default function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[250px] lg:w-[280px] drop-shadow-[0_32px_60px_rgba(0,0,0,0.55)]">
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          top: "2.536%",
          right: "5.333%",
          bottom: "2.536%",
          left: "5.333%",
          borderRadius: "36px",
        }}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
      <img
        src="/devices/iphone-17-pro.png"
        alt=""
        className="pointer-events-none relative z-10 block h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
}
