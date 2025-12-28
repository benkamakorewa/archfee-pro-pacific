
import React from 'react';
import { BuildingType, CountryKey } from '../types';

interface FloorAreaScreenProps {
  value: number;
  buildingType: BuildingType;
  country: CountryKey;
  onChange: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const FloorAreaScreen: React.FC<FloorAreaScreenProps> = ({ 
  value, 
  buildingType, 
  country,
  onChange, 
  onNext, 
  onBack 
}) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Approximate floor area</h1>
          <p className="text-gray-500">We've estimated a starting size based on your {buildingType} selection.</p>
        </div>

        <div className="flex flex-col items-center gap-8 mb-10">
          <div className="flex items-baseline gap-2">
            <input 
              type="number" 
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-40 text-center text-6xl font-black text-[#111618] bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#13a4ec] focus:ring-0 p-0 pb-2"
            />
            <span className="text-2xl font-bold text-gray-400">m²</span>
          </div>

          <div className="w-full px-4">
            <input 
              type="range" 
              min="30" 
              max="1000" 
              step="5"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#13a4ec]"
            />
            <div className="flex justify-between mt-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>30 m²</span>
              <span>1000 m²</span>
            </div>
          </div>
        </div>

        <div className="bg-[#13a4ec]/5 border border-[#13a4ec]/10 p-5 rounded-xl flex gap-4 items-start mb-10">
          <span className="material-symbols-outlined text-[#13a4ec]">info</span>
          <div>
            <p className="font-bold text-sm mb-1">{country} Typical Ranges</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Standard {buildingType} homes in {country} typically range between {value - 20} and {value + 20} m². Larger floor areas will increase construction and fee estimates proportionally.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
          <button onClick={onBack} className="text-gray-500 font-semibold flex items-center gap-2 hover:text-[#111618] px-6 py-2 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button onClick={onNext} className="w-full sm:w-auto h-12 px-10 bg-[#13a4ec] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#13a4ec]/20">
            Continue to Standard
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloorAreaScreen;
