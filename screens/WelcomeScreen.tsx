
import React, { useEffect } from 'react';
import { CountryKey, RegionConfig } from '../types';

interface WelcomeScreenProps {
  onStart: () => void;
  selectedCountry: CountryKey;
  onCountrySelect: (c: CountryKey) => void;
  isSyncing: boolean;
  regionData: RegionConfig;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  selectedCountry,
  onCountrySelect,
  isSyncing,
  regionData
}) => {
  const howItWorksRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // In a real app, this would use reverse geocoding to pre-select the country
      }, () => console.log("Geolocation denied. Using default."));
    }
  }, []);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const countries = Object.values(CountryKey);
  const region = regionData;

  const steps = [
    { icon: 'tune', title: '1. Configure', desc: 'Define project category, density, and scale.' },
    { icon: 'public', title: '2. Contextualize', desc: 'Apply local market factors and quality standards.' },
    { icon: 'cyclone', title: '3. Resilience', desc: 'Integrate critical cyclone & climate upgrades.' },
    { icon: 'payments', title: '4. Feasibility', desc: 'Generate bank-ready estimates & fee proposals.' }
  ];

  return (
    <div className="flex flex-col animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16 items-center min-h-[90vh]">
        <div className="lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-[#13a4ec]/10 text-[#13a4ec] w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13a4ec] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13a4ec]"></span>
              </span>
              2025 Market Intelligence Active
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-[#111618]">
              ArchFee Pro <br /><span className="text-[#13a4ec]">{selectedCountry}</span>
            </h1>
            <p className="text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
              The professional cost planning tool built specifically for the logistical complexities of {selectedCountry}'s residential development.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Select Project Region</p>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                <span className="material-symbols-outlined text-[10px] text-gray-400">public</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Auto-Detect Enabled</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {countries.map(c => (
                <button
                  key={c}
                  onClick={() => onCountrySelect(c)}
                  className={`h-14 rounded-2xl text-xs font-black border-2 transition-all ${selectedCountry === c ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec] shadow-md shadow-[#13a4ec]/10' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onStart}
              disabled={isSyncing}
              className="h-16 px-12 bg-[#13a4ec] hover:bg-[#118bc7] disabled:bg-gray-200 text-white font-black rounded-2xl shadow-2xl shadow-[#13a4ec]/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3"
            >
              {isSyncing ? (
                <>
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Syncing {selectedCountry} Rates...
                </>
              ) : 'Start New Estimate'}
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="h-16 px-10 border-2 border-gray-100 bg-white hover:bg-gray-50 text-[#111618] font-black rounded-2xl transition-all"
            >
              How it works
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border border-gray-100 group">
            <img
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800"
              alt="Pacific Architecture"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#111618]/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Market Intelligence Status</p>
                <p className="text-white text-3xl font-black leading-tight tracking-tighter">{selectedCountry} <br />Residential Index</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-black text-xs">▲ 1.4%</span>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest opacity-60">Materials Price</span>
                </div>
                {region.lastSync && (
                  <div className="text-[9px] text-white/80 font-bold uppercase tracking-widest mb-1">
                    Updated: {region.lastSync}
                  </div>
                )}
                <div className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Ref: {Object.keys(region.locations)[0]} Market Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={howItWorksRef} className="bg-[#111618] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <p className="text-[#13a4ec] text-[10px] font-black uppercase tracking-widest">Workflow</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Streamlined Cost Planning</h2>
            <p className="text-white/50 max-w-2xl mx-auto font-medium">From concept to bank-ready feasibility study in less than 2 minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <div className="size-14 rounded-2xl bg-[#13a4ec]/10 flex items-center justify-center text-[#13a4ec] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-black mb-3">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
