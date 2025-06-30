import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SkillData } from "@/lib/skills-data";

interface SkillCardProps {
  skill: SkillData;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const handleCardClick = () => {
    if (skill.link) {
      window.open(skill.link, "_blank");
    }
  };

  return (
    <Card
      className="bg-black/40 backdrop-blur-xl border border-gray-800/50 text-white p-6 rounded-3xl transition-all duration-500 cursor-pointer group hover:bg-black/60 hover:border-gray-700/50 hover:scale-105 shadow-2xl"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-light text-lg text-white tracking-wide">
          {skill.title}
        </h3>
        {skill.link && (
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              window.open(skill.link!, "_blank");
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="text-sm space-y-1 text-gray-300 font-light leading-relaxed">
        {skill.skills.map((skillLine, index) => (
          <div key={index}>{skillLine}</div>
        ))}
      </div>
    </Card>
  );
}
