"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type FullImgesSiderProps = {
  images: {
    src: string;
    id: number;
  }[];
};
export default function FullImgesSider({ images }: FullImgesSiderProps) {
  const router = useRouter();

  const [currentImage, setCurrentImge] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImge((prev) => (prev + 1) % (images?.length ?? 0));
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images?.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src ?? ""}
            alt={"Image"}
            // fill
            style={{ objectFit: "cover" }}
            className="object-cover cursor-pointer"
            // priority={index === currentImage}
            onClick={() => {
              router.push(`/score-game/main/${images[currentImage].id}`);
            }}
          />
        </div>
      ))}
    </div>
  );
}
