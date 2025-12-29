
import React, { useState } from 'react';
import { CalculationResults, ProjectData, FeeOption, ResidentialCategory } from '../types';

interface FinancialDashboardProps {
   results: CalculationResults;
   projectData: ProjectData;
   onUpdate: (updates: Partial<ProjectData>) => void;
   onNext: () => void;
   onBack: () => void;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ results, projectData, onUpdate, onNext, onBack }) => {
   const [interestRate, setInterestRate] = useState(6.5);
   const [loanTerm, setLoanTerm] = useState(25);

   const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: results.currency
      }).format(val).replace('US$', results.currency + ' ');
   };

   // Monthly Repayment Calculation
   const monthlyRate = (interestRate / 100) / 12;
   const numPayments = loanTerm * 12;
   const monthlyRepayment = (results.constructionCost * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

   return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
         <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-xl">
               <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#13a4ec]/10 text-[#13a4ec] text-[10px] font-black uppercase tracking-widest rounded-full">Pro Summary</span>
                  <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest">/</span>
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{projectData.country}</span>
               </div>
               <h1 className="text-5xl font-black tracking-tight mb-2">Cost Plan Summary</h1>
               <p className="text-gray-500 font-medium leading-relaxed">High-level financial overview for developers and bank submissions in {projectData.location}, {projectData.country}.</p>
            </div>
            <div className="flex gap-3">
               <div className="h-12 px-5 bg-white shadow-sm text-green-700 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 border border-gray-100">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                  Live Market Feed: {projectData.location}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Col: Main Totals */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="bg-[#111618] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                     <span className="material-symbols-outlined text-[200px] font-black">bar_chart_4_bars</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Total Construction Est.</p>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#13a4ec] tracking-tighter mb-12 truncate" title={formatCurrency(results.constructionCost)}>{formatCurrency(results.constructionCost)}</h2>

                  <div className="space-y-5 pt-10 border-t border-white/10">
                     <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                        <span>Base Build</span>
                        <span className="text-white">{formatCurrency(results.constructionCost - results.infraCost - results.contingency - results.resiliencePremium)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black text-[#13a4ec] uppercase tracking-widest">
                        <span>Resilience</span>
                        <span className="text-white">{formatCurrency(results.resiliencePremium)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                        <span>Logistics & Site</span>
                        <span className="text-white">{formatCurrency(results.infraCost)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                        <span>Contingency</span>
                        <span className="text-white/60">{formatCurrency(results.contingency)}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                     <div className="size-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">calculate</span>
                     </div>
                     <div>
                        <h4 className="font-black text-sm uppercase tracking-widest">Bank Feasibility Repayment</h4>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-none mt-1">Indicative mortgage planning based on construction value.</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interest Rate</p>
                           <p className="text-xs font-black text-[#111618]">{interestRate}%</p>
                        </div>
                        <input type="range" min="3" max="15" step="0.25" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-full appearance-none accent-[#13a4ec]" />
                     </div>

                     <div className="p-6 bg-gray-50 rounded-2xl flex justify-between items-center">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly P+I ({results.currency})</p>
                           <p className="text-2xl font-black text-[#111618]">{formatCurrency(monthlyRepayment)}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Term</p>
                           <p className="text-xs font-black text-gray-500">{loanTerm} Years</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Col: Fee Options */}
            <div className="lg:col-span-8 flex flex-col gap-8">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-black tracking-tight leading-none">Architectural Fee Structures</h3>
                  <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     Est. Total Fee: <span className="text-[#13a4ec]">{formatCurrency(results.totalFee)}</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button
                     onClick={() => onUpdate({ selectedFeeOption: FeeOption.PERCENTAGE })}
                     className={`p-10 rounded-[3rem] border-2 text-left transition-all flex flex-col gap-8 relative overflow-hidden group ${projectData.selectedFeeOption === FeeOption.PERCENTAGE ? 'border-[#13a4ec] bg-white shadow-2xl' : 'border-white bg-white hover:border-gray-50'
                        }`}
                  >
                     {projectData.selectedFeeOption === FeeOption.PERCENTAGE && (
                        <div className="absolute top-8 right-8 text-[#13a4ec] animate-in zoom-in"><span className="material-symbols-outlined text-3xl font-black">verified</span></div>
                     )}
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Standard Delivery</p>
                        <h4 className="text-2xl font-black">Percentage Base</h4>
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-[#13a4ec] tracking-tighter">{results.feePercentage}%</span>
                        <span className="text-xs font-bold text-gray-400">Rate</span>
                     </div>
                     <div className="space-y-4 pt-6 border-t border-gray-50">
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Professional service fee calculated as a percentage of construction value. Standard Pacific model.</p>
                     </div>
                  </button>

                  <button
                     onClick={() => onUpdate({ selectedFeeOption: FeeOption.FIXED })}
                     className={`p-10 rounded-[3rem] border-2 text-left transition-all flex flex-col gap-8 relative overflow-hidden group ${projectData.selectedFeeOption === FeeOption.FIXED ? 'border-[#13a4ec] bg-white shadow-2xl' : 'border-white bg-white hover:border-gray-50'
                        }`}
                  >
                     {projectData.selectedFeeOption === FeeOption.FIXED && (
                        <div className="absolute top-8 right-8 text-[#13a4ec] animate-in zoom-in"><span className="material-symbols-outlined text-3xl font-black">verified</span></div>
                     )}
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Budget Certainty</p>
                        <h4 className="text-2xl font-black">Fixed Lump Sum</h4>
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-[#13a4ec] tracking-tighter">Fixed</span>
                        <span className="text-xs font-bold text-gray-400">Security</span>
                     </div>
                     <div className="space-y-4 pt-6 border-t border-gray-50">
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Pre-agreed lump sum fee for the entire project life-cycle. Provides ultimate budget security.</p>
                     </div>
                  </button>
               </div>

               <div className="flex justify-between items-center pt-10 border-t border-gray-100">
                  <button onClick={onBack} className="text-gray-400 font-black flex items-center gap-2 hover:text-[#111618] transition-all">
                     <span className="material-symbols-outlined text-sm">arrow_back</span>
                     Edit Build Parameters
                  </button>
                  <button onClick={onNext} className="h-20 px-16 bg-[#13a4ec] text-white font-black rounded-3xl shadow-2xl shadow-[#13a4ec]/30 text-xl hover:scale-[1.02] transition-all flex items-center gap-4">
                     Generate Bank-Ready PDF
                     <span className="material-symbols-outlined">description</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FinancialDashboard;
