
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  background: string;
  lossType: string;
  personalityTraits: string[];
  griefJourney: string;
  goals: string[];
  communicationStyle: string;
  color: string;
}

export const patients: Patient[] = [
  {
    id: "member1",
    name: "David",
    age: 35,
    gender: "Male",
    avatar: "👨",
    background: "Lost both parents in a car accident six months ago",
    lossType: "Sudden loss of parents",
    personalityTraits: ["Introspective", "Reserved", "Supportive", "Processing"],
    griefJourney: "Struggling with the suddenness of the loss and unresolved conversations",
    goals: [
      "Find ways to honor parents' memory",
      "Connect with others who understand sudden loss",
      "Learn to navigate holidays and family events"
    ],
    communicationStyle: "Thoughtful and measured, often relates through stories about his parents",
    color: "#4A90E2"
  },
  {
    id: "member2",
    name: "Maria",
    age: 42,
    gender: "Female",
    avatar: "👩",
    background: "Lost her mother to cancer after a long illness",
    lossType: "Loss after prolonged illness",
    personalityTraits: ["Empathetic", "Nurturing", "Emotional", "Strong"],
    griefJourney: "Balancing gratitude for time to say goodbye with the pain of the loss",
    goals: [
      "Process caregiver grief",
      "Find balance between remembering and moving forward",
      "Support others in similar situations"
    ],
    communicationStyle: "Open and emotional, often shares detailed memories and feelings",
    color: "#67B26F"
  },
  {
    id: "member3",
    name: "James",
    age: 28,
    gender: "Male",
    avatar: "👨‍🦰",
    background: "Lost his grandmother who raised him",
    lossType: "Loss of primary caregiver",
    personalityTraits: ["Creative", "Sensitive", "Questioning", "Adaptive"],
    griefJourney: "Working through complex emotions of losing his primary parental figure",
    goals: [
      "Understand the impact on his identity",
      "Keep his grandmother's traditions alive",
      "Build a support network"
    ],
    communicationStyle: "Alternates between philosophical questions and sharing specific memories",
    color: "#E17055"
  },
  {
    id: "member4",
    name: "Sarah",
    age: 45,
    gender: "Female",
    avatar: "👩‍🦰",
    background: "Lost her father to heart attack while living abroad",
    lossType: "Distance loss",
    personalityTraits: ["Practical", "Analytical", "Helpful", "Determined"],
    griefJourney: "Processing guilt about not being present and cultural expectations around grief",
    goals: [
      "Address feelings of guilt",
      "Connect with siblings in shared grief",
      "Find ways to grieve across distance"
    ],
    communicationStyle: "Direct and solution-oriented, while learning to embrace emotional expression",
    color: "#B19CD9"
  },
  {
    id: "member5",
    name: "Miguel",
    age: 32,
    gender: "Male",
    avatar: "👨‍🦱",
    background: "Lost both grandparents within months of each other",
    lossType: "Multiple losses",
    personalityTraits: ["Resilient", "Family-oriented", "Contemplative", "Genuine"],
    griefJourney: "Navigating compound grief and family dynamics after multiple losses",
    goals: [
      "Honor cultural grieving traditions",
      "Support younger family members",
      "Find peace with multiple losses"
    ],
    communicationStyle: "Thoughtful storyteller, often connects through family traditions and customs",
    color: "#20B2AA"
  }
];
