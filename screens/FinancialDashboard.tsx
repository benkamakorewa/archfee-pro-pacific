
import React from 'react';
import { CalculationResults, ProjectData, FeeOption } from '../types';

interface FinancialDashboardProps {
  results: CalculationResults;
  projectData: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ results, projectData, onUpdate, onNext, onBack }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: results.currency 
    }).format(val).replace('US$', results.currency + ' ');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight mb-2">Your Indicative Cost Plan</h1>
        <p className="text-gray-500">A high-level financial summary for professional planning.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Building Cost Summary */}
        <div className="lg:col-span-4 bg-[#111618] rounded-[2.5rem] p-10 text-white shadow-2xl space-y-10">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Construction Total</p>
              <p className="text-5xl font-black text-[#13a4ec] tracking-tighter">{formatCurrency(results.constructionCost)}</p>
           </div>
           
           <div className="space-y-4 pt-10 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-bold text-white/60 uppercase tracking-widest">
                 <span>Structure Only</span>
                 <span className="text-white">{formatCurrency(results.constructionCost - results.infraCost - results.contingency)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-white/60 uppercase tracking-widest">
                 <span>Site Infra</span>
                 <span className="text-white">{formatCurrency(results.infraCost)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-white/60 uppercase tracking-widest">
                 <span>Contingency (7%)</span>
                 <span className="text-white">{formatCurrency(results.contingency)}</span>
              </div>
           </div>

           <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                 <span className="material-symbols-outlined text-[#13a4ec]">info</span>
                 <p className="text-sm font-black">Regional Note</p>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-medium">
                 Costs calculated for {projectData.location}, {projectData.country} using localized per-m² rates synced via live feed.
              </p>
           </div>
        </div>

        {/* Right: Architectural Fee Selection */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-black tracking-tight">Select Architecture Fee Structure</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Est: {formatCurrency(results.totalFee)}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => onUpdate({ selectedFeeOption: FeeOption.PERCENTAGE })}
                className={`p-8 rounded-[2rem] border-2 text-left transition-all flex flex-col gap-6 group relative ${
                  projectData.selectedFeeOption === FeeOption.PERCENTAGE ? 'border-[#13a4ec] bg-white shadow-xl' : 'border-transparent bg-white opacity-60'
                }`}
              >
                 {projectData.selectedFeeOption === FeeOption.PERCENTAGE && (
                   <div className="absolute top-6 right-6 text-[#13a4ec]"><span className="material-symbols-outlined font-black">check_circle</span></div>
                 )}
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Option 1</p>
                    <h4 className="text-xl font-black">Percentage Base</h4>
                 </div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#13a4ec]">{results.feePercentage}%</span>
                    <span className="text-xs font-bold text-gray-400">Rate</span>
                 </div>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Fees scale with the project complexity and construction value. The regional standard for {projectData.country}.
                 </p>
              </button>

              <button 
                onClick={() => onUpdate({ selectedFeeOption: FeeOption.FIXED })}
                className={`p-8 rounded-[2rem] border-2 text-left transition-all flex flex-col gap-6 group relative ${
                  projectData.selectedFeeOption === FeeOption.FIXED ? 'border-[#13a4ec] bg-white shadow-xl' : 'border-transparent bg-white opacity-60'
                }`}
              >
                 {projectData.selectedFeeOption === FeeOption.FIXED && (
                   <div className="absolute top-6 right-6 text-[#13a4ec]"><span className="material-symbols-outlined font-black">check_circle</span></div>
                 )}
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Option 2</p>
                    <h4 className="text-xl font-black">Fixed Lump Sum</h4>
                 </div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#13a4ec]">Fixed</span>
                    <span className="text-xs font-bold text-gray-400">Rate</span>
                 </div>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Total budget certainty. Recommended for standard residential projects with strictly defined scopes.
                 </p>
              </button>
           </div>

           <div className="flex justify-between items-center pt-8 border-t border-gray-100">
              <button onClick={onBack} className="text-gray-400 font-bold">Edit Parameters</button>
              <button onClick={onNext} className="h-16 px-16 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl shadow-[#13a4ec]/20 text-lg">
                 Secure PDF Proposal
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
