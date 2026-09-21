import { EditorProfile, VideoProject, SoftwareSkill, WorkflowStep } from '../types';

export const initialEditorProfile: EditorProfile = {
  name: "Ayush Agrawal",
  role: "Video Editor & Narrative Strategist",
  location: "Worldwide / Remote",
  availableForWork: true,
  availabilityText: "Available for Q2/Q3 Projects & Retainers",
  bio: "Specializing in high-retention YouTube documentaries and viral short-form content. I transform raw A-roll and research papers into binge-worthy visual experiences using precise pattern interrupts, bespoke sound design, and documentary-grade color grading.",
  yearsExperience: "4+ Years",
  videosEdited: "180+",
  viewsGenerated: "65M+",
  avgRetentionBoost: "+38%",
  email: "ayushagrawal251@gmail.com",
  socials: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    discord: "ayush_editor#0001",
    calendly: "https://calendly.com",
  }
};

export const initialLongFormProject: VideoProject = {
  id: "long-form-1",
  type: "long-form",
  title: "The Silent Shift: How Modern AI Is Reshaping Architecture",
  subtitle: "14-Minute Deep Dive Documentary Editing",
  client: "FutureBuilt Media (780K Subscribers)",
  duration: "14:24",
  // High-reliability cinematic video sample for smooth inline playback
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  embedType: "direct",
  youtubeId: "dQw4w9WgXcQ",
  thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80",
  aspectRatio: "16:9",
  description: "A comprehensive investigation exploring neural network design in architectural engineering. Required heavy B-roll curation, 3D camera projection mapping, custom 2D animated graphs in After Effects, and a 48-track immersive spatial sound mix.",
  tags: ["YouTube Documentary", "Cinematic Pacing", "After Effects Motion", "DaVinci Color Grade", "Sound Design"],
  tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve Studio", "Adobe Audition"],
  stats: {
    views: "1.8M Views",
    retentionRate: "64.2% at 5 min",
    averageCutTime: "3.4s",
    totalCuts: 312,
  },
  chapters: [
    {
      timestamp: "00:00",
      seconds: 0,
      title: "The Hook & Cold Open",
      description: "High-energy 45-second teaser featuring rapid jump cuts, sub-bass drops, and motion graphics to stop mid-session drop-off."
    },
    {
      timestamp: "01:15",
      seconds: 75,
      title: "The Problem Space",
      description: "Atmospheric pacing, ambient drone soundscapes, and archival footage stabilization."
    },
    {
      timestamp: "04:30",
      seconds: 270,
      title: "Data Visualization Breakdown",
      description: "Kinetic typography and 3D schematic camera fly-throughs synchronized with typewriter SFX."
    },
    {
      timestamp: "08:10",
      seconds: 490,
      title: "The Human Element",
      description: "Pacing slowed down intentionally to allow emotional weight to breathe with warm film-LUT color grading."
    },
    {
      timestamp: "12:00",
      seconds: 720,
      title: "Climax & Forward Outlook",
      description: "Rising synth chord progression, layered sound design, and seamless end-screen retention loop."
    }
  ],
  editingBreakdown: {
    hookStrategy: "Cold open with a dramatic hypothesis backed by dynamic sound design, cutting immediately to a punchy title card within 8 seconds.",
    pacingNotes: "Maintained a 3.4-second average cut length during technical explanations, expanding to 6-second cinematic drone pans for mental breathers.",
    soundDesignNotes: "Built a 48-stem sound library combining riser whooshes, mechanical impacts, Foley paper rustles, and high-pass EQ transitions.",
    colorGradingNotes: "Conformed from Sony S-Log3 to DaVinci Wide Gamut, crafting a cool teal-and-copper cinematic palette with grain emulation."
  }
};

