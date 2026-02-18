
import React from 'react';
import { USER_PRIZE_LADDER, CHECKPOINTS } from '../types';

interface PrizeLadderProps {
  currentStep: number;
}

const PrizeLadder: React.FC<PrizeLadderProps> = ({ currentStep }) => {
  return (
    <div className="w-full h-full bg-slate-900/80 p-4 flex flex-col-reverse gap-1 border-l border-blue-900/50">
      {USER_PRIZE_LADDER.map((prize, index) => {
        const isCurrent = index === currentStep;
        const isCheckpoint = CHECKPOINTS.includes(index);
        const isPassed = index < currentStep;

        return (
          <div
            key={index}
            className={`flex items-center justify-between px-3 py-1.5 rounded transition-all duration-300 ${
              isCurrent ? 'bg-orange-500 text-white font-bold scale-105 shadow-lg active-checkpoint' : 
              isPassed ? 'text-orange-300' : 
              isCheckpoint ? 'text-white font-semibold' : 'text-slate-400'
            }`}
          >
            <span className="text-xs mr-2">{index + 1}</span>
            <span className={`text-sm ${isCheckpoint && !isPassed ? 'text-yellow-400' : ''}`}>
              ${prize.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PrizeLadder;
