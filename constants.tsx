
import { ScriptModule, TestimonialData, FaqItem } from './types';

export const PRICE = 27;
export const ORIGINAL_PRICE = 297;
export const PREVIOUS_DISCOUNT_PRICE = 47;
export const PURCHASE_URL = "https://stan.store/jaimz247/p/get-the-valentines-love-script-vault-now";

export const MODULES: ScriptModule[] = [
  {
    id: 1,
    title: "The Stagnant Spouse",
    subtitle: "For long-term relationships (2+ years)",
    description: "Navigate roommate syndrome and routine drift with 20 specialized scripts covering invisible labor, intimacy reclamation, and life design.",
    scriptsCount: 20,
    highlightScripts: ["The Invisible Labor Inventory", "I Miss You Even Though You're Right Here", "The Pattern Break"]
  },
  {
    id: 2,
    title: "The Anxious New Flame",
    subtitle: "For new relationships (0-18 months)",
    description: "Establish healthy boundaries and navigate the 'what are we?' anxiety without self-sabotaging your new connection.",
    scriptsCount: 20,
    highlightScripts: ["The Vulnerability Calibration", "What Are We?", "The Pace-Setter"]
  },
  {
    id: 3,
    title: "The Long-Distance Lover",
    subtitle: "Bridge the gap across timezones",
    description: "Manage physical distance, visit logistics, and the emotional toll of living separate lives with 20 distance-specific scripts.",
    scriptsCount: 20,
    highlightScripts: ["The Grieving Visit", "Virtual Intimacy Exploration", "The Timeline Talk"]
  },
  {
    id: 4,
    title: "The Busy Professional",
    subtitle: "Balance high-stress careers",
    description: "Keep your relationship a priority when schedules are packed and energy is low. 15 scripts for energy management and career support.",
    scriptsCount: 15,
    highlightScripts: ["The Calendar Request", "Parallel Presence Compromise", "Work-Life Bleeding Boundary"]
  },
  {
    id: 5,
    title: "The Relationship Rescuer",
    subtitle: "Repair after betrayal or crisis",
    description: "Accountability and action for when 'I'm sorry' isn't enough. 12 powerful scripts for rebuilding trust from the ground up.",
    scriptsCount: 12,
    highlightScripts: ["The Witness Statement", "Self-Audit Reflection", "The Decision Timeline"]
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    name: "Sarah M.",
    title: "Married 8 years, 2 kids",
    quote: "The 'Invisible Labor Inventory' script SAVED US. We were on the verge of separation. One conversation, and for the first time in years, I felt seen.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "David L.",
    title: "Long-distance, 14 months",
    quote: "We spent $1,200 on therapy and got generic advice. This vault gave me the exact words for EVERY scenario. Worth every penny.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Marcus T.",
    title: "Dating 2 years",
    quote: "I'm an engineer. Feelings aren't my language. These scripts gave me a framework I could actually USE. My girlfriend said I've changed more in the last month than the previous year.",
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Won't using scripts make me sound fake?",
    answer: "Do surgeons sound 'fake' because they follow protocols? Do pilots sound 'fake' because they use checklists? Scripts are training wheels, not a permanent crutch. You adapt them to your voice. The goal is preparation, not robotic recitation."
  },
  {
    question: "What if my partner thinks it's weird that I'm using scripts?",
    answer: "You don't necessarily have to tell them you're using a script. Your partner doesn't need to know you practiced; they just need to experience the result: feeling heard, understood, and valued."
  },
  {
    question: "How is this different from couples therapy?",
    answer: "Therapy costs $150-300 per session. This vault is a one-time $27 investment that covers the most common scenarios therapists teach over 10-15 sessions. It's the 'curriculum' of high-quality communication."
  },
  {
    question: "Can I use this solo if my partner isn't on board?",
    answer: "Yes! Changing how YOU communicate changes the entire dynamic of the relationship. When you de-escalate or express needs clearly, your partner is forced to interact with a new version of you."
  }
];
