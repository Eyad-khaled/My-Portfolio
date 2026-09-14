"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    number: "01",
    name: "Shop.Co",
    type: "E-commerce Platform",
    year: "2026",
    description:
      "A full-featured modern e-commerce experience built around smooth interactions, powerful filtering, authentication, and a polished shopping flow.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Redux", "Supabase" , "Gsap"],
    image:
      "/ShopCo.png",
    direction: "left",
    link: "https://shop-co-ten-sigma.vercel.app/"
  },
  {
    number: "02",
    name: "Tourvisto",
    type: "Travel Discovery Platform",
    year: "2025",
    description:
      "A travel platform designed to turn exploration into an experience, combining intelligent recommendations with an immersive and visually-driven interface.",
    stack: ["React", "TypeScript", "Appwrite", "Gemini"],
    image:
      "/tourvisto.png",
    direction: "right",
    link: "https://tourvisto-two.vercel.app"
  },
];

const Products = () => {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const sectionTitle = document.querySelector("#work-title");
      const sectionLabel = document.querySelector("#work-label");

      const titleSplit = SplitText.create(sectionTitle, {
        type: "chars, words",
        mask: "chars",
      });

      gsap.from(titleSplit.chars, {
        scrollTrigger: {
          trigger: "#work",
          start: "top 75%",
        },
        yPercent: 120,
        stagger: 0.025,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.from(sectionLabel, {
        scrollTrigger: {
          trigger: "#work",
          start: "top 75%",
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      });

      const projectItems =
        gsap.utils.toArray<HTMLElement>(".project-item");

      projectItems.forEach((project) => {
        const imageWrap = project.querySelector(".project-image-wrap");
        const image = project.querySelector(".project-image");
        const number = project.querySelector(".project-number");
        const info = project.querySelector(".project-info");
        const line = project.querySelector(".project-line");
        const meta = project.querySelectorAll(".project-meta");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 75%",
            end: "top 20%",
            scrub: 1,
          },
        });

        tl.fromTo(
          imageWrap,
          {
            clipPath: "inset(12% 12% 12% 12%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
          },
        )
          .fromTo(
            image,
            {
              scale: 1.25,
            },
            {
              scale: 1,
              ease: "none",
            },
            "<",
          )
          .fromTo(
            number,
            {
              opacity: 0,
              x: -60,
            },
            {
              opacity: 0.08,
              x: 0,
              ease: "none",
            },
            "<",
          )
          .fromTo(
            info,
            {
              opacity: 0,
              y: 60,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
            },
            "<+=0.15",
          )
          .fromTo(
            line,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: "power2.out",
            },
            "<",
          )
          .fromTo(
            meta,
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: "power2.out",
            },
            "<+=0.1",
          );

        // Parallax while scrolling
        gsap.to(image, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Cursor-like view button
      const projectLinks =
        gsap.utils.toArray<HTMLElement>(".project-link");

      projectLinks.forEach((projectLink) => {
        const cursor = projectLink.querySelector(
          ".project-cursor",
        ) as HTMLElement;

        const moveCursor = (e: MouseEvent) => {
          const rect = projectLink.getBoundingClientRect();

          gsap.to(cursor, {
            x: e.clientX - rect.left - cursor.offsetWidth / 2,
            y: e.clientY - rect.top - cursor.offsetHeight / 2,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        projectLink.addEventListener("mousemove", moveCursor);

        projectLink.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
          });

          gsap.to(projectLink.querySelector(".project-image"), {
            scale: 1.06,
            duration: 0.7,
            ease: "power3.out",
          });
        });

        projectLink.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          });

          gsap.to(projectLink.querySelector(".project-image"), {
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="work"
      className="relative w-full overflow-hidden bg-[#d5cfbe] px-5 py-24 md:px-10 md:py-36"
    >
      {/* Section header */}
      <div className="mb-24 flex flex-col justify-between gap-8 md:mb-36 md:flex-row md:items-end">
        <div>
          <p
            id="work-label"
            className="mb-5 font-hand text-sm uppercase tracking-[0.25em] text-[#2e78ff]"
          >
            02 / Selected work
          </p>

          <h2
            id="work-title"
            className="font-archivo-black text-4xl uppercase leading-[0.85] text-black md:text-[clamp(6rem,8vw,14rem)]"
          >
            Projects
          </h2>
        </div>
        <div className="">

        <p className="max-w-xs font-cursive text-base text-black/70 md:text-lg">
          A selection of things I&apos;ve designed, engineered and brought to
          life.
        </p>
        <p className="mt-4 max-w-xs font-cursive text-base text-black/70 md:text-lg font-bold">I build digital memorable experience not just a website</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-32 md:gap-48">
        {projects.map((project, index) => (
          <article
            key={project.number}
            className={`project-item relative min-h-[85vh] ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } flex flex-col gap-10 md:flex-row md:items-center md:gap-16`}
          >
            {/* Massive background number */}
            <div
              className={`project-number pointer-events-none absolute -top-20 font-archivo-black text-[13rem] leading-none text-black md:-top-50 md:text-[28rem] ${
                index % 2 === 0 ? "-left-5" : "-right-5"
              }`}
            >
              {project.number}
            </div>

            {/* Image */}
            <div className="relative z-10 w-full md:w-[65%]">
              <Link
                href={project.link}
                className="project-link group relative block aspect-[4/5] overflow-hidden bg-black md:aspect-[16/10]"
              >
               <div className="project-image-wrap absolute inset-0 overflow-hidden">
  <Image
    src={project.image}
    alt={project.name}
    fill
    sizes="(max-width: 768px) 100vw, 65vw"
    className="project-image h-[80%] w-full -translate-y-[7%] object-fill lg:object-cover"
    priority
  />
</div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/25" />

                {/* Project number */}
                <div className="absolute left-5 top-5 font-hand text-sm text-white md:left-7 md:top-7">
                  ({project.number})
                </div>

                {/* View cursor */}
                <div className="project-cursor pointer-events-none absolute left-0 top-0 z-20 flex h-28 w-28 scale-0 items-center justify-center rounded-full bg-[#2e78ff] text-center font-archivo-black text-xs uppercase leading-tight text-white opacity-0">
                  View
                  <br />
                  project ↗
                </div>

                {/* Bottom hover text */}
                <div className="absolute bottom-5 left-5 right-5 flex translate-y-3 items-end justify-between opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-7 md:left-7 md:right-7">
                  <span className="font-hand text-sm uppercase tracking-widest text-white">
                    See For Yourself 
                  </span>

                  <span className="text-2xl text-white">↗</span>
                </div>
              </Link>
            </div>

            {/* Content */}
            <div className="project-info relative z-10 flex w-full flex-col md:w-[35%]">
              <p className="project-meta mb-4 font-hand text-sm uppercase tracking-[0.2em] text-[#2e78ff]">
                {project.type} / {project.year}
              </p>

              <h3 className="project-meta font-archivo-black text-5xl uppercase leading-[0.9] text-black md:text-7xl">
                {project.name}
              </h3>

              <div className="project-line my-7 h-[1px] w-full origin-left bg-black/50" />

              <p className="project-meta max-w-md font-cursive text-lg leading-relaxed text-black/70">
                {project.description}
              </p>

              <div className="project-meta mt-8 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/30 px-3 py-1 font-hand text-xs uppercase tracking-wide text-black"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href={project.link}
                className="project-meta group mt-10 flex w-fit items-center gap-4 font-archivo-black text-sm uppercase text-black"
              >
                <span>Explore project</span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black transition-all duration-300 group-hover:translate-x-2 group-hover:bg-black group-hover:text-[#d5cfbe]">
                  ↗
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
};

export default Products;