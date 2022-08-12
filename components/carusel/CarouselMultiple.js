import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
{
  /* <span className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
<img src={resource.imageUrl || ""} alt={resource.title} className="w-full aspect-square " />
</span> */
}
export const CarouselItem = ({ children, className = "", width }) => {
  return (
    <div className={`text-center relative w-64 h-64 snap-center shrink-0 ${className}`}>
      <span className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
        {children}
      </span>
    </div>
  );
};

const CarouselMultiple = ({ children }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (carousel.current !== null && carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    if (direction === "next" && carousel.current !== null) {
      return currentIndex <= 0;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = -carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0;
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => movePrev(),

    onSwipedRight: () => moveNext(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className={`relative overflow-hidden cursor-grab active:cursor-grabbing`}>
      <div className="flex justify-between items-center absolute top left w-full h-full z-10">
        <button
          onClick={moveNext}
          className={`flex p-3 rounded-full font-bold text-lg shadow-md cursor-pointer bg-white fill-black active:scale-[.8] ${
            isDisabled("prev") ? "opacity-0" : ""
          }`}
          disabled={isDisabled("prev")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={movePrev}
          className={`flex p-3 rounded-full font-bold text-lg shadow-md  cursor-pointer bg-white fill-black active:scale-[.8] ${
            isDisabled("next") ? "opacity-0" : ""
          }`}
          disabled={isDisabled("next")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        ref={carousel}
        dir="rtl"
        className={`carousel-container relative flex  overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0`}
      >
        {Children.map(children, (child, index) => {
          return cloneElement(child);
        })}
      </div>
    </div>
  );
};
export default CarouselMultiple;
