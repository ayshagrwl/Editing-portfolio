export interface Chapter {
  timestamp: string;
  seconds: number;
  title: string;
  description: string;
}

export interface VideoProject {
  id: string;
  type: 'long-form' | 'short-form';
  title: string;
  subtitle: string;
  client: string;
  duration: string;
  videoUrl: string;
  embedType: 'direct' | 'youtube' | 'vimeo';
  youtubeId?: string;
  vimeoId?: string;
  thumbnail: string;
  aspectRatio: '16:9' | '9:16';
  description: string;
  tags: string[];
  tools: string[];
  stats: {
    views?: string;
    retentionRate?: string;
    averageCutTime?: string;
    totalCuts?: number;
    completionRate?: string;
  };
  chapters?: Chapter[];
  editingBreakdown?: {
    hookStrategy: string;
    pacingNotes: string;
    soundDesignNotes: string;
    colorGradingNotes: string;
  };
}

export interface EditorProfile {
  name: string;
  role: string;
  location: string;
  availableForWork: boolean;
  availabilityText: string;
  bio: string;
  yearsExperience: string;
  videosEdited: string;
  viewsGenerated: string;
  avgRetentionBoost: string;
  email: string;
  socials: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    discord?: string;
    calendly?: string;
  };
}

export interface SoftwareSkill {
  name: string;
  category: 'NLE / Editing' | 'Motion & VFX' | 'Color & Finish' | 'Audio & SFX';
  proficiency: number; // 0 - 100
  badge: string;
  description: string;
  featuredFor: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}
