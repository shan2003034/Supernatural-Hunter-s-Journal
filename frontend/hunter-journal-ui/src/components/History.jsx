import React, { useState, useEffect } from 'react';

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
 
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/journal/history');
        if (!response.ok) throw new Error("Failed to connect to the database.");
        
        const data = await response.json();
        setRecords(data);
        if (data.length > 0) {
          setSelectedRecord(data[0]); 
        }
      } catch (err) {
        setError("DATABASE CONNECTION LOST...");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  
  const renderAnalysis = (text) => {
    if (!text) return null;
    const sections = text.split('##').filter(s => s.trim().length > 0);
    
    return sections.map((section, index) => {
      const [title, ...contentArr] = section.split('\n');
      const content = contentArr.join('\n').trim();
      
      const isDanger = title.toLowerCase().includes('danger') || title.toLowerCase().includes('defeat');
      const borderColor = isDanger ? 'border-red-900/60' : 'border-slate-800';
      const titleColor = isDanger ? 'text-red-500' : 'text-cyan-500';

      return (
        <div key={index} className={`bg-[#0a0f16]/80 border ${borderColor} p-4 rounded mb-4`}>
          <h4 className={`${titleColor} font-mono font-bold text-md mb-2 uppercase border-b border-slate-800 pb-1`}>
            ■ {title.trim()}
          </h4>
          <p className="text-slate-300 font-sans text-sm whitespace-pre-wrap">{content}</p>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-cyan-500 font-mono tracking-widest animate-pulse">
        [ ACCESSING MAINFRAME ARCHIVES... ]
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 font-mono tracking-widest text-xl">
        [ ERROR: {error} ]
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[75vh] w-full gap-6 animate-in fade-in duration-700">
      
      
      <div className="w-full md:w-1/3 flex flex-col border border-slate-800 bg-[#020617]/50 rounded-lg overflow-hidden">
        <div className="bg-slate-900 p-4 border-b border-slate-800 shrink-0">
          <h2 className="text-cyan-500 font-mono font-bold tracking-widest uppercase">Index Files</h2>
          <p className="text-slate-500 text-xs font-mono">Total Records: {records.length}</p>
        </div>
        
        <div className="overflow-y-auto custom-scrollbar flex-grow p-2">
          {records.length === 0 ? (
            <p className="text-slate-500 text-center mt-10 font-mono text-sm">NO RECORDS FOUND</p>
          ) : (
            records.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className={`w-full text-left p-3 mb-2 rounded font-mono transition-all duration-300 border-l-4 ${
                  selectedRecord?.id === record.id 
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                    : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-500'
                }`}
              >
                <div className={`font-bold text-sm truncate ${selectedRecord?.id === record.id ? 'text-cyan-400' : 'text-slate-300'}`}>
                  {record.entityType || "UNKNOWN ENTITY"}
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  {new Date(record.encounteredAt).toLocaleString()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      
      <div className="w-full md:w-2/3 flex flex-col border border-slate-800 bg-[#020617]/50 rounded-lg overflow-hidden">
        {selectedRecord ? (
          <>
            <div className="bg-slate-900 p-4 border-b border-slate-800 shrink-0">
              <h2 className="text-xl text-cyan-400 font-mono font-bold tracking-widest">
                [ {selectedRecord.entityType || "UNKNOWN ENTITY"} ]
              </h2>
              <p className="text-slate-500 text-xs font-mono mt-1">
                ENCOUNTERED: {new Date(selectedRecord.encounteredAt).toLocaleString()} | REF: #{selectedRecord.id}
              </p>
            </div>
            
            <div className="overflow-y-auto custom-scrollbar flex-grow p-6">
              <div className="mb-6 bg-slate-900/50 p-4 rounded border border-slate-800">
                <h3 className="text-slate-400 font-mono text-xs mb-2 tracking-widest">USER EVIDENCE / LOG:</h3>
                <p className="text-slate-300 font-serif italic whitespace-pre-wrap">{selectedRecord.userEvidence}</p>
              </div>
              
              <div>
                <h3 className="text-slate-400 font-mono text-xs mb-4 tracking-widest">AI ANALYSIS:</h3>
                {renderAnalysis(selectedRecord.fullAnalysis)}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-600 font-mono tracking-widest">
            SELECT A RECORD TO VIEW
          </div>
        )}
      </div>

    </div>
  );
};

export default History;