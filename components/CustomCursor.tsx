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
      // Smooth cursor following
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

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
      {/* Main cursor */}
      <div
        className={`cursor fixed pointer-events-none z-[9999] transition-all duration-200 ${
          isHovering ? "scale-150 bg-blue-500" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cursor follower */}
      <div
        className={`cursor-follower fixed pointer-events-none z-[9998] transition-all duration-300 ${
          isHovering ? "scale-150 border-blue-500" : ""
        }`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
