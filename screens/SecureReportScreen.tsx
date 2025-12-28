
import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { CalculationResults, ProjectData } from '../types';
import PaymentGateway from '../components/PaymentGateway';
import AuthScreen from './AuthScreen';

interface SecureReportScreenProps {
   results: CalculationResults;
   projectData: ProjectData;
   onUpdate: (updates: Partial<ProjectData>) => void;
   onBack: () => void;
   onReportGenerated: () => void;
}

const SecureReportScreen: React.FC<SecureReportScreenProps> = ({ results, projectData, onUpdate, onBack, onReportGenerated }) => {
   const { currentUser } = useAuth();
   const [view, setView] = useState<'details' | 'processing' | 'success'>('details');
   const [showPayment, setShowPayment] = useState(false);
   const [showAuth, setShowAuth] = useState(false);

   // Hardcoded Price for MVP
   const REPORT_PRICE = 50;


   useEffect(() => {
      if (currentUser) {
         onUpdate({
            clientDetails: {
               ...projectData.clientDetails,
               name: currentUser.name || projectData.clientDetails.name,
               email: currentUser.email || projectData.clientDetails.email
            }
         });
      }
   }, [currentUser]);

   const handleGenerateClick = (e: React.FormEvent) => {
      e.preventDefault();

      // If already paid, just go to report
      if (projectData.isPaid) {
         onReportGenerated();
         return;
      }

      if (!currentUser) {
         setShowAuth(true);
         return;
      }

      // If logged in, show Payment Gate
      setShowPayment(true);
   };

   const handlePaymentSuccess = async () => {
      setShowPayment(false);
      setView('processing');

      // Update local state to reflect payment
      onUpdate({ isPaid: true, paymentId: `PAY-${Date.now()}` });
      const paidData = { ...projectData, isPaid: true, paymentId: `PAY-${Date.now()}` };

      if (currentUser) {
         try {
            await addDoc(collection(db, 'estimates'), {
               userId: currentUser.id,
               createdAt: new Date().toISOString(),
               data: paidData,
               results: results
            });
         } catch (error) {
            console.error("Error saving estimate:", error);
         }
      }

      setTimeout(() => setView('success'), 2000);
   };

   const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: results.currency
      }).format(val).replace('US$', results.currency + ' ');
   };

   return (
      <div className="max-w-4xl mx-auto px-6 py-12">
         {showAuth && (
            <div className="fixed inset-0 z-50 bg-[#111618]/50 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-[2rem] shadow-2xl relative overflow-hidden w-full max-w-lg">
                  <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full">
                     <span className="material-symbols-outlined">close</span>
                  </button>
                  <AuthScreen onSuccess={() => setShowAuth(false)} />
               </div>
            </div>
         )}

         {showPayment && (
            <PaymentGateway
               amount={REPORT_PRICE}
               currency={results.currency}
               onSuccess={handlePaymentSuccess}
               onCancel={() => setShowPayment(false)}
            />
         )}

         {view === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-500">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-[#13a4ec] font-black uppercase tracking-widest text-xs">
                     <span className="material-symbols-outlined text-sm">lock</span>
                     Secure My Report
                  </div>
                  <h1 className="text-4xl font-black tracking-tight leading-tight">Professionalize your <br /> project today.</h1>
                  <p className="text-gray-500 leading-relaxed font-medium">
                     Unlock the full 4-page PDF proposal with detailed regional breakdowns, bank-ready formatting, and structural specs.
                  </p>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                     <div className="flex justify-between items-center text-sm font-black">
                        <span className="text-gray-400">Individual Report</span>
                        <span className="text-[#13a4ec]">{formatCurrency(50)}</span>
                     </div>
                     <div className="h-px w-full bg-gray-50" />
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Includes bank-pre approval formatting</p>
                  </div>
               </div>

               <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-6">
                  <div className="text-center">
                     <h3 className="text-xl font-black mb-1">
                        {projectData.isPaid ? 'Ready to View' : (currentUser ? 'Purchase Official Document' : 'Create Account to Purchase')}
                     </h3>
                     <p className="text-xs text-gray-400 font-medium">
                        {projectData.isPaid ? 'Your report is unlocked.' : (currentUser ? 'Securely unlock valid PDF generation.' : 'Sign in to save estimate & unlock payments.')}
                     </p>
                  </div>

                  <form className="space-y-4" onSubmit={handleGenerateClick}>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Full Name</label>
                        <input
                           required type="text" placeholder="John Doe"
                           className="w-full h-14 bg-gray-50 border-gray-100 rounded-xl px-5 font-bold"
                           value={projectData.clientDetails.name}
                           onChange={(e) => onUpdate({ clientDetails: { ...projectData.clientDetails, name: e.target.value } })}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email Address</label>
                        <input
                           required type="email" placeholder="john@company.com"
                           className="w-full h-14 bg-gray-50 border-gray-100 rounded-xl px-5 font-bold"
                           value={projectData.clientDetails.email}
                           onChange={(e) => onUpdate({ clientDetails: { ...projectData.clientDetails, email: e.target.value } })}
                        />
                     </div>
                     <button className="w-full h-16 bg-[#13a4ec] text-white font-black rounded-2xl shadow-xl shadow-[#13a4ec]/20 text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                        {projectData.isPaid ? 'View Report' : (currentUser ? `Example Pay ${formatCurrency(REPORT_PRICE)}` : 'Sign In & Continue')}
                        <span className="material-symbols-outlined">{projectData.isPaid ? 'description' : (currentUser ? 'credit_card' : 'login')}</span>
                     </button>
                  </form>
               </div>
            </div>
         )}

         {view === 'processing' && (
            <div className="h-[400px] flex flex-col items-center justify-center gap-6 text-center animate-in zoom-in duration-500">
               <div className="size-16 border-4 border-[#13a4ec] border-t-transparent rounded-full animate-spin" />
               <div>
                  <h2 className="text-2xl font-black mb-1">Finalizing Proposal</h2>
                  <p className="text-gray-400 font-medium">Encoding structural specifications for {projectData.country}...</p>
               </div>
            </div>
         )}

         {view === 'success' && (
            <div className="bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8 animate-in zoom-in duration-500 max-w-2xl mx-auto">
               <div className="size-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-5xl font-bold">verified</span>
               </div>
               <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tight">Report Generated</h2>
                  <p className="text-gray-400 font-medium">Your professional project proposal is ready for review.</p>
               </div>
               <button
                  onClick={onReportGenerated}
                  className="w-full h-16 bg-[#111618] text-white font-black rounded-2xl text-lg flex items-center justify-center gap-3 shadow-2xl shadow-black/20"
               >
                  <span className="material-symbols-outlined">description</span>
                  Open Full Premium Report
               </button>
            </div>
         )}

         {view === 'details' && (
            <div className="mt-12 text-center">
               <button onClick={onBack} className="text-gray-400 font-bold hover:text-gray-800 transition-colors">← Back to Dashboard</button>
            </div>
         )}
      </div>
   );
};

export default SecureReportScreen;
