import React, { useState, useRef, useEffect } from 'react';
import { VideoProject } from '../types';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, 
  Clock, Sparkles, Layers, Sliders, BarChart3, Film, CheckCircle2,
  ChevronRight, Disc3
} from 'lucide-react';

interface LongFormShowcaseProps {
  project: VideoProject;
}

export const LongFormShowcase: React.FC<LongFormShowcaseProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTab, setActiveTab] = useState<'chapters' | 'retention' | 'color' | 'audio'>('chapters');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  
  // Color grade comparison slider state (0 - 100%)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Sound design active stems
  const [stemStates, setStemStates] = useState({
    dialogue: true,
    foley: true,
    ambience: true,
    score: true,
  });

  // Handle video play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);

    // Update active chapter based on time
    if (project.chapters && project.chapters.length > 0) {
      let currentIdx = 0;
      for (let i = 0; i < project.chapters.length; i++) {
        if (current >= project.chapters[i].seconds) {
          currentIdx = i;
        }
      }
      setActiveChapterIndex(currentIdx);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const jumpToChapter = (seconds: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setActiveChapterIndex(index);
    }
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Color grade slider mouse/touch drag handlers
  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Parse embed if user provided YouTube/Vimeo
  const isYouTube = project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be');
  const isVimeo = project.videoUrl.includes('vimeo.com');

  const getEmbedUrl = () => {
    if (isYouTube) {
      const match = project.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      const id = match ? match[1] : project.youtubeId || 'dQw4w9WgXcQ';
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
    }
    if (isVimeo) {
      const match = project.videoUrl.match(/vimeo\.com\/(\d+)/);
      const id = match ? match[1] : '76979871';
      return `https://player.vimeo.com/video/${id}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <section id="long-form" className="py-20 px-4 sm:px-6 border-b border-zinc-800/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>FEATURED WORK 01: LONG-FORM CINEMATIC EDIT</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              {project.subtitle} • <span className="text-amber-400 font-medium">{project.client}</span>
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Duration: </span>
              <span className="text-white font-semibold">{project.duration}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Avg Cut: </span>
              <span className="text-emerald-400 font-semibold">{project.stats.averageCutTime}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Retention: </span>
              <span className="text-amber-400 font-semibold">{project.stats.retentionRate}</span>
            </div>
          </div>
        </div>

        {/* The 16:9 Cinematic Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl shadow-black/80 group">
          <div className="aspect-video w-full relative bg-zinc-950 flex items-center justify-center">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.thumbnail}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                  playsInline
                />

                {/* Big Center Play Button Overlay (when paused) */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                )}

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300">
                  {/* Timeline Scrubber */}
                  <div className="relative flex items-center group/scrub mb-2 sm:mb-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 sm:h-2 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:h-2.5 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                    <div className="flex items-center gap-3">
                      {/* Play / Pause */}
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-white hover:text-amber-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      {/* Rewind 10s */}
                      <button
                        onClick={() => {
                          if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10);
                        }}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors hidden sm:block"
                        title="Rewind 10 seconds"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Volume */}
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Timecode */}
                      <span className="text-zinc-400 tracking-wider">
                        <span className="text-white font-semibold">{formatTime(currentTime)}</span> / {formatTime(duration || 864)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Playback speed selector */}
                      <div className="hidden sm:flex items-center gap-1 bg-zinc-900/90 rounded-md p-0.5 border border-zinc-800">
                        {[1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => changeSpeed(rate)}
                            className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                              playbackRate === rate
                                ? 'bg-amber-400 text-black'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>

                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullScreen}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        title="Full Screen"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Deep Dive Breakdown Section */}
        <div className="mt-8 bg-zinc-900/60 rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex items-center overflow-x-auto border-b border-zinc-800 px-4 pt-3 gap-2 sm:gap-4 no-scrollbar">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'chapters'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Interactive Chapters ({project.chapters?.length || 5})</span>
            </button>

            <button
              onClick={() => setActiveTab('retention')}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'retention'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Pacing & Retention Curve</span>
            </button>

            <button
              onClick={() => setActiveTab('color')}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'color'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Color Grading (Before / After)</span>
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'audio'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Disc3 className="w-4 h-4" />
              <span>Sound Design Stems</span>
            </button>
          </div>

          {/* Tab Content 1: Chapters */}
          {activeTab === 'chapters' && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-zinc-400">
                  Click any chapter to seek directly to the key narrative beat:
                </p>
                <span className="text-xs font-mono text-amber-400">
                  Active: Chapter {activeChapterIndex + 1}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.chapters?.map((chapter, idx) => (
                  <button
                    key={chapter.timestamp}
                    onClick={() => jumpToChapter(chapter.seconds, idx)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                      activeChapterIndex === idx
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                        : 'bg-black/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10">
                          {chapter.timestamp}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          Part {idx + 1}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-sm text-white group-hover:text-amber-300 transition-colors">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 group-hover:text-zinc-300">
                      <span>Jump to scene</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Retention & Pacing */}
          {activeTab === 'retention' && (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Retention Curve Diagram */}
                <div className="lg:col-span-2 bg-black/40 p-5 rounded-xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-zinc-400">RETENTION BENCHMARK vs INDUSTRY AVERAGE</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">+38% Above Average</span>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="relative h-44 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientRetention" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeDasharray="3 3" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#27272a" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#27272a" strokeDasharray="3 3" />

                      {/* Industry Average (Gray Dotted Line) */}
                      <path
                        d="M 0 50 Q 80 100, 200 125 T 500 140"
                        fill="none"
                        stroke="#52525b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Our Edit Retention Line (Amber Bold Line with Gradient Fill) */}
                      <path
                        d="M 0 10 C 60 15, 120 28, 180 32 C 240 36, 300 45, 380 48 C 440 52, 480 60, 500 64 L 500 150 L 0 150 Z"
                        fill="url(#gradientRetention)"
                      />
                      <path
                        d="M 0 10 C 60 15, 120 28, 180 32 C 240 36, 300 45, 380 48 C 440 52, 480 60, 500 64"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                      />

                      {/* Critical Intervention Dots */}
                      <circle cx="20" cy="12" r="4" fill="#fbbf24" />
                      <circle cx="180" cy="32" r="4" fill="#fbbf24" />
                      <circle cx="380" cy="48" r="4" fill="#fbbf24" />
                    </svg>

                    {/* Chart Labels Overlay */}
                    <div className="absolute top-1 left-2 text-[10px] font-mono text-amber-400 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                      0:00 Hook (98%)
                    </div>
                    <div className="absolute top-6 left-1/3 text-[10px] font-mono text-amber-400 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                      4:30 3D Data Viz (74%)
                    </div>
                    <div className="absolute top-12 right-1/4 text-[10px] font-mono text-amber-400 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                      12:00 Climax Shift (64%)
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-3 pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-amber-400 inline-block" />
                      <span className="text-zinc-300">Our Cut: 64.2% @ 5m</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-zinc-600 inline-block" />
                      <span>YouTube Category Benchmark: 38.5%</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Strategy Notes */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
                    <h5 className="text-xs font-mono font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      HOOK EXECUTION
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.editingBreakdown?.hookStrategy}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
                    <h5 className="text-xs font-mono font-bold text-sky-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PATTERN INTERRUPTS
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.editingBreakdown?.pacingNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Color Grade Comparison Slider */}
          {activeTab === 'color' && (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-display font-semibold text-base text-white">
                    Interactive Log vs. Cinematic Film Grade Comparison
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Drag the slider horizontally to compare Sony S-Log3 flat raw footage against the final DaVinci Resolve color grade.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded bg-zinc-800 text-zinc-300">
                  <span>DaVinci YRGB Wide Gamut • Kodak 2383 LUT</span>
                </div>
              </div>

              {/* Interactive Before / After Split Slider */}
              <div
                className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-zinc-700"
                onMouseDown={() => setIsDraggingSlider(true)}
                onMouseUp={() => setIsDraggingSlider(false)}
                onMouseLeave={() => setIsDraggingSlider(false)}
                onMouseMove={(e) => {
                  if (isDraggingSlider) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleSliderMove(e.clientX, rect);
                  }
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(e.touches[0].clientX, rect);
                }}
              >
                {/* AFTER: Final Graded Image (Full Background) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=80')`,
                    filter: 'contrast(1.15) saturate(1.2) brightness(0.95)'
                  }}
                >
                  <span className="absolute top-4 right-4 bg-amber-500/90 text-black font-mono font-bold text-xs px-2.5 py-1 rounded shadow-md">
                    GRADED (Rec.709 Film LUT)
                  </span>
                </div>

                {/* BEFORE: Flat LOG Footage (Clipped by slider position) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-cover bg-center"
                  style={{
                    width: `${sliderPosition}%`,
                    backgroundImage: `url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=80')`,
                    filter: 'contrast(0.65) brightness(1.2) saturate(0.35) sepia(0.05)'
                  }}
                >
                  <span className="absolute top-4 left-4 bg-zinc-900/90 text-zinc-200 border border-zinc-700 font-mono font-bold text-xs px-2.5 py-1 rounded shadow-md">
                    RAW (Sony S-Log3)
                  </span>
                </div>

                {/* Vertical Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-xl border border-zinc-300">
                    ↔
                  </div>
                </div>
              </div>

              {/* Color Details Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-black/40 rounded-xl border border-zinc-800">
                  <div className="font-mono text-zinc-500 mb-1">COLOR WORKFLOW</div>
                  <div className="text-zinc-200">Shot on Sony FX6 (S-Log3 / S-Gamut3.Cine), conformed to DaVinci Wide Gamut Intermediate.</div>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-zinc-800">
                  <div className="font-mono text-zinc-500 mb-1">LOOK DESIGN</div>
                  <div className="text-zinc-200">Teal shadow bias with warm copper skin retention. 16mm halation and Kodak 2383 D55 print emulation.</div>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-zinc-800">
                  <div className="font-mono text-zinc-500 mb-1">DYNAMIC RANGE</div>
                  <div className="text-zinc-200">Soft highlight roll-off preventing digital clipping in architectural glass and sky reflections.</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Audio Stems Visualizer */}
          {activeTab === 'audio' && (
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h4 className="font-display font-semibold text-base text-white">
                  Multi-Track Sound Design Mix (48-Stem Architecture)
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Great editing lives in the ears. Explore the 4 core audio layers constructed for this project:
                </p>
              </div>

              <div className="space-y-3">
                {/* Stem 1: Dialogue */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, dialogue: !s.dialogue }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                        stemStates.dialogue ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {stemStates.dialogue ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-white font-semibold">Track 1-4: Dialogue Clean-up & Isolation</span>
                      <p className="text-[11px] text-zinc-400">iZotope RX spectral de-noised lavalier + boom mic phase alignment</p>
                    </div>
                  </div>
                  {/* Waveform graphic representation */}
                  <div className="flex items-center gap-1 h-6">
                    {[12, 28, 45, 60, 35, 75, 90, 50, 65, 80, 40, 25, 55, 70, 85, 30].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.dialogue ? 'bg-amber-400' : 'bg-zinc-800'
                        }`}
                        style={{ height: `${stemStates.dialogue ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stem 2: Foley & SFX */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, foley: !s.foley }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                        stemStates.foley ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {stemStates.foley ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-white font-semibold">Track 5-14: Foley & Tactile Transitions</span>
                      <p className="text-[11px] text-zinc-400">Mechanical switches, architectural paper drafting rustles, subtle sub-impacts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {[5, 15, 85, 20, 10, 95, 30, 10, 80, 20, 5, 90, 40, 10, 60, 10].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.foley ? 'bg-rose-400' : 'bg-zinc-800'
                        }`}
                        style={{ height: `${stemStates.foley ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stem 3: Ambience & Drone */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, ambience: !s.ambience }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                        stemStates.ambience ? 'bg-sky-400 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {stemStates.ambience ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-white font-semibold">Track 15-22: Spatial Environmental Ambience</span>
                      <p className="text-[11px] text-zinc-400">Urban city hum, structural reverb impulse response, HVAC air tone</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {[35, 40, 38, 42, 45, 40, 38, 42, 40, 39, 41, 40, 43, 38, 40, 39].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.ambience ? 'bg-sky-400' : 'bg-zinc-800'
                        }`}
                        style={{ height: `${stemStates.ambience ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stem 4: Original Score */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, score: !s.score }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                        stemStates.score ? 'bg-emerald-400 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {stemStates.score ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-white font-semibold">Track 23-48: Dynamic Score & Sidechain Ducking</span>
                      <p className="text-[11px] text-zinc-400">Analog modular synthesizer progression automations ducked -4dB under vocals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {[20, 30, 45, 60, 75, 65, 80, 95, 70, 85, 90, 75, 60, 50, 35, 20].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.score ? 'bg-emerald-400' : 'bg-zinc-800'
                        }`}
                        style={{ height: `${stemStates.score ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
