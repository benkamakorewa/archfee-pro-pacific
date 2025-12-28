import React from 'react';
import { User } from '../types';

interface HeaderProps {
  onDashboard?: () => void;
  onNewEstimate?: () => void;
  isSyncing?: boolean;
  currentUser?: User;
}

const Header: React.FC<HeaderProps> = ({ onDashboard, onNewEstimate, isSyncing, currentUser }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 lg:px-10 shadow-sm">
      <div className="flex items-center gap-4 text-[#111618]">
        <div className="size-8 flex items-center justify-center bg-[#13a4ec]/10 rounded-lg text-[#13a4ec]">
          <span className="material-symbols-outlined text-2xl font-bold">architecture</span>
        </div>
        <div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">ArchFee Pro</h2>
          {isSyncing && (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="size-1.5 bg-[#13a4ec] rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#13a4ec]">Syncing Pacific Rates...</span>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <nav className="flex items-center gap-9">
          {currentUser?.role === 'admin' && (
            <button onClick={onDashboard} className="text-[#111618] hover:text-[#13a4ec] transition-colors text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Admin Area
            </button>
          )}
          {/* Projects and Settings removed as per requirements to reduce clutter */}
        </nav>
        <button
          onClick={onNewEstimate}
          className="flex min-w-[120px] items-center justify-center rounded-lg h-9 px-4 bg-[#13a4ec] text-white text-sm font-bold shadow-sm hover:bg-[#118bc7] transition-colors"
        >
          New Estimate
        </button>

        {currentUser && (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
              {currentUser.name.charAt(0)}
            </div>
          </div>
        )}
      </div>
      <button className="md:hidden text-[#111618]">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
};

export default Header;
