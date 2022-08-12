import { useEffect, useRef } from "react";
import CarouselMultiple, { CarouselItem } from "./CarouselMultiple";

export const SimpleMultiple = ({ data }) => {
  const setting = {
    auto: true,
    fade: true,
    paginate: true,
    navigate: true,
    speed: 1000,
    infiniteLoop: true,
    show: 1,
  };

  return (
    <CarouselMultiple {...setting} data={data}>
      <CarouselItem className="rounded-lg">
        <div className=" bg-rose-700 w-full h-full flex justify-start ">
          <img src="./banner.png" />
        </div>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <article className=" bg-emerald-800 w-full h-full flex justify-center ">
          <img src="./banner.png" />
        </article>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <section className=" bg-amber-500 w-full h-full flex justify-end ">
          <img src="./banner.png" />
        </section>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <div className=" bg-rose-700 w-full h-full flex justify-start ">
          <img src="./banner.png" />
        </div>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <article className=" bg-emerald-800 w-full h-full flex justify-center ">
          <img src="./banner.png" />
        </article>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <section className=" bg-amber-500 w-full h-full flex justify-end ">
          <img src="./banner.png" />
        </section>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <div className=" bg-rose-700 w-full h-full flex justify-start ">
          <img src="./banner.png" />
        </div>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <article className=" bg-emerald-800 w-full h-full flex justify-center ">
          <img src="./banner.png" />
        </article>
      </CarouselItem>
      <CarouselItem className="rounded-lg">
        <section className=" bg-amber-500 w-full h-full flex justify-end ">
          <img src="./banner.png" />
        </section>
      </CarouselItem>
    </CarouselMultiple>
  );
};
