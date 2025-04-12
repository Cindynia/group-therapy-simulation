
import { Patient } from "../data/patientsData";

// Types of therapy responses
export type ResponseType = 
  | "normal" 
  | "resistant" 
  | "breakthrough" 
  | "silence" 
  | "interruption"
  | "peer-interaction";

// Events that can occur in the therapy session
export interface TherapyEvent {
  type: ResponseType;
  patientId: string;
  targetPatientId?: string; // For peer interactions
  message: string;
}

// Simple response templates for each patient type
const responseTemplates = {
  normal: [
    (patient: Patient) => `${patient.name}: I've been thinking about what we discussed last time about my ${patient.clinicalProfile.toLowerCase()}. It's been challenging but I'm trying the strategies we talked about.`,
    (patient: Patient) => `${patient.name}: This week was difficult because of my ${patient.traumaHistory.toLowerCase()}. I found myself falling back into old patterns.`,
    (patient: Patient) => `${patient.name}: I'm working on ${patient.therapyGoals[0].toLowerCase()}, but it's not easy to change habits.`
  ],
  resistant: [
    (patient: Patient) => `${patient.name}: *crosses arms* I don't really see the point in talking about this again. Nothing changes.`,
    (patient: Patient) => `${patient.name}: *looks away* I'd rather not get into that right now. Can we move on?`,
    (patient: Patient) => `${patient.name}: *sighs* I've tried what you suggested but it doesn't work for someone like me.`
  ],
  breakthrough: [
    (patient: Patient) => `${patient.name}: *emotional* I never made the connection before, but I think my ${patient.attachmentStyle.toLowerCase()} attachment style comes from when ${patient.traumaHistory.toLowerCase()}.`,
    (patient: Patient) => `${patient.name}: *teary-eyed* For the first time, I stood up for myself this week. I remembered what we discussed about ${patient.therapyGoals[1].toLowerCase()}.`,
    (patient: Patient) => `${patient.name}: I had a realization that I've been sabotaging my relationships because I'm afraid of rejection. This is directly related to my ${patient.traumaHistory.toLowerCase()}.`
  ],
  silence: [
    (patient: Patient) => `${patient.name}: *sits quietly, avoiding eye contact*`,
    (patient: Patient) => `${patient.name}: *appears lost in thought, not responding*`,
    (patient: Patient) => `${patient.name}: *looks uncomfortable, remains silent*`
  ],
  interruption: [
    (patient: Patient) => `${patient.name}: *interrupts* Sorry, but I have to disagree with that. From my experience with ${patient.clinicalProfile.toLowerCase()}, that's not how it works.`,
    (patient: Patient) => `${patient.name}: *cuts in* Can I just say something about that? I think we're missing the point here.`,
    (patient: Patient) => `${patient.name}: *jumps in* That reminds me of something important I wanted to share with the group.`
  ],
  "peer-interaction": [
    (patient: Patient, targetPatient: Patient) => `${patient.name}: *turns to ${targetPatient.name}* I really relate to what you said about ${targetPatient.therapyGoals[0].toLowerCase()}. I've struggled with that too.`,
    (patient: Patient, targetPatient: Patient) => `${patient.name}: ${targetPatient.name}, have you tried focusing on ${patient.therapyGoals[Math.floor(Math.random() * patient.therapyGoals.length)].toLowerCase()}? That helped me a lot.`,
    (patient: Patient, targetPatient: Patient) => `${patient.name}: *nods at ${targetPatient.name}* I appreciate your honesty about your ${targetPatient.clinicalProfile.toLowerCase()}. It makes me feel less alone with my issues.`
  ]
};

