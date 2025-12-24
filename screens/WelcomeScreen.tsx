
import React from 'react';
import { CountryKey } from '../types';

interface WelcomeScreenProps {
  onStart: () => void;
  selectedCountry?: CountryKey;
  onCountrySelect?: (c: CountryKey) => void;
  isSyncing?: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStart, 
  selectedCountry, 
  onCountrySelect,
  isSyncing
}) => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const countries = Object.values(CountryKey);

  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-[#111618]">
              ArchFee Pro <span className="text-[#13a4ec] block lg:inline text-4xl lg:text-5xl">Pacific</span>
            </h1>
            <h2 className="text-2xl font-medium text-gray-500">
              Professional Cost & Fee Estimator for the South Pacific
            </h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
             <div className="flex justify-between items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Select Your Project Region</p>
                {isSyncing && (
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-blue-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Live Syncing Rates</span>
                  </div>
                )}
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {countries.map(c => (
                  <button 
                    key={c}
                    onClick={() => onCountrySelect?.(c)}
                    className={`h-12 rounded-xl text-xs font-bold border-2 transition-all ${
                      selectedCountry === c ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
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
              className="h-14 px-10 bg-[#13a4ec] hover:bg-[#118bc7] disabled:bg-gray-200 text-white font-bold rounded-xl shadow-lg shadow-[#13a4ec]/20 transition-all transform active:scale-95"
            >
              {isSyncing ? 'Synchronizing...' : 'Start My Estimate'}
            </button>
            <button 
              onClick={scrollToHowItWorks}
              className="h-14 px-10 border border-gray-200 bg-white hover:bg-gray-50 text-[#111618] font-bold rounded-xl transition-all"
            >
              How this works
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800" 
              alt="Pacific Architecture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#111618]/60 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
               <div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Regional Context</p>
                  <p className="text-white text-2xl font-black">{selectedCountry} Market Feed</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-xs">rss_feed</span>
                  <span className="text-white text-[10px] font-bold">Live Rates Active</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <section id="how-it-works" className="bg-white py-24 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-black mb-6">Regional Intelligence</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
               ArchFee Pro connects to real-time construction market feeds across the South Pacific. Every estimate is calculated using the latest localized data for {selectedCountry} and your specific building standards.
            </p>
         </div>
      </section>
    </div>
  );
};

export default WelcomeScreen;
