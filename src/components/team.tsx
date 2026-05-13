"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string | null;
  initials: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const members: TeamMember[] = [
  {
    name: "Mateo Pérez",
    role: "Lead Fullstack Engineer",
    description:
      "Built the entire platform end-to-end — from the computer vision pipeline to the clinical dashboard and the game frontend. Owns the architecture and ships fast.",
    imageUrl: "/team/mateo.jpg",
    initials: "M",
    linkedinUrl: "https://www.linkedin.com/in/mateoperezguzman/",
    githubUrl: "https://github.com/mpchachi",
  },
  {
    name: "Álvaro Gil-Arjona",
    role: "Lead ML & Computer Vision",
    description:
      "Designs and trains the models that extract clinical metrics from camera feeds — hand landmarks, gaze tracking, and facial symmetry scoring.",
    imageUrl: "/team/alvaro.jpg",
    initials: "A",
    linkedinUrl: "https://www.linkedin.com/in/alvarogilarjona",
    githubUrl: "https://github.com/alvarog-prog",
  },
  {
    name: "Luis Molina",
    role: "Product Strategy & UX",
    description:
      "Bridges the gap between what clinicians need and what we build. Defines product direction, runs user research, and shapes the experience patients interact with.",
    imageUrl: null,
    initials: "L",
    linkedinUrl: "https://www.linkedin.com/in/luis-molina-salvador/",
    githubUrl: "https://github.com/34lumo",
  },
  {
    name: "Marco García",
    role: "Data Science & Business Strategy",
    description:
      "Translates clinical data into actionable insights and drives the business model. Handles market analysis, partnerships, and growth strategy.",
    imageUrl: "/team/marco.jpg",
    initials: "MC",
    linkedinUrl: "https://www.linkedin.com/in/marco-garcia-lopez-4b0037308/",
    githubUrl: "https://github.com/marcusen78-sketch",
  },
  {
    name: "Helene Weinberg",
    role: "Biomedical Engineer, Clinical Translation",
    description:
      "Ensures our metrics are clinically meaningful. Translates rehabilitation science into measurable digital biomarkers and validates accuracy against clinical standards.",
    imageUrl: null,
    initials: "H",
    linkedinUrl: "https://www.linkedin.com/in/helene-weinberg/",
  },
  {
    name: "José Antonio López",
    role: "Physician & Clinical Advisor",
    description:
      "Practicing physician who guides clinical relevance. Validates that what we capture maps to real diagnostic and treatment decisions in stroke rehabilitation.",
    imageUrl: "/team/jal.jpg",
    initials: "JA",
  },
];

export function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((i) => (i + 1) % members.length);
  const handlePrevious = () =>
    setCurrentIndex((i) => (i - 1 + members.length) % members.length);

  const current = members[currentIndex];

  const socials = [
    { icon: LinkedinIcon, url: current.linkedinUrl, label: "LinkedIn" },
    { icon: GithubIcon, url: current.githubUrl, label: "GitHub" },
  ].filter((s) => s.url);

  return (
    <section id="team" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Harvard HSIL 2026 Winners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            The team
          </h2>
          <p className="text-slate-500 max-w-[55ch] leading-relaxed">
            Engineers, clinicians, and researchers building rehabilitation tools
            that work without expensive equipment.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {/* Desktop */}
          <div className="hidden md:flex relative items-center">
            <div className="w-[360px] h-[360px] rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  {current.imageUrl ? (
                    <Image
                      src={current.imageUrl}
                      alt={current.name}
                      width={360}
                      height={360}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <span className="text-6xl font-bold text-slate-300">
                        {current.initials}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 p-8 ml-[-60px] z-10 max-w-md flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {current.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      {current.role}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {current.description}
                  </p>

                  {socials.length > 0 && (
                    <div className="flex gap-3">
                      {socials.map(({ icon: Icon, url, label }) => (
                        <Link
                          key={label}
                          href={url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center transition-all hover:bg-slate-700 hover:scale-105"
                          aria-label={label}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden max-w-sm mx-auto text-center">
            <div className="w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  {current.imageUrl ? (
                    <Image
                      src={current.imageUrl}
                      alt={current.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-slate-300">
                        {current.initials}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {current.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mb-4">
                    {current.role}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {current.description}
                  </p>
                  {socials.length > 0 && (
                    <div className="flex justify-center gap-3">
                      {socials.map(({ icon: Icon, url, label }) => (
                        <Link
                          key={label}
                          href={url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center transition-all hover:bg-slate-700"
                          aria-label={label}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-5 mt-10">
            <button
              onClick={handlePrevious}
              aria-label="Previous member"
              className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex gap-2">
              {members.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors cursor-pointer",
                    i === currentIndex ? "bg-slate-900" : "bg-slate-300"
                  )}
                  aria-label={`Go to member ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next member"
              className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
