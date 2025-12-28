
import React from 'react';
import { ProjectData, LandType, ResidentialCategory } from '../types';

interface ResilienceScreenProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ResilienceScreen: React.FC<ResilienceScreenProps> = ({ data, onUpdate, onNext, onBack }) => {
  const landTypes = Object.values(LandType);

  const toggleInfra = (key: keyof ProjectData['infrastructure']) => {
    onUpdate({
      infrastructure: {
        ...data.infrastructure,
        [key]: !data.infrastructure[key]
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight mb-3">Site & Resilience</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Address critical climate resilience and off-grid requirements specific to {data.country} site conditions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Land Tenure & Legal */}
        {/* Left: Resilience Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl font-black">gavel</span>
              </div>
              <div>
                <h3 className="text-xl font-black">Land Tenure</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Selected in Market Factors</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm font-black text-gray-500 mb-1">Current Selection</p>
              <p className="text-xl font-black text-[#111618]">{data.landType}</p>
            </div>

            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex gap-4">
              <span className="material-symbols-outlined text-orange-600">info</span>
              <p className="text-[11px] font-bold text-orange-800 leading-relaxed italic uppercase tracking-wider">
                {data.landType === LandType.CUSTOMARY ?
                  `Note: Customary land in ${data.country} requires detailed stakeholder liaison and survey contingency.` :
                  'Note: Standard survey and legal liaison costs apply to Freehold and Leasehold sites.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Infrastructure & Resilience */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 flex-1">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl font-black">eco</span>
              </div>
              <div>
                <h3 className="text-xl font-black">Off-Grid Sustainability</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Site Infrastructure Add-ons</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { key: 'waterHarvesting', label: 'Rainwater Harvesting', desc: 'Tanks, pumps & filtration', icon: 'water_drop' },
                { key: 'septicSystem', label: 'Advanced Septic System', desc: 'On-site waste management', icon: 'waves' },
                { key: 'solarSystem', label: 'Solar PV & Battery', desc: 'Sustainable energy storage', icon: 'solar_power' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleInfra(item.key as any)}
                  className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all group ${data.infrastructure[item.key as keyof typeof data.infrastructure] ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-100 opacity-70'
                    }`}
                >
                  <div className={`size-12 rounded-xl flex items-center justify-center transition-all ${data.infrastructure[item.key as keyof typeof data.infrastructure] ? 'bg-[#13a4ec] text-white' : 'bg-white text-gray-300 group-hover:bg-gray-100'}`}>
                    <span className="material-symbols-outlined text-2xl font-bold">{item.icon}</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-black text-sm">{item.label}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60">{item.desc}</p>
                  </div>
                  <span className="material-symbols-outlined">{data.infrastructure[item.key as keyof typeof data.infrastructure] ? 'check_circle' : 'add_circle'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resilience Upgrade Callout */}
      <div className="bg-[#111618] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
          <span className="material-symbols-outlined text-[200px] font-black">cyclone</span>
        </div>
        <div className="size-24 bg-white/10 rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10 backdrop-blur-md">
          <span className={`material-symbols-outlined text-5xl transition-colors ${data.enhancedResilience ? 'text-green-400' : 'text-[#13a4ec] animate-pulse'}`}>
            {data.enhancedResilience ? 'verified' : 'cyclone'}
          </span>
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-2xl font-black tracking-tight">Enhanced Cyclone Grade Compliance</h3>
          <p className="text-sm text-white/50 leading-relaxed font-medium">
            Mandatory recommendation for exposed beachfront or ridge sites in {data.country}. Applies Grade C/D structural reinforcement and cyclone-rated joinery packages.
          </p>
        </div>
        <button
          onClick={() => onUpdate({ enhancedResilience: !data.enhancedResilience })}
          className={`min-w-[200px] h-16 px-12 rounded-2xl font-black transition-all border-2 text-sm uppercase tracking-widest ${data.enhancedResilience
              ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20'
              : 'bg-transparent border-white/20 text-white hover:bg-white/10 active:scale-95'
            }`}
        >
          {data.enhancedResilience ? 'Resilience Applied' : 'Apply Upgrade'}
        </button>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <button onClick={onBack} className="text-gray-400 font-black flex items-center gap-2 hover:text-[#111618] transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </button>
        <button onClick={onNext} className="h-16 px-12 bg-[#13a4ec] text-white font-black rounded-2xl shadow-2xl shadow-[#13a4ec]/20 hover:scale-105 transition-all flex items-center gap-3">
          Finalize Detailed Estimate
          <span className="material-symbols-outlined">analytics</span>
        </button>
      </div>
    </div>
  );
};

export default ResilienceScreen;
