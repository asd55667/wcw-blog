"use client";

import { Bird, Fish, Rabbit, Rat, Snail, Squirrel, Turtle } from "lucide-react";
/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";

const animals = [
  <Rabbit key="0" className="w-60 h-60" strokeWidth={1} />,
  <Squirrel key="1" className="w-60 h-60" strokeWidth={1} />,
  <Bird key="2" className="w-60 h-60" strokeWidth={1} />,
  <Rat key="3" className="w-60 h-60" strokeWidth={1} />,
  <Fish key="4" className="w-60 h-60" strokeWidth={1} />,
  <Snail key="5" className="w-60 h-60" strokeWidth={1} />,
  <Turtle key="6" className="w-60 h-60" strokeWidth={1} />,
];

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);
  const animal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // add animation to the animal element when mouse position across the middle of animal element
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!animal.current) {
        return;
      }
      const { x, y, width, height } = animal.current.getBoundingClientRect();
      const offsetX = x + width / 2 - e.clientX;
      const offsetY = y + height / 2 - e.clientY;
      const rotateX = offsetY / 10;
      const rotateY = offsetX / 10;
      animal.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return isClient ? (
    <div className="flex flex-col item-center justify-center w-full h-screen">
      <div ref={animal} className="flex justify-center">
        {animals[Math.floor(Math.random() * animals.length)]}
      </div>

      <div className="flex mt-6 mb-8 text-center justify-center">
        <h1 className="inline-block mr-5 pr-6 vertical-top font-medium text-2xl leading-10 border-r">
          404
        </h1>
        <div className="inline-block">
          <h2 className="font-sm font-normal m-0 leading-10">
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
