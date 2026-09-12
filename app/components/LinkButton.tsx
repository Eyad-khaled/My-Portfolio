"use client";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function LinkButton({ href , name }: { href: string; name: string }) {
    gsap.registerPlugin(SplitText, ScrollToPlugin);
    useGSAP(() => {
    const textContainers = gsap.utils.toArray<HTMLElement>(".hover-text");
  const textOriginal = gsap.utils.toArray<HTMLElement>(".original-text");
  const textSub = gsap.utils.toArray<HTMLElement>(".sub-text");

    textContainers.forEach((textContainer, i) => {
      const tl = gsap.timeline({ paused: true });
      const textSubSpecific = textSub[i];
      const textOriginalSpecific = textOriginal[i];
      const textOriginalSplit = SplitText.create(textOriginalSpecific, {
        type: "chars",
      });
      const textSubSplit = SplitText.create(textSubSpecific, { type: "chars" });
      tl.to(textSubSplit.chars, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          each: 0.05,
        },
      }).to(
        textOriginalSplit.chars,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            each: 0.05,
          },
        },
        "=<",
      );
      textContainer.addEventListener("mouseenter", () => {
        setTimeout(() => {
          tl.play();
        }, 100);
      });
      textContainer.addEventListener("mouseleave", () => {
        setTimeout(() => {
          tl.reverse();
        }, 200);
      });
    });
    gsap.set(textSub, { yPercent: 0 });
  });
    return(
        <li onClick={()=>{gsap.to(window,{scrollTo: href, duration: 2, ease: "power2.out"})}} className="text-[15px] opacity-0 hover-text cursor-pointer text-white uppercase font-bold font-hand overflow-hidden relative">
          
          <p className="original-text ">{name}</p>
          <p
            className="sub-text absolute"
            style={{
                color: "transparent",
                WebkitTextStroke: "0.5px white",
            }}
            > 
            {name}
          </p>
            
        </li>
    )
}