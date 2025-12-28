
import React, { useState } from 'react';
import { ConstructionStandard, CountryKey } from '../types';
import { REGIONAL_DATA } from '../constants';

interface AdminDashboardProps {
  country: CountryKey;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  country,
  onExit
}) => {
  const region = REGIONAL_DATA[country];
  const [activeTab, setActiveTab] = useState('rates');
  const [localRates, setLocalRates] = useState(region.baseRates);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const tabs = [
    { id: 'rates', label: 'Regional Rates', icon: 'payments' },
    { id: 'revenue', label: 'Revenue & Pricing', icon: 'account_balance_wallet' },
    { id: 'partners', label: 'Partner Network', icon: 'handshake' },
    { id: 'subscriptions', label: 'B2B Subscriptions', icon: 'business_center' },
    { id: 'content', label: 'Proposal Content', icon: 'description' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden relative">
      <aside className="w-64 border-r border-gray-200 bg-gray-50/50 flex flex-col shrink-0">
        <div className="p-6">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Active Country</p>
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl">
              <span className="material-symbols-outlined text-sm text-[#13a4ec]">public</span>
              <span className="text-sm font-black">{country}</span>
            </div>
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Management</h3>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                    ? 'bg-white text-[#13a4ec] shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:bg-gray-100'
                  }`}
              >
                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-gray-200">
          <button onClick={onExit} className="w-full flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#111618]">
            <span className="material-symbols-outlined text-sm">logout</span>
            Exit Admin Mode
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-10 bg-white">
        {activeTab === 'rates' && (
          <div className="max-w-4xl space-y-10">
            <header>
              <h1 className="text-3xl font-black mb-2">Base Rates: {country}</h1>
              <p className="text-gray-500 font-medium">Configure construction costs per square meter for the {country} market.</p>
            </header>

            <section className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-400">Current Market Baseline</h3>
                {region.lastSync && (
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100">
                    <span className="material-symbols-outlined text-sm">history</span>
                    Last Updated: {region.lastSync}
                  </div>
                )}
              </div>
              <div className="p-8 space-y-6">
                {Object.entries(localRates).map(([standard, rate]) => (
                  <div key={standard} className="flex items-center justify-between">
                    <label className="text-sm font-black text-gray-600">{standard} Specification</label>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300 font-black text-xs uppercase tracking-widest">{region.currency}</span>
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setLocalRates({ ...localRates, [standard as ConstructionStandard]: Number(e.target.value) })}
                        className="w-40 h-12 bg-gray-50 border-2 border-gray-50 rounded-2xl text-right font-black focus:ring-2 focus:ring-[#13a4ec] focus:border-[#13a4ec] transition-all px-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="max-w-4xl space-y-10">
            <header>
              <h1 className="text-3xl font-black mb-2">Partner Network</h1>
              <p className="text-gray-500 font-medium">Manage referral links and lead generation for banks and builders in {country}.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black">Lead Fee (Banks)</h3>
                  <span className="text-green-600 font-black">{region.currency} 100</span>
                </div>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">Commission paid to ArchFee Pro for every mortgage pre-approval application.</p>
                <button className="text-xs text-[#13a4ec] font-black uppercase tracking-widest hover:underline mt-4">Edit Referral Terms →</button>
              </div>
              <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black">Supplier Reach</h3>
                  <span className="text-green-600 font-black">{region.currency} 25</span>
                </div>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">CPM rate for building material hardware sponsors targeting {country} users.</p>
                <button className="text-xs text-[#13a4ec] font-black uppercase tracking-widest hover:underline mt-4">Manage Sponsors →</button>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-10 right-10 flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`h-16 px-12 text-white font-black rounded-2xl shadow-2xl flex items-center gap-3 transition-all ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#13a4ec] hover:bg-[#118bc7]'
              }`}
          >
            <span className="material-symbols-outlined">{isSaving ? 'sync' : 'save'}</span>
            {isSaving ? 'Saving...' : 'Apply Regional Rates'}
          </button>
        </div>
      </main>
      {showToast && (
        <div className="fixed bottom-32 right-10 bg-[#111618] text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-bold text-sm">Market rates for {country} updated successfully.</span>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
