"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import CustomCursor from "./CustomCursor";
import TimeBar from "./TimeBar";
import Socials from "./socials";
import CodeEditor from "./CodeEditor";
import AboutMe from "./AboutMe";
import Works from "./Works";
import ContactForm from "./ContactForm";
import MobileAppsScroll from "./MobileAppsScroll";
import FeaturedLaptopScroll from "./FeaturedLaptopScroll";
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
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
          y: 20,
        }
      );

      const labels = [leftAnnotationsRef.current, rightAnnotationsRef.current];
      const mmHero = gsap.matchMedia();
      mmHero.add("(max-width: 1023px)", () => {
        gsap.set(labels, { opacity: 1, y: 0 });
      });

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

      if (codeEditorRef.current && heroSectionRef.current) {
        gsap.set(codeEditorRef.current, { rotation: 43 });

        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.to(codeEditorRef.current, {
            rotation: 0,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "bottom bottom",
              end: "+=150vh",
              scrub: 3,
              pin: true,
              anticipatePin: 1,
              pinSpacing: false,
            },
          });
        });
        mm.add("(max-width: 1023px)", () => {
          gsap.set(codeEditorRef.current, { rotation: 0 });
        });
      }
    });

    return () => ctx.revert();
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
      <TimeBar
        menu={
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        }
      />
      {isMobileMenuOpen && (
        <div className="fixed top-10 left-0 right-0 z-[55] lg:hidden">
          <nav className="menu-from-center w-full border-b border-gray-800/50 bg-black/95 px-6 py-6 backdrop-blur-md">
            <a
              href="#about"
              className="block py-2 text-sm font-medium uppercase text-gray-300 hover:text-white"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a
              href="#projects"
              className="block py-2 text-sm font-medium uppercase text-gray-300 hover:text-white"
              onClick={closeMobileMenu}
            >
              Projects
            </a>
            <a
              href="#experience"
              className="block py-2 text-sm font-medium uppercase text-gray-300 hover:text-white"
              onClick={closeMobileMenu}
            >
              Experience
            </a>
            <div className="mt-4 border-t border-gray-800 pt-4">
              <Link
                href="#contacts"
                className="block w-full rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-black hover:bg-gray-200"
                onClick={closeMobileMenu}
              >
                Let's Talk
              </Link>
            </div>
          </nav>
        </div>
      )}
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-20 w-96 h-96 border border-gray-800 rounded-full opacity-10" />
          <div className="absolute bottom-20 left-20 w-80 h-80 border border-gray-800 rounded-full opacity-10" />
          <div className="absolute top-40 left-1/4 w-60 h-60 border border-gray-700 rounded-full opacity-5" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-gray-800 rounded-full opacity-20" />
        </div>

        <header className="fixed top-10 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <div
                ref={headerNameRef}
                className="text-lg font-medium text-white"
              >
                <span className="block text-2xl font-clash-display font-bold uppercase tracking-wider whitespace-nowrap">
                  Ayo Bami
                </span>
              </div>

              <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8">
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
              </nav>

              <div className="hidden md:flex items-center space-x-4">
                <div className="hidden xl:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-space-grotesk font-medium tracking-wide whitespace-nowrap">
                    Available for work
                  </span>
                </div>
                <Link
                  href="#contacts"
                  className="bg-white text-black hover:bg-gray-200 border-0 px-4 py-1.5 rounded-full font-space-grotesk font-medium transition-all duration-200 text-sm tracking-wide whitespace-nowrap shrink-0"
                >
                  Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="hero-section relative z-10 pt-32 lg:min-h-screen lg:pt-28"
        >
          <div className="mb-6 flex justify-between gap-4 px-4 sm:px-8 lg:mb-0 lg:contents lg:px-0">
            <div
              ref={leftAnnotationsRef}
              className="text-gray-400 text-[11px] sm:text-sm space-y-2 sm:space-y-3 lg:absolute lg:top-24 lg:left-4 lg:mt-10 lg:space-y-6 font-space-grotesk font-medium tracking-wide sm:left-8"
            >
              <div>Frontend Developer</div>
              <div>Backend Developer</div>
            </div>

            <div
              ref={rightAnnotationsRef}
              className="text-gray-400 text-[11px] sm:text-sm text-right space-y-2 sm:space-y-3 lg:absolute lg:top-24 lg:right-4 lg:mt-10 lg:space-y-6 font-space-grotesk font-medium tracking-wide sm:right-8"
            >
              <div>Mobile App Developer</div>
              <div>Cloud</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center px-4 sm:px-8 lg:px-16 pt-2 pb-10 lg:min-h-screen lg:pt-0 lg:pb-0">
            <div className="flex flex-col justify-center order-1 text-center lg:text-left">
              <h1
                ref={heroTitleRef}
                className="font-clash-display text-4xl sm:text-5xl md:text-6xl lg:text-9xl xl:text-[14rem] font-bold leading-[0.9] sm:leading-[0.85] tracking-tight mb-6 lg:mb-8"
              >
                <span className="text-white">Soft</span>
                <span className="text-white">-</span>
                <span className="text-white">Ware</span>
                <br />
                <span className="text-white">Developer</span>
                <span className="text-white">.</span>
                {/* <span className="text-xs">er.</span> */}
              </h1>

              <div ref={heroDescRef} className="max-w-md mb-8 mx-auto lg:mx-0">
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
            <div ref={codeEditorRef} className="order-2 flex justify-center lg:justify-end w-full">
              <CodeEditor />
            </div>
          </div>
        </section>

        <AboutMe />

        <MobileAppsScroll />

        <FeaturedLaptopScroll projects={projectsData} />

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
