
import React from 'react';
import { CountryKey } from '../types';

interface FooterProps {
    onNewEstimate?: () => void;
    selectedCountry?: CountryKey;
}

const Footer: React.FC<FooterProps> = ({ onNewEstimate, selectedCountry }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6 lg:px-10 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#111618]">
                            <div className="size-10 flex items-center justify-center bg-[#13a4ec]/10 rounded-xl text-[#13a4ec]">
                                <span className="material-symbols-outlined text-2xl font-bold">architecture</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-black leading-tight tracking-tight">ArchFee <span className="text-[#13a4ec]">Pro</span></h2>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pacific Market Intelligence</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            The leading professional cost planning and architectural fee estimation platform for residential development in the Pacific region.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Quick Access</h4>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={onNewEstimate}
                                    className="text-sm font-bold text-gray-600 hover:text-[#13a4ec] transition-colors flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">add_circle</span>
                                    Start New Estimate
                                </button>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-bold text-gray-600 hover:text-[#13a4ec] transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">help</span>
                                    How it Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-bold text-gray-600 hover:text-[#13a4ec] transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">security</span>
                                    Security & Privacy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Regional Context */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Project Regions</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.values(CountryKey).map(c => (
                                <div key={c} className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                                    <span className={`size-1.5 rounded-full ${selectedCountry === c ? 'bg-[#13a4ec]' : 'bg-gray-200'}`} />
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Professional Support</h4>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                Need a detailed Quantity Surveyor verification or specific architectural consultation?
                            </p>
                            <button className="w-full h-10 bg-[#111618] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-colors">
                                Contact Consultant
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            © {currentYear} ArchFee Pro. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-[10px] font-black text-gray-400 hover:text-[#13a4ec] uppercase tracking-widest transition-colors">Terms</a>
                            <a href="#" className="text-[10px] font-black text-gray-400 hover:text-[#13a4ec] uppercase tracking-widest transition-colors">Privacy</a>
                            <a href="#" className="text-[10px] font-black text-gray-400 hover:text-[#13a4ec] uppercase tracking-widest transition-colors">Cookies</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                            <span className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">System Status: Optimal</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="#" className="size-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#13a4ec]/10 hover:text-[#13a4ec] transition-all">
                                <span className="material-symbols-outlined text-lg">public</span>
                            </a>
                            <a href="#" className="size-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#13a4ec]/10 hover:text-[#13a4ec] transition-all">
                                <span className="material-symbols-outlined text-lg">mail</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
