"use client";

import type { ReactNode } from "react";

export default function MacBookMockup({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[820px] drop-shadow-[0_40px_70px_rgba(0,0,0,0.5)]">
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          top: "12.923%",
          right: "9.437%",
          bottom: "10.669%",
          left: "9.437%",
          borderRadius: "10px",
        }}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
      <img
        src="/devices/macbook-pro-m5.png"
        alt=""
        className="pointer-events-none relative z-10 block h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
}
