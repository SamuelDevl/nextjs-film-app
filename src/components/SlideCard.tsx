"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef } from "react";
import { Film } from "./GetFilmApi";

// Autoplay plugin
function autoplayPlugin(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 4000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

interface Props {
  films: Film[];
}

export default function FilmSlider({ films }: Props) {
  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 15,
      },
    },
    [autoplayPlugin]
  );

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative max-w-7xl w-full px-4">
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
          {films.map((film) => (
            <div
              key={film.id}
              className="keen-slider__slide relative h-[500px] flex items-center justify-center"
            >
              {/* Background image */}
              <img
                src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                alt={film.title}
                className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-300"
              />

              {/* Overlay content */}
              <div className="relative z-10 text-white text-center max-w-3xl px-4 font-quicksand">
                <h2 className="text-3xl md:text-5xl font-oswald font-bold mb-4">
                  {film.title}
                </h2>
                <p className="text-sm text-gray-200 mb-2">{film.release_date}</p>
                <p className="text-md md:text-lg line-clamp-3">{film.overview}</p>
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 z-0" />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 z-20"
        >
          ←
        </button>
        <button
          onClick={() => slider.current?.next()}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 z-20"
        >
          →
        </button>
      </div>
    </div>
  );
}
