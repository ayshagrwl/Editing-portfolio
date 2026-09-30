import React, { useState, useRef } from 'react';
import { VideoProject } from '../types';
import { 
  Play, Pause, Volume2, VolumeX, RotateCcw, Video, 
  Flame, Zap, Sparkles, Sliders, Heart, MessageCircle, Bookmark, Share2
} from 'lucide-react';

interface ShortFormShowcaseProps {
  project: VideoProject;
}

export const ShortFormShowcase: React.FC<ShortFormShowcaseProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlatformOverlay, setShowPlatformOverlay] = useState(true);
  const [activeCaptionStyle, setActiveCaptionStyle] = useState<'hormozi' | 'minimal' | 'cyber'>('hormozi');
  const [activeSubStep, setActiveSubStep] = useState(0);

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

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Caption phrases to demonstrate kinetic timing
  const captionPhrases = [
    { text: "IF YOU WANT TO", highlight: "DOUBLE", rest: "YOUR RETENTION..." },
    { text: "STOP USING BORING", highlight: "STATIC", rest: "B-ROLL." },
    { text: "CUT EVERY", highlight: "1.2 SECONDS", rest: "WITH MICRO SFX!" },
    { text: "THAT'S HOW YOU BUILD A", highlight: "3M+ VIEW", rest: "REEL." }
  ];

  return (
    <section id="short-form" className="py-16 px-4 sm:px-6 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-pink-600 mb-1.5 font-medium">
              <Video className="w-3.5 h-3.5" />
              <span>02. SHORT-FORM VIRAL REEL</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {project.subtitle} <span className="text-slate-300">·</span> <span className="text-slate-700 font-medium">{project.client}</span>
            </p>
          </div>

          {/* Minimalist Stat Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 bg-slate-100/80 px-3.5 py-1.5 rounded-xl border border-slate-200/60">
            <div>
              <span className="text-slate-400">Duration: </span>
              <span className="font-bold text-slate-900">{project.duration}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">Completion: </span>
              <span className="font-bold text-emerald-600">{project.stats.completionRate}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">Views: </span>
              <span className="font-bold text-pink-600">{project.stats.views}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left is Smartphone Frame, Right is Editorial Mechanics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 9:16 Smartphone Mockup with Light Silver Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Container with light titanium bezel */}
            <div className="relative w-full max-w-[305px] sm:max-w-[320px] aspect-[9/19] bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 rounded-[46px] p-2.5 shadow-xl shadow-slate-300/40 border border-slate-300/80">
              <div className="relative w-full h-full bg-slate-950 rounded-[38px] overflow-hidden flex items-center justify-center">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-white/10" />
                </div>

                {/* Status bar mock */}
                <div className="absolute top-3.5 left-7 text-[10px] font-mono text-white/90 z-30 font-semibold">
                  9:41
                </div>
                <div className="absolute top-3.5 right-7 flex items-center gap-1.5 text-[10px] text-white/90 z-30">
                  <span className="font-mono">5G</span>
                  <div className="w-4 h-2 border border-white/70 rounded-xs p-0.5">
                    <div className="w-full h-full bg-white" />
                  </div>
                </div>

                {/* Video Screen */}
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    poster={project.thumbnail}
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={togglePlay}
                    className="w-full h-full object-cover cursor-pointer"
                  />

                  {/* Simulated TikTok / Reels Overlay (Toggleable) */}
                  {showPlatformOverlay && (
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 pt-11 pb-14 z-20">
                      {/* Top tabs */}
                      <div className="flex justify-center gap-4 text-xs font-bold text-white/80 drop-shadow-md">
                        <span className="text-white/60">Following</span>
                        <span className="text-white border-b-2 border-white pb-0.5">For You</span>
                      </div>

                      {/* Bottom Metadata & Right Actions */}
                      <div className="flex items-end justify-between">
                        {/* Left creator info */}
                        <div className="max-w-[70%] text-left drop-shadow-md space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white">@ayush_edits</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-gradient-to-r from-pink-600 to-rose-500 rounded text-white font-bold">
                              Follow
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-100 line-clamp-2 leading-tight">
                            {project.title} #shorts #retention #editing
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-300 font-mono">
                            <span>🎵 Original Sound - Retention Mix</span>
                          </div>
                        </div>

                        {/* Right Social Actions Column */}
                        <div className="flex flex-col items-center gap-2.5 drop-shadow-lg text-white">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-rose-500">
                              <Heart className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-[9px] font-mono mt-0.5">142K</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                              <MessageCircle className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-mono mt-0.5">2.4K</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-amber-400">
                              <Bookmark className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-[9px] font-mono mt-0.5">38K</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                              <Share2 className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-mono mt-0.5">19K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Big play button if paused */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute z-30 w-14 h-14 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 text-white flex items-center justify-center shadow-xl shadow-pink-500/35 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                      aria-label="Play Reel"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                  )}

                  {/* Bottom Quick Controls */}
                  <div className="absolute bottom-2 left-3 right-3 z-30 flex items-center justify-between p-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs border border-white/10">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={togglePlay}
                        className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={restartVideo}
                        className="p-1 rounded-full hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="Restart"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={toggleMute}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-mono hover:bg-white/25 cursor-pointer"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3 h-3 text-rose-400" />
                          <span>UNMUTE</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-emerald-400" />
                          <span>SOUND ON</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform UI Overlay Toggle */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setShowPlatformOverlay(!showPlatformOverlay)}
                className={`text-xs font-mono px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                  showPlatformOverlay
                    ? 'bg-slate-900 text-white border-slate-800'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Safe Zone UI: {showPlatformOverlay ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Right Column: Deep Dive & Viral Architecture Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            {/* Overview Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-pink-500" />
                <h3 className="font-display font-bold text-base text-slate-900">
                  Short-Form Retention Mechanics
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {project.description}
              </p>

              {/* Minimalist Tags (clean typographic separators) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                {project.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < project.tags.length - 1 && <span className="text-slate-300">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Interactive Kinetic Subtitles Preview */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900">
                    Kinetic Caption Engine
                  </h4>
                </div>

                {/* Style Selector Tabs (Interactive filter buttons) */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveCaptionStyle('hormozi')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      activeCaptionStyle === 'hormozi'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Hormozi Gold
                  </button>
                  <button
                    onClick={() => setActiveCaptionStyle('minimal')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      activeCaptionStyle === 'minimal'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Clean White
                  </button>
                  <button
                    onClick={() => setActiveCaptionStyle('cyber')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      activeCaptionStyle === 'cyber'
                        ? 'bg-white text-indigo-600 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Cyber Neon
                  </button>
                </div>
              </div>

              {/* Caption Live Preview Box */}
              <div className="h-24 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="text-[10px] font-mono text-slate-400 absolute top-2 left-3">
                  FRAME-BY-FRAME SYNC
                </div>

                <div className="font-display font-black text-lg sm:text-xl tracking-wide uppercase transition-all duration-200">
                  {activeCaptionStyle === 'hormozi' && (
                    <div className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {captionPhrases[activeSubStep].text}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 bg-black/80 px-2 py-0.5 rounded inline-block scale-105 rotate-[-1deg] border border-amber-500/40">
                        {captionPhrases[activeSubStep].highlight}
                      </span>{' '}
                      {captionPhrases[activeSubStep].rest}
                    </div>
                  )}

                  {activeCaptionStyle === 'minimal' && (
                    <div className="text-slate-200 font-sans tracking-normal font-semibold text-base">
                      {captionPhrases[activeSubStep].text}{' '}
                      <span className="text-white underline decoration-sky-400 decoration-2 underline-offset-4">
                        {captionPhrases[activeSubStep].highlight}
                      </span>{' '}
                      {captionPhrases[activeSubStep].rest}
                    </div>
                  )}

                  {activeCaptionStyle === 'cyber' && (
                    <div className="text-slate-200 font-mono text-base">
                      {captionPhrases[activeSubStep].text}{' '}
                      <span className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)] px-1 font-bold">
                        {captionPhrases[activeSubStep].highlight}
                      </span>{' '}
                      {captionPhrases[activeSubStep].rest}
                    </div>
                  )}
                </div>

                {/* Step ticker */}
                <div className="flex items-center gap-1.5 mt-2">
                  {captionPhrases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSubStep(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSubStep === i ? 'w-5 bg-gradient-to-r from-pink-500 to-rose-500' : 'w-2 bg-slate-700'
                      }`}
                      aria-label={`Phrase ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Breakdown Feature Grid (Minimalist Scannable) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-pink-600 font-mono text-xs font-bold mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>0.8s HOOK VELOCITY</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.editingBreakdown?.hookStrategy}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-xs font-bold mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>PATTERN INTERRUPTS</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.editingBreakdown?.pacingNotes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-violet-600 font-mono text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TACTILE SFX RHYTHM</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.editingBreakdown?.soundDesignNotes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-emerald-600 font-mono text-xs font-bold mb-1">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>OLED POP COLOR GRADE</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.editingBreakdown?.colorGradingNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