// Patient-specific response generators 
const patientSpecificResponses = {
  patient1: { // Michael
    normal: [
      "Michael: I've been trying to implement some structure to my daily routine, but I'm still struggling with feeling like I'm not accomplishing enough.",
      "Michael: The divorce paperwork came through this week. It was... harder than I expected to see it finalized on paper.",
      "Michael: I noticed I was setting unrealistic standards for myself again at work. I tried to be aware of it, at least."
    ],
    resistant: [
      "Michael: *adjusts tie* I don't see how discussing my emotions about the divorce is productive. I prefer to focus on moving forward professionally.",
      "Michael: *checks watch* I've analyzed this issue extensively already. I don't believe revisiting it will yield new insights.",
      "Michael: With all due respect, I think my approach to work is what got me where I am. The stress is simply part of success."
    ],
    breakthrough: [
      "Michael: *voice slightly shaking* I realized this week that I've been using work as a way to avoid feeling the loss of my marriage. It's easier to stay at the office than go home to an empty house.",
      "Michael: *removes glasses, wipes eyes quickly* My ex-wife once told me that I was married to my job. I think she was right, and I... I regret that now.",
      "Michael: Yesterday, I actually left work on time. Just walked out at 5pm. It felt... terrifying, but also liberating."
    ]
  },
  patient2: { // Sarah
    normal: [
      "Sarah: Um, I tried that breathing technique when I was anxious about my art show... it helped a little, I think?",
      "Sarah: I've been journaling like we discussed. It's easier than saying things out loud sometimes.",
      "Sarah: *fidgets with bracelet* I had a small win this week - I spoke up in my art class when someone was using my supplies without asking."
    ],
    resistant: [
      "Sarah: *looks down* I don't think I can do the exposure exercises we talked about. They sound too overwhelming.",
      "Sarah: *whispers* Sorry, but I don't want to share about that right now. Everyone will think it's stupid.",
      "Sarah: I tried being assertive like we practiced, but it just made things worse. People don't like when I speak up."
    ],
    breakthrough: [
      "Sarah: *with newfound confidence* I realized that I've spent my whole life trying to be who everyone else wanted me to be. My art has suffered because I'm afraid to express my true self.",
      "Sarah: *smiles genuinely* I said no to an unreasonable request this week, and the world didn't end. The person actually respected me for it.",
      "Sarah: I had this moment where I saw how my mother's criticism shaped my fear of judgment. I'm not a child anymore - I don't need everyone's approval."
    ]
  },
  patient3: { // Jason
    normal: [
      "Jason: The job at the construction site is going okay. The routine helps, gives me something to focus on.",
      "Jason: My kid's baseball game was this weekend. Trying to show up for that stuff more, you know?",
      "Jason: *taps foot rhythmically* Been using that 5-4-3-2-1 grounding technique when things get intense. Works sometimes."
    ],
    resistant: [
      "Jason: *scoffs* Meditation? Seriously? You think sitting around with my eyes closed is going to fix what I saw overseas?",
      "Jason: *glares* My anger isn't the problem. It's a normal reaction to an abnormal situation that none of you would understand.",
      "Jason: *stands up, paces* I'm not taking those meds. They make me feel like a zombie, and I need to stay alert."
    ],
    breakthrough: [
      "Jason: *voice cracking* My daughter hugged me yesterday and said she's not scared of me anymore. I didn't even realize she was scared before. What kind of father am I?",
      "Jason: *wipes face roughly* I lost it at the hardware store when I heard a car backfire. But instead of throwing punches, I walked out. First time I've been able to do that.",
      "Jason: I told my wife about what happened with my unit. All of it. First time I've told anybody who wasn't there. She just... listened. Didn't try to fix it."
    ]
  },
  patient4: { // Elena
    normal: [
      "Elena: The pain was manageable this week. I've been pacing myself better with the household tasks.",
      "Elena: I joined an online support group for people with my condition. It helps to know I'm not alone in this journey.",
      "Elena: *adjusts position carefully* I'm learning to ask my children for help, though it doesn't come naturally to me."
    ],
    resistant: [
      "Elena: *smiles politely but firmly* I appreciate the suggestion, but I've been dealing with this condition for a while now. I know my limits.",
      "Elena: *sighs* It's different when you were once the caregiver and now need care. Nobody can understand that transition unless they've lived it.",
      "Elena: I don't want to be defined by my illness. Sometimes in these sessions, I feel that's all we focus on."
    ],
    breakthrough: [
      "Elena: *tears flowing freely* I realized I've been grieving for my old life, my identity as a healer. I need to let go of who I was to accept who I am now.",
      "Elena: I allowed my daughter to help me bathe this week when the pain was bad. It was humbling, but also... there was such love in that moment.",
      "Elena: For the first time, I told my former colleagues that I can't attend their retirement party because of my limitations. No excuses, just honesty. It was liberating."
    ]
  },
  patient5: { // Raj
    normal: [
      "Raj: *half-smiles* My parents called again about law school applications. I changed the subject to cricket, works every time.",
      "Raj: I've been trying to journal about my identity like we discussed. It's... confusing, straddling two cultures.",
      "Raj: My roommate noticed I've been more sociable lately. Small steps, right?"
    ],
    resistant: [
      "Raj: *laughs sarcastically* Sure, I could tell my parents I don't want to be a lawyer. And I could also volunteer to be disowned.",
      "Raj: *plays with phone* No offense, but how would you understand the specific pressures of being a first-generation immigrant?",
      "Raj: *smirks* Let's not get too deep today. I'm more of a surface-level guy, keeps things entertaining."
    ],
    breakthrough: [
      "Raj: *voice serious for once* I stayed up all night writing poetry instead of studying for the LSAT. It was the first time I've felt truly myself in years.",
      "Raj: *vulnerable* I realized I use humor to keep people at a distance because I'm terrified they'll reject the real me. Just like I fear my parents would.",
      "Raj: I had dinner with my father and actually told him I'm passionate about literature, not law. He didn't approve, but... we're still talking. That's something."
    ]
  }
};

