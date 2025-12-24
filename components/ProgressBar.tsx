
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-xs font-bold text-[#13a4ec] uppercase tracking-widest mb-1">Step {current} of {total}</p>
          <p className="text-sm font-semibold text-gray-700">Project Estimation</p>
        </div>
        <p className="text-xs text-gray-400 font-medium">{Math.round(percentage)}% Complete</p>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div 
          className="h-full bg-[#13a4ec] transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
