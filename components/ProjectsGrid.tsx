"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Github,
  Play,
  Pause,
} from "lucide-react";

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

export default function ProjectsGrid({
  projects,
  title = "Latest Projects",
  subtitle = "... /Projects ...",
}: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0]?.id || ""
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>();

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
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
  }, [selectedProject, isAutoPlaying, projects]);

  const scrollToProject = (projectId: string) => {
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
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    scrollToProject(projectId);
    setIsAutoPlaying(false);
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);
  const displayProject = hoveredProject
    ? projects.find((p) => p.id === hoveredProject)
    : selectedProjectData;

  return (
    <section id="projects" className="relative z-10 py-20 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950 opacity-50" />

      {/* Large Background Image */}
      {displayProject?.mockupImage && (
        <div className="absolute inset-0 transition-all duration-1000 ease-out">
          <div
            className="absolute right-0 top-0 w-full h-full opacity-5 bg-cover bg-center"
            style={{
              backgroundImage: `url(${displayProject.mockupImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(1px) grayscale(80%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/80 to-black" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="text-center mb-16">
            <p className="text-gray-400 text-sm font-light tracking-widest uppercase mb-4 font-mono">
              {subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
              {title}
            </h2>

            {/* Auto-play Control */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-gray-400 hover:text-white flex items-center gap-2 font-light text-sm tracking-wide border border-gray-800 hover:border-gray-600 bg-black/20 backdrop-blur-sm"
              >
                {isAutoPlaying ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
                {isAutoPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </div>
        )}

        {/* Featured Project Info */}
        {displayProject && (
          <div className="text-center mb-16 transition-all duration-700">
            <div className="max-w-3xl mx-auto">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
                <div className="text-xs text-gray-400 mb-3 font-mono tracking-wider uppercase">
                  {displayProject.category || displayProject.type}
                </div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  {displayProject.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-light">
                  {displayProject.description}
                </p>
                <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
                  {displayProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700/50 font-mono tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                  {displayProject.links?.demo && (
                    <Button
                      className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-2.5 text-sm font-light tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() =>
                        window.open(displayProject.links?.demo!, "_blank")
                      }
                    >
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {displayProject.links?.github && (
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-400 rounded-full px-6 py-2.5 font-light tracking-wide"
                      onClick={() =>
                        window.open(displayProject.links?.github!, "_blank")
                      }
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Scrolling Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {[...projects, ...projects, ...projects].map((project, index) => {
            const isSelected = selectedProject === project.id;
            const isHovered = hoveredProject === project.id;
            const shouldShowGradient = isSelected || isHovered;

            return (
              <Card
                key={`${project.id}-${index}`}
                onClick={() => handleProjectClick(project.id)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`
                  flex-shrink-0 w-80 h-96 cursor-pointer transition-all duration-500 ease-out relative overflow-hidden group
                  ${
                    shouldShowGradient
                      ? `bg-gradient-to-br ${
                          project.gradient?.from || "from-blue-500"
                        } ${project.gradient?.via || "via-purple-500"} ${
                          project.gradient?.to || "to-pink-500"
                        } border-transparent text-white scale-105 shadow-2xl`
                      : "bg-black/20 border-gray-800/50 hover:border-gray-700/50 text-white backdrop-blur-xl"
                  }
                  ${isSelected ? "ring-1 ring-white/30" : ""}
                `}
                style={{
                  backgroundImage:
                    !shouldShowGradient && project.mockupImage
                      ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${project.mockupImage})`
                      : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Gradient Overlay for Selected/Hovered */}
                {shouldShowGradient && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                )}

                {/* Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm" />

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`text-xs font-mono tracking-wider uppercase ${
                          shouldShowGradient ? "text-white/80" : "text-gray-400"
                        }`}
                      >
                        {project.category || project.type}
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>

                    <h3
                      className={`text-xl font-light mb-3 tracking-tight ${
                        shouldShowGradient ? "text-white" : "text-white"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed font-light ${
                        shouldShowGradient ? "text-white/90" : "text-gray-300"
                      } ${isSelected ? "" : "line-clamp-3"}`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags
                        ?.slice(0, isSelected ? project.tags.length : 3)
                        .map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-full font-mono tracking-wide ${
                              shouldShowGradient
                                ? "bg-white/20 text-white border border-white/20"
                                : "bg-white/5 text-gray-300 border border-gray-700/50"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      {!isSelected &&
                        project.tags &&
                        project.tags.length > 3 && (
                          <span className="text-xs text-gray-500 font-mono">
                            +{project.tags.length - 3}
                          </span>
                        )}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono tracking-wide ${
                          shouldShowGradient ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {project.type === "article"
                          ? "Read Article"
                          : "View Project"}
                      </span>
                      {isSelected && (
                        <ArrowRight className="h-4 w-4 text-white animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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
