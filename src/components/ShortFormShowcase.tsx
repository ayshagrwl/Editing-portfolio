import React, { useState, useRef } from 'react';
import { VideoProject } from '../types';
import { 
  Play, Pause, Volume2, VolumeX, RotateCcw, Video, 
  Flame, Zap, Sparkles, Smartphone, Eye, Share2, Heart,
  MessageCircle, Bookmark, CheckCircle2, Sliders
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

  // Caption test phrases to demonstrate kinetic timing
  const captionPhrases = [
    { text: "IF YOU WANT TO", highlight: "DOUBLE", rest: "YOUR RETENTION..." },
    { text: "STOP USING BORING", highlight: "STATIC", rest: "B-ROLL." },
    { text: "CUT EVERY", highlight: "1.2 SECONDS", rest: "WITH MICRO SFX!" },
    { text: "THAT'S HOW YOU BUILD A", highlight: "3M+ VIEW", rest: "REEL." }
  ];

  return (
    <section id="short-form" className="py-20 px-4 sm:px-6 border-b border-zinc-800/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400 mb-3">
              <Video className="w-3.5 h-3.5" />
              <span>FEATURED WORK 02: VIRAL SHORT-FORM EDIT</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              {project.subtitle} • <span className="text-rose-400 font-medium">{project.client}</span>
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Duration: </span>
              <span className="text-white font-semibold">{project.duration}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Completion: </span>
              <span className="text-emerald-400 font-semibold">{project.stats.completionRate}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Views: </span>
              <span className="text-rose-400 font-semibold">{project.stats.views}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left is Smartphone Frame, Right is Editorial Mechanics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 9:16 Smartphone Mockup with Interactive Controls */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Container with bezel */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/19] bg-zinc-950 rounded-[44px] p-3 border-[4px] border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-zinc-700/50 overflow-hidden">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5 border border-zinc-800">
                <div className="w-2 h-2 rounded-full bg-zinc-900" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
              </div>

              {/* Status bar mock */}
              <div className="absolute top-5 left-8 text-[10px] font-mono text-white/80 z-30 font-semibold">
                9:41
              </div>
              <div className="absolute top-5 right-8 flex items-center gap-1.5 text-[10px] text-white/80 z-30">
                <span className="font-mono">5G</span>
                <div className="w-4 h-2 border border-white/70 rounded-xs p-0.5">
                  <div className="w-full h-full bg-white" />
                </div>
              </div>

              {/* Video Screen */}
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-zinc-900 flex items-center justify-center">
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
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 pt-12 pb-16 z-20">
                    {/* Top tab */}
                    <div className="flex justify-center gap-4 text-xs font-bold text-white/80 drop-shadow-md">
                      <span className="text-white/60">Following</span>
                      <span className="text-white border-b-2 border-white pb-0.5">For You</span>
                    </div>

                    {/* Bottom Metadata & Right Actions */}
                    <div className="flex items-end justify-between">
                      {/* Left creator info */}
                      <div className="max-w-[70%] text-left drop-shadow-md space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-white">@neuropeak</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-rose-500 rounded text-white font-bold">
                            Follow
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-100 line-clamp-2 leading-tight">
                          Why 99% of people lose focus within 4 seconds... #shorts #productivity #editing
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-mono">
                          <span>🎵 Original Sound - Trending Mix</span>
                        </div>
                      </div>

                      {/* Right Social Actions Column */}
                      <div className="flex flex-col items-center gap-3 drop-shadow-lg text-white">
                        <div className="flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center text-rose-500">
                            <Heart className="w-5 h-5 fill-current" />
                          </div>
                          <span className="text-[10px] font-mono mt-0.5">142K</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center text-white">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono mt-0.5">2.4K</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center text-amber-400">
                            <Bookmark className="w-5 h-5 fill-current" />
                          </div>
                          <span className="text-[10px] font-mono mt-0.5">38K</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center text-white">
                            <Share2 className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono mt-0.5">19K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Big play button if paused */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute z-30 w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/50 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                )}

                {/* Bottom Quick Controls for Phone */}
                <div className="absolute bottom-2 left-3 right-3 z-30 flex items-center justify-between p-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs border border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-full hover:bg-zinc-800 text-white"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={restartVideo}
                      className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300"
                      title="Restart"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-200 text-[11px] font-mono hover:bg-zinc-700"
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

            {/* Platform UI Overlay Toggle */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setShowPlatformOverlay(!showPlatformOverlay)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                  showPlatformOverlay
                    ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                    : 'bg-zinc-900/60 text-zinc-500 border-zinc-800'
                }`}
              >
                Safe Zone UI: {showPlatformOverlay ? 'ON' : 'OFF'}
              </button>
              <span className="text-[11px] text-zinc-500">
                Safe zone ensures captions aren't blocked by platform icons
              </span>
            </div>
          </div>

          {/* Right Column: Deep Dive & Viral Architecture Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            {/* Overview Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-rose-400" />
                <h3 className="font-display font-bold text-lg text-white">
                  The Short-Form Retention Formula
                </h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800/90 text-zinc-300 border border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Kinetic Subtitles Preview */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="font-display font-bold text-sm text-white">
                    Dynamic Kinetic Caption Engine
                  </h4>
                </div>

                {/* Style Selector */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-zinc-800">
                  <button
                    onClick={() => setActiveCaptionStyle('hormozi')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                      activeCaptionStyle === 'hormozi'
                        ? 'bg-amber-400 text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Hormozi Gold
                  </button>
                  <button
                    onClick={() => setActiveCaptionStyle('minimal')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                      activeCaptionStyle === 'minimal'
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Minimalist Clean
                  </button>
                  <button
                    onClick={() => setActiveCaptionStyle('cyber')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                      activeCaptionStyle === 'cyber'
                        ? 'bg-rose-500 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Cyber Neon
                  </button>
                </div>
              </div>

              {/* Caption Live Preview Box */}
              <div className="h-28 bg-black/60 rounded-xl border border-zinc-800/80 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="text-xs font-mono text-zinc-500 absolute top-2 left-3">
                  FRAME-BY-FRAME SYNC
                </div>

                <div className="font-display font-black text-xl sm:text-2xl tracking-wide uppercase transition-all duration-200">
                  {activeCaptionStyle === 'hormozi' && (
                    <div className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                      {captionPhrases[activeSubStep].text}{' '}
                      <span className="text-amber-400 bg-black/70 px-2 py-0.5 rounded inline-block scale-110 rotate-[-1deg] border border-amber-500/40">
                        {captionPhrases[activeSubStep].highlight}
                      </span>{' '}
                      {captionPhrases[activeSubStep].rest}
                    </div>
                  )}

                  {activeCaptionStyle === 'minimal' && (
                    <div className="text-zinc-300 font-sans tracking-normal font-semibold text-lg">
                      {captionPhrases[activeSubStep].text}{' '}
                      <span className="text-white underline decoration-zinc-400 decoration-2 underline-offset-4">
                        {captionPhrases[activeSubStep].highlight}
                      </span>{' '}
                      {captionPhrases[activeSubStep].rest}
                    </div>
                  )}

                  {activeCaptionStyle === 'cyber' && (
                    <div className="text-zinc-200 font-mono text-lg">
                      {captionPhrases[activeSubStep].text}{' '}
                      <span className="text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)] px-1 font-bold">
                        {captionPhrases[activeSubStep].highlight}
                      </span>{' '}
                      {captionPhrases[activeSubStep].rest}
                    </div>
                  )}
                </div>

                {/* Step ticker */}
                <div className="flex items-center gap-1.5 mt-3">
                  {captionPhrases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSubStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeSubStep === i ? 'w-6 bg-rose-500' : 'w-2 bg-zinc-700'
                      }`}
                      aria-label={`Phrase ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Breakdown Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>THE 0.8s HOOK PUNCH</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {project.editingBreakdown?.hookStrategy}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>VELOCITY & CUT PACING</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {project.editingBreakdown?.pacingNotes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MICRO-SFX RHYTHM</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {project.editingBreakdown?.soundDesignNotes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>OLED-OPTIMIZED COLOR</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
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
