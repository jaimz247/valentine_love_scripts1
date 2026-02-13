
export interface ScriptModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  scriptsCount: number;
  highlightScripts: string[];
}

export interface TestimonialData {
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
