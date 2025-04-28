
import { Patient } from "../data/patientsData";

// Types of responses
export type ResponseType = 
  | "normal" 
  | "emotional" 
  | "sharing" 
  | "silence" 
  | "interruption"
  | "member-interaction";

// Events that can occur in the support group session
export interface SupportEvent {
  type: ResponseType;
  memberId: string;
  targetMemberId?: string; // For member interactions
  message: string;
}

// Simple response templates for each member type
const responseTemplates = {
  normal: [
    (member: Patient) => `${member.name}: I've been thinking about what we discussed last time about my ${member.lossType.toLowerCase()}. It's been challenging but I'm trying the strategies we talked about.`,
    (member: Patient) => `${member.name}: This week was difficult because of my ${member.lossType.toLowerCase()}. I found myself falling back into old patterns.`,
    (member: Patient) => `${member.name}: I'm working on ${member.goals[0].toLowerCase()}, but it's not easy to change habits.`
  ],
  emotional: [
    (member: Patient) => `${member.name}: *crosses arms* I don't really see the point in talking about this again. Nothing changes.`,
    (member: Patient) => `${member.name}: *looks away* I'd rather not get into that right now. Can we move on?`,
    (member: Patient) => `${member.name}: *sighs* I've tried what you suggested but it doesn't work for someone like me.`
  ],
  sharing: [
    (member: Patient) => `${member.name}: *emotional* I never made the connection before, but I think my grief for ${member.lossType.toLowerCase()} comes from when I was younger.`,
    (member: Patient) => `${member.name}: *teary-eyed* For the first time, I stood up for myself this week. I remembered what we discussed about ${member.goals[1] ? member.goals[1].toLowerCase() : member.goals[0].toLowerCase()}.`,
    (member: Patient) => `${member.name}: I had a realization that I've been avoiding family gatherings because they remind me of my loss. This is directly related to my ${member.lossType.toLowerCase()}.`
  ],
  silence: [
    (member: Patient) => `${member.name}: *sits quietly, avoiding eye contact*`,
    (member: Patient) => `${member.name}: *appears lost in thought, not responding*`,
    (member: Patient) => `${member.name}: *looks uncomfortable, remains silent*`
  ],
  interruption: [
    (member: Patient) => `${member.name}: *interrupts* Sorry, but I have to disagree with that. From my experience with ${member.lossType.toLowerCase()}, that's not how it works.`,
    (member: Patient) => `${member.name}: *cuts in* Can I just say something about that? I think we're missing the point here.`,
    (member: Patient) => `${member.name}: *jumps in* That reminds me of something important I wanted to share with the group.`
  ],
  "member-interaction": [
    (member: Patient, targetMember: Patient | undefined) => targetMember ? `${member.name}: *turns to ${targetMember.name}* I really relate to what you said about ${targetMember.goals[0].toLowerCase()}. I've struggled with that too.` : `${member.name}: I can relate to what you all are sharing.`,
    (member: Patient, targetMember: Patient | undefined) => targetMember ? `${member.name}: ${targetMember.name}, have you tried focusing on ${member.goals[Math.floor(Math.random() * member.goals.length)].toLowerCase()}? That helped me a lot.` : `${member.name}: Has anyone tried focusing on specific coping techniques?`,
    (member: Patient, targetMember: Patient | undefined) => targetMember ? `${member.name}: *nods at ${targetMember.name}* I appreciate your honesty about your ${targetMember.lossType.toLowerCase()}. It makes me feel less alone with my grief.` : `${member.name}: I appreciate everyone's honesty. It makes me feel less alone.`
  ]
};

// Member-specific response generators 
const memberSpecificResponses = {
  member1: { // David
    normal: [
      "David: I've been trying to implement some structure to my daily routine, but I'm still struggling with feeling empty without my parents.",
      "David: I was going through old family photos this week. It was... harder than I expected to see them.",
      "David: I noticed I was shutting people out again at work. I tried to be aware of it, at least."
    ],
    emotional: [
      "David: *adjusts tie* I don't see how discussing my emotions about losing my parents is productive. I prefer to focus on moving forward.",
      "David: *checks watch* I've analyzed this situation extensively already. I don't believe revisiting it will yield new insights.",
      "David: With all due respect, I think my approach to grief is working for me. The pain is simply part of the process."
    ],
    sharing: [
      "David: *voice slightly shaking* I realized this week that I've been using work as a way to avoid feeling the loss of my parents. It's easier to stay at the office than go home to an empty house.",
      "David: *removes glasses, wipes eyes quickly* My mother once told me that I needed to express my feelings more. I think she was right, and I... I regret that now.",
      "David: Yesterday, I actually called my uncle to talk about my parents. Just talked about memories. It felt... terrifying, but also liberating."
    ]
  },
  member2: { // Maria
    normal: [
      "Maria: I tried that breathing technique when I was anxious about going through mom's things... it helped a little, I think?",
      "Maria: I've been journaling like we discussed. It's easier than saying things out loud sometimes.",
      "Maria: *fidgets with bracelet* I had a small win this week - I was able to cook one of my mother's recipes without breaking down."
    ]
  }
};

