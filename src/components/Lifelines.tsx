
import React from 'react';

interface LifelinesProps {
  used: {
    fiftyFifty: boolean;
    audiencePoll: boolean;
    askExpert: boolean;
  };
  onUse: (type: 'fiftyFifty' | 'audiencePoll' | 'askExpert') => void;
  disabled: boolean;
}

const LifelineIcon: React.FC<{ type: string; used: boolean; onClick: () => void; disabled: boolean }> = ({ type, used, onClick, disabled }) => {
  const labels = {
    fiftyFifty: '50:50',
    audiencePoll: 'Audience',
    askExpert: 'Expert'
  };

  return (
    <button
      onClick={onClick}
      disabled={used || disabled}
      className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform ${
        used 
          ? 'border-red-600 bg-red-900/30 text-red-500 cursor-not-allowed opacity-50 grayscale' 
          : 'border-blue-400 bg-blue-900/40 text-blue-200 hover:scale-110 hover:bg-blue-800'
      }`}
    >
      <span className="text-[10px] md:text-xs font-bold uppercase text-center leading-tight">
        {labels[type as keyof typeof labels]}
      </span>
    </button>
  );
};

const Lifelines: React.FC<LifelinesProps> = ({ used, onUse, disabled }) => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <LifelineIcon 
        type="fiftyFifty" 
        used={used.fiftyFifty} 
        disabled={disabled}
        onClick={() => onUse('fiftyFifty')} 
      />
      <LifelineIcon 
        type="audiencePoll" 
        used={used.audiencePoll} 
        disabled={disabled}
        onClick={() => onUse('audiencePoll')} 
      />
      <LifelineIcon 
        type="askExpert" 
        used={used.askExpert} 
        disabled={disabled}
        onClick={() => onUse('askExpert')} 
      />
    </div>
  );
};

export default Lifelines;
