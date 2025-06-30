"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Send, User, MessageSquare, ChevronDown } from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  title = "Let's Work Together",
  subtitle = "... /Contact me ...",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const contactReasons = [
    { value: "hire", label: "Hire me for a project" },
    { value: "build", label: "Build something together" },
    { value: "collaborate", label: "Collaborate on a project" },
    { value: "consultation", label: "Technical consultation" },
    { value: "partnership", label: "Business partnership" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReasonSelect = (reason: string) => {
    setFormData((prev) => ({
      ...prev,
      reason,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = `${
        contactReasons.find((r) => r.value === formData.reason)?.label ||
        "Contact"
      } - ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nReason: ${
        contactReasons.find((r) => r.value === formData.reason)?.label
      }\n\nMessage:\n${formData.message}`;

      const mailtoLink = `mailto:devxcant@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.open(mailtoLink, "_blank");

      // Reset form
      setFormData({
        name: "",
        email: "",
        reason: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedReason = contactReasons.find(
    (r) => r.value === formData.reason
  );

  return (
    <section id="contact" className="relative z-10 py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm font-light tracking-widest uppercase font-mono mb-4">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-white tracking-tight">
            {title}
          </h2>
          <p className="text-gray-300 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss how we can work
            together.
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-light text-gray-300 tracking-wide">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/20 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-gray-300 tracking-wide">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/20 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-gray-300 tracking-wide">
                  What can I help you with?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-black/20 border border-gray-700/50 rounded-xl px-4 py-4 text-left text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedReason ? "text-white" : "text-gray-500"
                      }
                    >
                      {selectedReason?.label || "Select a reason"}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl">
                      {contactReasons.map((reason) => (
                        <button
                          key={reason.value}
                          type="button"
                          onClick={() => handleReasonSelect(reason.value)}
                          className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {reason.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-gray-300 tracking-wide">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-black/20 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.name ||
                    !formData.email ||
                    !formData.reason ||
                    !formData.message
                  }
                  className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 px-8 py-3 rounded-xl font-light tracking-wide transition-all duration-300 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-800/50">
              <p className="text-gray-400 text-sm font-light text-center">
                By sending this message, you agree to discuss your project
                requirements. I'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
