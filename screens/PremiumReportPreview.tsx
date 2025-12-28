
import React from 'react';
import { CalculationResults, ProjectData, ResidentialCategory } from '../types';

interface PremiumReportPreviewProps {
  results: CalculationResults;
  projectData: ProjectData;
  onBack: () => void;
}

const PremiumReportPreview: React.FC<PremiumReportPreviewProps> = ({ results, projectData, onBack }) => {
  // Use generic locale to avoid hardcoded Fiji locale for other countries
  const reportDate = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  const proposalID = `AFP-${projectData.country.substring(0,2).toUpperCase()}-${Math.floor(Math.random() * 90000 + 10000)}`;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: results.currency 
    }).format(val).replace('US$', results.currency + ' ');
  };

  const handlePrint = () => {
    window.print();
  };

  const Page: React.FC<{ children: React.ReactNode; pageNumber: number }> = ({ children, pageNumber }) => (
    <div className="bg-white w-full max-w-[800px] aspect-[1/1.41] shadow-2xl mx-auto p-16 flex flex-col relative overflow-hidden border border-gray-100 mb-10 last:mb-0 print:mb-0 print:shadow-none print:border-none print:max-w-none print:w-[210mm] print:h-[297mm]">
      {/* Structural Decoration */}
      <div className="absolute top-0 left-0 w-2 h-full bg-[#13a4ec]/20" />
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 select-none pointer-events-none">
         <span className="material-symbols-outlined text-[300px] font-black">architecture</span>
      </div>
      
      {/* Branded Header */}
      <div className="flex justify-between items-start mb-16 relative z-10">
         <div className="flex items-center gap-3 text-[#111618]">
            <div className="size-12 flex items-center justify-center bg-[#13a4ec] rounded-xl text-white shadow-lg shadow-[#13a4ec]/30">
              <span className="material-symbols-outlined text-3xl font-bold">architecture</span>
            </div>
            <div>
               <p className="font-black text-xl tracking-tighter">ArchFee <span className="text-[#13a4ec]">Pro</span></p>
               <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Pacific Market Intelligence</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Document ID</p>
            <p className="font-black text-sm text-[#111618]">{proposalID}</p>
         </div>
      </div>

      <div className="flex-1 relative z-10">{children}</div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] relative z-10">
         <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">verified_user</span>
            <span>Professional Planning Document | {projectData.country} Edition</span>
         </div>
         <p>Page {pageNumber} of 4</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#111618] min-h-screen py-12 px-6 print:bg-white print:p-0">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      {/* Top Utility Bar */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md no-print">
         <div className="flex flex-col gap-1">
            <button onClick={onBack} className="flex items-center gap-2 font-black text-xs text-[#13a4ec] hover:text-white transition-colors uppercase tracking-widest">
               <span className="material-symbols-outlined text-sm">arrow_back</span>
               Return to Dashboard
            </button>
            <p className="text-lg font-black">{projectData.clientDetails.name || 'Project Proposal'}</p>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={handlePrint}
              className="h-12 px-10 bg-[#13a4ec] rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#13a4ec]/40 hover:scale-105 transition-all flex items-center gap-2"
            >
               <span className="material-symbols-outlined text-sm">download</span>
               Download & Print PDF
            </button>
         </div>
      </div>

      {/* Page 1: High-Impact Cover */}
      <Page pageNumber={1}>
        <div className="flex flex-col h-full py-10">
           <div className="space-y-6">
              <div className="h-1.5 w-24 bg-[#13a4ec]" />
              <h1 className="text-7xl font-black tracking-tighter leading-[0.85] text-[#111618]">Indicative <br/> Cost Plan</h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg">
                 <span className="material-symbols-outlined text-sm text-[#13a4ec]">location_on</span>
                 <p className="text-xs font-black uppercase tracking-widest text-gray-500">Regional Proposal: {projectData.country}</p>
              </div>
           </div>

           <div className="mt-24 grid grid-cols-2 gap-16 border-t border-gray-100 pt-16">
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Client Recipient</p>
                 <p className="text-xl font-black text-[#111618]">{projectData.clientDetails.name || 'Valued Stakeholder'}</p>
                 <p className="text-xs text-gray-500 font-bold">{projectData.clientDetails.email}</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Issuance Details</p>
                 <p className="text-xl font-black text-[#111618]">{reportDate}</p>
                 <p className="text-xs text-[#13a4ec] font-bold uppercase tracking-widest">Valid for 30 Business Days</p>
              </div>
           </div>

           <div className="mt-auto h-72 w-full rounded-[3rem] overflow-hidden relative shadow-inner print:shadow-none">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale" alt="construction" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111618]/40 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white flex items-center gap-4">
                 <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">architecture</span>
                 </div>
                 <p className="text-lg font-black tracking-tight">Professional Estimator v4.0</p>
              </div>
        </div>
        </div>
      </Page>

      {/* Page 2: Project Specifications */}
      <Page pageNumber={2}>
         <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gray-50">
            <h2 className="text-2xl font-black tracking-tight text-[#111618]">01. Project Vitals</h2>
            <div className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
               Market Aligned
            </div>
         </div>
         
         <div className="grid grid-cols-2 gap-10">
            <div className="space-y-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Building Classification</p>
                  <p className="text-lg font-black text-[#111618]">{projectData.buildingType}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Floor Area (GFA)</p>
                  <p className="text-lg font-black text-[#111618]">{projectData.floorArea.toLocaleString()} m²</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Quality Standard</p>
                  <p className="text-lg font-black text-[#13a4ec]">{projectData.standard}</p>
               </div>
            </div>
            <div className="space-y-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Regional Location</p>
                  <p className="text-lg font-black text-[#111618]">{projectData.location}, {projectData.country}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Land Tenure Model</p>
                  <p className="text-lg font-black text-[#111618]">{projectData.landType}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Project Category</p>
                  <p className="text-lg font-black text-[#111618]">{projectData.category}</p>
               </div>
            </div>
         </div>

         <div className="mt-16 bg-gray-50 rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden print:border print:border-gray-100">
            <div className="absolute -top-10 -right-10 opacity-[0.05] rotate-45 select-none pointer-events-none">
               <span className="material-symbols-outlined text-[200px] font-black">cyclone</span>
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Regional Resilience Profile</h3>
            <div className="grid grid-cols-1 gap-6">
               <div className="flex items-center gap-6">
                  <div className={`size-14 rounded-2xl flex items-center justify-center ${projectData.enhancedResilience ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                     <span className="material-symbols-outlined text-2xl font-black">cyclone</span>
                  </div>
                  <div>
                     <p className="text-sm font-black text-[#111618]">Cyclone Resilience Compliance</p>
                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        {projectData.enhancedResilience ? 'High-Performance Grade C/D Structural Integration' : 'Standard Pacific NBC Compliance'}
                     </p>
                  </div>
               </div>
               
               <div className="h-px w-full bg-gray-200" />

               <div className="flex flex-wrap gap-3">
                  {projectData.infrastructure.solarSystem && <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-[9px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2 shadow-sm"><span className="material-symbols-outlined text-xs">wb_sunny</span> Solar PV Infrastructure</div>}
                  {projectData.infrastructure.waterHarvesting && <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-[9px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 shadow-sm"><span className="material-symbols-outlined text-xs">water_drop</span> Water Harvesting System</div>}
                  {projectData.infrastructure.septicSystem && <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-[9px] font-black uppercase tracking-widest text-brown-600 flex items-center gap-2 shadow-sm"><span className="material-symbols-outlined text-xs">waves</span> On-Site Sanitation</div>}
               </div>
            </div>
         </div>
      </Page>

      {/* Page 3: Financial Summary */}
      <Page pageNumber={3}>
         <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gray-50">
            <h2 className="text-2xl font-black tracking-tight text-[#111618]">02. Financial Cost Schedule</h2>
            <div className="text-right">
               <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">Currency Unit</p>
               <p className="text-sm font-black text-[#111618]">{results.currency}</p>
            </div>
         </div>

         <table className="w-full border-collapse">
            <thead>
               <tr className="border-b border-gray-200">
                  <th className="py-4 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Description of Works</th>
                  <th className="py-4 text-right text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Sub-Total</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               <tr>
                  <td className="py-6 pr-4">
                     <p className="text-sm font-black text-[#111618]">Core Structural Framework</p>
                     <p className="text-[10px] text-gray-400 font-medium">Primary building envelope and finishes based on {projectData.standard} standard.</p>
                  </td>
                  <td className="py-6 text-right text-sm font-black text-[#111618]">
                     {formatCurrency(results.constructionCost - (results.resiliencePremium + results.infraCost + results.landLegalEstimate + results.contingency))}
                  </td>
               </tr>
               {results.resiliencePremium > 0 && (
                 <tr className="bg-orange-50/20">
                    <td className="py-6 pr-4 pl-2">
                       <p className="text-sm font-black text-orange-600">Cyclone Performance Premium</p>
                       <p className="text-[10px] text-orange-400 font-medium">Enhanced structural fasteners and Grade C/D reinforcement.</p>
                    </td>
                    <td className="py-6 pr-2 text-right text-sm font-black text-orange-600">{formatCurrency(results.resiliencePremium)}</td>
                 </tr>
               )}
               <tr>
                  <td className="py-6 pr-4">
                     <p className="text-sm font-black text-[#111618]">Site Infrastructure & Utilities</p>
                     <p className="text-[10px] text-gray-400 font-medium">Off-grid water, solar, and waste management integration.</p>
                  </td>
                  <td className="py-6 text-right text-sm font-black text-[#111618]">{formatCurrency(results.infraCost)}</td>
               </tr>
               <tr>
                  <td className="py-6 pr-4">
                     <p className="text-sm font-black text-[#111618]">Land Tenure & Legal Provision</p>
                     <p className="text-[10px] text-gray-400 font-medium">Liaison and survey contingency for {projectData.landType}.</p>
                  </td>
                  <td className="py-6 text-right text-sm font-black text-[#111618]">{formatCurrency(results.landLegalEstimate)}</td>
               </tr>
               <tr className="bg-blue-50/40">
                  <td className="py-6 pr-4 pl-2 border-t border-[#13a4ec]/20">
                     <p className="text-sm font-black text-[#13a4ec]">Construction Contingency (7%)</p>
                     <p className="text-[10px] text-[#13a4ec]/60 font-medium italic">Pacific market volatility buffer allowance.</p>
                  </td>
                  <td className="py-6 pr-2 text-right text-sm font-black text-[#13a4ec]">{formatCurrency(results.contingency)}</td>
               </tr>
            </tbody>
            <tfoot>
               <tr className="border-t-4 border-[#111618]">
                  <td className="py-10 text-xl font-black text-[#111618]">Total Indicative Project Value</td>
                  <td className="py-10 text-right text-2xl font-black text-[#13a4ec]">{formatCurrency(results.constructionCost)}</td>
               </tr>
            </tfoot>
         </table>
         
         <div className="mt-4 p-6 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-[8px] text-gray-400 leading-relaxed font-bold uppercase tracking-widest text-center">
               * This document is an indicative cost plan generated for {projectData.country} market planning only. Rates are based on live regional feeds as of {results.lastSync}. 
               Final costs are subject to detailed architectural design and Quantity Surveyor verification.
            </p>
         </div>
      </Page>

      {/* Page 4: Architectural Fee Breakdown */}
      <Page pageNumber={4}>
         <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gray-50">
            <h2 className="text-2xl font-black tracking-tight text-[#111618]">03. Professional Fee Proposal</h2>
            <div className="px-4 py-1.5 bg-[#13a4ec] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
               Verified Range
            </div>
         </div>

         <div className="bg-[#111618] rounded-[2.5rem] p-10 text-white flex justify-between items-center shadow-2xl relative overflow-hidden print:border print:border-gray-100 print:text-black">
            <div className="absolute top-0 right-0 p-8 opacity-10 print:hidden">
               <span className="material-symbols-outlined text-8xl">payments</span>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 print:text-gray-400 mb-2">Structure Selected</p>
               <h4 className="text-2xl font-black">{projectData.selectedFeeOption}</h4>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 print:text-gray-400 mb-2">Total Professional Fee</p>
               <p className="text-4xl font-black text-[#13a4ec]">{formatCurrency(results.totalFee)}</p>
            </div>
         </div>

         <div className="mt-16 space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Payment Schedule by Phase</h3>
            <div className="space-y-4">
               {results.stageBreakdown.map((stage, idx) => (
                  <div key={stage.name} className="flex items-center justify-between group">
                     <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 border border-gray-100">
                           0{idx + 1}
                        </div>
                        <div>
                           <p className="text-sm font-black text-[#111618]">{stage.name}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stage.percentage}% Milestone</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-[#111618]">{formatCurrency(stage.amount)}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="mt-auto grid grid-cols-2 gap-10">
            <div className="p-8 border-2 border-gray-50 rounded-[2rem] flex flex-col justify-end min-h-[160px]">
               <div className="h-px w-full bg-gray-200 mb-4" />
               <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest text-center">Architect Signature / Date</p>
            </div>
            <div className="p-8 border-2 border-gray-50 rounded-[2rem] flex flex-col justify-end min-h-[160px]">
               <div className="h-px w-full bg-gray-200 mb-4" />
               <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest text-center">Client Acceptance / Date</p>
            </div>
         </div>
      </Page>
    </div>
  );
};

export default PremiumReportPreview;
