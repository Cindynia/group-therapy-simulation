
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  clinicalProfile: string;
  attachmentStyle: string;
  personalityTraits: string[];
  traumaHistory: string;
  therapyGoals: string[];
  responseStyle: string;
  color: string;
}

export const patients: Patient[] = [
  {
    id: "patient1",
    name: "Michael",
    age: 42,
    gender: "Male",
    avatar: "👨‍💼",
    clinicalProfile: "Major Depression, Work-related Burnout",
    attachmentStyle: "Avoidant",
    personalityTraits: ["Perfectionist", "Reserved", "Analytical", "Self-critical"],
    traumaHistory: "Recent divorce, career setback at a high-pressure corporate job",
    therapyGoals: [
      "Develop better work-life boundaries",
      "Process grief from divorce",
      "Reduce perfectionist tendencies"
    ],
    responseStyle: "Often intellectualizes feelings, hesitant to open up emotionally, speaks formally",
    color: "#4A90E2"
  },
  {
    id: "patient2",
    name: "Sarah",
    age: 29,
    gender: "Female",
    avatar: "👩‍🎨",
    clinicalProfile: "Generalized Anxiety Disorder, Social Anxiety",
    attachmentStyle: "Anxious-Preoccupied",
    personalityTraits: ["Creative", "Sensitive", "People-pleasing", "Introspective"],
    traumaHistory: "Emotionally neglectful childhood, bullying in school years",
    therapyGoals: [
      "Develop assertiveness skills",
      "Reduce anxiety in social situations",
      "Build self-confidence"
    ],
    responseStyle: "Speaks tentatively, often looks for validation, apologizes frequently",
    color: "#67B26F"
  },
  {
    id: "patient3",
    name: "Jason",
    age: 35,
    gender: "Male",
    avatar: "👨‍🔧",
    clinicalProfile: "Adjustment Disorder, Anger Management Issues",
    attachmentStyle: "Disorganized",
    personalityTraits: ["Passionate", "Direct", "Protective", "Impulsive"],
    traumaHistory: "Combat veteran with PTSD, difficult transition to civilian life",
    therapyGoals: [
      "Develop healthier anger expression",
      "Improve relationships with family",
      "Find purpose in civilian life"
    ],
    responseStyle: "Alternates between being guarded and emotionally expressive, can be confrontational",
    color: "#E17055"
  },
  {
    id: "patient4",
    name: "Elena",
    age: 52,
    gender: "Female",
    avatar: "👩‍⚕️",
    clinicalProfile: "Chronic Pain, Adjustment to Medical Condition",
    attachmentStyle: "Secure with anxious tendencies",
    personalityTraits: ["Resilient", "Nurturing", "Pragmatic", "Determined"],
    traumaHistory: "Recent diagnosis of chronic illness, loss of career as a healthcare provider",
    therapyGoals: [
      "Accept limitations of new health reality",
      "Develop new purpose and meaning",
      "Manage grief over lost abilities"
    ],
    responseStyle: "Generally direct and thoughtful, occasionally becomes emotional about losses",
    color: "#B19CD9"
  },
  {
    id: "patient5",
    name: "Raj",
    age: 24,
    gender: "Male",
    avatar: "👨‍🎓",
    clinicalProfile: "Depression, Identity Development Concerns",
    attachmentStyle: "Anxious-Avoidant",
    personalityTraits: ["Intelligent", "Witty", "Self-doubting", "Observant"],
    traumaHistory: "Cultural conflict within family, academic pressure, experiences of discrimination",
    therapyGoals: [
      "Develop sense of identity and direction",
      "Navigate cultural expectations vs. personal desires",
      "Build meaningful relationships"
    ],
    responseStyle: "Often uses humor as defense, insightful about others but deflects personal questions",
    color: "#20B2AA"
  }
];
