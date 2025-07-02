"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Función para detectar y convertir URLs de YouTube
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  // Patrones para diferentes formatos de YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&rel=0&modestbranding=1`;
    }
  }

  return null;
};

// Función para verificar si es una URL de YouTube
const isYouTubeUrl = (url) => {
  if (!url) return false;
  return /(?:youtube\.com|youtu\.be)/.test(url);
};

const BannerPrincipal = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return (
      <div className="relative h-[600px] bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            No hay elementos en el carrusel
          </h2>
          <p className="text-lg opacity-80">
            Agrega elementos desde el panel de administración
          </p>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image or Video */}
      <div className="absolute inset-0">
        {currentItem.videoUrl ? (
          isYouTubeUrl(currentItem.videoUrl) ? (
            <iframe
              src={getYouTubeEmbedUrl(currentItem.videoUrl)}
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={currentItem.videoUrl} type="video/mp4" />
            </video>
          )
        ) : currentItem.imageUrl ? (
          <Image
            src={currentItem.imageUrl || "/placeholder.svg"}
            alt={currentItem.title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          {/* Badge */}
          <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            CORPORACIÓN R&L
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {currentItem.title}
          </h1>

          {/* Description */}
          {currentItem.description && (
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {currentItem.description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentItem.buttonText && (
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                onClick={() =>
                  currentItem.buttonLink &&
                  window.open(currentItem.buttonLink, "_blank")
                }
              >
                {currentItem.buttonText}
              </Button>
            )}

            {currentItem.secondaryButtonText && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 bg-transparent"
                onClick={() =>
                  currentItem.secondaryButtonLink &&
                  window.open(currentItem.secondaryButtonLink, "_blank")
                }
              >
                {currentItem.secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerPrincipal;
