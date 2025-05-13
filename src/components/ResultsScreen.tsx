import React from 'react';
import { usePersonality } from '../context/PersonalityContext';
import { Avatar } from './Avatar';
import { getPersonalityProfile, traitColorMap, traitDescriptions } from '../data/traits';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface ResultsScreenProps {
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ onRestart }) => {
  const { traitScores } = usePersonality();
  const personalityProfile = getPersonalityProfile(traitScores);
  
  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Digital Personality Mirror Results',
        text: `${personalityProfile} - Check out my unique personality profile!`,
        url: window.location.href,
      });
    } else {
      alert('Web Share API not supported in your browser. Try copying the link manually.');
    }
  };
  
  // Convert canvas to image for download
  const downloadAvatar = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'personality-avatar.png';
    link.click();
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold text-center">Your Personality Mirror</h1>
      </div>
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex items-center justify-center p-4">
            <Avatar size="large" />
          </div>
          
          <div className="md:w-1/2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{personalityProfile}</h2>
              <p className="mt-2 text-gray-600">
                Your personality avatar reflects the unique combination of traits that make you who you are.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Your Key Traits:</h3>
              
              <div className="space-y-3">
                {Object.entries(traitScores)
                  .sort(([, valueA], [, valueB]) => valueB - valueA)
                  .slice(0, 4)
                  .map(([trait, value]) => (
                    <div key={trait} className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold inline-block text-gray-800 capitalize">
                            {trait}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold inline-block text-gray-800">
                            {Math.round(value)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100 mt-1">
                        <div 
                          style={{ 
                            width: `${value}%`,
                            backgroundColor: traitColorMap[trait as keyof typeof traitScores] 
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {traitDescriptions[trait as keyof typeof traitScores]}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <button
                onClick={shareResults}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={downloadAvatar}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Save Avatar
                </button>
                
                <button
                  onClick={onRestart}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};