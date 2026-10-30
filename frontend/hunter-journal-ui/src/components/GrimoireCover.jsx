import React from 'react';
import { BookOpen } from 'lucide-react';

const GrimoireCover = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 animate-in fade-in duration-1000">
      <h1 className="text-5xl md:text-7xl font-bold text-red-950 tracking-widest drop-shadow-[0_0_15px_rgba(153,27,27,0.5)]">
        THE GRIMOIRE
      </h1>
      
      <p className="text-gray-500 italic max-w-md text-lg">
        "Once opened, the spirits will hear you. Proceed with caution."
      </p>
      
      <button 
        onClick={onOpen}
        className="group relative px-8 py-4 bg-transparent border-2 border-red-950 text-red-800 font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:text-black hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
      >
        <div className="absolute inset-0 w-0 bg-red-800 transition-all duration-[300ms] ease-out group-hover:w-full -z-10"></div>
        <span className="relative z-10 flex items-center gap-3">
          <BookOpen size={24} className="group-hover:animate-bounce" />
          Open the Journal
        </span>
      </button>
    </div>
  );
};

export default GrimoireCover;