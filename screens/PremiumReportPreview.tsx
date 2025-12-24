
import React from 'react';
import { CalculationResults, ProjectData } from '../types';

interface PremiumReportPreviewProps {
  results: CalculationResults;
  projectData: ProjectData;
  onBack: () => void;
}

const PremiumReportPreview: React.FC<PremiumReportPreviewProps> = ({ results, projectData, onBack }) => {
  const reportDate = new Date().toLocaleDateString('en-FJ', { day: 'numeric', month: 'long', year: 'numeric' });
  const proposalID = `AFP-${projectData.country.substring(0,2).toUpperCase()}-${Math.floor(Math.random() * 90000 + 10000)}`;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: results.currency 
    }).format(val).replace('US$', results.currency + ' ');
  };

  const Page: React.FC<{ children: React.ReactNode; pageNumber: number }> = ({ children, pageNumber }) => (
    <div className="bg-white w-full max-w-[800px] aspect-[1/1.41] shadow-2xl mx-auto p-16 flex flex-col relative overflow-hidden border border-gray-100 mb-10 last:mb-0">
      <div className="absolute top-0 left-0 w-2 h-full bg-[#13a4ec]/20" />
      {/* Branded Header */}
      <div className="flex justify-between items-start mb-16">
         <div className="flex items-center gap-3 text-[#111618]">
            <div className="size-10 flex items-center justify-center bg-[#13a4ec] rounded text-white">
              <span className="material-symbols-outlined text-2xl font-bold">architecture</span>
            </div>
            <p className="font-black text-xl">ArchFee <span className="text-[#13a4ec]">Pro</span></p>
         </div>
         <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Proposal ID</p>
            <p className="font-bold text-sm">{proposalID}</p>
         </div>
      </div>

      <div className="flex-1">{children}</div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
         <p>© ArchFee Pro Pacific | Professional Planning Document</p>
         <p>Page {pageNumber} of 4</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#111618] min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center text-white">
         <button onClick={onBack} className="flex items-center gap-2 font-bold text-sm text-white/60 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Dashboard
         </button>
         <div className="flex gap-4">
            <button className="h-10 px-6 bg-white/10 rounded-lg text-sm font-bold border border-white/20">Print</button>
            <button className="h-10 px-6 bg-[#13a4ec] rounded-lg text-sm font-bold shadow-lg">Download PDF</button>
         </div>
      </div>

      {/* Page 1: Cover */}
      <Page pageNumber={1}>
        <div className="flex flex-col h-full">
           <div className="mt-12 space-y-4">
              <div className="h-1 w-20 bg-[#13a4ec]" />
              <h1 className="text-6xl font-black tracking-tighter leading-[0.9]">Preliminary <br/> Cost Plan</h1>
              <p className="text-xl text-gray-400 font-medium tracking-tight">Residential Architectural Fee Proposal</p>
           </div>

           <div className="mt-20 grid grid-cols-2 gap-12">
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Prepared for</p>
                 <p className="text-lg font-black">{projectData.clientDetails.name || 'Valued Client'}</p>
                 <p className="text-sm text-gray-500 font-medium">{projectData.clientDetails.email}</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Date Issued</p>
                 <p className="text-lg font-black">{reportDate}</p>
                 <p className="text-sm text-gray-500 font-medium">Valid for 30 days</p>
              </div>
           </div>

           <div className="mt-auto h-64 w-full rounded-2xl overflow-hidden grayscale">
              <img src="https://images.unsplash.com/photo-1487958444681-3729e20a0614?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="site" />
           </div>
        </div>
      </Page>

      {/* Page 2: Project Overview & Specs */}
      <Page pageNumber={2}>
         <h2 className="text-2xl font-black mb-8 border-b-2 border-gray-100 pb-4">01. Project Parameters</h2>
         
         <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-6">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Region</p>
                  <p className="text-sm font-bold">{projectData.country}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Specific Location</p>
                  <p className="text-sm font-bold">{projectData.location}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Building Type</p>
                  <p className="text-sm font-bold">{projectData.buildingType}</p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-6">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Floor Area</p>
                  <p className="text-sm font-bold">{projectData.floorArea} m²</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Standard</p>
                  <p className="text-sm font-bold">{projectData.standard}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Land Tenure</p>
                  <p className="text-sm font-bold">{projectData.landType}</p>
               </div>
            </div>
         </div>

         <div className="mt-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Regional Resilience Summary</h3>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
               <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                     <span className="material-symbols-outlined text-[#13a4ec]">cyclone</span>
                     <p className="text-sm font-bold">Cyclone Rating: {projectData.enhancedResilience ? 'Enhanced (Grade C/D)' : 'Standard NBC'}</p>
                  </div>
                  <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Compliance Check Active</span>
               </div>
               <div className="flex flex-wrap gap-4">
                  {projectData.infrastructure.solarSystem && <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Solar PV Included</span>}
                  {projectData.infrastructure.waterHarvesting && <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Water Tanks Included</span>}
                  {projectData.infrastructure.septicSystem && <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Septic System Included</span>}
               </div>
            </div>
         </div>
      </Page>

      {/* Page 3: Financial Detailed Breakdown */}
      <Page pageNumber={3}>
         <h2 className="text-2xl font-black mb-8 border-b-2 border-gray-100 pb-4">02. Preliminary Cost Schedule</h2>
         <table className="w-full">
            <thead className="border-b border-gray-200">
               <tr>
                  <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                  <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Sub-Total ({results.currency})</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               <tr>
                  <td className="py-4 text-sm font-medium text-gray-600">Core Structural Cost ({projectData.floorArea}m² @ {formatCurrency(results.ratePerM2 - (results.resiliencePremium + results.infraCost + results.landLegalEstimate + results.contingency)/projectData.floorArea)})</td>
                  <td className="py-4 text-right text-sm font-black">{formatCurrency(results.constructionCost - (results.resiliencePremium + results.infraCost + results.landLegalEstimate + results.contingency))}</td>
               </tr>
               <tr>
                  <td className="py-4 text-sm font-medium text-gray-600">Regional Logistics & Multipliers</td>
                  <td className="py-4 text-right text-sm font-black">Included</td>
               </tr>
               <tr>
                  <td className="py-4 text-sm font-medium text-gray-600">Structural Resilience Premium (Cyclone Grade C/D)</td>
                  <td className="py-4 text-right text-sm font-black">{formatCurrency(results.resiliencePremium)}</td>
               </tr>
               <tr>
                  <td className="py-4 text-sm font-medium text-gray-600">Off-Grid Site Infrastructure Total</td>
                  <td className="py-4 text-right text-sm font-black">{formatCurrency(results.infraCost)}</td>
               </tr>
               <tr>
                  <td className="py-4 text-sm font-medium text-gray-600">Land Tenure Legal & Liaison (Est.)</td>
                  <td className="py-4 text-right text-sm font-black">{formatCurrency(results.landLegalEstimate)}</td>
               </tr>
               <tr className="bg-blue-50/30">
                  <td className="py-4 px-2 text-sm font-bold text-[#13a4ec]">Contingency Allowance (7%)</td>
                  <td className="py-4 px-2 text-right text-sm font-black text-[#13a4ec]">{formatCurrency(results.contingency)}</td>
               </tr>
            </tbody>
            <tfoot className="border-t-2 border-[#111618]">
               <tr>
                  <td className="py-6 font-black text-xl">Total Indicative Construction Cost</td>
                  <td className="py-6 text-right font-black text-xl text-[#13a4ec]">{formatCurrency(results.constructionCost)}</td>
               </tr>
            </tfoot>
         </table>
         <p className="mt-8 text-[9px] text-gray-400 leading-relaxed font-medium">
            * This estimate is provided for preliminary budgeting purposes only. It is not a formal tender or a Quantity Surveyors cost plan. Rates are based on {projectData.country} market data synced on {results.lastSync || 'today'}.
         </p>
      </Page>

      {/* Page 4: Architectural Fee Proposal */}
      <Page pageNumber={4}>
         <h2 className="text-2xl font-black mb-8 border-b-2 border-gray-100 pb-4">03. Architectural Fee Proposal</h2>
         <div className="bg-[#111618] text-white p-8 rounded-2xl mb-12 flex justify-between items-center">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Proposed Fee Structure</p>
               <p className="text-xl font-black">{projectData.selectedFeeOption}</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Professional Fee</p>
               <p className="text-3xl font-black text-[#13a4ec]">{formatCurrency(results.totalFee)}</p>
            </div>
         </div>

         <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Milestone Payment Schedule</h3>
         <div className="space-y-4">
            {results.stageBreakdown.map(stage => (
               <div key={stage.name} className="flex justify-between items-center border-b border-gray-50 pb-4">
                  <div>
                     <p className="text-sm font-bold">{stage.name}</p>
                     <p className="text-[10px] text-gray-400">{stage.percentage}% of total fee</p>
                  </div>
                  <p className="text-sm font-black">{formatCurrency(stage.amount)}</p>
               </div>
            ))}
         </div>

         <div className="mt-auto border-2 border-dashed border-gray-100 p-8 rounded-2xl text-center">
            <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">Client Acceptance Block</p>
            <div className="flex gap-8 justify-between pt-12">
               <div className="flex-1 border-t border-gray-300 pt-2 text-[10px] font-bold text-gray-400">Signature</div>
               <div className="flex-1 border-t border-gray-300 pt-2 text-[10px] font-bold text-gray-400">Date</div>
            </div>
         </div>
      </Page>
    </div>
  );
};

export default PremiumReportPreview;
