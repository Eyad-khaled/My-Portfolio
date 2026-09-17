"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SkillGroup {
  label: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Redux/Toolkit", "Tailwind CSS", "bootstrap" , "Material UI", "PrimeReact" , "React Bits"],
  },
  {
    label: "Animation",
    skills: ["GSAP"],
  },
  {
    label: "Web Tools & Platforms",
    skills: ["HTML", "CSS","Git", "GitHub", "Vercel", "Supabase" , "vite"],
  },
];

const Skills = () => {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const titleEl = container.current?.querySelector("#skills-title");
      const labelEl = container.current?.querySelector<HTMLElement>("#skills-label");

      if (titleEl) {
        const titleSplit = SplitText.create(titleEl, {
          type: "chars, words",
          mask: "chars",
        });

        gsap.from(titleSplit.chars, {
          scrollTrigger: { trigger: "#skills", start: "top 75%" },
          yPercent: 120,
          stagger: 0.025,
          duration: 0.8,
          ease: "power4.out",
        });
      }
      if (labelEl) {

        gsap.from(labelEl, {
          scrollTrigger: { trigger: "#skills", start: "top 75%" },
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      const groups = gsap.utils.toArray<HTMLElement>(".skill-group");

      groups.forEach((group) => {
  const heading = group.querySelector<HTMLElement>(".skill-group-label");
  const pills = group.querySelectorAll<HTMLElement>(".skill-pill");
  const line = group.querySelector<HTMLElement>(".skill-group-line");

  if (!heading || !line) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: group,
      start: "top 85%",
    },
  });

  tl.fromTo(
    heading,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
  )
    .fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power2.out" },
      "<"
    )
    .fromTo(
      pills,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      },
      "<+=0.1"
    );
});

      ScrollTrigger.refresh();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="skills"
      className="relative w-full overflow-hidden bg-[#d5cfbe] px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mb-20 md:mb-28">
        <p
          id="skills-label"
          className="mb-5 font-hand text-sm uppercase tracking-[0.25em] text-[#2e78ff]"
        >
          03 / What I work with
        </p>
        <h2
          id="skills-title"
          className="font-archivo-black text-6xl uppercase leading-[0.85] text-black md:text-[clamp(6rem,13vw,14rem)]"
        >
          Skills
        </h2>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 md:gap-20">
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group">
            <div className="mb-6 flex items-center gap-6">
              <h3 className="skill-group-label whitespace-nowrap font-archivo-black text-xl uppercase text-black md:text-3xl">
                {group.label}
              </h3>
              <div className="skill-group-line h-[1px] w-full origin-left bg-black/40" />
            </div>

            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill rounded-full border border-black/30 bg-[#dfdececc] px-5 py-2 font-hand text-sm uppercase tracking-wide text-black transition-colors duration-300 hover:border-[#2e78ff] hover:text-[#2e78ff]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-24 max-w-[1200px] font-cursive text-base text-black/60 md:mt-32 md:text-lg">
        Software engineering student at ECU (2026–2030), self-taught in
        everything above along the way.
      </p>
    </section>
  );
};

export default Skills;