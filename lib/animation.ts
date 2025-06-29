import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const initializeAnimations = () => {
  if (typeof window === "undefined") return;

  // Hero text reveal animation
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    gsap.fromTo(
      heroTitle,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }

  // Hero description animation
  const heroDescription = document.querySelector(".hero-description");
  if (heroDescription) {
    gsap.fromTo(
      heroDescription,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.8,
      }
    );
  }

  // Hero button animation
  const heroButton = document.querySelector(".hero-button");
  if (heroButton) {
    gsap.fromTo(
      heroButton,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.2,
      }
    );
  }

  // Floating decorative elements
  const decorativeElements = document.querySelectorAll(".decorative-element");
  decorativeElements.forEach((element, index) => {
    gsap.to(element, {
      y: "random(-30, 30)",
      x: "random(-20, 20)",
      rotation: "random(-5, 5)",
      duration: "random(4, 8)",
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.5,
    });
  });

  // Project cards scroll animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        x: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      }
    );
  });

  // Skills cards animation
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        y: 80,
        opacity: 0,
        rotationX: 45,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.15,
      }
    );
  });

  // Work experience timeline animation
  const workItems = document.querySelectorAll(".work-item");
  workItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      }
    );
  });

  // Parallax effect for background elements
  gsap.to(".parallax-slow", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".parallax-fast", {
    yPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Section reveal animations
  const sections = document.querySelectorAll(".reveal-section");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

export const addHoverAnimations = () => {
  if (typeof window === "undefined") return;

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out",
    });

    card.addEventListener("mouseenter", () => {
      tl.play();
    });

    card.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });

  // Skill card hover effects
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      scale: 1.02,
      y: -5,
      duration: 0.2,
      ease: "power2.out",
    });

    card.addEventListener("mouseenter", () => {
      tl.play();
    });

    card.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".animated-button");
  buttons.forEach((button) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });

    button.addEventListener("mouseenter", () => {
      tl.play();
    });

    button.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });

  // Social links hover effects
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(link, {
      scale: 1.1,
      rotationZ: 5,
      duration: 0.2,
      ease: "back.out(1.7)",
    });

    link.addEventListener("mouseenter", () => {
      tl.play();
    });

    link.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });
};

export const createTextRevealAnimation = (element: Element) => {
  if (typeof window === "undefined") return;

  const text = element.textContent;
  if (!text) return;

  element.innerHTML = text
    .split("")
    .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");

  const chars = element.querySelectorAll(".char");

  gsap.fromTo(
    chars,
    {
      y: 100,
      opacity: 0,
      rotationX: 90,
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.02,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const addColorChangeOnScroll = () => {
  if (typeof window === "undefined") return;

  const sections = [
    { trigger: ".hero-section", color: "#000000" },
    { trigger: ".projects-section", color: "#0a0a0a" },
    { trigger: ".about-section", color: "#111111" },
    { trigger: ".work-section", color: "#000000" },
  ];

  sections.forEach(({ trigger, color }) => {
    ScrollTrigger.create({
      trigger: trigger,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        gsap.to("body", {
          backgroundColor: color,
          duration: 1,
          ease: "power2.inOut",
        });
      },
      onEnterBack: () => {
        gsap.to("body", {
          backgroundColor: color,
          duration: 1,
          ease: "power2.inOut",
        });
      },
    });
  });
};

export const addMagneticEffect = () => {
  if (typeof window === "undefined") return;

  const magneticElements = document.querySelectorAll(".magnetic");

  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
};
