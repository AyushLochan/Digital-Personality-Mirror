import { TraitScores } from './traits';

export interface Answer {
  text: string;
  traitImpacts: Partial<Record<keyof TraitScores, number>>;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "You find a mysterious door in a wall where there wasn't one before. What do you do?",
    answers: [
      {
        text: "Open it immediately - adventure awaits!",
        traitImpacts: { openness: 15, curiosity: 20, playfulness: 10, conscientiousness: -5 }
      },
      {
        text: "Observe it carefully before deciding",
        traitImpacts: { conscientiousness: 10, neuroticism: 5, openness: 5 }
      },
      {
        text: "Knock first - it's only polite",
        traitImpacts: { agreeableness: 15, extraversion: 5 }
      },
      {
        text: "Walk away - nothing good comes from mysterious doors",
        traitImpacts: { neuroticism: 15, conscientiousness: 5, openness: -10 }
      }
    ]
  },
  {
    id: 2,
    text: "If you could have one superpower, which would you choose?",
    answers: [
      {
        text: "Mind reading",
        traitImpacts: { curiosity: 15, neuroticism: 5 }
      },
      {
        text: "Flying",
        traitImpacts: { extraversion: 10, openness: 15, playfulness: 10 }
      },
      {
        text: "Invisibility",
        traitImpacts: { neuroticism: 10, extraversion: -5 }
      },
      {
        text: "Healing others",
        traitImpacts: { agreeableness: 20, conscientiousness: 10 }
      }
    ]
  },
  {
    id: 3,
    text: "You're hosting a dinner party. What's your approach?",
    answers: [
      {
        text: "Meticulously plan every detail weeks in advance",
        traitImpacts: { conscientiousness: 20, neuroticism: 5, creativity: -5 }
      },
      {
        text: "Improvise a spectacular meal the day of",
        traitImpacts: { creativity: 15, openness: 10, conscientiousness: -10 }
      },
      {
        text: "Potluck! Everyone brings something to share",
        traitImpacts: { agreeableness: 15, extraversion: 10 }
      },
      {
        text: "Order takeout and focus on the conversation",
        traitImpacts: { extraversion: 15, playfulness: 10, conscientiousness: -5 }
      }
    ]
  },
  {
    id: 4,
    text: "How do you feel about puzzles and brain teasers?",
    answers: [
      {
        text: "Love them! I seek them out regularly",
        traitImpacts: { curiosity: 20, openness: 10, conscientiousness: 5 }
      },
      {
        text: "They're fine occasionally, but can be frustrating",
        traitImpacts: { neuroticism: 10, conscientiousness: 5 }
      },
      {
        text: "Prefer collaborative games over solo puzzles",
        traitImpacts: { extraversion: 15, agreeableness: 10 }
      },
      {
        text: "Would rather do something creative instead",
        traitImpacts: { creativity: 20, openness: 5 }
      }
    ]
  },
  {
    id: 5,
    text: "Your friend is upset about something you said. What's your response?",
    answers: [
      {
        text: "Immediately apologize and ask how to make it right",
        traitImpacts: { agreeableness: 20, neuroticism: 5 }
      },
      {
        text: "Analyze what went wrong in the conversation",
        traitImpacts: { conscientiousness: 10, neuroticism: 10, agreeableness: 5 }
      },
      {
        text: "Give them space, then address it later",
        traitImpacts: { conscientiousness: 15, extraversion: -5 }
      },
      {
        text: "Use humor to lighten the mood",
        traitImpacts: { extraversion: 10, playfulness: 15, agreeableness: -5 }
      }
    ]
  },
  {
    id: 6,
    text: "What would your ideal weekend look like?",
    answers: [
      {
        text: "Spontaneous road trip to somewhere new",
        traitImpacts: { openness: 20, extraversion: 10, playfulness: 15, conscientiousness: -10 }
      },
      {
        text: "Relaxing at home with books or movies",
        traitImpacts: { extraversion: -10, neuroticism: -5, openness: 5 }
      },
      {
        text: "Catching up on projects and organizing",
        traitImpacts: { conscientiousness: 20, neuroticism: 5, playfulness: -5 }
      },
      {
        text: "Social events and spending time with friends",
        traitImpacts: { extraversion: 20, agreeableness: 10 }
      }
    ]
  },
  {
    id: 7,
    text: "You discover you can time travel once. Where do you go?",
    answers: [
      {
        text: "Future, to see technological advances",
        traitImpacts: { curiosity: 20, openness: 15 }
      },
      {
        text: "Past, to witness an important historical event",
        traitImpacts: { curiosity: 15, conscientiousness: 10 }
      },
      {
        text: "Past, to meet a brilliant creative mind",
        traitImpacts: { creativity: 20, openness: 15 }
      },
      {
        text: "I'd rather not tamper with the timeline",
        traitImpacts: { conscientiousness: 15, neuroticism: 10, openness: -5 }
      }
    ]
  },
  {
    id: 8,
    text: "How do you approach trying something new and challenging?",
    answers: [
      {
        text: "Dive right in and learn as you go",
        traitImpacts: { openness: 15, extraversion: 10, neuroticism: -10 }
      },
      {
        text: "Research thoroughly before starting",
        traitImpacts: { conscientiousness: 20, neuroticism: 5, curiosity: 10 }
      },
      {
        text: "Ask friends who have experience for advice",
        traitImpacts: { agreeableness: 10, extraversion: 10, openness: 5 }
      },
      {
        text: "Find a unique approach no one else has tried",
        traitImpacts: { creativity: 20, openness: 15, playfulness: 10 }
      }
    ]
  },
  {
    id: 9,
    text: "If your life had a soundtrack, what genre would dominate?",
    answers: [
      {
        text: "Classical or orchestral",
        traitImpacts: { conscientiousness: 10, openness: 15, extraversion: -5 }
      },
      {
        text: "Upbeat pop or dance music",
        traitImpacts: { extraversion: 15, playfulness: 15, neuroticism: -10 }
      },
      {
        text: "Alternative or indie",
        traitImpacts: { openness: 15, creativity: 10, extraversion: -5 }
      },
      {
        text: "Varies wildly depending on my mood",
        traitImpacts: { neuroticism: 10, openness: 10, creativity: 5 }
      }
    ]
  },
  {
    id: 10,
    text: "How do you feel about unexpected changes to your plans?",
    answers: [
      {
        text: "Excited - spontaneity keeps life interesting!",
        traitImpacts: { openness: 15, playfulness: 15, conscientiousness: -10, neuroticism: -10 }
      },
      {
        text: "Anxious - I prefer when things go as planned",
        traitImpacts: { neuroticism: 15, conscientiousness: 10, openness: -10 }
      },
      {
        text: "Depends on the nature of the change",
        traitImpacts: { agreeableness: 10, conscientiousness: 5 }
      },
      {
        text: "Adaptable - I quickly find the silver lining",
        traitImpacts: { agreeableness: 15, openness: 10, neuroticism: -15 }
      }
    ]
  }
];