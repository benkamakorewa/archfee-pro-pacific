
import React, { useState } from 'react';
import { CalculationResults, ProjectData } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ResultScreenProps {
  results: CalculationResults;
  projectData: ProjectData;
  onNext: () => void;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ results, projectData, onNext, onBack }) => {
  const [showAIConsultant, setShowAIConsultant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: results.currency
    }).format(val).replace('US$', results.currency + ' ');
  };

  const askAI = async () => {
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `You are a regional architectural advisor for the Pacific.
Project Context:
- Country: ${projectData.country}
- Location: ${projectData.location}
- Building: ${projectData.buildingType}, ${projectData.floorArea}m², ${projectData.doubleStorey ? 'Double Storey' : 'Single Storey'}
- Land: ${projectData.landType}
- Infrastructure: ${projectData.infrastructure.waterHarvesting ? 'Water Tank,' : ''} ${projectData.infrastructure.solarSystem ? 'Solar,' : ''} ${projectData.infrastructure.septicSystem ? 'Septic' : ''}
- Estimate: ${results.constructionCost} ${results.currency}

Provide 3 professional, expert advice points for this specific project. 
Focus on regional logistics, climate resilience (cyclone/seismic), and localized cost optimization. 
Format as a Markdown list. Keep it concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAiAdvice(response.text || "Advice currently unavailable.");
    } catch (error) {
      console.error("Gemini AI Error:", error);
      setAiAdvice("Failed to consult the AI advisor. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-10 border-b border-gray-50 bg-[#13a4ec]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {projectData.country} Preliminary Plan
              </span>
              {results.isLive && (
                <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="size-1 bg-green-500 rounded-full animate-pulse" />
                  Live Market Feed
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black text-[#111618] tracking-tight">Indicative Cost Plan</h1>
            <p className="text-gray-500 mt-2 font-medium">
              Estimated for professional planning in <strong>{results.currency}</strong>.
              {results.lastSync && <span className="text-[10px] block text-gray-400 mt-1 uppercase tracking-widest font-bold">Rates Synced at {results.lastSync}</span>}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#13a4ec]/10 text-right min-w-[240px]">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Estimated Cost</p>
            <p className="text-4xl font-black text-[#13a4ec] tracking-tighter">{formatCurrency(results.constructionCost)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x border-gray-100">
          <div className="p-10 flex flex-col gap-6 lg:col-span-1">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#13a4ec]">analytics</span>
              Project Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Rate / m²</span>
                <span className="text-sm font-black">{formatCurrency(results.ratePerM2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Site Infra</span>
                <span className="text-sm font-black">{formatCurrency(results.infraCost)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resilience Premium</span>
                <span className="text-sm font-black">{formatCurrency(results.resiliencePremium)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Legal & Land</span>
                <span className="text-sm font-black">{formatCurrency(results.landLegalEstimate)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Contingency</span>
                <span className="text-sm font-black text-blue-700">{formatCurrency(results.contingency)}</span>
              </div>
            </div>
            <button onClick={() => { setShowAIConsultant(true); if (!aiAdvice) askAI(); }} className="mt-4 flex items-center justify-center gap-3 p-4 bg-[#111618] text-white rounded-2xl font-bold shadow-lg hover:bg-black transition-all">
              <span className="material-symbols-outlined">psychology</span>
              Consult Regional AI
            </button>
          </div>

          <div className="p-10 flex flex-col gap-6 lg:col-span-1 bg-gray-50/50">
            <h3 className="text-lg font-bold">Banking & Finance</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Unlock the full PDF proposal to share this estimate with major Pacific lenders for initial pre-assessment.
              Our reports include the structural resilience breakdown required by many insurers.
            </p>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Currency Lock</p>
              <p className="text-sm font-bold">All reports fixed in {results.currency}</p>
            </div>
          </div>

          <div className="p-10 flex flex-col gap-8 bg-gray-50/30 lg:col-span-1">
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
              <p className="text-sm text-blue-700 font-bold mb-1">Architecture Fees</p>
              <p className="text-xs text-blue-600">Generate a localized fee proposal in {results.currency} based on this project scope.</p>
            </div>
            <div className="mt-auto space-y-3">
              <button onClick={onNext} className="w-full h-14 bg-[#13a4ec] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                View Fee Proposal
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button onClick={onBack} className="w-full py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                Recalculate Estimate
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAIConsultant && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAIConsultant(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-black">Regional AI Advisor</h3>
              <button onClick={() => setShowAIConsultant(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <div className="size-10 border-4 border-[#13a4ec] border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-bold text-sm">Consulting regional experts...</p>
                </div>
              ) : (
                <div className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
                  {aiAdvice}
                </div>
              )}
            </div>
            <div className="p-8 border-t border-gray-100">
              <button onClick={() => setShowAIConsultant(false)} className="w-full h-14 bg-[#111618] text-white font-black rounded-xl">Close Advisor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
