import React, { Children, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children, className = "", width }) => {
  return (
    <div
      className={`inline-block bg-white w-full cursor-grab overflow-hidden active:cursor-grabbing  ${className}`}
      style={{ width: width }}
    >
      {children}
    </div>
  );
};

const Carousel = ({
  children,
  className = "",
  navigate = false,
  paginate = false,
  auto = false,
  fade = false,
  infiniteLoop = false,
  delay = 3000,
  speed = 500,
  show = 0,
}) => {

  const length = React.useMemo(() => Children.count(children), [children])

  const [activeIndex, setActiveIndex] = useState(show);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (auto) {
      var interval = setInterval(() => {
        if (!paused) {
          updateIndex(activeIndex + 1);
        }
      }, delay);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const getClassByDuration = (speed) => {
    return {
      75: "duration-75",
      100: "duration-100",
      150: "duration-150",
      200: "duration-200",
      300: "duration-300",
      500: "duration-500",
      700: "duration-700",
      1000: "duration-1000",
    }[speed];
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex - 1),
    onSwipedRight: () => updateIndex(activeIndex + 1),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <div
      {...handlers}
      dir="rtl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className={`whitespace-nowrap transition-transform ${getClassByDuration(speed)} ease-in-out`}
        style={!fade ? { transform: `translateX(${activeIndex * 100}%)`, transition:activeIndex === length-3 ? "none" : null} : null}
      >
        {fade
          ? children.filter((item, index) => {
              return index === activeIndex;
            })
          : Children.map(children, (child, index) => {
              return React.cloneElement(child);
            })}
      </div>
      <div className="flex justify-center">
        {paginate && (
          <div className="absolute bottom-1 z-10">
            {Children.map(children, (child, index) => {
              return (
                <button
                  className={`w-3 h-3 rounded-full m-2 bg-gray-800 transition-all  ${getClassByDuration(
                    speed
                  )} ease-in-out ${index === activeIndex ? "bg-green-300  w-14  inline-block" : ""}`}
                  onClick={() => {
                    updateIndex(index);
                  }}
                />
              );
            })}
          </div>
        )}
        {navigate && (
          <>
            <button
              className="absolute left-2 top-[46%] flex p-3 rounded-full font-bold text-lg bg-slate-800 cursor-pointer fill-white active:scale-[.8]"
              onClick={() => {
                updateIndex(activeIndex + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-2 top-[46%] flex p-3 rounded-full font-bold text-lg bg-slate-800 cursor-pointer fill-white active:scale-[.8]"
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
