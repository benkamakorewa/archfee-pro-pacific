
import React from 'react';
import { ProjectData, ConstructionStandard, LandType, ResidentialCategory } from '../types';
import { REGIONAL_DATA } from '../constants';

interface MarketContextScreenProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MarketContextScreen: React.FC<MarketContextScreenProps> = ({ data, onUpdate, onNext, onBack }) => {
  const region = REGIONAL_DATA[data.country];

  // Filter standards based on category
  const standards = data.category === ResidentialCategory.COMMERCIAL_RESORT
    ? [ConstructionStandard.STANDARD, ConstructionStandard.HIGH_END, ConstructionStandard.PREMIUM, ConstructionStandard.LUXURY]
    : [ConstructionStandard.BASIC, ConstructionStandard.STANDARD, ConstructionStandard.HIGH_END];

  const landTypes = Object.values(LandType);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight mb-2">Regional Market Context</h1>
        <p className="text-gray-500">Factors that influence local construction rates in {data.country}.</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-6">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h3 className="font-black text-xl">Site Location</h3>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-4">Select the specific regional location to apply localized market multipliers.</p>
          <select
            value={data.location}
            onChange={(e) => onUpdate({ location: e.target.value })}
            className="w-full h-16 bg-gray-50 border-gray-100 rounded-2xl px-6 font-black text-lg focus:ring-[#13a4ec]"
          >
            {Object.keys(region.locations).map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined">description</span>
            </div>
            <h3 className="font-black text-xl">Land Tenure</h3>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-6">Select the land ownership model to calculate legal and survey contingencies.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {landTypes.map(t => (
              <button
                key={t}
                onClick={() => onUpdate({ landType: t })}
                className={`p-4 rounded-xl border-2 text-[11px] font-black uppercase tracking-widest transition-all ${data.landType === t ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-400'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-gray-400 font-bold flex items-center gap-2 hover:text-[#111618]">
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button onClick={onNext} className="h-14 px-12 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl shadow-[#13a4ec]/20">
          Next: Resilience & Site
        </button>
      </div>
    </div>
  );
};

export default MarketContextScreen;
