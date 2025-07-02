import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// Custom SVG Icons
const Mail = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const Send = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

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
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("wxFnZQS9ZTfkhvL8j"); // Initialize with your public key
  }, []);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasonSelect = (reason: string) => {
    setFormData((prev) => ({ ...prev, reason }));
    setIsDropdownOpen(false);
  };

  // EmailJS integration
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.reason ||
      !formData.message
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // EmailJS configuration - Your actual keys
      const serviceID = "service_lcyf129"; // Your Service ID
      const templateID = "template_sx6xx82"; // Your Template ID
      const publicKey = "wxFnZQS9ZTfkhvL8j"; // Your Public Key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: "devxcant@gmail.com", // Your email
        reason:
          contactReasons.find((r) => r.value === formData.reason)?.label ||
          "Contact",
        message: formData.message,
      };

      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", reason: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedReason = contactReasons.find(
    (r) => r.value === formData.reason
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset status after 5 seconds
  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => setSubmitStatus("idle"), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const isFormValid =
    formData.name && formData.email && formData.reason && formData.message;

  return (
    <section
      id="contacts"
      className="relative z-10 py-16 sm:py-20 lg:py-24 bg-black min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gray-400 text-sm font-light tracking-widest uppercase font-mono mb-3">
            {subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can work
            together.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300 font-light">
              Message sent successfully! I'll get back to you within 24 hours.
            </span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300 font-light">
              Failed to send message. Please try again or email me directly at
              devxcant@gmail.com
            </span>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-3xl">
          <div className="p-6 sm:p-8 md:p-12">
            <div className="space-y-8">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-light tracking-wide">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      placeholder=""
                      className="w-full bg-black/20 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/30 outline-none transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-light tracking-wide">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full bg-black/20 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/30 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Reason Dropdown */}
              <div className="space-y-2" ref={dropdownRef}>
                <label className="text-sm text-gray-300 font-light tracking-wide">
                  What can I help you with?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-black/20 border border-gray-700/50 rounded-xl px-4 py-4 text-left text-white flex items-center justify-between transition focus:ring-2 focus:ring-white/20 focus:border-white/30 outline-none"
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
                    <div className="absolute z-20 mt-2 w-full bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl">
                      {contactReasons.map((reason) => (
                        <button
                          key={reason.value}
                          type="button"
                          onClick={() => handleReasonSelect(reason.value)}
                          className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          {reason.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-light tracking-wide">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share your idea, timeline, or any detail..."
                    className="w-full bg-black/20 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/30 outline-none transition resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid}
                  className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 px-8 py-3 rounded-xl font-light tracking-wide transition-all flex items-center gap-2 disabled:cursor-not-allowed"
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
