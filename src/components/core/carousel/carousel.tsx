import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_BY_PCT = 0.85;
const THRESHOLD = 8;

interface CarrouselProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
  scrollByPct?: number;
}

export const Carousel = ({
  children,
  className = "",
  itemClassName = "",
  ariaLabel,
  scrollByPct = SCROLL_BY_PCT,
}: CarrouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > THRESHOLD);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - THRESHOLD);
  }, []);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollState]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * scrollByPct * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onScroll = () => updateScrollState();

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollBy(-1);
    }
  };

  return (
    <div className={`group relative ${className}`}>
      {/* Left Button */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        disabled={!canScrollLeft}
        className={`absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-900/60 text-white backdrop-blur transition-opacity hover:scale-105 ${canScrollLeft ? "opacity-100 hover:bg-neutral-800/70" : "pointer-events-none opacity-0"} focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white`}>
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="size-5 hover:scale-105" />
      </button>

      {/* Right Button */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        disabled={!canScrollRight}
        className={`absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-900/60 text-white backdrop-blur transition-opacity hover:scale-105 ${canScrollRight ? "opacity-100 hover:bg-neutral-800/70" : "pointer-events-none opacity-0"} focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white`}>
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="size-5 hover:scale-105" />
      </button>

      <div
        ref={trackRef}
        role="list"
        aria-label={ariaLabel}
        tabIndex={0}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 py-1 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: "touch" }}>
        {/* Hide scrollbar (fallback) */}
        <style>{`.scrollbar-none::-webkit-scrollbar{display:none;}`}</style>
        {React.Children.map(children, (child, idx) => (
          <div
            role="listitem"
            className={`flex-shrink-0 snap-start ${itemClassName}`}
            style={{ scrollSnapAlign: "start" }}
            data-index={idx}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
