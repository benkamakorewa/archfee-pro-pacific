
import React, { useState } from 'react';
import { CountryKey } from '../types';

interface DisclaimerScreenProps {
  country: CountryKey;
  onAccept: () => void;
}

const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ country, onAccept }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col gap-8">
        <div className="text-center">
          <div className="mx-auto size-14 rounded-full bg-[#13a4ec]/10 flex items-center justify-center mb-6 text-[#13a4ec]">
            <span className="material-symbols-outlined text-3xl font-bold">gavel</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">Before we begin</h1>
          <p className="text-gray-500">
            Please review the following limitations regarding this cost estimation tool in <strong>{country}</strong>.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#13a4ec] shrink-0">info</span>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider mb-1">Indicative Only</p>
              <p className="text-sm text-gray-600">Estimates provided are for preliminary budgeting purposes only and do not constitute a final tender or QS report.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#13a4ec] shrink-0">architecture</span>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider mb-1">Design Development</p>
              <p className="text-sm text-gray-600">Costs are subject to refinement during the Design Development phase as specific finishes are selected.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#13a4ec] shrink-0">trending_up</span>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider mb-1">Market Volatility</p>
              <p className="text-sm text-gray-600">Current volatility in {country} material costs and labor may affect final project pricing.</p>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 p-4 bg-[#13a4ec]/5 rounded-xl border border-[#13a4ec]/10 cursor-pointer group transition-colors">
          <input 
            type="checkbox" 
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 size-5 rounded border-gray-300 text-[#13a4ec] focus:ring-[#13a4ec]" 
          />
          <span className="text-sm font-medium text-gray-700 leading-relaxed">
            I acknowledge that this estimate is preliminary, indicative only, and subject to site conditions in {country} and regional market changes.
          </span>
        </label>

        <button 
          disabled={!checked}
          onClick={onAccept}
          className="w-full h-14 bg-[#13a4ec] hover:bg-[#118bc7] disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          Accept & Proceed
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default DisclaimerScreen;
