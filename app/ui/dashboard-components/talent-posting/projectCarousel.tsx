"use client";
import { ongoingProjects } from "@/app/lib/data";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { use, useEffect, useState } from "react";

interface onGoingProjects {
  projectName: string;
  category: string;
  description: string;
  budget: string;
  deadline: string;
  clientName: string;
}
const ProjectCarousel = () => {
  const onGoingProjects = ongoingProjects;
  //   const [index, setIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const cardNumber = onGoingProjects.length;

  //   const slideValue = (i: number) => {
  //     setIndex((i + cardNumber) % cardNumber);

  //     setSlide(index * 250);
  //     console.log(index);
  //     console.log(slide);
  //   };
  const nextSlide = () => {
    // slideValue(index + 1);
    setIndex(index + 1);
  };
  const prevSlide = () => {
    // slideValue(index - 1);
    setIndex(index - 1);
  };
  useEffect(() => {
    setSlide(index * 255);
  }, [index]);

  //   const visibility = () => {
  //     if (index === 0) {
  //       return 0;
  //     }
  //     if (index === cardNumber - 1) {
  //       return 1;
  //     }
  //   };
  return (
    <div className="my-5 overflow-hidden  w-full relative">
      <div
        className={clsx(
          `flex gap-11 ease-in-out transition-transform duration-500 max-w-screen-xl `
        )}
        style={{ transform: `translateX(-${slide}px) ` }}
      >
        {onGoingProjects.map((project, index) => (
          <div key={index} className="border-2 rounded-xl min-w-[250px]">
            <h3>{project.projectName}</h3>
            <p>Category: {project.category}</p>
            <p>Description: {project.description}</p>
            <p>Budget: {project.budget}</p>
            <p>Deadline: {project.deadline}</p>
            <p>Client: {project.clientName}</p>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/3 border-slate-300 border-2  shadow-[0_10px_20px_rgba(228,228,228,_0.7)] left-0 w-16 h-16 rounded-full bg-white p-5"
        onClick={prevSlide}
        style={{ display: index === 0 ? "none" : "block" }}
        {...(index === 0 && { disabled: true })}
      >
        <ArrowLeftIcon />
      </button>
      <button
        className="absolute top-1/3 border-slate-300 border-2 shadow-[0_10px_20px_rgba(228,228,228,_0.7)] right-0 w-16 h-16 rounded-full bg-white p-5"
        onClick={nextSlide}
        {...(index === cardNumber - 4 && { disabled: true })}
        style={{ display: index === cardNumber - 4 ? "none" : "block" }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default ProjectCarousel;
