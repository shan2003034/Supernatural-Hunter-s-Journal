import React from 'react';

const AnalysisResult = ({ result, onReset }) => {
  if (!result) return null;

  
  const text = result.fullAnalysis || "";
  const sections = text.split('##').filter(s => s.trim().length > 0);

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in duration-700">
      
     
      <div className="flex justify-between items-end border-b border-cyan-900 pb-4 mb-6 shrink-0">
        <div>
          <p className="text-cyan-600/70 font-mono text-sm tracking-widest mb-1">SYSTEM ALERT</p>
          <h2 className="text-xl md:text-2xl text-cyan-400 font-mono font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] line-clamp-2">
            [ STATUS: {result.entityType ? 'ENTITY IDENTIFIED' : 'UNKNOWN'} ]
          </h2>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2 bg-cyan-950/50 text-cyan-400 border border-cyan-800 font-mono text-sm uppercase tracking-widest hover:bg-cyan-900 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
        >
          Initialize New Scan
        </button>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar pr-2 h-[65vh] pb-10">
        {result.error ? (
          <div className="col-span-full bg-red-950/30 border border-red-900 p-6 rounded text-red-500 font-mono text-center">
            [ ERROR ] {result.message}
          </div>
        ) : (
          sections.map((section, index) => {
            
            const [title, ...contentArr] = section.split('\n');
            const content = contentArr.join('\n').trim();
            
            
            const isDanger = title.toLowerCase().includes('danger') || title.toLowerCase().includes('defeat');
            const borderColor = isDanger ? 'border-red-900/60' : 'border-slate-800';
            const titleColor = isDanger ? 'text-red-500' : 'text-cyan-500';
            const shadowHover = isDanger ? 'hover:shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]';

            return (
              <div key={index} className={`bg-[#0a0f16]/80 backdrop-blur-md border ${borderColor} p-5 rounded-lg transition duration-300 ${shadowHover}`}>
                <h3 className={`${titleColor} font-mono font-bold text-lg mb-3 uppercase border-b border-slate-800 pb-2 flex items-center`}>
                  <span className="mr-2">■</span> {title.trim()}
                </h3>
                <p className="text-slate-300 font-sans text-sm whitespace-pre-wrap leading-relaxed">
                  {content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;