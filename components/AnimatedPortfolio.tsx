"use client";

import { useEffect } from "react";
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

export default function AnimatedPortfolio() {
  useEffect(() => {
    console.log("Portfolio loaded successfully");
  }, []);

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
        <header className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:py-8">
              <div className="text-lg font-medium text-white">
                <span className="block text-2xl uppercase">Ayo Bamidele</span>
                {/* <span className="block text-2xl uppercase">Bamidele</span> */}
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase"
                >
                  Projects
                </a>
                <a
                  href="#articles"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase"
                >
                  Articles
                </a>
                <a
                  href="#contacts"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium uppercase"
                >
                  Contacts
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">
                    Available for work
                  </span>
                </div>
                <Button
                  size="sm"
                  className="hidden md:flex bg-white text-black hover:bg-gray-200 border-0 px-6 py-2 rounded-full font-medium transition-all duration-200"
                >
                  Let's Talk
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-gray-300"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section relative z-10 min-h-screen">
          {/* Corner annotations */}
          <div className="absolute top-8 left-8 text-gray-400 text-sm">
            <div>Fullstack Developer</div>
          </div>

          <div className="absolute top-8 right-8 text-gray-400 text-sm text-right">
            <div>Mobile App Developer</div>
            <div className="mt-4">Testing</div>
          </div>

          {/* Main content container */}
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen px-8 lg:px-16">
            <div className="flex flex-col justify-center">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-[0.9] tracking-tight text-white mb-8">
                Soft-Ware
                <br />
                Developer
                {/* <span className="text-xs">er.</span> */}
              </h1>

              <div className="max-w-sm mb-8">
                <p className="text-gray-300 leading-relaxed font-semibold">
                  <span className=" ">
                    Building scalable, efficient interfaces{" "}
                  </span>
                  with <span className="">clean, maintainable code</span> that
                  runs reliably across browsers, devices, and teams.
                </p>
              </div>
            </div>

            {/* Code Editor */}
            <CodeEditor />
          </div>
        </section>

        {/* Social Links */}
        <Socials />

        {/* Projects Section */}
        <ProjectsGrid
          projects={projectsData}
          title="Featured Projects"
          subtitle="... /Projects ..."
        />

        {/* About Section */}
        <AboutMe />

        {/* Work Experience Section */}
        <Works />

        {/* Contact Section */}
        <ContactForm />

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-center md:text-left">
                <p className="text-sm">
                  © 2025 Ayobamidele Ogunkuade. All rights reserved.
                </p>
                <p className="text-xs mt-1">
                  Built with Next.js & Tailwind CSS
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 text-sm mr-2">
                  Let's connect:
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
