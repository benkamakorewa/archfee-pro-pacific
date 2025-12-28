
import React from 'react';
import { CountryKey } from '../types';
import { REGIONAL_DATA } from '../constants';

interface LocationScreenProps {
  value: string;
  country: CountryKey;
  onSelect: (l: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ 
  value, 
  country,
  onSelect, 
  onNext, 
  onBack 
}) => {
  const regionConfig = REGIONAL_DATA[country];
  const locations = Object.keys(regionConfig.locations);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">Project Location: {country}</h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Select the region where construction will take place. This adjusts our estimate based on logistical surcharges specific to <strong>{country}</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Region Selection</label>
              <div className="relative">
                <select 
                  value={value}
                  onChange={(e) => onSelect(e.target.value)}
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 text-lg font-bold text-[#111618] focus:ring-2 focus:ring-[#13a4ec] focus:border-[#13a4ec] appearance-none"
                >
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="bg-[#13a4ec]/5 border border-[#13a4ec]/10 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-[#13a4ec] font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-xl">verified</span>
                Regional Multiplier Applied
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Rates for <strong>{value}</strong> account for current material shipping costs and labor availability in the province.
              </p>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <button onClick={onBack} className="text-gray-500 font-semibold flex items-center gap-2 hover:text-[#111618] transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button onClick={onNext} className="h-12 px-10 bg-[#13a4ec] text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-[#13a4ec]/20">
                Calculate Estimate
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-[#111618] rounded-2xl shadow-sm overflow-hidden h-[450px] relative border border-white/10">
            <div className="p-6">
               <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">Regional Mapping</h3>
               <p className="text-white text-xl font-black mt-2">{country} Intelligence</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
               <span className="material-symbols-outlined text-9xl text-white">public</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
               <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white/60 text-xs font-medium">
                  Logistics surcharges for {value} have been updated as of this quarter.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationScreen;
