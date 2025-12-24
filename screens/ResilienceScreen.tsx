
import React from 'react';
import { ProjectData, LandType } from '../types';

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
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-black mb-3 tracking-tight">Pacific Site & Resilience</h1>
        <p className="text-gray-500">Address critical off-grid and structural requirements for your region.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Land & Legal */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-xl bg-[#13a4ec]/10 text-[#13a4ec] flex items-center justify-center">
                <span className="material-symbols-outlined">description</span>
             </div>
             <h3 className="font-black text-lg">Land Tenure</h3>
          </div>
          
          <div className="flex flex-col gap-3">
             {landTypes.map(type => (
               <button
                 key={type}
                 onClick={() => onUpdate({ landType: type })}
                 className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                   data.landType === type ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500'
                 }`}
               >
                 <span className="font-bold">{type}</span>
                 {data.landType === type && <span className="material-symbols-outlined text-sm">check_circle</span>}
               </button>
             ))}
          </div>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
            * Customary land often requires additional stakeholder liaison and survey contingency.
          </p>
        </div>

        {/* Infrastructure Add-ons */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                <span className="material-symbols-outlined">bolt</span>
             </div>
             <h3 className="font-black text-lg">Off-Grid Infrastructure</h3>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => toggleInfra('waterHarvesting')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${data.infrastructure.waterHarvesting ? 'border-[#13a4ec] bg-[#13a4ec]/5' : 'border-gray-50 bg-gray-50 opacity-60'}`}
            >
              <span className="material-symbols-outlined text-[#13a4ec]">water_drop</span>
              <div className="text-left">
                <p className="font-bold text-sm">Water Harvesting & Tanks</p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Essential for remote areas</p>
              </div>
            </button>

            <button
              onClick={() => toggleInfra('septicSystem')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${data.infrastructure.septicSystem ? 'border-[#13a4ec] bg-[#13a4ec]/5' : 'border-gray-50 bg-gray-50 opacity-60'}`}
            >
              <span className="material-symbols-outlined text-[#13a4ec]">waves</span>
              <div className="text-left">
                <p className="font-bold text-sm">Septic & Waste Management</p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Off-grid sanitation</p>
              </div>
            </button>

            <button
              onClick={() => toggleInfra('solarSystem')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${data.infrastructure.solarSystem ? 'border-[#13a4ec] bg-[#13a4ec]/5' : 'border-gray-50 bg-gray-50 opacity-60'}`}
            >
              <span className="material-symbols-outlined text-[#13a4ec]">wb_sunny</span>
              <div className="text-left">
                <p className="font-bold text-sm">Solar PV & Battery Storage</p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Sustainable energy</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Resilience Upgrade */}
      <div className="bg-[#111618] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
         <div className="size-20 bg-white/10 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-4xl text-[#13a4ec]">cyclone</span>
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-black mb-2">Enhanced Cyclone Resilience</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Upgrade structural specifications to Grade C/D compliance. Recommended for beachfront or exposed hilltop sites in the South Pacific.
            </p>
         </div>
         <button 
           onClick={() => onUpdate({ enhancedResilience: !data.enhancedResilience })}
           className={`h-14 px-8 rounded-2xl font-black transition-all border-2 ${data.enhancedResilience ? 'bg-[#13a4ec] border-[#13a4ec] text-white' : 'border-white/20 text-white hover:bg-white/5'}`}
         >
           {data.enhancedResilience ? 'Upgrade Applied' : 'Apply Upgrade'}
         </button>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <button onClick={onBack} className="text-gray-400 font-bold flex items-center gap-2 hover:text-[#111618]">
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button onClick={onNext} className="h-14 px-12 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl shadow-[#13a4ec]/20">
          View Detailed Estimate
        </button>
      </div>
    </div>
  );
};

export default ResilienceScreen;