// Get a personalized response for a specific member
export function getMemberResponse(member: Patient, type: ResponseType, targetMember?: Patient): string {
  // Check if we have specific responses for this member
  const memberId = member.id;
  const hasSpecificResponses = memberSpecificResponses[memberId as keyof typeof memberSpecificResponses]?.[type as keyof typeof memberSpecificResponses[keyof typeof memberSpecificResponses]];
  
  if (hasSpecificResponses) {
    const specificResponses = memberSpecificResponses[memberId as keyof typeof memberSpecificResponses][type as keyof typeof memberSpecificResponses[keyof typeof memberSpecificResponses]] as string[];
    return specificResponses[Math.floor(Math.random() * specificResponses.length)];
  }
  
  // Fall back to generic templates
  const templates = responseTemplates[type];
  const templateIndex = Math.floor(Math.random() * templates.length);
  
  if (type === "member-interaction" && typeof templates[templateIndex] === 'function') {
    // For member interactions, we need both the member and targetMember
    return (templates[templateIndex] as Function)(member, targetMember);
  }
  
  // For non member-interaction templates, we only need the member
  return (templates[templateIndex] as Function)(member);
}

// Generate a random support group event
export function generateSupportEvent(members: Patient[], currentMemberId?: string): SupportEvent {
  // Determine which member will respond
  let respondingMember: Patient;
  if (currentMemberId) {
    respondingMember = members.find(p => p.id === currentMemberId) || members[Math.floor(Math.random() * members.length)];
  } else {
    respondingMember = members[Math.floor(Math.random() * members.length)];
  }
  
  // Determine response type
  const responseTypes: ResponseType[] = ["normal", "emotional", "sharing", "silence", "interruption", "member-interaction"];
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
  
  // For member interactions, select a target member
  let targetMemberId: string | undefined;
  let message: string;
  
  if (selectedType === "member-interaction") {
    const otherMembers = members.filter(p => p.id !== respondingMember.id);
    const targetMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
    targetMemberId = targetMember.id;
    message = getMemberResponse(respondingMember, selectedType, targetMember);
  } else {
    message = getMemberResponse(respondingMember, selectedType);
  }
  
  return {
    type: selectedType,
    memberId: respondingMember.id,
    targetMemberId,
    message
  };
}

// Generate a session summary
export function generateSessionSummary(events: SupportEvent[], facilitatorMessages: string[]): string {
  // Count response types
  const typeCounts: Record<ResponseType, number> = {
    normal: 0,
    emotional: 0,
    sharing: 0,
    silence: 0,
    interruption: 0,
    "member-interaction": 0
  };
  
  events.forEach(event => {
    typeCounts[event.type]++;
  });
  
  // Analyze group dynamics
  const dynamics = [];
  
  if (typeCounts["member-interaction"] > 3) {
    dynamics.push("Strong peer support and interaction within the group");
  } else if (typeCounts["member-interaction"] > 0) {
    dynamics.push("Some peer interaction, with potential to develop more group cohesion");
  } else {
    dynamics.push("Limited peer interaction; the group may benefit from activities to encourage connection");
  }
  
  if (typeCounts.sharing > 2) {
    dynamics.push("Multiple emotional breakthroughs occurred, indicating healing progress");
  } else if (typeCounts.sharing > 0) {
    dynamics.push("At least one significant sharing moment occurred during the session");
  }
  
  if (typeCounts.emotional > 3) {
    dynamics.push("High level of emotional response throughout the session");
  } else if (typeCounts.emotional > 0) {
    dynamics.push("Some emotional responses emerged, which is a normal part of the grief process");
  }
  
  if (typeCounts.silence > 2) {
    dynamics.push("Multiple periods of silence that may indicate deep processing of emotions");
  }
  
  if (typeCounts.interruption > 2) {
    dynamics.push("Several interruptions occurred, suggesting high emotional engagement or possible group dynamics");
  }
  
  // Analyze facilitator approach (simplified)
  const facilitatorApproach = [];
  
  const interventions = facilitatorMessages.length;
  if (interventions > 15) {
    facilitatorApproach.push("High level of facilitator intervention");
  } else if (interventions > 7) {
    facilitatorApproach.push("Balanced facilitator participation");
  } else {
    facilitatorApproach.push("Non-directive approach with minimal intervention");
  }
  
  // Recommendations
  const recommendations = [
    "Consider beginning next session with a brief check-in on any reflections since this meeting",
    "Watch for opportunities to encourage deeper connections among group members",
    "Continue to validate emotional expressions while maintaining group boundaries"
  ];
  
  if (typeCounts.emotional > 2) {
    recommendations.push("Explore the sources of emotional responses with curious, non-judgmental questions");
  }
  
  if (typeCounts["member-interaction"] < 2) {
    recommendations.push("Incorporate structured activities to encourage more interaction between group members");
  }
  
  if (typeCounts.sharing > 0) {
    recommendations.push("Follow up on emotional sharing from this session");
  }
  
  // Format the summary
  return `
    ## Group Session Summary
    
    ### Group Dynamics
    ${dynamics.map(d => `- ${d}`).join('\n')}
    
    ### Facilitator Approach
    ${facilitatorApproach.map(a => `- ${a}`).join('\n')}
    
    ### Recommendations for Next Session
    ${recommendations.map(r => `- ${r}`).join('\n')}
  `;
}
