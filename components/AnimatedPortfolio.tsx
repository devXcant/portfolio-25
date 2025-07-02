"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Mail,
  Menu,
  Github,
  Linkedin,
} from "lucide-react";
import CustomCursor from "./CustomCursor";
import Socials from "./socials";
import CodeEditor from "./CodeEditor";
import ProjectsGrid from "./ProjectsGrid";
import AboutMe from "./AboutMe";
import Works from "./Works";
import ContactForm from "./ContactForm";
import { projectsData } from "@/lib/projects-data";
import Link from "next/link";

export default function AnimatedPortfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for animations
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLDivElement>(null);
  const leftAnnotationsRef = useRef<HTMLDivElement>(null);
  const rightAnnotationsRef = useRef<HTMLDivElement>(null);
  const headerNameRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log("Portfolio animations loaded");

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states - elements start with opacity 0
    gsap.set(
      [
        headerNameRef.current,
        heroTitleRef.current,
        heroDescRef.current,
        leftAnnotationsRef.current,
        rightAnnotationsRef.current,
      ],
      {
        opacity: 0,
        y: 20, // Add slight y movement for smoother effect
      }
    );

    // MUCH SMOOTHER opacity animations
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(headerNameRef.current, {
      opacity: 1,
      y: 0,
      duration: 2.5,
      ease: "power3.out",
    })
      .to(
        heroTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 2.8,
          ease: "power3.out",
        },
        "-=2.2"
      )
      .to(
        heroDescRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 2.5,
          ease: "power3.out",
        },
        "-=2.0"
      )
      .to(
        [leftAnnotationsRef.current, rightAnnotationsRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 2.2,
          ease: "power3.out",
        },
        "-=1.8"
      );

    // Code Editor scroll rotation animation - straightens before scrolling continues (SLOWER)
    if (codeEditorRef.current && heroSectionRef.current) {
      // Set initial rotation to 43 degrees (equivalent to rotate-12)
      gsap.set(codeEditorRef.current, { rotation: 43 });

      gsap.to(codeEditorRef.current, {
        rotation: 0, // Rotate from 43deg to 0deg (perfectly straight)
        ease: "power1.inOut", // Gentler easing
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "bottom bottom", // Start when hero section bottom hits viewport bottom
          end: "+=150vh", // Longer rotation duration - 150% viewport height
          scrub: 3, // Slower scrubbing (was 1.5, now 3)
          pin: true, // Pin section during rotation - page won't scroll until rotation completes
          anticipatePin: 1,
          pinSpacing: false, // Prevents extra spacing after pinning
        },
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Background decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-20 w-96 h-96 border border-gray-800 rounded-full opacity-10" />
          <div className="absolute bottom-20 left-20 w-80 h-80 border border-gray-800 rounded-full opacity-10" />
          <div className="absolute top-40 left-1/4 w-60 h-60 border border-gray-700 rounded-full opacity-5" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-gray-800 rounded-full opacity-20" />
        </div>

        {/* Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:py-8">
              <div
                ref={headerNameRef}
                className="text-lg font-medium text-white"
              >
                <span className="block text-2xl font-clash-display font-bold uppercase tracking-wider">
                  Ayo Bamidele
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-space-grotesk font-medium uppercase tracking-wide"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-space-grotesk font-medium uppercase tracking-wide"
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-space-grotesk font-medium uppercase tracking-wide"
                >
                  Experience
                </a>
                <a
                  href="#contacts"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-space-grotesk font-medium uppercase tracking-wide"
                >
                  Contacts
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-space-grotesk font-medium tracking-wide">
                    Available for work
                  </span>
                </div>
                <Link
                  href="#contacts"
                  className="hidden md:flex bg-white text-black hover:bg-gray-200 border-0 px-4 py-1.5 rounded-full font-space-grotesk font-medium transition-all duration-200 text-sm tracking-wide"
                >
                  Let's Talk
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800/50">
              <nav className="px-4 py-6 space-y-4">
                <a
                  href="#about"
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase py-2"
                  onClick={closeMobileMenu}
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase py-2"
                  onClick={closeMobileMenu}
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase py-2"
                  onClick={closeMobileMenu}
                >
                  Experience
                </a>
                <a
                  href="#contacts"
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase py-2"
                  onClick={closeMobileMenu}
                >
                  Contacts
                </a>
                <div className="pt-4 border-t border-gray-800">
                  <Link
                    href="#contacts"
                    className="block w-full bg-white text-black hover:bg-gray-200 border-0 px-4 py-2 rounded-full font-medium transition-all duration-200 text-center text-sm"
                    onClick={closeMobileMenu}
                  >
                    Let's Talk
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="hero-section relative z-10 min-h-screen pt-20"
        >
          {/* Corner annotations - positioned below fixed header */}
          <div
            ref={leftAnnotationsRef}
            className="absolute top-24 left-4 sm:left-8 text-gray-400 text-xs sm:text-sm mt-0 lg:mt-10 space-y-4 sm:space-y-6 font-space-grotesk font-medium tracking-wide"
          >
            <div>Frontend Developer</div>
            <div>Backend Developer</div>
          </div>

          <div
            ref={rightAnnotationsRef}
            className="absolute top-24 right-4 sm:right-8 text-gray-400 text-xs sm:text-sm text-right mt-0 lg:mt-10 space-y-4 sm:space-y-6 font-space-grotesk font-medium tracking-wide"
          >
            <div>Mobile App Developer</div>
            <div>Cloud</div>
          </div>

          {/* Main content container */}
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen px-8 lg:px-16">
            <div className="flex flex-col justify-center">
              <h1
                ref={heroTitleRef}
                className="font-clash-display text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[14rem] font-bold leading-[0.85] tracking-tight mb-8"
              >
                <span className="text-purple-400 lg:text-white">Soft</span>
                <span className="text-yellow-400 lg:text-white">-</span>
                <span className="text-blue-400 lg:text-white">Ware</span>
                <br />
                <span className="text-green-400 lg:text-white">Developer</span>
                <span className="text-orange-400 lg:text-white">.</span>
                {/* <span className="text-xs">er.</span> */}
              </h1>

              <div ref={heroDescRef} className="max-w-md mb-8">
                <p className="text-gray-300 leading-relaxed font-satoshi text-base sm:text-lg font-medium">
                  <span className="text-gray-200">
                    Building scalable, efficient interfaces{" "}
                  </span>
                  with{" "}
                  <span className="text-white">clean, maintainable code</span>{" "}
                  that runs reliably across browsers, devices, and teams.
                </p>
              </div>
            </div>

            {/* Code Editor */}
            <div ref={codeEditorRef} className="hidden lg:block">
              <CodeEditor />
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutMe />

        {/* Projects Section */}
        <ProjectsGrid
          projects={projectsData}
          title="Featured Projects"
          subtitle="... /Projects ..."
        />

        {/* Work Experience Section */}
        <Works />

        {/* Contact Section */}
        <ContactForm />

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-800">
          {/* Social Links */}

          <Socials />
        </footer>
      </div>
    </>
  );
}
