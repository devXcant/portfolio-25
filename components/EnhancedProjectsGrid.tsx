"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ExternalLink, Github, Play, Pause } from "lucide-react";
import { ProjectData } from "@/components/ProjectsGrid";

interface EnhancedProjectsGridProps {
  projects: ProjectData[];
  title?: string;
  subtitle?: string;
}

export default function EnhancedProjectsGrid({
  projects,
  title = "Latest Projects",
  subtitle = "... /Projects ...",
}: EnhancedProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0]?.id || ""
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

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
    const cardWidth = 320;
    const gap = 24;
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
      {/* Dynamic Background */}
      <div className="absolute inset-0 transition-all duration-1000 ease-out">
        <div
          className={`absolute inset-0 opacity-10 bg-gradient-to-br ${
            displayProject?.gradient?.from || "from-gray-900"
          } ${displayProject?.gradient?.via || "via-gray-800"} ${
            displayProject?.gradient?.to || "to-black"
          }`}
        />

        {/* Large Background Mockup Image */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-3/4 opacity-5 transition-all duration-1000">
          <div
            className="w-full h-full bg-gradient-to-l from-white/10 to-transparent rounded-3xl backdrop-blur-sm"
            style={{
              backgroundImage: displayProject?.mockupImage
                ? `url(${displayProject.mockupImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(2px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm font-medium mb-4">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {title}
            </h2>

            {/* Auto-play Control */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                {isAutoPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
              </Button>
            </div>
          </div>
        )}

        {/* Featured Project Display */}
        {displayProject && (
          <div className="text-center mb-12 transition-all duration-500 transform">
            <div className="max-w-2xl mx-auto bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div className="text-sm text-blue-400 mb-2 font-semibold">
                {displayProject.category || displayProject.type.toUpperCase()}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {displayProject.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                {displayProject.description}
              </p>
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                {displayProject.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4">
                {displayProject.links?.demo && (
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-full px-6 py-2 text-sm font-medium shadow-lg"
                    onClick={() =>
                      window.open(displayProject.links?.demo!, "_blank")
                    }
                  >
                    View Live
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {displayProject.links?.github && (
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full px-4 py-2"
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
        )}

        {/* Infinite Horizontal Scrolling Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Render triple copies for smooth infinite effect */}
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
                  flex-shrink-0 w-80 p-6 cursor-pointer transition-all duration-500 ease-out relative overflow-hidden
                  ${
                    shouldShowGradient
                      ? `bg-gradient-to-br ${
                          project.gradient?.from || "from-blue-500"
                        } ${project.gradient?.via || "via-purple-500"} ${
                          project.gradient?.to || "to-pink-500"
                        } border-transparent text-white scale-110 shadow-2xl z-10`
                      : "bg-gray-900/80 border-gray-800 hover:bg-gray-800/80 hover:border-gray-700 text-white backdrop-blur-sm"
                  }
                  ${
                    isSelected
                      ? "ring-2 ring-white/50 ring-offset-2 ring-offset-black"
                      : ""
                  }
                `}
              >
                {shouldShowGradient && (
                  <>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl" />
                  </>
                )}

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`text-sm font-medium ${
                        shouldShowGradient ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {project.category || project.type.toUpperCase()}
                    </div>
                    {isSelected && (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg" />
                    )}
                  </div>

                  {/* Project Icon */}
                  {shouldShowGradient && (
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <div className="w-8 h-8 bg-gradient-to-br from-white to-white/70 rounded-lg opacity-90" />
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold mb-3 ${
                      shouldShowGradient ? "text-white" : "text-white"
                    }`}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm mb-4 ${
                      shouldShowGradient ? "text-white/90" : "text-gray-300"
                    } ${isSelected ? "" : "line-clamp-2"}`}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags
                      ?.slice(0, isSelected ? project.tags.length : 2)
                      .map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full ${
                            shouldShowGradient
                              ? "bg-white/20 text-white border border-white/20"
                              : "bg-gray-800 text-gray-300 border border-gray-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    {!isSelected && project.tags && project.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium ${
                        shouldShowGradient ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {project.type === "article"
                        ? "Read article"
                        : "View project"}
                    </span>
                    {isSelected && (
                      <ArrowRight className="h-4 w-4 text-white animate-bounce" />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedProject === project.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8 shadow-lg"
                  : "bg-gray-600 hover:bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
