import React, { useState, useRef, useEffect } from 'react';
import GrimoireCover from '../components/GrimoireCover';
import EvidenceForm from '../components/EvidenceForm';
import AnalysisResult from '../components/AnalysisResult';
import LoadingState from '../components/LoadingState';
import History from '../components/History';

const Home = () => {
  const [journalState, setJournalState] = useState('cover'); 
  const [aiResult, setAiResult] = useState(null);

  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    bgMusicRef.current = new Audio('/audio/bg-music.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.15;

    clickSoundRef.current = new Audio('/audio/page-turn.mp3'); 
    
  }, []);

  const openSystem = () => {
    if (bgMusicRef.current) bgMusicRef.current.play().catch(e => console.log(e));
    if (clickSoundRef.current) clickSoundRef.current.play();
    setJournalState('writing');
  };

  const handleAnalyze = async (evidenceText) => {
    setJournalState('analyzing');
    if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play();
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/journal/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidence: evidenceText })
      });
      
      const data = await response.json();
      setAiResult(data);
      setJournalState('result');
      
      
      if (data.audioTheme) {
          const dynamicAudio = new Audio(`/audio/${data.audioTheme}`);
          dynamicAudio.play().catch(e => console.log("Dynamic audio failed", e));
      }
      
    } catch (error) {
      console.error("System Error...", error);
      setAiResult({ error: true, message: "CONNECTION TO MAINFRAME LOST..." });
      setJournalState('result');
    }
  };

  const handleReset = () => {
    if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play();
    }
    setJournalState('writing');
  };

  const viewArchives = () => {
    if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play();
    }
    setJournalState('history');
  };

  return (
    <main className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#020617] text-slate-200 cursor-crosshair">
      
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#020617]"></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto p-6 h-[90vh] flex flex-col">
        
        {journalState === 'cover' ? (
           <div className="h-full flex items-center justify-center">
              <GrimoireCover onOpen={openSystem} />
           </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-4 shrink-0">
              <h1 className="text-xl md:text-2xl font-mono text-cyan-600/50 tracking-[0.2em]">
                [ PARANORMAL INVESTIGATION UNIT ]
              </h1>
              <div className="flex gap-4">
                {journalState !== 'writing' && journalState !== 'history' && (
                  <button onClick={handleReset} className="px-4 py-2 bg-transparent text-slate-400 font-mono text-sm hover:text-cyan-400 transition-colors">
                    NEW SCAN
                  </button>
                )}
                <button 
                  onClick={journalState === 'history' ? handleReset : viewArchives}
                  className="px-6 py-2 bg-[#0a0f16] border border-cyan-900/50 text-cyan-500 font-mono text-sm tracking-widest hover:bg-cyan-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                >
                  {journalState === 'history' ? 'BACK TO DASHBOARD' : 'DATABASE ARCHIVES'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow relative overflow-hidden">
              
              {journalState === 'history' && (
                <div className="lg:col-span-12 h-full">
                  <History /> 
                </div>
              )}

              {journalState !== 'history' && (
                <>
                  <div className="lg:col-span-4 h-full flex flex-col border-r border-slate-800/50 pr-8">
                    <EvidenceForm onAnalyze={handleAnalyze} />
                  </div>

                  <div className="lg:col-span-8 h-full relative">
                    {journalState === 'analyzing' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LoadingState /> 
                      </div>
                    )}

                    {journalState === 'result' && (
                      <AnalysisResult result={aiResult} onReset={handleReset} />
                    )}
                    
                    {journalState === 'writing' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="font-mono text-4xl md:text-6xl tracking-[0.5em] text-center border-4 border-slate-800 p-10 rounded-full select-none">
                          AWAITING DATA
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;