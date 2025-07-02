// ProjectsGrid.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Custom SVG Icons
const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const ExternalLink = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Play = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polygon
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="5,3 19,12 5,21"
    />
  </svg>
);

const Pause = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="6"
      y="4"
      width="4"
      height="16"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="14"
      y="4"
      width="4"
      height="16"
    />
  </svg>
);

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 12H5m0 0l7 7m-7-7l7-7"
    />
  </svg>
);

const ArrowRightNav = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14m0 0l-7-7m7 7l-7 7"
    />
  </svg>
);

export interface ProjectData {
  id: string;
  type: "project" | "article" | "featured";
  category?: string;
  title: string;
  description: string;
  tags?: string[];
  links?: {
    demo?: string;
    github?: string;
    article?: string;
  };
  gradient?: {
    from: string;
    via: string;
    to: string;
  };
  icon?: string;
  image?: string;
  mockupImage?: string;
  backgroundColor?: string;
}

interface ProjectsGridProps {
  projects: ProjectData[];
  title?: string;
  subtitle?: string;
}

import { projectsData } from "@/lib/projects-data";

export default function ProjectsGrid({
  projects = projectsData,
  title = "Latest Projects",
  subtitle = "... /Projects ...",
}: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0]?.id || ""
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showProjectLinks, setShowProjectLinks] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToProject = useCallback(
    (projectId: string) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const projectIndex = projects.findIndex((p) => p.id === projectId);
      const cardWidth = 320; // w-80 = 320px
      const gap = 24; // gap-6 = 24px
      const scrollPosition =
        projectIndex * (cardWidth + gap) -
        container.clientWidth / 2 +
        cardWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    },
    [projects]
  );

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = window.setInterval(() => {
        const currentIndex = projects.findIndex(
          (p) => p.id === selectedProject
        );
        const nextIndex = (currentIndex + 1) % projects.length;
        setSelectedProject(projects[nextIndex].id);
        scrollToProject(projects[nextIndex].id);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedProject, isAutoPlaying, projects, scrollToProject]);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    scrollToProject(projectId);
    setIsAutoPlaying(false);
  };

  // Navigation functions for infinite scroll
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320 + 24; // card width + gap
    container.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
    setIsAutoPlaying(false);
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320 + 24; // card width + gap
    container.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
    setIsAutoPlaying(false);
  };

  // Handle infinite scroll reset
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const singleSetWidth = projects.length * (320 + 24); // width of one set of projects

    // Reset scroll position for infinite effect
    if (scrollLeft <= 0) {
      container.scrollLeft = singleSetWidth;
    } else if (scrollLeft >= scrollWidth - clientWidth - 1) {
      container.scrollLeft = singleSetWidth;
    }
  }, [projects.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProjectLinks) {
        setShowProjectLinks(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProjectLinks]);

  // GSAP Animations Setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial entrance animations
      gsap.set(".project-header", { opacity: 0, y: 30 });
      gsap.set(".project-featured", { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(".project-card", { opacity: 0, y: 50, rotationY: 15 });
      gsap.set(".nav-button", { opacity: 0, scale: 0.8 });

      // Section entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(".project-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          ".project-featured",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".nav-button",
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          ".project-card",
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Floating animation for featured section
      gsap.to(featuredRef.current, {
        y: -5,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Navigation buttons hover effects
      const navButtons = document.querySelectorAll(".nav-button");
      navButtons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Project cards hover effects
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            rotationY: index % 2 === 0 ? 5 : -5,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Featured project change animation
  useEffect(() => {
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [selectedProject, hoveredProject]);

  // Dropdown animation
  useEffect(() => {
    if (dropdownRef.current) {
      if (showProjectLinks) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, scale: 0.9, y: -10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
        );
      }
    }
  }, [showProjectLinks]);

  const selectedProjectData = projects.find((p) => p.id === selectedProject);
  const displayProject = hoveredProject
    ? projects.find((p) => p.id === hoveredProject)
    : selectedProjectData;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 py-20 overflow-hidden bg-black min-h-screen"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950 opacity-50" />

      {/* Large Background Image - shows for selected/hovered project */}
      {displayProject?.mockupImage && (
        <div className="absolute inset-0 transition-all duration-1000 ease-out">
          <div
            className="absolute right-0 top-0 w-full h-full opacity-15 bg-cover bg-center"
            style={{
              backgroundImage: `url(${displayProject.mockupImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(1px) grayscale(60%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/85 to-black" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="project-header text-center mb-16">
            <p className="text-gray-400 text-sm font-space-grotesk font-medium tracking-widest uppercase mb-4">
              {subtitle}
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-clash-display font-bold text-white mb-8 tracking-tight">
              {title}
            </h2>

            {/* Auto-play Control */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-gray-400 hover:text-white flex items-center gap-2 font-light text-sm tracking-wide border border-gray-800 hover:border-gray-600 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-300"
              >
                {isAutoPlaying ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
                {isAutoPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        )}

        {/* Featured Project Info */}
        {displayProject && (
          <div
            ref={featuredRef}
            className="project-featured text-center mb-16 transition-all duration-700"
          >
            <div className="max-w-3xl mx-auto">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
                <div className="text-xs text-gray-400 mb-3 font-space-grotesk font-medium tracking-wider uppercase">
                  {displayProject.category || displayProject.type}
                </div>
                <h3 className="text-4xl md:text-5xl font-clash-display font-bold text-white mb-6 tracking-tight">
                  {displayProject.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-satoshi font-medium">
                  {displayProject.description}
                </p>
                <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
                  {displayProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700/50 font-space-grotesk font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <button
                      className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-2.5 text-sm font-space-grotesk font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProjectLinks(!showProjectLinks);
                      }}
                    >
                      View Project
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    {/* Project Links Dropdown */}
                    {showProjectLinks && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-gray-800/50 rounded-xl p-2 shadow-2xl z-50"
                      >
                        <div className="flex gap-2">
                          {displayProject.links?.demo && (
                            <button
                              className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-xs font-space-grotesk font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  displayProject.links?.demo,
                                  "_blank"
                                );
                                setShowProjectLinks(false);
                              }}
                            >
                              <ExternalLink className="h-3 w-3" />
                              Live
                            </button>
                          )}
                          {displayProject.links?.github && (
                            <button
                              className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-xs font-space-grotesk font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  displayProject.links?.github,
                                  "_blank"
                                );
                                setShowProjectLinks(false);
                              }}
                            >
                              <Github className="h-3 w-3" />
                              GitHub
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation and Horizontal Scrolling Cards Container */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={scrollLeft}
            className="nav-button absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-gray-800/50 text-white hover:bg-black/80 hover:border-gray-600/50 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={scrollRight}
            className="nav-button absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-gray-800/50 text-white hover:bg-black/80 hover:border-gray-600/50 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
            aria-label="Scroll right"
          >
            <ArrowRightNav className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* Horizontal Scrolling Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 px-16"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {[...projects, ...projects, ...projects].map((project, index) => {
              const isSelected = selectedProject === project.id;
              const isHovered = hoveredProject === project.id;

              return (
                <div
                  key={`${project.id}-${index}`}
                  onClick={() => handleProjectClick(project.id)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`
                    project-card flex-shrink-0 w-80 h-96 cursor-pointer transition-all duration-300 ease-out relative overflow-hidden group rounded-xl border
                    ${
                      isSelected
                        ? "bg-black/40 text-white border-white/30 scale-105 shadow-2xl backdrop-blur-xl"
                        : isHovered
                        ? "bg-black/60 text-white border-gray-600 scale-102 shadow-xl backdrop-blur-xl"
                        : "bg-black/30 text-white border-gray-800/50 hover:border-gray-700/50 backdrop-blur-sm"
                    }
                  `}
                >
                  {/* Glass Effect for all cards */}
                  <div
                    className={`absolute inset-0 ${
                      isSelected
                        ? "bg-gradient-to-b from-white/10 to-white/5"
                        : "bg-gradient-to-b from-white/5 to-transparent"
                    } backdrop-blur-sm`}
                  />

                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`text-xs font-space-grotesk font-medium tracking-wider uppercase ${
                            isSelected ? "text-white/80" : "text-gray-400"
                          }`}
                        >
                          {project.category || project.type}
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                      </div>

                      <h3
                        className={`text-xl font-clash-display font-bold mb-3 tracking-tight ${
                          isSelected ? "text-white" : "text-white"
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed font-satoshi font-medium ${
                          isSelected ? "text-white/90" : "text-gray-300"
                        } ${isSelected ? "" : "line-clamp-3"}`}
                        style={{
                          display: isSelected ? "block" : "-webkit-box",
                          WebkitLineClamp: isSelected ? "none" : 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                selectedProject === project.id
                  ? "bg-white w-8"
                  : "bg-gray-700 hover:bg-gray-500 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
