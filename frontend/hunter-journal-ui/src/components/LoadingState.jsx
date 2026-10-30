import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingState = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  const symbolRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
     
      gsap.to(glowRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      });

      
      gsap.to(textRef.current, {
        opacity: 0.3,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "rough({ strength: 2, points: 20 })",
        delay: Math.random()
      });

      
      gsap.to(symbolRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "linear"
      });
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-20">
      
      
      <div className="relative flex items-center justify-center w-32 h-32 mb-12">
        <div ref={glowRef} className="absolute w-full h-full border-2 border-red-700 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.8)]"></div>
        <div className="absolute w-28 h-28 border border-red-900 border-dashed rounded-full animate-spin-slow"></div>
        <div ref={symbolRef} className="text-red-600 text-6xl drop-shadow-[0_0_15px_rgba(220,38,38,1)]">
          ⛧
        </div>
      </div>

   
      <h3 ref={textRef} className="text-2xl md:text-3xl text-red-600 font-serif tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
        Consulting the Lore...
      </h3>
      <p className="text-gray-500 mt-4 italic font-serif text-sm tracking-wider">
        Do not look away...
      </p>

    </div>
  );
};

export default LoadingState;