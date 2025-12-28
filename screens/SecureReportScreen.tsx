
import React, { useState } from 'react';
import { CalculationResults, ProjectData } from '../types';

interface SecureReportScreenProps {
  results: CalculationResults;
  projectData: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onBack: () => void;
  onReportGenerated: () => void;
}

const SecureReportScreen: React.FC<SecureReportScreenProps> = ({ results, projectData, onUpdate, onBack, onReportGenerated }) => {
  const [view, setView] = useState<'details' | 'processing' | 'success'>('details');

  const handleSecure = (e: React.FormEvent) => {
    e.preventDefault();
    setView('processing');
    setTimeout(() => setView('success'), 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: results.currency 
    }).format(val).replace('US$', results.currency + ' ');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {view === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-500">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#13a4ec] font-black uppercase tracking-widest text-xs">
                 <span className="material-symbols-outlined text-sm">lock</span>
                 Secure My Report
              </div>
              <h1 className="text-4xl font-black tracking-tight leading-tight">Professionalize your <br/> project today.</h1>
              <p className="text-gray-500 leading-relaxed font-medium">
                 Unlock the full 4-page PDF proposal with detailed regional breakdowns, bank-ready formatting, and structural specs.
              </p>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                 <div className="flex justify-between items-center text-sm font-black">
                    <span className="text-gray-400">Individual Report</span>
                    <span className="text-[#13a4ec]">{formatCurrency(50)}</span>
                 </div>
                 <div className="h-px w-full bg-gray-50" />
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Includes bank-pre approval formatting</p>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-6">
              <div className="text-center">
                 <h3 className="text-xl font-black mb-1">Create Secure Account</h3>
                 <p className="text-xs text-gray-400 font-medium">Download links will be emailed instantly.</p>
              </div>
              
              <form className="space-y-4" onSubmit={handleSecure}>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Full Name</label>
                    <input 
                      required type="text" placeholder="John Doe" 
                      className="w-full h-14 bg-gray-50 border-gray-100 rounded-xl px-5 font-bold"
                      value={projectData.clientDetails.name}
                      onChange={(e) => onUpdate({ clientDetails: { ...projectData.clientDetails, name: e.target.value } })}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email Address</label>
                    <input 
                      required type="email" placeholder="john@company.com" 
                      className="w-full h-14 bg-gray-50 border-gray-100 rounded-xl px-5 font-bold"
                      value={projectData.clientDetails.email}
                      onChange={(e) => onUpdate({ clientDetails: { ...projectData.clientDetails, email: e.target.value } })}
                    />
                 </div>
                 <button className="w-full h-16 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl shadow-[#13a4ec]/20 text-lg flex items-center justify-center gap-2">
                    Pay & Generate Report
                    <span className="material-symbols-outlined">payments</span>
                 </button>
              </form>
           </div>
        </div>
      )}

      {view === 'processing' && (
        <div className="h-[400px] flex flex-col items-center justify-center gap-6 text-center animate-in zoom-in duration-500">
           <div className="size-16 border-4 border-[#13a4ec] border-t-transparent rounded-full animate-spin" />
           <div>
              <h2 className="text-2xl font-black mb-1">Finalizing Proposal</h2>
              <p className="text-gray-400 font-medium">Encoding structural specifications for {projectData.country}...</p>
           </div>
        </div>
      )}

      {view === 'success' && (
        <div className="bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8 animate-in zoom-in duration-500 max-w-2xl mx-auto">
           <div className="size-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-5xl font-bold">verified</span>
           </div>
           <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight">Report Generated</h2>
              <p className="text-gray-400 font-medium">Your professional project proposal is ready for review.</p>
           </div>
           <button 
             onClick={onReportGenerated}
             className="w-full h-16 bg-[#111618] text-white font-black rounded-2xl text-lg flex items-center justify-center gap-3 shadow-2xl shadow-black/20"
           >
              <span className="material-symbols-outlined">description</span>
              Open Full Premium Report
           </button>
        </div>
      )}

      {view === 'details' && (
        <div className="mt-12 text-center">
           <button onClick={onBack} className="text-gray-400 font-bold hover:text-gray-800 transition-colors">← Back to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default SecureReportScreen;
