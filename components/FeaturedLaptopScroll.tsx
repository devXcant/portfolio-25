"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectData } from "@/components/ProjectsGrid";
import MacBookMockup from "./MacBookMockup";

function LaptopScreen({ project }: { project: ProjectData }) {
  const shot = `/sites/${project.id}.png`;
  const [mode, setMode] = useState<"shot" | "image" | "frame" | "card">("shot");

  useEffect(() => {
    setMode("shot");
  }, [project.id]);

  if (mode === "shot") {
    return (
      <img
        src={shot}
        alt={project.title}
        className="h-full w-full object-cover object-top"
        onError={() =>
          setMode(
            project.mockupImage && project.mockupImage !== shot
              ? "image"
              : "card"
          )
        }
      />
    );
  }

  if (mode === "image" && project.mockupImage) {
    return (
      <img
        src={project.mockupImage}
        alt={project.title}
        className="h-full w-full object-cover object-top"
        onError={() => setMode(project.links?.demo ? "frame" : "card")}
      />
    );
  }

  if (mode === "frame" && project.links?.demo) {
    return (
      <iframe
        src={project.links.demo}
        title={project.title}
        className="h-full w-full border-0 bg-black"
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0b0b0b] px-8 text-center">
      <p className="font-space-grotesk text-[10px] uppercase tracking-widest text-gray-500">
        {project.category}
      </p>
      <p className="mt-3 font-clash-display text-3xl font-bold text-white">{project.title}</p>
      <p className="mt-3 max-w-md font-satoshi text-sm text-gray-400">{project.description}</p>
    </div>
  );
}

export default function FeaturedLaptopScroll({ projects }: { projects: ProjectData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      projects.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `.laptop-beat-${index}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} id="featured" className="relative z-10 bg-black scroll-mt-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute right-1/4 top-32 h-80 w-80 rounded-full border border-gray-800" />
        <div className="absolute bottom-32 left-1/4 h-60 w-60 rounded-full border border-gray-800" />
      </div>

      <div
        ref={pinRef}
        className="pointer-events-none absolute left-0 top-0 hidden h-screen w-1/2 items-center justify-center px-6 lg:flex"
      >
        <div className="w-full pt-8">
          <p className="mb-8 text-center font-space-grotesk text-xs uppercase tracking-widest text-gray-500">
            ... /Projects ...
          </p>
          <MacBookMockup>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute inset-0 h-full w-full transition-all duration-700 ease-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : "pointer-events-none opacity-0 translate-x-8"
                }`}
              >
                <LaptopScreen project={project} />
              </div>
            ))}
          </MacBookMockup>
        </div>
      </div>

      <div className="relative lg:ml-[50%] lg:w-1/2">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`laptop-beat-${index} flex flex-col px-4 py-10 sm:px-8 lg:min-h-[100vh] lg:justify-center lg:px-12 lg:py-0`}
          >
            <div className="mb-5 flex justify-center lg:mb-10 lg:hidden">
              <MacBookMockup>
                <LaptopScreen project={project} />
              </MacBookMockup>
            </div>

            <div
              className={`mx-auto max-w-xl transition-all duration-700 ${
                index === activeIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-100 translate-y-0 lg:opacity-25 lg:translate-y-3"
              }`}
            >
              <p className="mb-3 font-space-grotesk text-xs uppercase tracking-widest text-gray-500">
                {project.category} · {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
              <h2 className="mb-6 font-clash-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {project.title}
              </h2>
              <p className="mb-8 font-satoshi text-base font-medium leading-relaxed text-gray-300 sm:text-lg">
                {project.description}
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-700/50 bg-white/5 px-3 py-1.5 font-space-grotesk text-xs font-medium tracking-wide text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-5 py-2 font-space-grotesk text-sm font-medium text-black transition-colors hover:bg-gray-200"
                  >
                    Live site
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-gray-700 px-5 py-2 font-space-grotesk text-sm font-medium text-white transition-colors hover:border-white"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
