"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const animate = () => {
      // Much faster interpolation for snappier following
      followerX += (mouseX - followerX) * 0.85;
      followerY += (mouseY - followerY) * 0.85;

      setPosition({ x: mouseX, y: mouseY });
      setFollowerPosition({ x: followerX, y: followerY });

      requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .magnetic, .animated-button"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Main cursor - small filled circle */}
      <div
        className="fixed pointer-events-none z-[9999] w-3 h-3 bg-white rounded-full mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: isHovering ? "transform 0.2s ease" : "none",
          ...(isHovering && { transform: "translate(-50%, -50%) scale(1.5)" }),
        }}
      />

      {/* Cursor follower - big unfilled circle */}
      <div
        className="fixed pointer-events-none z-[9998] w-12 h-12 border border-white/30 rounded-full"
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: isHovering
            ? "transform 0.2s ease, border-color 0.2s ease"
            : "none",
          ...(isHovering && {
            transform: "translate(-50%, -50%) scale(1.5)",
            borderColor: "rgb(59 130 246 / 0.6)",
          }),
        }}
      />
    </>
  );
}
