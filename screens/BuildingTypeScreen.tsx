
import React from 'react';
import { BuildingType } from '../types';

interface BuildingTypeScreenProps {
  value: BuildingType;
  doubleStorey: boolean;
  onSelect: (type: BuildingType) => void;
  onToggleDouble: () => void;
  onNext: () => void;
  onBack: () => void;
}

const BuildingTypeScreen: React.FC<BuildingTypeScreenProps> = ({ 
  value, 
  doubleStorey, 
  onSelect, 
  onToggleDouble, 
  onNext, 
  onBack 
}) => {
  // Fix: BuildingType enum does not contain bedroom-based keys (ONE_BED, etc.).
  // Updated to use valid members from the BuildingType enum defined in types.ts.
  const options = [
    { type: BuildingType.DETACHED_HOUSE, icon: 'house' },
    { type: BuildingType.TOWN_HOUSE, icon: 'holiday_village' },
    { type: BuildingType.WALK_UP_APARTMENT, icon: 'stairs' },
    { type: BuildingType.LOW_RISE_APARTMENT, icon: 'domain' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">What type of home are you building?</h1>
        <p className="text-gray-500">Select the building type to begin your estimate.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className={`flex flex-col items-center justify-center p-8 gap-4 rounded-2xl border-2 transition-all group ${
              value === opt.type 
                ? 'border-[#13a4ec] bg-[#13a4ec]/5 ring-1 ring-[#13a4ec]/20' 
                : 'border-white bg-white hover:border-gray-200'
            } shadow-sm`}
          >
            <div className={`size-16 rounded-full flex items-center justify-center transition-colors ${
              value === opt.type ? 'bg-white text-[#13a4ec]' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
            }`}>
              <span className="material-symbols-outlined text-3xl font-bold">{opt.icon}</span>
            </div>
            <span className={`font-bold transition-colors ${value === opt.type ? 'text-[#13a4ec]' : 'text-gray-600'}`}>
              {opt.type}
            </span>
            {value === opt.type && (
              <span className="material-symbols-outlined text-[#13a4ec] absolute top-4 right-4 text-xl">check_circle</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-6 px-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-400">stairs</span>
            <span className="font-semibold text-gray-700">Double storey home?</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={doubleStorey} 
              onChange={onToggleDouble} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#13a4ec]"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center pt-10 border-t border-gray-200 mt-4">
        <button onClick={onBack} className="text-gray-500 font-semibold flex items-center gap-2 hover:text-[#111618] transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button onClick={onNext} className="h-12 px-8 bg-[#13a4ec] text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-[#13a4ec]/20">
          Next Step
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default BuildingTypeScreen;
