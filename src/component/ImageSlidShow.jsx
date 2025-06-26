import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Explore the Future",
    subtitle: "Discover innovation beyond limits.",
  },
  {
    img: "https://www.cato.org/sites/cato.org/files/styles/optimized/public/2023-11/fast-fashion2.jpeg?itok=qCMa7eGV",
    title: "Seamless Experience",
    subtitle: "Design meets performance perfectly.",
  },
  {
    img: "https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/04ApparelFootwear.jpg?h=464&iar=0&w=1392&rev=69858498252c43a4aec6e62f30c0aac9&hash=4F48084E977F81C37D1D04F7AF2D4F82",
    title: "Elevate Your World",
    subtitle: "Technology reimagined for you.",
  },
];

const ImageSlidShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1200px] h-64 md:h-[400px] mx-auto overflow-hidden rounded-2xl shadow-lg mt-10"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * width}px`,
          transform: `translateX(-${currentIndex * width}px)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-64 md:h-[400px]"
            style={{ width: `${width}px`, flexShrink: 0 }}
          >
            <img
              src={slide.img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="text-sm md:text-lg mt-2">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 text-black p-2 rounded-full hover:bg-white z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 text-black p-2 rounded-full hover:bg-white z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ImageSlidShow;
