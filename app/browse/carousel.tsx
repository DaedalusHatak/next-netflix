"use client";
import { useEffect, useState } from "react";
import styles from "./carousel.module.scss";
import Image from "next/image";
export default function Carousel({
  data,
  size,
  overflow,
  padding,
  buttonWidth,
  buttonPadding,
  buttonVisible,
  emitImage,
  emitImageDelay,
  sm,
  md,
  lg,
  xl,
  xxl,
}: any) {
  const [win, setWin] = useState(true);
  let hoverTimer: NodeJS.Timeout;
  //Defines if hover occurs
  const [hoverButtons, setHoverButtons] = useState<boolean>();
  const [hoverElement, setHoverElement] = useState();

  //Defines start and end point for TouchEvent
  const [touchMovement, setTouchMovement] = useState({ start: 0, end: 0 });
  //Defines if screen is smaller than 640px
  const [isMobile, setIsMobile] = useState<boolean>();
  //Defines which direction Carousel will move (1) -> Right or (-1) -> Left
  const [carouselMove, setCarouselMove] = useState<number>(0);
  //Defines a variable that prevents any action untill transition is finished
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  //Defines if carousel was triggered allowing user to go back and creating infinite loop
  const [wasTriggered, setWasTriggered] = useState<number>(0);
  //Defines how many elements should be shown
  const [screenVariable, setScreenVariable] = useState<number>();
  //Returns right flex-basis (how much elements at DOM)
  const flexBasis = screenVariable ? 100 / screenVariable : null;
  //copy of array
  const [slides, setSlides] = useState(data);
  //Adds proper styling based on buttons that were clicked and if its 1st click or not
  const transform = () => {
    if (wasTriggered === 0) {
      return "translate3d(0%,0px,0px)";
    } else if (carouselMove === 1 && wasTriggered === 1) {
      return "translate3d(-100%,0px,0px)";
    } else if (carouselMove === 1) {
      return "translate3d(-200%,0px,0px)";
    } else if (carouselMove === -1) return "translate3d(0%,0px,0px)";
    else return "translate3d(-100%,0px,0px)";
  };
  const pad = padding + "rem";

  isTouchDevice();
  if (typeof window !== "undefined") {
  }
  useEffect(() => {
    const touchDevice = isTouchDevice();
    setIsMobile(touchDevice);
    if (window.innerWidth >= 1536 && xxl) {
      setScreenVariable(xxl);
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536 && xl) {
      setScreenVariable(xl);
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280 && lg) {
      setScreenVariable(lg);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024 && md) {
      setScreenVariable(md);
    } else if (window.innerWidth >= 640 && window.innerWidth < 768 && sm) {
      setScreenVariable(sm);
    } else {
      setScreenVariable(size);
    }
    console.log(screenVariable);
  }, [setIsMobile, lg, md, size, sm, xl, xxl, screenVariable]);

  //Emits currently hovered element
  function currElement(e: MouseEvent, slide: any) {
    let timer;
    if (emitImageDelay) {
      timer = emitImageDelay;
    } else {
      timer = 550;
    }
    if (emitImage) {
      const touchDevice = isTouchDevice();
      const target = e.target as HTMLButtonElement;
      if (!touchDevice) {
        setHoverElement(slide);

        //   hoverTimer = setTimeout(() => {
        //     if (hoverElement) emit("hovElement", hoverElement);
        //     if (e.target && hoverElement)
        //       emit("positionElement", target.getBoundingClientRect());
        //   }, timer);
      }
    }
  }
  function cancelHover() {
    clearTimeout(hoverTimer);
  }

  //Forward Button/Touch with cutting first X elements and putting them at the end
  //
  function forward() {
    if (slides) {
      setCarouselMove(1);
      if (!isTransitioning) {
        setIsTransitioning(true);
        if (wasTriggered < 2) {
          setWasTriggered(wasTriggered + 1);
        }
        const newArray = [...slides];
        if (wasTriggered >= 1) {
          setTimeout(() => {
            for (let i = 0; i < screenVariable!; i++) {
              const slide = newArray[i];
              console.log(newArray);
              newArray.push(slide);
            }
            setSlides(newArray);
            const newArrayer = [...newArray];
            setTimeout(() => {
              for (let i = 0; i < screenVariable!; i++) {
                if (slides) {
                  console.log("shift");
                  newArrayer.shift();
                  console.log(newArrayer);
                }
              }
              setSlides(newArrayer);

              setIsTransitioning(false);
              setCarouselMove(0);
            }, 750);
          }, 10);
        } else {
          setTimeout(() => {
            setIsTransitioning(false);
          }, 750);
        }
      }
    }
  }
  //Backward Button/Touch with cutting last X elements and putting them at the start

  function back() {
    setCarouselMove(-1);
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        const slide = [...slides];
        for (let i = 0; i < screenVariable!; i++) {
          if (slides) {
            const pop = slide.pop();
            console.log(slide);
            slide.unshift(pop);
          }
        }
        setSlides(slide);
        setIsTransitioning(false);
        setCarouselMove(0);
      }, 750);
    }
  }

  //Sets start value to X user touched
  function touchStart(event: TouchEvent) {
    touchMovement.start = event.touches[0].clientX;
  }
  //Sets end value for X user finished touching
  function touchMove(event: TouchEvent) {
    touchMovement.end = event.touches[0].clientX;
  }
  //Triggers forward() or back() function depending which direction movement occured
  function touchEnd() {
    if (touchMovement.start > touchMovement.end && touchMovement.end > 0)
      forward();
    else if (touchMovement.start < touchMovement.end && touchMovement.end > 0)
      back();
  }
  //Sets variable based on defined props and screen sizes
  //Sets second variable to true or false if screen is smaller than 640px
  function isTouchDevice(): boolean {
    if (typeof window !== "undefined") {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    } else return false;
  }

  return (
    <>
      <div
        style={{ padding: padding }}
        className={`${overflow ? "" : styles.overflow} ${styles.carousel}`}
      >
        <button
          style={{ left: `${buttonPadding}rem`, width: `${buttonWidth}rem` }}
          onClick={() => back()}
          onMouseOver={() => setHoverButtons(true)}
          onMouseLeave={() => setHoverButtons(false)}
          className={`${styles.handle} ${styles["left-handle"]} ${
            hoverButtons || buttonVisible ? "" : styles["button-visible"]
          }`}
          aria-label="Show previous movies"
        >
          {hoverButtons && (
            <Image
              className={styles["hover-button"]}
              width={200}
              height={200}
              src="/assets/chevron-left-solid.svg"
              alt=""
            />
          )}
        </button>
        {isMobile && wasTriggered && (
          <div
            style={{ left: `${buttonPadding}rem`, width: `${buttonWidth}rem` }}
            className={`${styles.handle} ${styles["left-handle"]}`}
          ></div>
        )}
        <div
          style={{ transform: transform() }}
          //   @touchstart.passive="touchStart"
          //   @touchmove.passive="touchMove"
          //   @touchend.passive="touchEnd"
          className={`${styles["slider-wrapper"]} ${
            carouselMove === 1 || carouselMove === -1 ? styles.animate : ""
          }`}
        >
          {slides.map((slide: any, index: number) => (
            <div
              key={index}
              style={{ flexBasis: `${flexBasis}%` }}
              className={styles["slider-element"]}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`}
                className={win ? "" : styles["max-width"]}
                alt={slide.title || slide.name}
                onMouseOver={(e: any) => currElement(e, slide)}
                onMouseLeave={() => cancelHover()}
                height={120}
                width={220}
              />
            </div>
          ))}
        </div>
        {!isMobile && (
          <button
            style={{ right: `${buttonPadding}rem`, width: `${buttonWidth}rem` }}
            onMouseOver={() => setHoverButtons(true)}
            onMouseLeave={() => setHoverButtons(false)}
            onClick={() => forward()}
            className={`${styles["handle"]} ${styles["right-handle"]} ${
              hoverButtons || buttonVisible ? "" : "button-visible"
            }`}
            aria-label="Show more movies"
          >
            {hoverButtons && (
              <Image
                className={styles["hover-button"]}
                src="/assets/chevron-right-solid.svg"
                width={200}
                height={200}
                alt=""
              />
            )}
          </button>
        )}
        {isMobile && (
          <div
            style={{ right: `${buttonPadding}rem`, width: `${buttonWidth}rem` }}
            className={`${styles["handle right-handle"]}`}
          ></div>
        )}
      </div>
    </>
  );
}
