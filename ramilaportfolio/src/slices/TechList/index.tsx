"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true, // pin the trigger element while active
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 800)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-800, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading  className="mb-6 text-purple-300 md:pt-4" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.primary.tech.map(({tech_color,tech_name},index) => (
  // Render the item
  <div
  key={index}
  className="tech-row mb-8 flex items-center justify-center gap-4 text-gray-400"
  aria-label={tech_name || ""}
>
  {Array.from({ length: 15 }, (_, index) => (
    <React.Fragment key={index}>
      <span
        className={
          "tech-item text-6xl font-extrabold uppercase tracking-tighter"
        }
        style={{
          color: index === 7 && tech_color ? tech_color : "inherit",
        }}
      >
        {tech_name}
      </span>
      <span className="text-3xl">
        <MdCircle />
      </span>
    </React.Fragment>
  ))}
</div>
))}
   
    </section>
  );
};

export default TechList;