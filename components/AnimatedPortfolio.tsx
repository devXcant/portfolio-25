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
        <section id="about" className="relative z-10 py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm font-medium">
                ... /About me ...
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Hello! I'm Nikita, I'm a{" "}
                  <span className="italic text-blue-400">
                    full-stack developer
                  </span>
                  .<br />
                  More than{" "}
                  <span className="italic text-blue-400">5 years</span>{" "}
                  experience.
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-white text-black p-6 rounded-3xl hover:bg-gray-100 hover:scale-105 transition-all duration-500 cursor-pointer">
                    <h3 className="font-bold mb-4">Front-end</h3>
                    <div className="text-sm space-y-1">
                      <div>
                        TypeScript / React / Vue / Vuex / Redux Toolkit / NextJs
                        /
                      </div>
                      <div>
                        Nuxt / Jest / GraphQL / React Native / Puppeteer /
                        Enzyme
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800 p-6 rounded-3xl hover:bg-gray-800 hover:border-gray-700 transition-all duration-500 cursor-pointer">
                    <h3 className="font-bold mb-4 text-white">Styles</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>SCSS / SASS / PostCSS /</div>
                      <div>Ant.d / MUI / Material UI</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 text-gray-400 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-gray-900 border-gray-800 p-6 rounded-3xl hover:bg-gray-800 hover:border-gray-700 transition-all duration-500 cursor-pointer">
                    <h3 className="font-bold mb-4 text-white">Back-end</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>
                        Golang / Gin / GORM / PostgreSQL / MySQL / MongoDB /
                        gRPC /
                      </div>
                      <div>
                        Redis / Kafka / Node / Nest / TypeORM / Microservices
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800 p-6 rounded-3xl hover:bg-gray-800 hover:border-gray-700 transition-all duration-500 cursor-pointer">
                    <h3 className="font-bold mb-4 text-white">DevOps</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>Nginx / Brotli / Docker /</div>
                      <div>(CI/CD) / k8s / Bash</div>
                    </div>
                  </Card>
                </div>

                <p className="text-gray-400 italic">
                  Some of my{" "}
                  <span className="text-white">favorite technologies</span>,
                  <br />
                  <span className="text-white">topics</span>, or{" "}
                  <span className="text-white">tools</span> that I worked with
                </p>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="w-80 h-96 bg-gray-200 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="relative z-10 py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-right mb-16">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-white">
                Work
              </h2>
            </div>

            <div className="space-y-0">
              {/* ITHUB */}
              <div className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-800 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group">
                <div className="col-span-2 text-gray-400 group-hover:text-gray-600">
                  <div className="font-medium">2022 -</div>
                  <div className="text-sm">1 year 5 months</div>
                </div>
                <div className="col-span-3 font-bold text-xl text-white group-hover:text-black">
                  ITHUB
                </div>
                <div className="col-span-6 text-gray-300 group-hover:text-gray-700">
                  Frontend developer | React & Vue
                </div>
                <div className="col-span-1"></div>
              </div>

              {/* VK Development Lab - Featured/Active */}
              <div className="grid grid-cols-12 gap-4 items-center py-6 bg-white text-black cursor-pointer relative">
                <div className="col-span-2 text-gray-600">
                  <div className="font-medium">2021 - 2022</div>
                  <div className="text-sm">8 months</div>
                </div>
                <div className="col-span-3 font-bold text-xl text-black">
                  VK Development Lab
                </div>
                <div className="col-span-6 text-gray-700">
                  Frontend developer | React
                </div>
                <div className="col-span-1 flex justify-end">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-gray-800" />
                </div>
              </div>

              {/* SN Inc. */}
              <div className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-800 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group">
                <div className="col-span-2 text-gray-400 group-hover:text-gray-600">
                  <div className="font-medium">2020 - 2021</div>
                  <div className="text-sm">9 months</div>
                </div>
                <div className="col-span-3 font-bold text-xl text-white group-hover:text-black">
                  SN Inc.
                </div>
                <div className="col-span-6 text-gray-300 group-hover:text-gray-700">
                  Fullstack developer | JavaScript & Python
                </div>
                <div className="col-span-1"></div>
              </div>

              {/* Business Up */}
              <div className="grid grid-cols-12 gap-4 items-center py-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group">
                <div className="col-span-2 text-gray-400 group-hover:text-gray-600">
                  <div className="font-medium">2018 - 2020</div>
                  <div className="text-sm">1 year 11 months</div>
                </div>
                <div className="col-span-3 font-bold text-xl text-white group-hover:text-black">
                  Business Up
                </div>
                <div className="col-span-6 text-gray-300 group-hover:text-gray-700">
                  Fullstack developer | JavaScript & Python
                </div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {/* Work Experience Summary */}
            <div className="text-right mt-16">
              <div className="text-gray-400">
                <div className="text-lg">Work experience</div>
                <div className="text-2xl font-bold italic">
                  4 years 9 months
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-center md:text-left">
                <p className="text-sm">
                  © 2024 Nikita Khvatov. All rights reserved.
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
