"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mobileApps, type MobileApp } from "@/lib/mobile-apps-data";
import PhoneMockup from "./PhoneMockup";

function ScreenShot({ src, active }: { src: string; active: boolean }) {
  return (
    <img
      src={src}
      alt=""
      className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

function AppCopy({ item, index }: { item: MobileApp; index: number }) {
  return (
    <>
      <p className="mb-3 font-space-grotesk text-xs uppercase tracking-widest text-gray-500">
        {item.kicker} · {String(index + 1).padStart(2, "0")} /{" "}
        {String(mobileApps.length).padStart(2, "0")}
      </p>
      <h2 className="mb-6 font-clash-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        {item.title}
      </h2>
      <p className="mb-8 font-satoshi text-base font-medium leading-relaxed text-gray-300 sm:text-lg">
        {item.description}
      </p>
      <ul className="mb-8 space-y-3">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-gray-400">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mb-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-700/50 bg-white/5 px-3 py-1.5 font-space-grotesk text-xs font-medium tracking-wide text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={item.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-full border border-gray-700 px-5 py-2 font-space-grotesk text-sm font-medium text-white transition-colors hover:border-white"
      >
        GitHub
      </a>
    </>
  );
}

export default function MobileAppsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyPinRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeApp, setActiveApp] = useState(0);
  const [activeShot, setActiveShot] = useState(0);
  const app = mobileApps[activeApp];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pinPhone = phoneRef.current;
      if (pinPhone) {
        gsap.set(pinPhone, { scale: 0.72, transformOrigin: "50% 50%" });
      }

      const scaleFromProgress = (progress: number) => {
        const edge = 0.2;
        const t =
          progress < edge
            ? progress / edge
            : progress > 1 - edge
              ? (1 - progress) / edge
              : 1;
        return 0.72 + t * 0.36;
      };

      mobileApps.forEach((_, appIndex) => {
        const beatEl = sectionRef.current?.querySelector(
          `.mobile-app-${appIndex}`
        );
        if (!(beatEl instanceof HTMLElement)) return;

        ScrollTrigger.create({
          trigger: beatEl,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            setActiveApp(appIndex);
            setActiveShot(Math.min(2, Math.floor(self.progress * 3 + 0.001)));
            if (pinPhone) {
              gsap.to(pinPhone, {
                scale: scaleFromProgress(self.progress),
                duration: 1.25,
                ease: "power3.out",
                overwrite: "auto",
              });
            }
          },
          onEnter: () => setActiveApp(appIndex),
          onEnterBack: () => setActiveApp(appIndex),
        });

        const inline = beatEl.querySelector(".phone-scale-inline");
        if (inline) {
          gsap.set(inline, { scale: 0.72, transformOrigin: "50% 50%" });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: beatEl,
                start: "top top",
                end: "bottom top",
                scrub: 2,
              },
            })
            .to(inline, { scale: 1.08, ease: "none", duration: 0.2 })
            .to(inline, { scale: 1.08, ease: "none", duration: 0.6 })
            .to(inline, { scale: 0.72, ease: "none", duration: 0.2 });
        }
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
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: copyPinRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 bg-black scroll-mt-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-40 h-80 w-80 rounded-full border border-gray-800" />
        <div className="absolute bottom-40 right-1/4 h-60 w-60 rounded-full border border-gray-800" />
      </div>

      <div
        ref={pinRef}
        className="pointer-events-none absolute left-0 top-0 hidden h-screen w-1/2 items-center justify-center lg:flex"
      >
        <div className="flex flex-col items-center pt-4">
          <p className="mb-6 font-space-grotesk text-xs uppercase tracking-widest text-gray-500">
            ... /Mobile ...
          </p>
          <div ref={phoneRef} className="will-change-transform">
            <PhoneMockup>
              {mobileApps.flatMap((item, appIndex) =>
                item.images.map((src, shotIndex) => (
                  <ScreenShot
                    key={`${item.id}-${shotIndex}`}
                    src={src}
                    active={appIndex === activeApp && shotIndex === activeShot}
                  />
                ))
              )}
            </PhoneMockup>
          </div>
          <div className="mt-6 flex items-center gap-6">
            {mobileApps.map((item, index) => (
              <span
                key={item.id}
                className={`font-space-grotesk text-xs uppercase tracking-widest transition-colors duration-500 ${
                  index === activeApp ? "text-white" : "text-gray-600"
                }`}
              >
                {item.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-1.5">
            {app.images.map((_, index) => (
              <span
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === activeShot ? "w-6 bg-white" : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={copyPinRef}
        className="absolute right-0 top-0 z-10 hidden h-screen w-1/2 items-center px-12 lg:flex"
      >
        <div className="relative mx-auto w-full max-w-xl">
          {mobileApps.map((item, appIndex) => (
            <div
              key={item.id}
              className={`transition-all duration-700 ease-out ${
                appIndex === activeApp
                  ? "relative opacity-100 translate-y-0"
                  : "pointer-events-none absolute inset-x-0 top-0 opacity-0 translate-y-8"
              }`}
            >
              <AppCopy item={item} index={appIndex} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative lg:ml-[50%] lg:w-1/2">
        {mobileApps.map((item, appIndex) => (
          <div
            key={item.id}
            className={`mobile-app-${appIndex} relative min-h-[400vh]`}
          >
            <div className="sticky top-0 flex min-h-screen flex-col justify-center px-4 py-16 sm:px-8 lg:hidden">
              <div className="mb-10 flex justify-center">
                <div className="phone-scale-inline will-change-transform">
                  <PhoneMockup>
                    {item.images.map((src, shotIndex) => (
                      <ScreenShot
                        key={src}
                        src={src}
                        active={
                          appIndex === activeApp && shotIndex === activeShot
                        }
                      />
                    ))}
                  </PhoneMockup>
                </div>
              </div>
              <div className="mx-auto max-w-xl">
                <AppCopy item={item} index={appIndex} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