// Get a personalized response for a specific patient
export function getPatientResponse(patient: Patient, type: ResponseType, targetPatient?: Patient): string {
  // Check if we have specific responses for this patient
  const patientId = patient.id;
  const hasSpecificResponses = patientSpecificResponses[patientId as keyof typeof patientSpecificResponses]?.[type as keyof typeof patientSpecificResponses[keyof typeof patientSpecificResponses]];
  
  if (hasSpecificResponses) {
    const specificResponses = patientSpecificResponses[patientId as keyof typeof patientSpecificResponses][type as keyof typeof patientSpecificResponses[keyof typeof patientSpecificResponses]] as string[];
    return specificResponses[Math.floor(Math.random() * specificResponses.length)];
  }
  
  // Fall back to generic templates
  const templates = responseTemplates[type];
  const templateIndex = Math.floor(Math.random() * templates.length);
  
  if (type === "peer-interaction" && targetPatient) {
    return templates[templateIndex](patient, targetPatient);
  }
  
  return templates[templateIndex](patient);
}

// Generate a random therapy event
export function generateTherapyEvent(patients: Patient[], currentPatientId?: string): TherapyEvent {
  // Determine which patient will respond
  let respondingPatient: Patient;
  if (currentPatientId) {
    respondingPatient = patients.find(p => p.id === currentPatientId) || patients[Math.floor(Math.random() * patients.length)];
  } else {
    respondingPatient = patients[Math.floor(Math.random() * patients.length)];
  }
  
  // Determine response type
  const responseTypes: ResponseType[] = ["normal", "resistant", "breakthrough", "silence", "interruption", "peer-interaction"];
  const weights = [0.45, 0.15, 0.1, 0.1, 0.1, 0.1]; // Higher probability for normal responses
  
  const randomValue = Math.random();
  let cumulativeWeight = 0;
  let selectedType: ResponseType = "normal";
  
  for (let i = 0; i < responseTypes.length; i++) {
    cumulativeWeight += weights[i];
    if (randomValue <= cumulativeWeight) {
      selectedType = responseTypes[i];
      break;
    }
  }
  
  // For peer interactions, select a target patient
  let targetPatientId: string | undefined;
  let message: string;
  
  if (selectedType === "peer-interaction") {
    const otherPatients = patients.filter(p => p.id !== respondingPatient.id);
    const targetPatient = otherPatients[Math.floor(Math.random() * otherPatients.length)];
    targetPatientId = targetPatient.id;
    message = getPatientResponse(respondingPatient, selectedType, targetPatient);
  } else {
    message = getPatientResponse(respondingPatient, selectedType);
  }
  
  return {
    type: selectedType,
    patientId: respondingPatient.id,
    targetPatientId,
    message
  };
}

