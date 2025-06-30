"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

interface InteractiveProjectsGridProps {
  projects: ProjectData[];
  title?: string;
  subtitle?: string;
}

export default function InteractiveProjectsGrid({
  projects,
  title = "Latest Projects",
  subtitle = "... /Projects ...",
}: InteractiveProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0]?.id || ""
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  const scrollToProject = useCallback((projectId: string) => {
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
  }, [projects]);

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

  const selectedProjectData = projects.find((p) => p.id === selectedProject);
  const displayProject = hoveredProject
    ? projects.find((p) => p.id === hoveredProject)
    : selectedProjectData;

  return (
    <section id="projects" className="relative z-10 py-20 overflow-hidden">
      {/* Background Image Display */}
      <div className="absolute inset-0 transition-all duration-1000 ease-out">
        <div
          className={`absolute inset-0 opacity-10 bg-gradient-to-br ${
            displayProject?.backgroundColor || "from-gray-900 to-black"
          }`}
        />
        {displayProject?.mockupImage && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20 bg-cover bg-center rounded-3xl transition-all duration-1000 ease-out transform hover:opacity-30"
            style={{
              backgroundImage: `url(${displayProject.mockupImage})`,
              filter: "blur(1px)",
            }}
          />
        )}
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

        {/* Project Info Display */}
        {displayProject && (
          <div className="text-center mb-12 transition-all duration-500">
            <div className="max-w-2xl mx-auto">
              <div className="text-sm text-gray-400 mb-2">
                {displayProject.category || displayProject.type.toUpperCase()}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {displayProject.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6">
                {displayProject.description}
              </p>
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                {displayProject.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4">
                {displayProject.links?.demo && (
                  <Button
                    className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 text-sm font-medium"
                    onClick={() =>
                      window.open(displayProject.links?.demo, "_blank")
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
                      window.open(displayProject.links?.github, "_blank")
                    }
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Scrolling Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Render multiple copies for infinite effect */}
          {[...projects, ...projects].map((project, index) => {
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
                        } border-transparent text-white scale-105 shadow-2xl`
                      : "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-white"
                  }
                  ${isSelected ? "ring-2 ring-white ring-opacity-50" : ""}
                `}
              >
                {shouldShowGradient && (
                  <div className="absolute inset-0 bg-black/10" />
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
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Project Icon/Image */}
                  {shouldShowGradient && (
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded opacity-80" />
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
                    className={`text-sm mb-4 line-clamp-3 ${
                      shouldShowGradient ? "text-white/90" : "text-gray-300"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tags - Show fewer when not selected */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags
                      ?.slice(0, isSelected ? project.tags.length : 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full ${
                            shouldShowGradient
                              ? "bg-white/20 text-white"
                              : "bg-gray-800 text-gray-300"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    {!isSelected && project.tags && project.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs ${
                        shouldShowGradient ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {project.type === "article"
                        ? "Read more"
                        : "View project"}
                    </span>
                    {isSelected && (
                      <ArrowRight className="h-4 w-4 text-white animate-pulse" />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedProject === project.id
                  ? "bg-white w-8"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
