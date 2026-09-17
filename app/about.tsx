"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import YearCard, { Year } from "./components/YearCard";

const About = () => {
  const journey: Year[] = [
    {
      year: "22",
      progress: 0.1,
      title: "The beginning",
      description:
        "i was inspired to write my first line of code, and well ... it turned out great",
      xDirection: "right",
      yDirection: "top",
    },
    {
      year: "23",
      progress: 0.32,
      title: "Getting serious",
      description:
        "Started building real projects, and got introduced to the real world",
      xDirection: "right",
      yDirection: "top",
    },
    {
      year: "24",
      progress: 0.52,
      title: "React/Nextjs",
      description:
        "learnt React & NextJS and started building bigger and real life applications.",
      xDirection: "left",
      yDirection: "bottom",
    },
    {
      year: "25",
      progress: 0.8,
      title: "Exposure",
      description:
        "got exposed to real life tasks with deadlines and feedbacks",
      xDirection: "right",
      yDirection: "bottom",
    },
    {
      year: "26",
      progress: 0.97,
      title: "The journey continues",
      description: "4 years into it and still going , same passion ,same goal ",
      xDirection: "right",
      yDirection: "bottom",
    },
  ];

  gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVGPlugin);

  useGSAP(() => {
    const header = document.getElementById("aboutText");
    const desc = document.getElementById("para");
    const headerSplit = SplitText.create(header, {
      type: "lines",
      mask: "lines",
    });
    const descSplit = SplitText.create(desc, { type: "lines", mask: "lines" });

    // Header/paragraph reveal - runs on all screen sizes
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      })
      .from([headerSplit.lines, descSplit.lines], {
        yPercent: 100,
        duration: 0.6,
        stagger: 0.05,
      });

    const mm = gsap.matchMedia();

    // Desktop: animated wavy path with cards positioned along it
    mm.add("(min-width: 768px)", () => {
      const dots = gsap.utils.toArray<SVGCircleElement>(".journey-dot-desktop");
      const yearCards =
        gsap.utils.toArray<HTMLDivElement>(".year-card-desktop");
      const cardsTitles = gsap.utils.toArray<HTMLDivElement>(".card-title");
      const cardsDescriptions =
        gsap.utils.toArray<HTMLDivElement>(".card-description");
      const cardsYears = gsap.utils.toArray<HTMLDivElement>(".card-year");

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#journey-desktop",
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      journeyTl.from("#linePath", {
        drawSVG: 0,
        duration: 10,
        ease: "power1.inOut",
      });
      journeyTl.from(
        dots,
        { autoAlpha: 0, stagger: { amount: 7 }, duration: 0.5, ease: "power1.inOut" , delay:1},
        "<",
      );
      journeyTl.from(
        yearCards,
        {
          delay: 0.5,
          autoAlpha: 0,
          stagger: { amount: 7 },
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      );

      // journeyTl.from(cardsDescriptionsSplit.lines, {
      //   yPercent: 100,
      //   duration: 1,
      //   stagger: 0.05,
      //   delay: 1,
      // }, "<");
      // journeyTl.from(cardsTitlesSplit.lines, {
      //   yPercent: 100,
      //   duration: 0.6,
      //   stagger: 0.05,
      //   delay: 0.5,
      // }, "<");
      const cardYearReels = gsap.utils.toArray<HTMLElement>(".card-year-reel");

      cardYearReels.forEach((reel, index) => {
        const cardIndex = Math.floor(index / 2); // 2 reels per card (tens, units)
        const startDigit = Number(reel.dataset.startDigit);
        const targetDigit = Number(reel.dataset.targetDigit);
        const targetIndex =
          targetDigit >= startDigit ? targetDigit : targetDigit + 10;

        journeyTl.to(
          reel,
          {
            y: -(targetIndex * 48),
            duration: 1.5,
            ease: "power3.inOut",
            delay: 1,
          },
          0 + cardIndex - 0.5, // Stagger the start time for each card
        );
      });
      cardsTitles.forEach((title, index) => {
        const cardsTitlesSplit = SplitText.create(title, {
          type: "lines",
          mask: "lines",
        });
        journeyTl.from(
          cardsTitlesSplit.lines,
          {
            yPercent: 100,
            duration: 0.4,
            ease: "power3.out",
            autoAlpha: 0,
            delay: 1,
          },
          0.3 + index,
        ); // Stagger the start time for each title
      });
      cardsDescriptions.forEach((description, index) => {
        const cardsDescriptionsSplit = SplitText.create(description, {
          type: "lines",
          mask: "lines",
        });
        journeyTl.from(
          cardsDescriptionsSplit.lines,
          {
            yPercent: 100,
            duration: 0.4,
            ease: "power3.out",
            autoAlpha: 0,
            delay: 1,
            stagger: 0.05,
          },
          0.5 + index,
        ); // Stagger the start time for each title
      });

      const path = document.querySelector("#linePath") as SVGPathElement;
      const pathLength = path.getTotalLength();

      dots.forEach((dot) => {
        const progress = Number(dot.dataset.progress);
        const point = path.getPointAtLength(pathLength * progress);
        gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
      });

      const svg = path.closest("svg") as SVGSVGElement;
      const journeyEl = document.querySelector(
        "#journey-desktop",
      ) as HTMLElement;
      const journeyRect = journeyEl.getBoundingClientRect();

      yearCards.forEach((yearCard) => {
        const progress = Number(yearCard.dataset.progress);
        const point = path.getPointAtLength(pathLength * progress);
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = point.x;
        svgPoint.y = point.y;
        const screenPoint = svgPoint.matrixTransform(svg.getScreenCTM()!);
        const x = screenPoint.x - journeyRect.left;
        const y = screenPoint.y - journeyRect.top;

        // ✅ read the direction data attributes and translate them into xPercent/yPercent
        const xDirection = yearCard.dataset.xDirection;
        const yDirection = yearCard.dataset.yDirection;

        const xPercent = xDirection === "left" ? -100 : 0;
        const yPercent = yDirection === "top" ? -100 : 0;

        gsap.set(yearCard, { left: x, top: y, xPercent, yPercent });
      });
    });

    return () => mm.revert();
  });

  return (
    <div
      id="about"
      className="min-h-screen w-full flex flex-col relative bg-[#d5cfbe] px-10"
    >
       <div>
          <p
            id="work-label"
            className="mb-5 font-hand text-sm uppercase tracking-[0.25em] text-[#2e78ff]"
          >
            01 / About
          </p>

          
        </div>
      <div className="">
        <h1
          id="aboutText"
          className=" text-black text-6xl font-bold capitalize"
        >
          About me & <br /> my journey
        </h1>
        <p
          id="para"
          className="pt-6 text-gray-800 text-[15px] font-light capitalize"
        >
          four years ago i wrote my first line of code and found out
          <br />{" "}
          <span className="text-md font-semibold">there's more to life</span>
        </p>
      </div>

      {/* Desktop: animated wavy path */}
      <div
        id="journey-desktop"
        className="hidden md:flex w-full justify-center items-center relative"
      >
        <svg
          width="80%"
          height="1822"
          viewBox="0 0 1452 1822"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="linePath"
            d="M1411.94 0.483765C1411.94 0.483765 -20.5588 330.984 3.44101 661.484C27.4408 991.984 1459.44 724.984 1451.44 1078.98C1443.44 1432.98 -75.0579 1251.98 3.44184 1558.98C81.9416 1865.98 711.442 1818.48 711.442 1818.48"
            stroke="black"
            strokeWidth={2.5}
          />
          {journey.map((item) => (
            <circle
              key={item.year}
              className="journey-dot-desktop"
              data-progress={item.progress}
              r="7"
              fill="#2e78ff"
              stroke="black"
              strokeWidth={2}
            />
          ))}
        </svg>
        {journey.map((yearData) => (
          <YearCard
            key={yearData.year}
            year={yearData}
            className="year-card-desktop"
          />
        ))}
      </div>

      {/* Mobile: straight line, dots + cards to the right, no animation */}
      <div className="flex md:hidden w-full py-10">
        <div className="relative flex flex-col w-full pl-6">
          {/* straight vertical line */}
          <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-black" />

          {journey.map((item) => (
            <div
              key={item.year}
              className="relative flex items-start gap-4 pb-10 last:pb-0"
            >
              {/* dot on the line */}
              <div className="absolute -left-[5px] top-1 w-3 h-3 rounded-full bg-[#2e78ff] border border-black" />
              <div className="bg-[#dfdececc] p-4 rounded-lg w-full ml-6">
                <h1 className="text-3xl text-[#2e78ff] font-bold capitalize">
                  '{item.year}
                </h1>
                <h1 className="text-lg text-black font-bold pt-1 capitalize">
                  {item.title}
                </h1>
                <p className="font-light text-black opacity-75 capitalize mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