// Generate a session summary
export function generateSessionSummary(events: TherapyEvent[], therapistMessages: string[]): string {
  // Count response types
  const typeCounts: Record<ResponseType, number> = {
    normal: 0,
    resistant: 0,
    breakthrough: 0,
    silence: 0,
    interruption: 0,
    "peer-interaction": 0
  };
  
  events.forEach(event => {
    typeCounts[event.type]++;
  });
  
  // Analyze group dynamics
  const dynamics = [];
  
  if (typeCounts["peer-interaction"] > 3) {
    dynamics.push("Strong peer support and interaction within the group");
  } else if (typeCounts["peer-interaction"] > 0) {
    dynamics.push("Some peer interaction, with potential to develop more group cohesion");
  } else {
    dynamics.push("Limited peer interaction; the group may benefit from activities to encourage connection");
  }
  
  if (typeCounts.breakthrough > 2) {
    dynamics.push("Multiple emotional breakthroughs occurred, indicating therapeutic progress");
  } else if (typeCounts.breakthrough > 0) {
    dynamics.push("At least one significant breakthrough occurred during the session");
  }
  
  if (typeCounts.resistant > 3) {
    dynamics.push("High level of resistance throughout the session");
  } else if (typeCounts.resistant > 0) {
    dynamics.push("Some resistance emerged, which is a normal part of the therapeutic process");
  }
  
  if (typeCounts.silence > 2) {
    dynamics.push("Multiple periods of silence that may indicate discomfort with topics discussed");
  }
  
  if (typeCounts.interruption > 2) {
    dynamics.push("Several interruptions occurred, suggesting high emotional engagement or possible power dynamics");
  }
  
  // Analyze therapist approach (simplified)
  const therapistApproach = [];
  
  const interventions = therapistMessages.length;
  if (interventions > 15) {
    therapistApproach.push("High level of therapist intervention");
  } else if (interventions > 7) {
    therapistApproach.push("Balanced therapist participation");
  } else {
    therapistApproach.push("Non-directive approach with minimal intervention");
  }
  
  // Recommendations
  const recommendations = [
    "Consider beginning next session with a brief check-in on any reflections since this meeting",
    "Watch for opportunities to encourage deeper peer connections among group members",
    "Continue to validate emotional expressions while maintaining group boundaries"
  ];
  
  if (typeCounts.resistant > 2) {
    recommendations.push("Explore the sources of resistance with curious, non-judgmental questions");
  }
  
  if (typeCounts["peer-interaction"] < 2) {
    recommendations.push("Incorporate structured activities to encourage more interaction between group members");
  }
  
  if (typeCounts.breakthrough > 0) {
    recommendations.push("Follow up on emotional breakthroughs from this session");
  }
  
  // Format the summary
  return `
    ## Group Session Summary
    
    ### Group Dynamics
    ${dynamics.map(d => `- ${d}`).join('\n')}
    
    ### Therapist Approach
    ${therapistApproach.map(a => `- ${a}`).join('\n')}
    
    ### Recommendations for Next Session
    ${recommendations.map(r => `- ${r}`).join('\n')}
  `;
}
