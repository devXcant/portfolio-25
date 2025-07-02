import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCard from "./SkillCard";
import { skillsData } from "@/lib/skills-data";

interface AboutMeProps {
  name?: string;
  title?: string;
  experience?: string;
  profileImage?: string;
  subtitle?: string;
}

export default function AboutMe({
  name = "Ayo Bamidele",
  title = "Software Developer",
  experience = "5 years",
  profileImage = "/ghibli.jpg",
  subtitle = "... /About me ...",
}: AboutMeProps) {
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(subtitleRef.current, { opacity: 0, y: -30 });
      gsap.set(titleRef.current, { opacity: 0, x: -50 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      gsap.set(profileImageRef.current, { opacity: 0, x: 50, scale: 0.8 });

      // Skill cards initial state
      gsap.set(".skill-card", { opacity: 0, y: 30, scale: 0.9 });

      // Simplified About Me animations - no pinning, just smooth scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Start when section is 85% in view
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true, // Only play once
        },
      });

      // Build the smooth animation timeline
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        // Animate title with split effect
        .to(
          titleRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2"
        )
        // Animate description
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // Animate skill cards with stagger
        .to(
          ".skill-card",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        // Animate profile image
        .to(
          profileImageRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Continuous floating animation for profile image
      gsap.to(profileImageRef.current, {
        y: -10,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Skill cards hover animation setup
      const skillCards = document.querySelectorAll(".skill-card");
      skillCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtitle */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <p
            ref={subtitleRef}
            className="text-gray-400 text-xs sm:text-sm font-space-grotesk font-medium tracking-widest uppercase"
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash-display font-bold leading-tight tracking-tight"
            >
              Hello! I'm {name}, a{" "}
              <span className="italic text-white font-medium">{title}</span>
              <br />
              with over{" "}
              <span className="italic text-white font-medium">
                {experience}
              </span>{" "}
              of experience.
            </h2>

            <p
              ref={descriptionRef}
              className="text-gray-400 font-satoshi font-medium leading-relaxed tracking-wide text-base sm:text-lg max-w-lg"
            >
              These are some of the{" "}
              <span className="text-white font-semibold">technologies</span>,{" "}
              <span className="text-white font-semibold">tools</span>, I've
              worked with and enjoyed building with over the years.
            </p>

            {/* Skill Cards */}
            <div
              ref={skillsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              {skillsData.map((skill) => (
                <div key={skill.id} className="skill-card">
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div
              ref={profileImageRef}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-black/20 backdrop-blur-sm border border-gray-800/50 rounded-3xl overflow-hidden hover:scale-105 hover:border-gray-700/50 transition-all duration-500 cursor-pointer shadow-2xl"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
