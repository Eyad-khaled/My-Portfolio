"use client";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function LinkButtonContact({ href , name }: { href: string; name: string }) {
    gsap.registerPlugin(SplitText, ScrollToPlugin);
    useGSAP(() => {
    const textContainers = gsap.utils.toArray<HTMLElement>(".hover-text-contact");
  const textOriginal = gsap.utils.toArray<HTMLElement>(".original-text-contact");
  const textSub = gsap.utils.toArray<HTMLElement>(".sub-text-contact");

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
          amount: 0.5,
        },
      }).to(
        textOriginalSplit.chars,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            amount: 0.5,
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
      
        <Link href={href} className="text-[15px] basis-1/3 hover-text-contact cursor-pointer text-white uppercase font-bold font-archivo-black overflow-hidden relative">
          
          <p className="original-text-contact ">{name}</p>
          <p
            className="sub-text-contact absolute"
            style={{
                color: "transparent",
                WebkitTextStroke: "0.5px white",
            }}
            > 
            {name}
          </p>
            
        </Link>
    )
}