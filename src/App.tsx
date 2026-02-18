
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { GameState, Question } from './types';
import { Difficulty, USER_PRIZE_LADDER, CHECKPOINTS } from './types';
import { QUESTION_POOL } from './constants';
import { askTheExpert } from './services/geminiService';
import PrizeLadder from './components/PrizeLadder';
import Lifelines from './components/Lifelines';

const Confetti: React.FC<{ density?: number }> = ({ density = 50 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      size: 5 + Math.random() * 10,
      color: ['#fbbf24', '#3b82f6', '#ef4444', '#10b981', '#a855f7'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      rotation: Math.random() * 360,
    }));
  }, [density]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm opacity-80"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0vh) rotate(0deg); }
          100% { transform: translateY(120vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
};

const Microbe: React.FC<{ delay: number, left: string, top: string, size: string, color: string }> = ({ delay, left, top, size, color }) => (
  <div 
    className="absolute rounded-full blur-xl opacity-20 animate-pulse pointer-events-none"
    style={{
      left,
      top,
      width: size,
      height: size,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${5 + Math.random() * 5}s`
    }}
  />
);

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Aesthetic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#020617_100%)]" />
      
      {/* Floating Microbiological Elements */}
      <div className="absolute inset-0">
        <Microbe left="10%" top="20%" size="150px" color="#3b82f6" delay={0} />
        <Microbe left="80%" top="15%" size="200px" color="#1e40af" delay={1.5} />
        <Microbe left="70%" top="70%" size="120px" color="#4338ca" delay={3} />
        <Microbe left="20%" top="80%" size="180px" color="#1d4ed8" delay={4.5} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Hero Content */}
      <div className="text-center z-10 max-w-5xl">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          Biological Knowledge Assessment System
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter leading-tight animate-in fade-in zoom-in duration-700">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">WHO WANTS TO BE A</span>
          <br />
          <span className="text-blue-500 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 uppercase drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Microbiologist?
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-500">
          Test your mastery of bacterial morphology, cellular structures, and virology in the most prestigious clinical challenge in the field.
        </p>
        
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-20 py-6 font-black text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(37,99,235,0.4)] uppercase tracking-widest text-2xl overflow-hidden"
          >
            <span className="relative z-10">Initialize Protocol</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Animated border line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </button>
        </div>
      </div>
      
      {/* Decorative SVG elements */}
      <div className="absolute bottom-[-100px] left-[-100px] opacity-10 pointer-events-none animate-spin-slow">
         <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
           <circle cx="12" cy="12" r="3" />
           <circle cx="12" cy="7" r="1" />
           <circle cx="12" cy="17" r="1" />
           <circle cx="7" cy="12" r="1" />
           <circle cx="17" cy="12" r="1" />
         </svg>
      </div>

      <div className="absolute bottom-8 text-blue-900/40 text-[10px] font-black tracking-[0.8em] uppercase pointer-events-none">
        Genomic Sequencing Engine Online
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    selectedQuestion: null,
    score: 0,
    isGameOver: false,
    hasWon: false,
    moneyEarned: 0,
    checkpointMoney: 0,
    usedLifelines: {
      fiftyFifty: false,
      audiencePoll: false,
      askExpert: false,
    },
    removedOptionIndices: [],
  });

  const [activeRoundQuestions, setActiveRoundQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [expertMessage, setExpertMessage] = useState<string | null>(null);
  const [pollResults, setPollResults] = useState<number[] | null>(null);
  const [loadingExpert, setLoadingExpert] = useState(false);
  const [isPollRevealed, setIsPollRevealed] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getInitialTime = (index: number) => {
    if (index < 5) return 60;
    if (index < 10) return 45;
    return null; // Unlimited for Q11-15
  };

  const handleGameOver = (finalPrize: number = 0) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      moneyEarned: finalPrize,
    }));
  };

  // Start/Reset Timer
  // @fix: Modified timer logic to pause during Expert advice usage (loading or displaying message)
  useEffect(() => {
    const isPaused = loadingExpert || !!expertMessage;

    if (isStarted && !gameState.isGameOver && !isAnswerRevealed && !isPaused) {
      const initialTime = getInitialTime(gameState.currentQuestionIndex);
      
      // If we don't have a timeLeft set yet (new question), set it
      if (timeLeft === null && initialTime !== null) {
        setTimeLeft(initialTime);
      }

      if (initialTime !== null) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev === null) return null;
            if (prev <= 1) {
              if (timerRef.current) clearInterval(timerRef.current);
              handleGameOver(gameState.checkpointMoney);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      // Clear interval if paused or answered
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.currentQuestionIndex, isStarted, gameState.isGameOver, isAnswerRevealed, gameState.checkpointMoney, loadingExpert, !!expertMessage]);

  const initializeGame = useCallback(() => {
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

    const easyPool = shuffle(QUESTION_POOL.filter(q => q.difficulty === Difficulty.EASY));
    const mediumPool = shuffle(QUESTION_POOL.filter(q => q.difficulty === Difficulty.MEDIUM));
    const hardPool = shuffle(QUESTION_POOL.filter(q => q.difficulty === Difficulty.HARD));

    const tier1 = shuffle([...easyPool.splice(0, 4), ...mediumPool.splice(0, 1)]);
    const tier2 = shuffle([...easyPool.splice(0, 1), ...mediumPool.splice(0, 3), ...hardPool.splice(0, 1)]);
    const tier3 = shuffle([...mediumPool.splice(0, 1), ...hardPool.splice(0, 4)]);

    const roundQuestions = [...tier1, ...tier2, ...tier3];
    
    setActiveRoundQuestions(roundQuestions);
    setGameState({
      currentQuestionIndex: 0,
      selectedQuestion: roundQuestions[0],
      score: 0,
      isGameOver: false,
      hasWon: false,
      moneyEarned: 0,
      checkpointMoney: 0,
      usedLifelines: {
        fiftyFifty: false,
        audiencePoll: false,
        askExpert: false,
      },
      removedOptionIndices: [],
    });
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setExpertMessage(null);
    setPollResults(null);
    setIsPollRevealed(false);
    setTimeLeft(null); // Will be set by timer effect
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleStartGame = () => {
    setIsStarted(true);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswerRevealed || gameState.isGameOver || gameState.removedOptionIndices.includes(index)) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerRevealed) return;

    // Pause timer on confirmation
    if (timerRef.current) clearInterval(timerRef.current);
    setIsAnswerRevealed(true);

    const currentQ = activeRoundQuestions[gameState.currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctIndex;

    setTimeout(() => {
      if (isCorrect) {
        const nextIndex = gameState.currentQuestionIndex + 1;
        const currentPrize = USER_PRIZE_LADDER[gameState.currentQuestionIndex];
        
        let newCheckpointMoney = gameState.checkpointMoney;
        if (CHECKPOINTS.includes(gameState.currentQuestionIndex)) {
          newCheckpointMoney = currentPrize;
        }

        if (nextIndex >= 15) {
          setGameState(prev => ({
            ...prev,
            hasWon: true,
            isGameOver: true,
            moneyEarned: 1000000,
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            currentQuestionIndex: nextIndex,
            selectedQuestion: activeRoundQuestions[nextIndex],
            moneyEarned: currentPrize,
            checkpointMoney: newCheckpointMoney,
            removedOptionIndices: [],
          }));
          setSelectedOption(null);
          setIsAnswerRevealed(false);
          setExpertMessage(null);
          setPollResults(null);
          setIsPollRevealed(false);
          setTimeLeft(null); // Reset time for next question
        }
      } else {
        handleGameOver(gameState.checkpointMoney);
      }
    }, 2000);
  };

  const useLifeline = async (type: 'fiftyFifty' | 'audiencePoll' | 'askExpert') => {
    if (gameState.usedLifelines[type] || isAnswerRevealed || gameState.isGameOver) return;

    const currentQ = activeRoundQuestions[gameState.currentQuestionIndex];

    if (type === 'fiftyFifty') {
      const incorrectIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
      const toRemove = [...incorrectIndices].sort(() => Math.random() - 0.5).slice(0, 2);
      
      setGameState(prev => ({
        ...prev,
        removedOptionIndices: toRemove,
        usedLifelines: { ...prev.usedLifelines, fiftyFifty: true }
      }));
    } else if (type === 'audiencePoll') {
      setPollResults([0, 0, 0, 0]); 
      const results = [0, 0, 0, 0];
      const correctBonus = Math.floor(Math.random() * 30) + 55; 
      results[currentQ.correctIndex] = correctBonus;
      let remaining = 100 - correctBonus;
      const otherIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
      
      for (let i = 0; i < 2; i++) {
        const share = Math.floor(Math.random() * remaining);
        results[otherIndices[i]] = share;
        remaining -= share;
      }
      results[otherIndices[2]] = remaining;

      setGameState(prev => ({
        ...prev,
        usedLifelines: { ...prev.usedLifelines, audiencePoll: true }
      }));

      setTimeout(() => {
        setPollResults(results);
        setIsPollRevealed(true);
      }, 50);
    } else if (type === 'askExpert') {
      setLoadingExpert(true);
      setPollResults(null);
      const msg = await askTheExpert(currentQ);
      setExpertMessage(msg);
      setLoadingExpert(false);
      setGameState(prev => ({
        ...prev,
        usedLifelines: { ...prev.usedLifelines, askExpert: true }
      }));
    }
  };

  const handleCashOut = () => {
    handleGameOver(gameState.moneyEarned);
  };

  if (!isStarted) {
    return <LandingPage onStart={handleStartGame} />;
  }

  if (gameState.isGameOver) {
    const isBigWin = gameState.moneyEarned >= 1000000;
    const isMediumWin = gameState.moneyEarned >= 32000;
    const isSmallWin = gameState.moneyEarned >= 1000;

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        {isBigWin && <Confetti density={150} />}
        {isMediumWin && !isBigWin && <Confetti density={80} />}
        {isSmallWin && !isMediumWin && <Confetti density={30} />}

        <div className={`max-w-xl w-full bg-slate-900 border-2 rounded-[2.5rem] p-12 text-center shadow-[0_0_100px_rgba(59,130,246,0.2)] z-10 transition-all duration-700 transform scale-110
          ${isBigWin ? 'border-yellow-500 bg-gradient-to-b from-slate-900 to-yellow-900/20' : 'border-blue-500'}`}>
          
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Final Results
            </span>
            <h1 className={`text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter
              ${isBigWin ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'text-blue-400'}`}>
              {gameState.hasWon ? 'World Class!' : 'Well Played!'}
            </h1>
          </div>

          <div className="relative inline-block mb-10 group">
            <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="text-7xl md:text-8xl font-black text-white relative">
              <span className="text-yellow-400">$</span>
              {gameState.moneyEarned.toLocaleString()}
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <p className="text-slate-300 text-lg leading-relaxed px-4">
              {gameState.hasWon 
                ? "You have achieved the ultimate status of a Distinguished Master Microbiologist. The scientific community salutes your precision!"
                : isMediumWin 
                ? "Incredible work! You've proven yourself as a highly capable researcher with a vast knowledge of bacterial morphology."
                : isSmallWin
                ? "A solid performance. You have a firm grasp of the fundamental structures that define our microscopic world."
                : "The lab can be a challenging place. Keep studying your cell structures and try again to climb the ladder!"}
            </p>
          </div>

          <button
            onClick={initializeGame}
            className={`w-full font-black py-5 rounded-2xl transition-all text-xl shadow-lg hover:scale-105 active:scale-95 uppercase tracking-widest
              ${isBigWin ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-[0_10px_30px_rgba(234,179,8,0.4)]' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            Start New Research
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    );
  }

  const currentQuestion = activeRoundQuestions[gameState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 flex flex-col p-4 md:p-10 relative">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl md:text-3xl font-black tracking-tighter text-blue-400">
                WHO WANTS TO BE A <span className="text-white">MICROBIOLOGIST?</span>
              </h1>
              <p className="text-slate-500 text-xs md:text-sm uppercase tracking-widest">
                Topic: {currentQuestion?.topic || 'Bacteriology & Virology'}
              </p>
            </div>
            
            {/* Timer Display */}
            <div className={`flex items-center gap-3 bg-slate-900/50 border border-blue-500/20 px-4 py-2 rounded-full transition-opacity duration-300 ${loadingExpert || !!expertMessage ? 'opacity-50' : 'opacity-100'}`}>
               <div className={`w-2 h-2 rounded-full bg-blue-500 ${loadingExpert || !!expertMessage ? '' : 'animate-pulse'}`}></div>
               <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">
                 {loadingExpert || !!expertMessage ? 'Lab Paused' : 'Lab Timer'}
               </span>
               <span className={`text-2xl font-black tabular-nums transition-colors duration-300 ${
                 timeLeft === null ? 'text-green-400' :
                 timeLeft < 10 ? 'text-red-500 animate-pulse' :
                 timeLeft < 20 ? 'text-yellow-500' : 'text-white'
               }`}>
                 {timeLeft !== null ? timeLeft : '∞'}
               </span>
            </div>
          </div>
          <button 
            onClick={handleCashOut}
            className="px-4 py-2 border border-yellow-600 text-yellow-500 text-xs md:text-sm rounded hover:bg-yellow-900/20 transition-all font-bold"
          >
            CASH OUT
          </button>
        </header>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="mb-6 w-full">
            <Lifelines 
              used={gameState.usedLifelines} 
              onUse={useLifeline} 
              disabled={isAnswerRevealed}
            />
          </div>

          <div className="min-h-[140px] mb-4 w-full max-w-2xl flex items-center justify-center">
            {loadingExpert && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-blue-400 font-bold animate-pulse uppercase text-xs tracking-widest">Consulting the Expert...</div>
              </div>
            )}
            {expertMessage && !loadingExpert && (
              <div className="bg-slate-900/80 border-2 border-blue-500 rounded-2xl p-5 text-sm md:text-base text-blue-50 text-center w-full shadow-2xl relative overflow-hidden backdrop-blur-md animate-in fade-in zoom-in duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
                <button 
                   onClick={() => setExpertMessage(null)}
                   className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-colors"
                >
                  ×
                </button>
                <div className="flex items-center justify-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">🧪</div>
                   <span className="font-black uppercase tracking-widest text-blue-400 text-xs">Professor's Diagnosis</span>
                </div>
                <p className="leading-relaxed font-medium italic">"{expertMessage}"</p>
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
              </div>
            )}
            {pollResults && (
              <div className="flex gap-4 w-full justify-around items-end h-24 px-10 bg-slate-900/40 rounded-2xl p-6 border border-blue-500/20 shadow-inner animate-in slide-in-from-bottom-4 duration-700">
                {pollResults.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <span className={`text-[10px] mb-1 font-bold transition-opacity duration-1000 ${isPollRevealed ? 'text-blue-200' : 'opacity-0'}`}>
                      {val}%
                    </span>
                    <div 
                      className="bg-gradient-to-t from-blue-700 to-blue-400 w-full rounded-t-lg transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.3)] relative group" 
                      style={{ height: `${val}%`, minHeight: '6px' }}
                    >
                      <div className="absolute -top-1 left-0 w-full h-1 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-xs font-black mt-2 text-blue-400 uppercase">{String.fromCharCode(65 + idx)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {currentQuestion && (
            <div className="w-full max-w-4xl">
              <div className="bg-slate-900/90 border-2 border-blue-500/60 rounded-2xl p-6 md:p-8 mb-6 relative shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-8 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border border-blue-400/50">
                  Question {gameState.currentQuestionIndex + 1}
                </div>
                <h2 className="text-lg md:text-2xl text-center font-bold leading-relaxed text-white">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isRemoved = gameState.removedOptionIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  const isCorrect = isAnswerRevealed && idx === currentQuestion.correctIndex;
                  const isWrong = isAnswerRevealed && isSelected && idx !== currentQuestion.correctIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isRemoved || isAnswerRevealed}
                      className={`
                        group relative flex items-center p-4 md:p-5 border-2 rounded-xl text-left transition-all duration-500 transform
                        ${isRemoved ? 'opacity-0 cursor-default scale-90 -translate-y-2 pointer-events-none' : 'opacity-100'}
                        ${isSelected ? 'bg-orange-500 border-orange-300 text-white scale-[1.03] shadow-2xl z-10' : 'bg-slate-900/80 border-blue-500/30 text-slate-200 hover:border-blue-400 hover:bg-slate-800'}
                        ${isCorrect ? '!bg-green-600 !border-green-300 !text-white active-checkpoint shadow-[0_0_30px_rgba(34,197,94,0.5)] z-20' : ''}
                        ${isWrong ? '!bg-red-600 !border-red-300 !text-white scale-95 opacity-50' : ''}
                      `}
                    >
                      <span className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center font-black mr-4 text-xs shrink-0 transition-colors
                        ${isSelected ? 'border-white text-white' : 'border-orange-500 text-orange-500'}
                        ${isCorrect || isWrong ? 'border-white text-white' : ''}
                      `}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm md:text-base font-semibold">{option}</span>
                      {isSelected && (
                         <div className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center h-16">
          {selectedOption !== null && !isAnswerRevealed && (
            <button
              onClick={handleConfirmAnswer}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-14 py-3 rounded-full font-black text-xl tracking-tighter shadow-[0_10px_30px_rgba(234,179,8,0.4)] transition-all transform active:scale-95 hover:scale-105"
            >
              FINAL ANSWER?
            </button>
          )}
          {isAnswerRevealed && (
            <div className="text-white font-black animate-pulse text-lg tracking-[0.2em] uppercase flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
              Checking results...
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-blue-900/40 flex flex-col shadow-2xl relative z-30">
        <div className="p-6 border-b border-blue-900/50 bg-slate-900">
          <div className="text-[10px] text-blue-400 uppercase tracking-[0.3em] font-black mb-1">Guaranteed Checkpoint</div>
          <div className="text-3xl font-black text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            ${gameState.moneyEarned.toLocaleString()}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <PrizeLadder currentStep={gameState.currentQuestionIndex} />
        </div>
      </div>
    </div>
  );
};

export default App;
