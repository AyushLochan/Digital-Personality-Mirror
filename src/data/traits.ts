export interface TraitScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  creativity: number;
  playfulness: number;
  curiosity: number;
}

export const initialTraitScores: TraitScores = {
  openness: 50,
  conscientiousness: 50,
  extraversion: 50,
  agreeableness: 50,
  neuroticism: 50,
  creativity: 50,
  playfulness: 50,
  curiosity: 50
};

export interface TraitVisualMapping {
  [key: string]: {
    color: string;
    shape: string;
    animation: string;
  };
}

export const traitColorMap: Record<keyof TraitScores, string> = {
  openness: '#8B5CF6', // Purple
  conscientiousness: '#3B82F6', // Blue
  extraversion: '#F59E0B', // Amber
  agreeableness: '#10B981', // Emerald
  neuroticism: '#EF4444', // Red
  creativity: '#EC4899', // Pink
  playfulness: '#F97316', // Orange
  curiosity: '#6366F1', // Indigo
};

export const traitDescriptions: Record<keyof TraitScores, string> = {
  openness: 'Appreciative of art, adventure, new ideas, imagination, curiosity, and variety of experience.',
  conscientiousness: 'Organized, dependable, self-disciplined, dutiful, achievement-oriented, and careful.',
  extraversion: 'Outgoing, energetic, sociable, assertive, talkative, and enthusiastic.',
  agreeableness: 'Cooperative, compassionate, trusting, helpful, and empathetic.',
  neuroticism: 'Tendency to experience negative emotions like anxiety, anger, depression, vulnerability.',
  creativity: 'Ability to generate novel and valuable ideas, solutions, or expressions.',
  playfulness: 'Inclination to engage in activities for enjoyment rather than serious purpose.',
  curiosity: 'Strong desire to know or learn something new or unfamiliar.'
};

export const getDominantTraits = (traitScores: TraitScores): Array<keyof TraitScores> => {
  const sortedTraits = Object.entries(traitScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait]) => trait as keyof TraitScores);
  
  return sortedTraits;
};

export const getPersonalityProfile = (traitScores: TraitScores): string => {
  const dominantTraits = getDominantTraits(traitScores);
  const traits = dominantTraits.map(trait => trait.charAt(0).toUpperCase() + trait.slice(1)).join(', ');
  
  if (traitScores.openness > 75 && traitScores.creativity > 75) {
    return `The Creative Explorer: You're highly ${traits.toLowerCase()}, with a vivid imagination and love for novel experiences.`;
  } else if (traitScores.conscientiousness > 75 && traitScores.agreeableness > 60) {
    return `The Reliable Diplomat: Strong in ${traits.toLowerCase()}, you're dependable, organized, and cooperative.`;
  } else if (traitScores.extraversion > 75 && traitScores.playfulness > 60) {
    return `The Energetic Socialite: Defined by ${traits.toLowerCase()}, you thrive in social settings and bring positive energy.`;
  } else if (traitScores.neuroticism > 75) {
    return `The Sensitive Analyzer: Your profile shows high ${traits.toLowerCase()}, making you perceptive to subtle emotional cues.`;
  } else if (traitScores.curiosity > 75 && traitScores.openness > 60) {
    return `The Inquisitive Thinker: With strong ${traits.toLowerCase()}, you're constantly exploring new ideas and concepts.`;
  } else {
    return `The Balanced Individual: You show a healthy blend of ${traits.toLowerCase()}, without any extreme tendencies.`;
  }
};