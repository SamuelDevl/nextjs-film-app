"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Film } from "./GetFilmApi";

interface Props {
  films: Film[];
}

export default function FilmSlider({ films }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* SLIDER */}
      <div ref={sliderRef} className="keen-slider max-w-7xl w-full px-4">
        {films.map((film) => (
          <div
            key={film.id}
            className="keen-slider__slide relative h-[500px] flex items-center justify-center overflow-hidden rounded-lg"
          >
            {/* Background image */}
            <img
              src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
              alt={film.title}
              className="absolute inset-0 w-full h-full object-cover brightness-85 transition-transform duration-300"
            />

            {/* Text overlay */}
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

      <div className="flex justify-center mt-6 gap-3">
        {films.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 transform 
        ${
          currentSlide === idx
            ? "bg-blue-500 scale-110 shadow-lg dark:bg-gray-400"
            : "bg-gray-300 dark:bg-gray-600 hover:scale-105 hover:bg-gray-400 dark:hover:bg-white"
        }`}
          />
        ))}
      </div>
    </div>
  );
}
