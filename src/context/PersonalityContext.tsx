import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TraitScores, initialTraitScores } from '../data/traits';

interface PersonalityContextType {
  traitScores: TraitScores;
  updateTraitScore: (trait: keyof TraitScores, value: number) => void;
  resetTraits: () => void;
}

const PersonalityContext = createContext<PersonalityContextType | undefined>(undefined);

export const usePersonality = (): PersonalityContextType => {
  const context = useContext(PersonalityContext);
  if (context === undefined) {
    throw new Error('usePersonality must be used within a PersonalityProvider');
  }
  return context;
};

interface PersonalityProviderProps {
  children: ReactNode;
}

export const PersonalityProvider: React.FC<PersonalityProviderProps> = ({ children }) => {
  const [traitScores, setTraitScores] = useState<TraitScores>(initialTraitScores);

  const updateTraitScore = (trait: keyof TraitScores, value: number) => {
    setTraitScores(prev => ({
      ...prev,
      [trait]: Math.max(0, Math.min(100, prev[trait] + value))
    }));
  };

  const resetTraits = () => {
    setTraitScores(initialTraitScores);
  };

  return (
    <PersonalityContext.Provider value={{ traitScores, updateTraitScore, resetTraits }}>
      {children}
    </PersonalityContext.Provider>
  );
};