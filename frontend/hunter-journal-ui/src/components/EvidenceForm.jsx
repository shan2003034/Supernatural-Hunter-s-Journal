import React, { useState } from 'react';
import { Skull } from 'lucide-react';

const EvidenceForm = ({ onAnalyze }) => {
  const [evidence, setEvidence] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (evidence.trim()) onAnalyze(evidence);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] p-8 border border-red-950/50 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-8 duration-700">
      
      <div className="flex items-center justify-center mb-6 text-red-900 animate-pulse">
        <Skull size={48} />
      </div>
      
      <h2 className="text-2xl text-center text-gray-400 mb-8 font-serif italic">
        What did you witness in the dark?
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <textarea
          className="w-full h-48 bg-transparent border-b-2 border-red-950/50 text-gray-300 p-4 focus:outline-none focus:border-red-700 focus:bg-[#111] transition-all resize-none font-serif text-xl leading-relaxed placeholder:text-gray-800"
          placeholder="I heard footsteps in the attic... the room turned freezing cold..."
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          required
        />
        
        <button 
          type="submit"
          className="px-6 py-4 bg-red-950/20 border border-red-900 text-red-500 uppercase tracking-widest font-bold hover:bg-red-900 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(153,27,27,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] flex justify-center items-center"
        >
          Consult the Spirits
        </button>
      </form>
    </div>
  );
};

export default EvidenceForm;