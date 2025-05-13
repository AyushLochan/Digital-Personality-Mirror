import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { usePersonality } from '../context/PersonalityContext';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { resetTraits } = usePersonality();
  
  const handleStart = () => {
    resetTraits();
    onStart();
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-8 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Digital Personality Mirror
          </h1>
          <Brain className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <p className="mt-4 text-violet-100 text-lg">
          Discover your unique personality profile through quirky questions
        </p>
      </div>
      
      <div className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              How it works
            </h2>
            <p className="mt-2 text-gray-600">
              Answer a series of quirky questions and watch as your unique personality avatar 
              evolves in real-time. Your choices will shape the colors, forms, and animations 
              of your digital reflection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="font-semibold text-indigo-700 mb-2">Step 1</div>
              <p className="text-sm text-gray-700">Answer fun personality questions</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-700 mb-2">Step 2</div>
              <p className="text-sm text-gray-700">Watch your avatar evolve with each answer</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="font-semibold text-pink-700 mb-2">Step 3</div>
              <p className="text-sm text-gray-700">Discover your unique personality profile</p>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};