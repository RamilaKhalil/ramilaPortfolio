"use client";
import Bounded from "@/components/Bounded";
import {Shapes} from "./Shapes"
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {gsap} from "gsap";
import { useEffect, useRef } from "react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -5 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,

            ease: "elastic.out(1,0.3)",
            duration: 1.3,
            transformOrigin: "right top",
            stagger: { each: 0.2, from: "random" },
          }
        )
        .fromTo(
          ".job-title",
          {
            x: 50,
            opacity: 0,
            scale: -1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          }
        );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 `}
      >
        {letter}
      </span>
    ));
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes/>
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-3 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none  tracking-normal"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-200 mb-4">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className=" block text-purple-300 ">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title  bg-gradient-to-tr from-yellow-700 via-yellow-300 bg-clip-text text-xl font-bold uppercase tracking-[.1em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
