
import React, { useState } from 'react';
import { ConstructionStandard, CountryKey } from '../types';
import { REGIONAL_DATA } from '../constants';

interface ConstructionStandardScreenProps {
  value: ConstructionStandard;
  country: CountryKey;
  onSelect: (s: ConstructionStandard) => void;
  onNext: () => void;
  onBack: () => void;
}

const ConstructionStandardScreen: React.FC<ConstructionStandardScreenProps> = ({ 
  value, 
  country,
  onSelect, 
  onNext, 
  onBack 
}) => {
  const [showGuide, setShowGuide] = useState(false);
  const regionConfig = REGIONAL_DATA[country];

  const options = [
    { 
      type: ConstructionStandard.BASIC, 
      icon: 'home',
      desc: 'Budget-friendly essentials',
      features: ['Laminate flooring', 'Standard fixtures', 'Basic trim package'],
      detailed: `Ideal for secondary dwellings or budget-conscious builds. Utilizes local timber and standard finishes widely available in ${country} hardware stores.`,
      sustainability: 'Minimum NBC compliance. Includes basic roof insulation and standard LED lighting.'
    },
    { 
      type: ConstructionStandard.STANDARD, 
      icon: 'grade',
      desc: 'Quality balance for living',
      features: ['Ceramic tile/Hardwood', 'Quartz surfaces', 'Upgraded insulation'],
      popular: true,
      detailed: 'Our most common selection. Balanced for long-term durability in the Pacific climate, featuring cyclone-rated joinery and imported kitchen/bath fixtures.',
      sustainability: 'Solar-ready wiring, passive ventilation design, and WELS 3-star rated water fixtures.'
    },
    { 
      type: ConstructionStandard.HIGH_END, 
      icon: 'diamond',
      desc: 'Premium luxury & custom',
      features: ['Natural stone', 'Custom millwork', 'Smart home integration'],
      detailed: 'Architectural luxury. Includes premium European fixtures, custom-built joinery, high-spec solar integration, and high-performance glass.',
      sustainability: 'Full Solar PV system, smart energy management, greywater recycling, and high-thermal performance glass.'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4 tracking-tight">Select Construction Standard</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          This establishes the base cost per square meter in <strong>{regionConfig.currency}</strong>.
        </p>
        <button 
          onClick={() => setShowGuide(true)}
          className="mt-6 inline-flex items-center gap-2 text-[#13a4ec] font-bold hover:underline"
        >
          <span className="material-symbols-outlined">info</span>
          View Detailed Comparison Guide
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {options.map((opt) => (
          <div
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className={`relative flex flex-col p-8 gap-6 rounded-[2.5rem] border-2 transition-all cursor-pointer group shadow-sm ${
              value === opt.type 
                ? 'border-[#13a4ec] bg-white ring-8 ring-[#13a4ec]/5' 
                : 'border-white bg-white hover:border-gray-100'
            }`}
          >
            {opt.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#13a4ec] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-10">
                Most Popular
              </div>
            )}
            
            <div className="flex justify-between items-start">
              <div className={`size-16 rounded-3xl flex items-center justify-center shadow-sm transition-colors ${
                value === opt.type ? 'bg-[#13a4ec]/10 text-[#13a4ec]' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
              }`}>
                <span className="material-symbols-outlined text-4xl font-light">{opt.icon}</span>
              </div>
              <div className={`size-7 rounded-full border-2 flex items-center justify-center transition-all ${
                value === opt.type ? 'bg-[#13a4ec] border-[#13a4ec]' : 'border-gray-200'
              }`}>
                {value === opt.type && <span className="material-symbols-outlined text-white text-base">check</span>}
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-black mb-2 ${value === opt.type ? 'text-[#111618]' : ''}`}>{opt.type}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{opt.desc}</p>
            </div>

            <div className="h-px w-full bg-gray-100" />

            <ul className="flex-1 space-y-4">
              {opt.features.map(f => (
                <li key={f} className="flex items-center gap-4 text-sm font-semibold text-gray-600">
                  <div className={`size-5 rounded-full flex items-center justify-center border ${value === opt.type ? 'border-[#13a4ec] text-[#13a4ec]' : 'border-green-500 text-green-500'}`}>
                    <span className="material-symbols-outlined text-xs font-bold">check</span>
                  </div>
                  {f}
                </li>
              ))}
              <li className="flex gap-4 p-3 rounded-xl bg-green-50 border border-green-100 mt-2">
                 <span className="material-symbols-outlined text-green-600 text-sm">eco</span>
                 <p className="text-[11px] font-bold text-green-700 leading-tight">
                    {opt.sustainability.substring(0, 60)}...
                 </p>
              </li>
            </ul>

            <button className={`w-full h-14 rounded-2xl font-black transition-all ${
              value === opt.type ? 'bg-[#13a4ec] text-white shadow-lg shadow-[#13a4ec]/20' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}>
              {value === opt.type ? 'Selected' : `Select ${opt.type}`}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-10 border-t border-gray-200 mt-8">
        <button onClick={onBack} className="text-gray-400 font-bold flex items-center gap-2 hover:text-[#111618] transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Floor Area
        </button>
        <button onClick={onNext} className="h-14 px-12 bg-[#13a4ec] text-white font-black rounded-2xl flex items-center gap-3 shadow-xl shadow-[#13a4ec]/20 hover:bg-[#118bc7] transition-all">
          Continue to Location
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#111618]/60 backdrop-blur-md" onClick={() => setShowGuide(false)} />
          <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in duration-300">
            <div className="p-8 lg:p-12 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black text-[#111618] mb-2 tracking-tight">{country} Standards Guide</h2>
                <p className="text-gray-500 font-medium">Detailed breakdown of material quality and energy efficiency standards.</p>
              </div>
              <button onClick={() => setShowGuide(false)} className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {options.map(opt => (
                  <div key={opt.type} className="space-y-6">
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-[#13a4ec] font-bold">{opt.icon}</span>
                       <h4 className="text-xl font-black uppercase tracking-widest text-[#111618]">{opt.type}</h4>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{opt.detailed}</p>
                    <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                       <p className="text-xs font-bold text-green-800">{opt.sustainability}</p>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-gray-50">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Compliance Code</p>
                          <p className="text-sm font-bold text-gray-700">{regionConfig.buildingCode}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 lg:p-12 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                     <span className="material-symbols-outlined">workspace_premium</span>
                  </div>
                  <div className="text-left">
                     <p className="text-sm font-black text-gray-700">{country} Green Building Standards</p>
                     <p className="text-xs text-gray-400 font-medium">All estimates align with local {country} building regulations.</p>
                  </div>
               </div>
               <button onClick={() => setShowGuide(false)} className="h-14 px-12 bg-[#111618] text-white font-black rounded-2xl hover:bg-black transition-all">
                 I Understand, Close Guide
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructionStandardScreen;