export const initialShortFormProject: VideoProject = {
  id: "short-form-1",
  type: "short-form",
  title: "The 3-Second Scroll Stopper: Why Your Focus Decays",
  subtitle: "High-Retention Instagram Reel / TikTok / YT Short",
  client: "NeuroPeak Podcast & Personal Brand",
  duration: "00:48",
  // High-reliability vertical portrait sample
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  embedType: "direct",
  youtubeId: "kJQP7kiw5Fk",
  thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  aspectRatio: "9:16",
  description: "Crafted for maximum algorithm velocity across Instagram Reels, TikTok, and YouTube Shorts. Incorporates synchronized word-by-word kinetic captions, sound bite SFX, meme cutaway B-roll, and optical punch-ins.",
  tags: ["Viral Shorts", "Kinetic Captions", "Fast-Paced Hook", "CapCut & Premiere", "Podcast Repurposing"],
  tools: ["Adobe Premiere Pro", "CapCut Pro Desktop", "After Effects"],
  stats: {
    views: "3.4M Views",
    completionRate: "89.4%",
    averageCutTime: "1.2s",
    totalCuts: 38,
  },
  editingBreakdown: {
    hookStrategy: "Immediate zoom punch-in with a visual glitch SFX and bold red-highlighted caption within the first 0.6 seconds.",
    pacingNotes: "Cut every 1.2 seconds on average. Not a single second passes without a visual zoom, sound effect, or caption bounce.",
    soundDesignNotes: "Layered whooshes, vine thuds, bell dings on key words, and a subtle Lo-Fi percussion beat synced on every phrase.",
    colorGradingNotes: "Punchy contrast boost with saturated skin tones optimized for smartphone OLED and LCD displays under varied ambient light."
  }
};

export const softwareSkills: SoftwareSkill[] = [
  {
    name: "Adobe Premiere Pro",
    category: "NLE / Editing",
    proficiency: 98,
    badge: "Primary NLE",
    description: "Lightning-fast timeline assembly, multicam sync, dynamic link integration, and customized keyboard hotkey workflows.",
    featuredFor: "Long-form YouTube & Commercials"
  },
  {
    name: "DaVinci Resolve Studio",
    category: "Color & Finish",
    proficiency: 94,
    badge: "Color Master",
    description: "ACES and DaVinci YRGB Color Managed grading, shot matching, film grain emulation, and Fairlight audio sweetening.",
    featuredFor: "Documentaries & Film Looks"
  },
  {
    name: "Adobe After Effects",
    category: "Motion & VFX",
    proficiency: 90,
    badge: "Motion Graphics",
    description: "Kinetic typography, 3D camera tracking, custom HUD elements, map animations, and seamless VFX compositing.",
    featuredFor: "Explainer Graphics & Intros"
  },
  {
    name: "CapCut Pro Desktop",
    category: "NLE / Editing",
    proficiency: 96,
    badge: "Viral Shorts",
    description: "Rapid short-form auto-captions, dynamic tracking, velocity editing, and trending TikTok sound alignment.",
    featuredFor: "Reels, Shorts & TikToks"
  },
  {
    name: "Adobe Audition & iZotope RX",
    category: "Audio & SFX",
    proficiency: 88,
    badge: "Audio Polish",
    description: "Spectral de-noising, dialogue isolation, room reverb removal, EQ leveling, and -14 LUFS broadcast mastering.",
    featuredFor: "Crystal-Clear Dialogue & SFX"
  }
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Ingest, Transcribe & Story Arc",
    duration: "Day 1",
    description: "Analyzing raw footage, creating searchable transcriptions, selecting golden soundbites, and constructing the foundational A-roll backbone.",
    deliverables: ["Rough Cut A-Roll", "Storyline Outline", "Pacing Approval"]
  },
  {
    step: "02",
    title: "B-Roll, Graphics & Kinetic Captions",
    duration: "Day 2 - 3",
    description: "Layering curated stock/custom B-roll, building bespoke After Effects motion charts, and animating high-retention text cards.",
    deliverables: ["Full Visual Pass", "Motion Graphic Assets", "Pattern Interrupts"]
  },
  {
    step: "03",
    title: "Sound Design & Audio Mastering",
    duration: "Day 3 - 4",
    description: "Scoring with dynamic music cues, embedding immersive whooshes, impacts, and Foley, followed by vocal compression and LUFS leveling.",
    deliverables: ["Full Stem Audio Mix", "Dialogue Clarity Pass", "SFX Accents"]
  },
  {
    step: "04",
    title: "Color Grade & Final Export",
    duration: "Day 4 - 5",
    description: "Conforming in DaVinci Resolve, balancing contrast, applying cinematic film emulation LUTs, and rendering 4K Master deliverables.",
    deliverables: ["4K ProRes/MP4 Masters", "Platform-Optimized Cuts", "Thumbnail Grabs"]
  }
];
