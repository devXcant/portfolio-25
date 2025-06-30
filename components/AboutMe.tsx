import SkillCard from "./SkillCard";
import { skillsData } from "@/lib/skills-data";

interface AboutMeProps {
  name?: string;
  title?: string;
  experience?: string;
  profileImage?: string;
  subtitle?: string;
}

export default function AboutMe({
  name = "Ayo Bamidele",
  title = "Soft-Ware Developer",
  experience = "5 years",
  profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
  subtitle = "... /About me ...",
}: AboutMeProps) {
  return (
    <section id="about" className="relative z-10 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm font-light tracking-widest uppercase font-mono">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-12 leading-tight tracking-tight">
              Hello! I'm {name}, I'm a{" "}
              <span className="italic text-white font-normal">{title}</span>
              .<br />
              More than{" "}
              <span className="italic text-white font-normal">
                {experience}
              </span>{" "}
              experience.
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {skillsData.slice(0, 2).map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {skillsData.slice(2, 4).map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            <p className="text-gray-400 font-light leading-relaxed tracking-wide">
              Some of my{" "}
              <span className="text-white font-normal">
                favorite technologies
              </span>
              ,
              <br />
              <span className="text-white font-normal">topics</span>, or{" "}
              <span className="text-white font-normal">tools</span> that I
              worked with
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-80 h-96 bg-black/20 backdrop-blur-sm border border-gray-800/50 rounded-3xl overflow-hidden hover:scale-105 hover:border-gray-700/50 transition-all duration-500 cursor-pointer shadow-2xl">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
