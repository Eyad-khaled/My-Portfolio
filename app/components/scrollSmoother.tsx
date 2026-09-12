"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapper = useRef(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll:true
    });

    return () => smoother.kill();
  });

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
