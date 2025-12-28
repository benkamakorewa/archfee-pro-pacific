
import React, { useState } from 'react';
import { CalculationResults, ProjectData } from '../types';

interface LoginGateScreenProps {
  results: CalculationResults;
  projectData: ProjectData;
  onBack: () => void;
  onReportGenerated?: () => void; // New
}

const LoginGateScreen: React.FC<LoginGateScreenProps> = ({ results, projectData, onBack, onReportGenerated }) => {
  const [view, setView] = useState<'signup' | 'payment' | 'processing' | 'success'>('signup');
  const [tier, setTier] = useState<'individual' | 'pro'>('individual');

  const premiumPrice = tier === 'individual' ? 50.00 : 199.00;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: results.currency 
    }).format(val).replace('US$', results.currency + ' ');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setView('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setView('processing');
    setTimeout(() => {
      setView('success');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16 items-start">
      <div className="lg:w-1/2 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
           <div className="inline-flex items-center gap-2 text-[#13a4ec] font-black uppercase tracking-widest text-xs">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              ArchFee Pro Options
           </div>
           <h1 className="text-5xl font-black tracking-tight leading-tight">Choose your <br/> plan</h1>
           <p className="text-lg text-gray-500 leading-relaxed max-w-md">
             Unlock professional reports for a one-time fee, or subscribe as a firm for unlimited white-label access.
           </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
           <button 
            onClick={() => setTier('individual')}
            className={`p-6 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${tier === 'individual' ? 'border-[#13a4ec] bg-white shadow-lg' : 'border-transparent bg-gray-50 opacity-60'}`}
           >
              <div>
                 <p className="text-xs font-black text-[#13a4ec] uppercase tracking-widest mb-1">Homeowner</p>
                 <p className="font-black text-xl">Unlock One Report</p>
                 <p className="text-sm text-gray-400">Perfect for your personal project.</p>
              </div>
              <p className="text-2xl font-black">{formatCurrency(50)}</p>
           </button>
           <button 
            onClick={() => setTier('pro')}
            className={`p-6 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${tier === 'pro' ? 'border-[#13a4ec] bg-white shadow-lg' : 'border-transparent bg-gray-50 opacity-60'}`}
           >
              <div>
                 <p className="text-xs font-black text-[#13a4ec] uppercase tracking-widest mb-1">Firms & Builders</p>
                 <p className="font-black text-xl">Architect Pro Plan</p>
                 <p className="text-sm text-gray-400">Unlimited white-label reports.</p>
              </div>
              <p className="text-2xl font-black">{formatCurrency(199)}<span className="text-xs text-gray-400">/mo</span></p>
           </button>
        </div>

        <div className="space-y-6">
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">Included in both plans</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                 <div className="size-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
                 </div>
                 <div>
                    <p className="font-bold text-sm text-gray-700">Bank Pre-Approval</p>
                    <p className="text-xs text-gray-400">Standard formatting for regional lenders.</p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <div className="size-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
                 </div>
                 <div>
                    <p className="font-bold text-sm text-gray-700">Detailed Exclusions</p>
                    <p className="text-xs text-gray-400">Protects you from legal disputes.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full max-w-[460px] lg:ml-auto sticky top-24">
         {view === 'signup' && (
           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                 <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <span className="material-symbols-outlined">person_add</span>
                 </div>
                 <h2 className="text-2xl font-black mb-2">Step 1: Create Account</h2>
                 <p className="text-sm text-gray-400 font-medium">Your reports will be saved in your dashboard.</p>
              </div>
              <form className="space-y-4" onSubmit={handleSignup}>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email Address</label>
                    <input required type="email" placeholder="name@company.com" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-5 font-medium" defaultValue={projectData.clientDetails.email} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Password</label>
                    <input required type="password" placeholder="Create a password" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-5 font-medium" />
                 </div>
                 <button type="submit" className="w-full h-14 bg-[#111618] text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 hover:bg-black">
                    Next: Payment
                    <span className="material-symbols-outlined">arrow_forward</span>
                 </button>
              </form>
           </div>
         )}

         {view === 'payment' && (
           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                 <div className="size-12 rounded-full bg-[#13a4ec]/10 flex items-center justify-center mx-auto mb-4 text-[#13a4ec]">
                    <span className="material-symbols-outlined">credit_card</span>
                 </div>
                 <h2 className="text-2xl font-black mb-1">Step 2: {tier === 'pro' ? 'Start Subscription' : 'Unlock Report'}</h2>
                 <p className="text-xl font-black text-[#13a4ec] mb-4">{formatCurrency(premiumPrice)}</p>
              </div>
              <form className="space-y-4" onSubmit={handlePayment}>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Card Details</label>
                    <div className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-5 flex items-center gap-3">
                       <span className="material-symbols-outlined text-gray-300">credit_card</span>
                       <input required type="text" placeholder="Card Number" className="bg-transparent border-0 focus:ring-0 flex-1 text-sm font-medium" />
                    </div>
                 </div>
                 <button type="submit" className="w-full h-16 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl transition-all flex flex-col items-center justify-center gap-0 mt-4 hover:bg-[#118bc7]">
                    <span>Pay {formatCurrency(premiumPrice)}</span>
                 </button>
              </form>
           </div>
         )}

         {view === 'processing' && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500 h-[400px] justify-center">
              <div className="size-16 border-4 border-[#13a4ec] border-t-transparent rounded-full animate-spin"></div>
              <div>
                <h3 className="text-xl font-black mb-1">Generating Report</h3>
                <p className="text-sm text-gray-400">Finalizing localized Pacific market data...</p>
              </div>
            </div>
         )}

         {view === 'success' && (
           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
              <div className="size-24 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                 <span className="material-symbols-outlined text-6xl font-bold">check</span>
              </div>
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-[#111618]">Report Ready</h2>
                 <p className="text-gray-500">{tier === 'pro' ? 'Welcome to ArchFee Pro Firm.' : 'Premium report unlocked.'}</p>
              </div>
              <button 
                onClick={onReportGenerated}
                className="w-full h-14 bg-[#13a4ec] text-white font-black rounded-xl hover:bg-[#118bc7] transition-all flex items-center justify-center gap-2"
              >
                 <span className="material-symbols-outlined">description</span>
                 View Full Premium Report
              </button>
           </div>
         )}

         <button onClick={onBack} className="w-full mt-6 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to Estimates
         </button>
      </div>
    </div>
  );
};

export default LoginGateScreen;
