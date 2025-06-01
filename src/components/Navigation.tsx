"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavigationCardProps = {
  href: string;
  logoSrc: string;
  videoSrc: string;
};

export const NavigationCard = ({
  href,
  logoSrc,
  videoSrc,
}: NavigationCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative block w-[240px] h-36 overflow-hidden rounded-2xl shadow-md bg-neutral-900 transition-transform duration-300 transform hover:scale-[1.06] border-2 border-transparent hover:border-white dark:hover:border-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-full flex items-center justify-center bg-[#111]">
        {!hovered ? (
          <Image
            src={logoSrc}
            alt="Navigation logo"
            width={100}
            height={100}
            className="object-contain p-2 brightness-0 invert"
          />
        ) : (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}
      </div>
    </Link>
  );
};
