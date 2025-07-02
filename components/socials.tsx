import { Button } from "@/components/ui/button";
import { Github, Linkedin, MessageCircle, Mail } from "lucide-react";

export default function Socials() {
  const socialLinks = [
    {
      name: "Github",
      href: "https://github.com/devxcant",
      icon: Github,
      hoverColor: "hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ayobamidele-ogunkuade-775904246/",
      icon: Linkedin,
      hoverColor: "hover:bg-blue-600",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/2348161797075",
      icon: MessageCircle,
      hoverColor: "hover:bg-green-600",
    },
    {
      name: "Gmail",
      href: "mailto:devxcant@gmail.com",
      icon: Mail,
      hoverColor: "hover:bg-red-600",
    },
  ];

  return (
    <section className="relative z-10 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Button
                key={social.name}
                variant="outline"
                size="sm"
                className={`border-gray-600 text-gray-300 hover:text-white transition-colors duration-300 ${social.hoverColor}`}
                asChild
              >
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {social.name}
                </a>
              </Button>
            );
          })}
        </div>
        <div className="text-center text-xs mt-4 text-gray-300">
          @2025 Ayo Bamidele...
        </div>

      </div>
    </section>
  );
}
