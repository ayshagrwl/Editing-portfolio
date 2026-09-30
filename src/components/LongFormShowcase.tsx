import React, { useState, useRef } from 'react';
import { VideoProject } from '../types';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, 
  Clock, Sliders, BarChart3, Film, CheckCircle2,
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
    <section id="long-form" className="py-16 px-4 sm:px-6 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1.5 font-medium">
              <Film className="w-3.5 h-3.5" />
              <span>01. LONG-FORM DOCUMENTARY EDIT</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {project.subtitle} <span className="text-slate-300">·</span> <span className="text-slate-700 font-medium">{project.client}</span>
            </p>
          </div>

          {/* Minimalist Scannable Stats (Unboxed metadata, quiet separators) */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 bg-slate-100/80 px-3.5 py-1.5 rounded-xl border border-slate-200/60">
            <div>
              <span className="text-slate-400">Duration: </span>
              <span className="font-bold text-slate-900">{project.duration}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">Pace: </span>
              <span className="font-bold text-indigo-600">{project.stats.averageCutTime}/cut</span>
            </div>
            <span className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">Retention: </span>
              <span className="font-bold text-emerald-600">{project.stats.retentionRate}</span>
            </div>
          </div>
        </div>

        {/* The 16:9 Cinematic Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden p-2 sm:p-2.5 bg-gradient-to-b from-slate-200/80 via-white to-slate-200/60 border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(99,102,241,0.08)] group">
          <div className="aspect-video w-full relative bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
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
                    className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-xl shadow-indigo-500/35 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                )}

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent transition-opacity duration-300">
                  {/* Timeline Scrubber */}
                  <div className="relative flex items-center mb-2 sm:mb-2.5">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 sm:h-2 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-indigo-400 hover:h-2 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-3">
                      {/* Play / Pause */}
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      {/* Rewind 10s */}
                      <button
                        onClick={() => {
                          if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
                        title="Rewind 10 seconds"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Volume */}
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Timecode */}
                      <span className="text-slate-400 tracking-wider">
                        <span className="text-white font-semibold">{formatTime(currentTime)}</span> / {formatTime(duration || 864)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Playback speed selector */}
                      <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 rounded-md p-0.5 border border-slate-800">
                        {[1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => changeSpeed(rate)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                              playbackRate === rate
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>

                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullScreen}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
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

        {/* Deep Dive Breakdown Section with Light Minimalist Tabs */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Navigation Tabs (Functional interactive filter buttons with click handlers) */}
          <div className="flex items-center overflow-x-auto border-b border-slate-200/80 px-4 pt-3 gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'chapters'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Chapters ({project.chapters?.length || 5})</span>
            </button>

            <button
              onClick={() => setActiveTab('retention')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'retention'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Retention Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('color')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'color'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Color Grading Slider</span>
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'audio'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Disc3 className="w-3.5 h-3.5" />
              <span>Audio Stems</span>
            </button>
          </div>

          {/* Tab Content 1: Chapters */}
          {activeTab === 'chapters' && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-500">
                  Select a chapter to jump directly to key storytelling moments:
                </p>
                <span className="text-xs font-mono text-indigo-600 font-semibold">
                  Active: Chapter {activeChapterIndex + 1}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.chapters?.map((chapter, idx) => (
                  <button
                    key={chapter.timestamp}
                    onClick={() => jumpToChapter(chapter.seconds, idx)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
                      activeChapterIndex === idx
                        ? 'bg-indigo-50/60 border-indigo-300 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-100">
                          {chapter.timestamp}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Part {idx + 1}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-indigo-600">
                      <span>Seek to timeline</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
                <div className="lg:col-span-2 bg-slate-50/70 p-5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-600 font-medium">RETENTION BENCHMARK vs INDUSTRY AVERAGE</span>
                    <span className="text-xs font-mono text-emerald-700 font-semibold">+38% Above Average</span>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="relative h-44 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientRetentionLight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#e2e8f0" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />

                      {/* Industry Average (Gray Dotted Line) */}
                      <path
                        d="M 0 50 Q 80 100, 200 125 T 500 140"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Our Edit Retention Line (Indigo Bold Line with Gradient Fill) */}
                      <path
                        d="M 0 10 C 60 15, 120 28, 180 32 C 240 36, 300 45, 380 48 C 440 52, 480 60, 500 64 L 500 150 L 0 150 Z"
                        fill="url(#gradientRetentionLight)"
                      />
                      <path
                        d="M 0 10 C 60 15, 120 28, 180 32 C 240 36, 300 45, 380 48 C 440 52, 480 60, 500 64"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="2.5"
                      />

                      {/* Critical Intervention Dots */}
                      <circle cx="20" cy="12" r="4" fill="#4f46e5" />
                      <circle cx="180" cy="32" r="4" fill="#4f46e5" />
                      <circle cx="380" cy="48" r="4" fill="#4f46e5" />
                    </svg>

                    {/* Chart Labels Overlay */}
                    <div className="absolute top-1 left-2 text-[10px] font-mono text-indigo-700 bg-white/90 px-1.5 py-0.5 rounded border border-indigo-200 shadow-xs">
                      0:00 Hook (98%)
                    </div>
                    <div className="absolute top-6 left-1/3 text-[10px] font-mono text-indigo-700 bg-white/90 px-1.5 py-0.5 rounded border border-indigo-200 shadow-xs">
                      4:30 Data Viz (74%)
                    </div>
                    <div className="absolute top-12 right-1/4 text-[10px] font-mono text-indigo-700 bg-white/90 px-1.5 py-0.5 rounded border border-indigo-200 shadow-xs">
                      12:00 Climax (64%)
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-3 pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-indigo-600 inline-block" />
                      <span className="text-slate-800 font-semibold">Our Cut: 64.2% @ 5m</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-slate-400 inline-block" />
                      <span>YouTube Category Benchmark: 38.5%</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Strategy Notes */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <h5 className="text-xs font-mono font-bold text-indigo-600 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      HOOK EXECUTION
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.editingBreakdown?.hookStrategy}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <h5 className="text-xs font-mono font-bold text-sky-600 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PATTERN INTERRUPTS
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
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
                  <h4 className="font-display font-semibold text-base text-slate-900">
                    Interactive Log vs. Cinematic Film Grade Comparison
                  </h4>
                  <p className="text-xs text-slate-500">
                    Drag the slider horizontally to compare flat Sony S-Log3 raw footage against the final DaVinci Resolve color grade.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  <span>DaVinci Wide Gamut · Kodak 2383 LUT</span>
                </div>
              </div>

              {/* Interactive Before / After Split Slider */}
              <div
                className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-200 shadow-sm"
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
                  <span className="absolute top-4 right-4 bg-white/95 text-slate-900 font-mono font-bold text-xs px-2.5 py-1 rounded shadow-md border border-slate-200">
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
                  <span className="absolute top-4 left-4 bg-white/95 text-slate-900 border border-slate-200 font-mono font-bold text-xs px-2.5 py-1 rounded shadow-md">
                    RAW (Sony S-Log3)
                  </span>
                </div>

                {/* Vertical Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs shadow-lg border border-slate-300">
                    ↔
                  </div>
                </div>
              </div>

              {/* Color Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <div className="font-mono text-slate-400 mb-1">COLOR WORKFLOW</div>
                  <div className="text-slate-700">Shot on Sony FX6 (S-Log3 / S-Gamut3.Cine), conformed to DaVinci Wide Gamut Intermediate.</div>
                </div>
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <div className="font-mono text-slate-400 mb-1">LOOK DESIGN</div>
                  <div className="text-slate-700">Teal shadow bias with warm copper skin retention. 16mm halation and Kodak 2383 D55 print emulation.</div>
                </div>
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <div className="font-mono text-slate-400 mb-1">DYNAMIC RANGE</div>
                  <div className="text-slate-700">Soft highlight roll-off preventing digital clipping in architectural glass and sky reflections.</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Audio Stems Visualizer */}
          {activeTab === 'audio' && (
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h4 className="font-display font-semibold text-base text-slate-900">
                  Multi-Track Sound Design Mix (48-Stem Architecture)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Great editing lives in the ears. Toggle the 4 audio stems to hear their contribution to retention:
                </p>
              </div>

              <div className="space-y-3">
                {/* Stem 1: Dialogue */}
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, dialogue: !s.dialogue }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                        stemStates.dialogue ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {stemStates.dialogue ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-slate-900 font-semibold">Track 1-4: Dialogue Clean-up & Isolation</span>
                      <p className="text-[11px] text-slate-500">iZotope RX spectral de-noised lavalier + boom mic phase alignment</p>
                    </div>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-1 h-6">
                    {[12, 28, 45, 60, 35, 75, 90, 50, 65, 80, 40, 25, 55, 70, 85, 30].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.dialogue ? 'bg-indigo-600' : 'bg-slate-200'
                        }`}
                        style={{ height: `${stemStates.dialogue ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stem 2: Foley & SFX */}
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, foley: !s.foley }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                        stemStates.foley ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {stemStates.foley ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-slate-900 font-semibold">Track 5-14: Foley & Tactile Transitions</span>
                      <p className="text-[11px] text-slate-500">Mechanical switches, paper drafting rustles, subtle sub-impacts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {[5, 15, 85, 20, 10, 95, 30, 10, 80, 20, 5, 90, 40, 10, 60, 10].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.foley ? 'bg-rose-500' : 'bg-slate-200'
                        }`}
                        style={{ height: `${stemStates.foley ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stem 3: Ambience & Drone */}
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, ambience: !s.ambience }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                        stemStates.ambience ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {stemStates.ambience ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-slate-900 font-semibold">Track 15-22: Spatial Environmental Ambience</span>
                      <p className="text-[11px] text-slate-500">Urban city hum, structural impulse response, room air tone</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {[35, 40, 38, 42, 45, 40, 38, 42, 40, 39, 41, 40, 43, 38, 40, 39].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.ambience ? 'bg-sky-500' : 'bg-slate-200'
                        }`}
                        style={{ height: `${stemStates.ambience ? h : 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stem 4: Original Score */}
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStemStates(s => ({ ...s, score: !s.score }))}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                        stemStates.score ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {stemStates.score ? 'ACTIVE' : 'MUTED'}
                    </button>
                    <div>
                      <span className="font-mono text-xs text-slate-900 font-semibold">Track 23-48: Dynamic Score & Sidechain Ducking</span>
                      <p className="text-[11px] text-slate-500">Analog modular synthesizer progression ducked -4dB under vocals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {[20, 30, 45, 60, 75, 65, 80, 95, 70, 85, 90, 75, 60, 50, 35, 20].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          stemStates.score ? 'bg-emerald-600' : 'bg-slate-200'
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
