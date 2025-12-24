
import React from 'react';
import { FeeOption, CalculationResults } from '../types';

interface FeeOptionsScreenProps {
  results: CalculationResults;
  selected?: FeeOption;
  onSelect: (opt: FeeOption) => void;
  onBack: () => void;
}

const FeeOptionsScreen: React.FC<FeeOptionsScreenProps> = ({ results, selected, onSelect, onBack }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: results.currency 
    }).format(val).replace('US$', results.currency + ' ');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Fee Proposal Options</h1>
        <p className="text-gray-500">
          Based on your project value of <strong>{formatCurrency(results.constructionCost)}</strong>, we offer two professional fee structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option A: Percentage */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col relative group transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#13a4ec]" />
          <div className="p-8 pb-4 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-1">Option A: Percentage Based</h3>
              <p className="text-sm text-gray-400 font-medium italic">Adjusts with construction value</p>
            </div>
            <span className="bg-[#13a4ec]/10 text-[#13a4ec] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Recommended</span>
          </div>

          <div className="px-8 py-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl font-black text-[#111618] tracking-tighter">{results.feePercentage}%</span>
              <span className="text-xl font-bold text-gray-400">Fee</span>
            </div>
            <p className="text-sm font-bold text-[#111618]">Est. Total: <span className="text-[#13a4ec]">{formatCurrency(results.totalFee)}</span></p>
          </div>

          <div className="px-8 flex-1">
             <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Stage Breakdown</div>
             <div className="space-y-4 mb-8">
                {results.stageBreakdown.map(stage => (
                  <div key={stage.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>{stage.name}</span>
                      <span>{stage.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#13a4ec]" style={{ width: `${stage.percentage}%` }} />
                    </div>
                  </div>
                ))}
             </div>
             <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-xs font-medium text-gray-500">
                   <span className="material-symbols-outlined text-[#13a4ec] text-lg">check_circle</span>
                   Aligned with standard regional fee scales
                </li>
                <li className="flex gap-2 text-xs font-medium text-gray-500">
                   <span className="material-symbols-outlined text-[#13a4ec] text-lg">check_circle</span>
                   Fairly rewards complex design efforts
                </li>
             </ul>
          </div>

          <div className="p-8 pt-0">
            <button 
              onClick={() => onSelect(FeeOption.PERCENTAGE)}
              className="w-full h-14 bg-[#13a4ec] hover:bg-[#118bc7] text-white font-bold rounded-2xl shadow-lg transition-all"
            >
              Select Percentage Fee
            </button>
          </div>
        </div>

        {/* Option B: Fixed Fee */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group transition-all hover:scale-[1.01]">
          <div className="p-8 pb-4 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-1">Option B: Fixed Lump Sum</h3>
              <p className="text-sm text-gray-400 font-medium italic">Budget certainty</p>
            </div>
            <span className="bg-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Capped</span>
          </div>

          <div className="px-8 py-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-black text-[#111618] tracking-tighter">Fixed Range</span>
            </div>
            <p className="text-sm font-bold text-gray-500">Predictable billing regardless of market costs</p>
          </div>

          <div className="px-8 flex-1">
             <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Key Features</div>
             <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm font-medium text-gray-600">
                   <span className="material-symbols-outlined text-gray-300">verified</span>
                   Complete budget certainty from Day 1
                </li>
                <li className="flex gap-3 text-sm font-medium text-gray-600">
                   <span className="material-symbols-outlined text-gray-300">verified</span>
                   No fluctuation with building material price hikes
                </li>
                <li className="flex gap-3 text-sm font-medium text-gray-600">
                   <span className="material-symbols-outlined text-gray-300">verified</span>
                   Includes up to 3 major design revisions
                </li>
                <li className="flex gap-3 text-sm font-medium text-gray-600">
                   <span className="material-symbols-outlined text-gray-300">verified</span>
                   Ideal for standard architectural deliverables
                </li>
             </ul>
             <div className="bg-gray-50 rounded-xl p-4 mb-8">
               <p className="text-xs text-gray-500 leading-relaxed italic">
                 "Fixed fees provide peace of mind for residential clients with strict budgets."
               </p>
             </div>
          </div>

          <div className="p-8 pt-0">
            <button 
              onClick={() => onSelect(FeeOption.FIXED)}
              className="w-full h-14 border border-gray-200 hover:border-[#13a4ec] text-gray-700 font-bold rounded-2xl transition-all"
            >
              Select Fixed Fee
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={onBack} className="text-gray-400 font-bold hover:text-gray-600 transition-colors">
          ← Back to Construction Estimate
        </button>
      </div>
    </div>
  );
};

export default FeeOptionsScreen;
