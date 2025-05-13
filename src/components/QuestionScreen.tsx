import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { usePersonality } from '../context/PersonalityContext';
import { Avatar } from './Avatar';
import { ProgressBar } from './ProgressBar';
import { ChevronRight } from 'lucide-react';

interface QuestionScreenProps {
  onComplete: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { traitScores, updateTraitScore } = usePersonality();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnimating) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnimating(true);
    
    // Apply trait impacts
    const answer = currentQuestion.answers[answerIndex];
    Object.entries(answer.traitImpacts).forEach(([trait, impact]) => {
      updateTraitScore(trait as keyof typeof traitScores, impact);
    });
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, 1000);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden order-2 md:order-1">
        <div className="p-6">
          <ProgressBar progress={progress} />
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.text}
            </h2>
            
            <div className="mt-6 space-y-3">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnimating}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{answer.text}</span>
                    {selectedAnswer === index && (
                      <ChevronRight className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-gray-500 text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-80 md:h-auto order-1 md:order-2 flex items-center justify-center p-6">
        <Avatar isAnimating={isAnimating} />
      </div>
    </div>
  );
};