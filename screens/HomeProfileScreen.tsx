
import React from 'react';
import { ProjectData, BuildingType } from '../types';
import { DEFAULT_AREAS } from '../constants';

interface HomeProfileScreenProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const HomeProfileScreen: React.FC<HomeProfileScreenProps> = ({ data, onUpdate, onNext, onBack }) => {
  const types = [
    { type: BuildingType.ONE_BED, icon: 'bed' },
    { type: BuildingType.TWO_BED, icon: 'chair' },
    { type: BuildingType.THREE_BED, icon: 'king_bed' },
    { type: BuildingType.FOUR_BED, icon: 'house' },
  ];

  const handleTypeSelect = (t: BuildingType) => {
    onUpdate({ buildingType: t, floorArea: DEFAULT_AREAS[t] });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight mb-2">Build Your Home Profile</h1>
        <p className="text-gray-500">Define the core scale and size of your project.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Type & Storeys */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">1. Number of Bedrooms</p>
             <div className="grid grid-cols-2 gap-3">
                {types.map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => handleTypeSelect(opt.type)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      data.buildingType === opt.type ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                    <span className="font-bold text-sm">{opt.type}</span>
                  </button>
                ))}
             </div>
          </div>

          <button 
            onClick={() => onUpdate({ doubleStorey: !data.doubleStorey })}
            className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${
              data.doubleStorey ? 'border-[#13a4ec] bg-[#13a4ec]/5' : 'border-white bg-white'
            }`}
          >
             <div className="flex items-center gap-4">
                <div className={`size-10 rounded-xl flex items-center justify-center ${data.doubleStorey ? 'bg-[#13a4ec] text-white' : 'bg-gray-100 text-gray-400'}`}>
                   <span className="material-symbols-outlined">stairs</span>
                </div>
                <div className="text-left">
                   <p className="font-bold text-sm">Double Storey Home</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Adds ~15% complexity</p>
                </div>
             </div>
             <div className={`size-6 rounded-full border-2 flex items-center justify-center ${data.doubleStorey ? 'bg-[#13a4ec] border-[#13a4ec]' : 'border-gray-200'}`}>
                {data.doubleStorey && <span className="material-symbols-outlined text-white text-xs">check</span>}
             </div>
          </button>
        </div>

        {/* Right: Area Slider */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center gap-8">
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">2. Floor Area (m²)</p>
              <div className="flex items-baseline justify-center gap-1">
                 <input 
                  type="number" 
                  value={data.floorArea}
                  onChange={(e) => onUpdate({ floorArea: Number(e.target.value) })}
                  className="w-32 text-center text-5xl font-black bg-transparent border-0 border-b-2 border-gray-100 focus:border-[#13a4ec] focus:ring-0 p-0"
                 />
                 <span className="text-xl font-bold text-gray-300">m²</span>
              </div>
           </div>

           <div className="px-4">
              <input 
                type="range" min="30" max="800" step="5"
                value={data.floorArea}
                onChange={(e) => onUpdate({ floorArea: Number(e.target.value) })}
                className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#13a4ec]"
              />
              <div className="flex justify-between mt-4 text-[10px] font-black text-gray-300 tracking-widest uppercase">
                 <span>30m²</span>
                 <span>800m²</span>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-[#111618] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
         <label className="flex flex-1 items-start gap-4 cursor-pointer">
            <input 
              required
              type="checkbox" 
              checked={data.disclaimerAccepted}
              onChange={(e) => onUpdate({ disclaimerAccepted: e.target.checked })}
              className="mt-1 size-6 rounded border-white/20 bg-white/5 text-[#13a4ec] focus:ring-[#13a4ec]"
            />
            <div className="text-sm leading-relaxed text-white/70">
               <span className="text-white font-bold block mb-1">Legal Acknowledgment</span>
               I understand this is an <span className="text-white font-black underline">indicative estimation only</span>. Costs are subject to final architectural design, site surveys, and {data.country} market fluctuations.
            </div>
         </label>
      </div>

      <div className="flex justify-between items-center pt-4">
         <button onClick={onBack} className="text-gray-400 font-bold hover:text-gray-800 transition-colors">Cancel</button>
         <button 
          onClick={onNext}
          disabled={!data.disclaimerAccepted}
          className="h-14 px-12 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl shadow-[#13a4ec]/20 disabled:bg-gray-200 disabled:shadow-none transition-all"
         >
            Next: Market Context
         </button>
      </div>
    </div>
  );
};

export default HomeProfileScreen;
