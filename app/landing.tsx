"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import LinkButton from "./components/LinkButtonLanding";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const Landing = ({ setIsDone }: { setIsDone: (value: boolean) => void }) => {
  const linkItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];
  useEffect(() => {
  const handleResize = () => {
    window.location.reload();
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  gsap.registerPlugin(SplitText, DrawSVGPlugin, ScrollTrigger);
  //gsap animtaions
  
  useGSAP(() => {

    const desc = document.querySelector("#desc");
    const split = new SplitText(desc, {
      type: "words, chars",
      mask: "chars",
      smartWrap: true,
    });
    const correction = new SplitText("#correction", {
      type: "words, chars",
      mask: "chars",
    });
    
    gsap.set(".hover-text", { opacity: 1 });
    gsap.set([desc, "#correction", "#over"], { opacity: 1 });
    
    // lock scroll during intro
    // document.body.style.overflow = "hidden";
    
    const tl = gsap.timeline();
    const letters = document.querySelectorAll<SVGPathElement>("#eyad path");

    letters.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });
     letters.forEach((path, i) => {
      tl.to(
        path,
        { strokeDashoffset: 0, duration: 1.5, ease: "back.out" },
        i * 0.2,
      );
    })
    tl.from(split.chars, {
      duration: 0.5,
      opacity: 0,
      x: -20,
      stagger: 0.03,
      ease: "power2.out",
    })
    .from("#over", {
      delay: 0.5,
      drawSVG: 0,
      duration: 0.6,
      ease: "power2.out",
    }).from(correction.chars, {
      opacity: 0,
      stagger: 0.05,
      ease: "power2.out",
      duration: 0.5,
    })
    .to("#line", { scaleX: "100%", duration: 1, ease: "power2.out" }, 2).from(
      ".hover-text",
      { opacity: 0, y: 30, stagger: 0.05, duration: 0.3, ease: "power2.out" },
    4);

    
   

    // ---- only build the scroll-driven timeline once the intro is fully done ----
    tl.eventCallback("onComplete", () => {
      // document.body.style.overflow = ""; // unlock scroll
     setIsDone(true)
      const container = document.querySelector("#landing");
      const fadeOutTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#landing",
          start: "top top",
          end: "+=1000px",
          scrub: 1,
          pin: true,
        },
      });

      fadeOutTl
        .fromTo(
          ".hover-text",
          { opacity: 1, y: 0, autoAlpha: 1 },
          {
            opacity: 0,
            autoAlpha: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            // onComplete:()=>{gsap.set('.hover-text',{pointerEvents:'none'})},
          },
        )
        .fromTo(
          "#line",
          { scaleX: "100%" },
          { scaleX: 0, duration: 0.5, ease: "power2.out" },
          "<",
        )
        .fromTo(
          correction.chars,
          { opacity: 1 },
          { opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
        )
        .fromTo(
          split.chars,
          { opacity: 1, x: 0 },
          {
            opacity: 0,
            x: -20,
            duration: 0.5,
            stagger: { each: 0.01, from: "end" },
            ease: "power2.out",
          },
          "<",
        )
        .fromTo(
          "#over",
          { drawSVG: "100%" },
          { drawSVG: "0%", duration: 0.6, ease: "power2.out" },
          "<",
        )
        .fromTo(
          letters,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: (i, target) => target.getTotalLength(),

            duration: 1.5,
            ease: "power1.out",
            stagger: {
              each: 0.5,
              from: "end",
            },
          },
        )
        .to(
          letters,
          {
            autoAlpha: 0,
          },
          "-=0.4",
        )
        .fromTo(
          container,
          { backgroundColor: "#000000" },
          { backgroundColor: "#d5cfbe", duration: 1.5, ease: "power2.out" },
        );

      ScrollTrigger.refresh();
    });
  });


  //   const letters = document.querySelectorAll("#eyad path");

  //   letters.forEach((path) => {
  //     const length = path.getTotalLength();

  //     gsap.set(path, {
  //       strokeDasharray: length,
  //       strokeDashoffset: length,
  //     });
  //   });

  //   const tl = gsap.timeline();

  //   letters.forEach((path, i) => {
  //     tl.to(
  //       path,
  //       {
  //         strokeDashoffset: 0,
  //         duration: 1.5,
  //         ease: "back.out",
  //       },
  //       i * 0.2,
  //     );
  //   });
  // });
  return (
    <div
      id="landing"
      className="h-screen w-screen flex justify-center items-center relative overflow-hidden bg-black"
    >
      <h1
        id="desc"
        className="capitalize opacity-0 absolute top-15 left-0 lg:left-15 font-cursive text-[10px] md:text-[15px] flex justify-center overflow-hidden gap-2 items-center"
      >
        a quite developer bringing ideas to life
      </h1>
      <h1
        id="correction"
        className="capitalize opacity-0 absolute top-6 left-5 lg:left-20 font-cursive text-[15px] flex justify-center overflow-hidden gap-2 items-center"
      >
        not-so quite
      </h1>
      <svg
        className="absolute top-5 left-17 md:left-20 "
        width="50"
        height="100"
        viewBox="0 0 574 302"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="over"
          className="opacity-0"
          d="M434.57 0.491211L37.5703 75.4912H472.07L37.5703 165.491H472.07L0.0703125 232.491L472.07 262.491L0.0703125 318.991"
          stroke="white"
          strokeWidth="40"
        />
      </svg>
      <svg
        width="80%"
        height="200"
        viewBox="0 0 1000 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="eyad"
          fill="none"
          stroke="white"
          strokeWidth="8"
          // strokeLinecap="round"
          // strokeLinejoin="round"
        >
          <path
            id="letter-e"
            d="
        M 55 72
        C 145 42, 205 28, 285 18

        M 120 55
        C 108 82, 94 119, 88 151
        C 82 184, 91 210, 120 218
        C 155 228, 202 211, 270 194

        M 82 142
        C 135 127, 184 115, 231 105
      "
          />

          <path
            id="letter-y"
            d="
        M 330 55
        C 319 82, 321 111, 338 126
        C 355 141, 379 138, 401 119
        C 425 98, 445 68, 461 39
        C 469 25, 476 20, 480 26
        C 485 35, 474 62, 461 86
        C 444 119, 425 153, 405 184
        C 388 210, 372 235, 358 264
      "
          />

          <path
            id="letter-a"
            d="
        M 475 196
        C 493 163, 517 125, 542 91
        C 563 62, 583 37, 597 25
        C 606 17, 611 22, 609 36
        C 604 69, 593 111, 583 151
        C 575 182, 570 211, 565 236

        M 508 143
        C 548 137, 590 131, 639 132
      "
          />

          <path
            id="letter-d"
            d="
        M 665 42
        C 710 31, 763 29, 810 32
        C 850 35, 883 46, 900 65
        C 919 87, 912 113, 888 132
        C 862 153, 827 166, 786 175
        C 746 184, 706 189, 672 188

        C 651 187, 642 180, 646 172
        C 651 162, 669 156, 694 151

        C 731 143, 776 137, 824 136
        C 867 135, 909 139, 956 143
      "
          />
        </g>
      </svg>
      <div className="w-[95%] absolute bottom-40 lg:bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
        <div
          id="line"
          className="left-5 w-full h-[0.5px] bg-white origin-left scale-x-0"
        ></div>
      </div>
      <div className="absolute bottom-20 lg:bottom-0 left-0 w-full ">
        <ul className="flex justify-center items-center w-full py-4 gap-4">
          {linkItems.map((item) => (
            <LinkButton key={item.href} href={item.href} name={item.name} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Landing;
