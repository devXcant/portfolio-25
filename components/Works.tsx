import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksData, workSummary, WorkData } from "@/lib/works-data";

interface WorksProps {
  title?: string;
  subtitle?: string;
}

export default function Works({
  title = "Recent Work Experience",
  subtitle = "... /Experience ...",
}: WorksProps) {
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const worksContainerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(subtitleRef.current, { opacity: 0, y: -20 });
      gsap.set(titleRef.current, { opacity: 0, scale: 0.9, y: 30 });
      gsap.set(summaryRef.current, { opacity: 0, x: 50 });
      gsap.set(".work-item", { opacity: 0, x: -100, rotationY: -15 });
      gsap.set(progressBarRef.current, { scaleX: 0 });
      gsap.set(".timeline-dot", { scale: 0, opacity: 0 });

      // Create pinned animation timeline - simplified approach
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "+=60vh", // Shorter pin duration since animations are faster
          pin: true,
          anticipatePin: 1,
          pinSpacing: false,
          toggleActions: "play none none none",
          once: true, // Only trigger once
        },
      });

      // Build the pinned animation timeline - FASTER
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        // Progress bar animation
        .to(
          progressBarRef.current,
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        // Work items staggered animation
        .to(
          ".work-item",
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.5,
            stagger: {
              amount: 0.4,
              from: "start",
            },
            ease: "power3.out",
          },
          "-=0.4"
        )
        // Timeline dots animation
        .to(
          ".timeline-dot",
          {
            scale: 1,
            opacity: 0.6,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        // Summary animation
        .to(
          summaryRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Continuous progress bar animation tied to scroll
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: worksContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Individual work item hover effects
      const workItems = document.querySelectorAll(".work-item");
      workItems.forEach((item, index) => {
        const isActive = item.classList.contains("active-work");

        if (!isActive) {
          item.addEventListener("mouseenter", () => {
            gsap.to(item, {
              scale: 1.02,
              y: -5,
              rotationX: 2,
              duration: 0.4,
              ease: "power2.out",
            });

            // Subtle glow effect
            gsap.to(item, {
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
              duration: 0.4,
              ease: "power2.out",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to(item, {
              scale: 1,
              y: 0,
              rotationX: 0,
              boxShadow: "0 0px 0px rgba(255, 255, 255, 0)",
              duration: 0.4,
              ease: "power2.out",
            });
          });
        } else {
          // Special animation for active item
          gsap.to(item, {
            y: -2,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });

      // Advanced parallax effect for work items
      workItems.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -20 : 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // Timeline dots interactive effects
      const timelineDots = document.querySelectorAll(".timeline-dot");
      timelineDots.forEach((dot, index) => {
        dot.addEventListener("mouseenter", () => {
          gsap.to(dot, {
            scale: 1.5,
            opacity: 1,
            backgroundColor: "#ffffff",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        dot.addEventListener("mouseleave", () => {
          gsap.to(dot, {
            scale: 1,
            opacity: 0.6,
            backgroundColor: "#ffffff",
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
      className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24"
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p
            ref={subtitleRef}
            className="text-gray-400 text-xs sm:text-sm font-space-grotesk font-medium tracking-widest uppercase mb-3 sm:mb-4"
          >
            {subtitle}
          </p>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash-display font-bold mb-4 text-white tracking-tight leading-tight"
          >
            {title}
          </h2>

          {/* Progress Bar */}
          <div className="w-24 sm:w-32 h-px bg-gray-800 mx-auto mt-6 sm:mt-8 mb-4 relative overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-gradient-to-r from-white via-gray-300 to-white origin-left rounded-full"
              style={{ transformOrigin: "left center" }}
            />
          </div>
        </div>

        <div
          ref={worksContainerRef}
          className="relative space-y-4 sm:space-y-6"
        >
          {/* Timeline connector - only show on larger screens */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-30 hidden md:block" />

          {worksData.map((work, index) => (
            <div key={work.id} className="relative">
              {/* Timeline dot - only show on larger screens */}
              <div className="timeline-dot absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-60 hidden md:block" />
              <WorkItem work={work} />
            </div>
          ))}
        </div>

        <div
          ref={summaryRef}
          className="text-center sm:text-right mt-12 sm:mt-16"
        >
          <div className="text-gray-400">
            <div className="text-base sm:text-lg font-light tracking-wide">
              {workSummary.title}
            </div>
            <div className="text-xl sm:text-2xl font-light italic text-white mb-4 lg:mb-0">
              {workSummary.totalExperience}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface WorkItemProps {
  work: WorkData;
}

function WorkItem({ work }: WorkItemProps) {
  return (
    <div
      className={`
        work-item transition-all duration-500 group border rounded-2xl p-4 sm:p-6 md:p-8 ml-0 md:ml-8
        ${work.isActive ? "active-work" : ""}
        ${
          work.isActive
            ? "bg-white text-black border-gray-300 shadow-lg"
            : "bg-transparent text-white border-gray-800/50 hover:bg-white hover:text-black hover:border-gray-300 hover:shadow-lg backdrop-blur-sm"
        }
      `}
    >
      {/* Mobile and Tablet Layout */}
      <div className="space-y-3 sm:space-y-4">
        {/* Header Row: Company and Time */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <h3
            className={`font-clash-display font-bold text-lg sm:text-xl md:text-2xl tracking-tight ${
              work.isActive ? "text-black" : "text-white group-hover:text-black"
            }`}
          >
            {work.company}
          </h3>

          <div className="flex items-center gap-2">
            <div
              className={`font-light text-sm ${
                work.isActive
                  ? "text-gray-600"
                  : "text-gray-400 group-hover:text-gray-600"
              }`}
            >
              <span className="font-normal tracking-wide">{work.period}</span>
              <span className="opacity-80 ml-2">({work.duration})</span>
            </div>

            {/* Arrow (Active Only) */}
            {work.isActive && (
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-gray-800" />
            )}
          </div>
        </div>

        {/* Position & Tech */}
        <div>
          <p
            className={`font-light text-sm sm:text-base leading-relaxed ${
              work.isActive
                ? "text-gray-700"
                : "text-gray-300 group-hover:text-gray-700"
            }`}
          >
            {work.position} | {work.technologies}
          </p>
        </div>
      </div>
    </div>
  );
}
