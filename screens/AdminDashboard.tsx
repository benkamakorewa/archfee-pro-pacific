
import React, { useState } from 'react';
// Fix: Removed non-existent LocationKey import from types
import { ConstructionStandard } from '../types';

interface AdminDashboardProps {
  // Fix: Use string for location keys and make props optional to ensure compatibility with calling components
  rates?: Record<ConstructionStandard, number>;
  multipliers?: Record<string, number>;
  onSave?: (config: { rates: Record<ConstructionStandard, number>, multipliers: Record<string, number> }) => void;
  onExit: () => void;
}

// Fix: Added default values for rates and multipliers to handle calls without these props (e.g., in App.tsx)
const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  rates = {
    [ConstructionStandard.BASIC]: 1800,
    [ConstructionStandard.STANDARD]: 2800,
    [ConstructionStandard.HIGH_END]: 4500,
  }, 
  multipliers = {
    'Urban': 1.0,
    'Rural': 1.1,
  }, 
  // Fix: Default value for onSave should accept the config argument to match the AdminDashboardProps interface and avoid argument length errors
  onSave = (_config) => {}, 
  onExit 
}) => {
  const [activeTab, setActiveTab] = useState('rates');
  const [localRates, setLocalRates] = useState(rates);
  const [localMultipliers, setLocalMultipliers] = useState(multipliers);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const tabs = [
    { id: 'rates', label: 'Rates & Multipliers', icon: 'payments' },
    { id: 'revenue', label: 'Revenue & Pricing', icon: 'account_balance_wallet' },
    { id: 'partners', label: 'Partner Network', icon: 'handshake' },
    { id: 'subscriptions', label: 'B2B Subscriptions', icon: 'business_center' },
    { id: 'content', label: 'Proposal Content', icon: 'description' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Fix: Call onSave with the current configuration state
      onSave({ rates: localRates, multipliers: localMultipliers });
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden relative">
      <aside className="w-64 border-r border-gray-200 bg-gray-50/50 flex flex-col shrink-0">
        <div className="p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Management</h3>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
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
              <h1 className="text-3xl font-black mb-2">Rates & Multipliers</h1>
              <p className="text-gray-500">Configure the base construction costs used for calculations.</p>
            </header>

            <section className="bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-50">
                <h3 className="font-bold">Base Construction Rates (per m²)</h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(localRates).map(([standard, rate]) => (
                  <div key={standard} className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-600">{standard}</label>
                    <div className="flex items-center gap-3">
                       <span className="text-gray-400 font-bold text-sm">FJD</span>
                       <input 
                        type="number" 
                        value={rate} 
                        onChange={(e) => setLocalRates({...localRates, [standard as ConstructionStandard]: Number(e.target.value)})}
                        className="w-32 h-10 bg-gray-50 border-gray-200 rounded-lg text-right font-bold" 
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
              <p className="text-gray-500">Manage referral links and lead generation for banks and builders.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Lead Fee (Banks)</h3>
                  <span className="text-green-600 font-bold">$100 FJD</span>
                </div>
                <p className="text-xs text-gray-400">Paid to ArchFee Pro for every qualified mortgage application.</p>
                <button className="text-xs text-[#13a4ec] font-bold">Edit Referral Terms →</button>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Supplier CPM</h3>
                  <span className="text-green-600 font-bold">$25 FJD</span>
                </div>
                <p className="text-xs text-gray-400">Cost per 1,000 impressions for material hardware sponsors.</p>
                <button className="text-xs text-[#13a4ec] font-bold">Manage Sponsors →</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="max-w-4xl space-y-10">
            <header>
              <h1 className="text-3xl font-black mb-2">B2B Subscriptions</h1>
              <p className="text-gray-500">White-label licensing for architectural firms and builders.</p>
            </header>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Plan Name</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Monthly Cost</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Features</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400">Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 font-bold">Free Tier</td>
                      <td className="px-6 py-4">$0</td>
                      <td className="px-6 py-4 text-gray-500">Public Access, Basic PDF</td>
                      <td className="px-6 py-4">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">Solo Architect</td>
                      <td className="px-6 py-4">$89 FJD</td>
                      <td className="px-6 py-4 text-gray-500">Custom Branding, Client CRM</td>
                      <td className="px-6 py-4">12 Firms</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">Enterprise</td>
                      <td className="px-6 py-4">$299 FJD</td>
                      <td className="px-6 py-4 text-gray-500">API Access, Team seats</td>
                      <td className="px-6 py-4">3 Firms</td>
                    </tr>
                  </tbody>
               </table>
            </div>
          </div>
        )}

        <div className="fixed bottom-10 right-10">
           <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`h-14 px-10 text-white font-black rounded-2xl shadow-2xl flex items-center gap-3 transition-all ${
              isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#13a4ec] hover:bg-[#118bc7]'
            }`}
           >
              <span className="material-symbols-outlined">{isSaving ? 'sync' : 'save'}</span>
              {isSaving ? 'Saving...' : 'Save Changes'}
           </button>
        </div>
      </main>
      {showToast && (
        <div className="fixed bottom-24 right-10 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4">
           Settings saved successfully.
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
