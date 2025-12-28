
import React from 'react';
import { CountryKey } from '../types';

interface ClientDetails {
  name: string;
  email: string;
  projectLocation?: string;
}

interface ClientDetailsScreenProps {
  details: ClientDetails;
  country: CountryKey;
  onChange: (d: ClientDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

const ClientDetailsScreen: React.FC<ClientDetailsScreenProps> = ({ details, country, onChange, onNext, onBack }) => {
  const isValid = details.name && details.email && details.email.includes('@');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16 items-center">
      <div className="lg:w-1/2 flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-black mb-4 tracking-tight leading-tight">Professional fee proposals in minutes.</h1>
          <p className="text-lg text-gray-500 font-medium">Join hundreds of property owners in the <strong>{country}</strong> who use ArchFee Pro to secure funding and finalize project budgets.</p>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative group">
          <img src="https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Architectural rendering" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Regional Compliance</span>
            </div>
            <p className="font-bold">"Accurate, professional, and bank-ready estimates for {country}."</p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full max-w-[480px]">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 flex flex-col gap-8">
           <div className="text-center">
             <h2 className="text-2xl font-black mb-2">Project Details</h2>
             <p className="text-gray-400 text-sm">Complete the info below to generate your personalized proposal.</p>
           </div>

           <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">person</span>
                  <input 
                    required
                    type="text" 
                    value={details.name}
                    onChange={(e) => onChange({...details, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#13a4ec] focus:border-[#13a4ec] transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">mail</span>
                  <input 
                    required
                    type="email" 
                    value={details.email}
                    onChange={(e) => onChange({...details, email: e.target.value})}
                    placeholder="e.g. name@pacific.com"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#13a4ec] focus:border-[#13a4ec] transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Project Site (Optional)</label>
                  <span className="text-[10px] text-gray-300 font-bold uppercase italic">Optional</span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">location_on</span>
                  <input 
                    type="text" 
                    value={details.projectLocation || ''}
                    onChange={(e) => onChange({...details, projectLocation: e.target.value})}
                    placeholder={`e.g. Main Road, ${country}`}
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#13a4ec] focus:border-[#13a4ec] transition-all font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={!isValid}
                className="w-full h-14 bg-[#13a4ec] hover:bg-[#118bc7] disabled:bg-gray-200 text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                Generate Proposal
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <div className="text-center">
                <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm text-green-500">lock</span>
                  No account required yet. We value your privacy.
                </p>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsScreen;
