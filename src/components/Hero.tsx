import React from 'react';
import { EditorProfile, VideoProject } from '../types';
import { Film, Video, ArrowDown, Eye, TrendingUp, Award, Play } from 'lucide-react';

interface HeroProps {
  profile: EditorProfile;
  longForm: VideoProject;
  shortForm: VideoProject;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, longForm, shortForm, onOpenCustomizer }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden border-b border-zinc-800/60">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto">
        {/* Top Tagline & Status */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-xs font-mono text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>VIDEO EDITOR & NARRATIVE ARCHITECT</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-medium text-emerald-300">
            <span>{profile.availabilityText}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Editing that commands attention, keeps eyes glued, and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-rose-400">
                skyrockets retention.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 bg-zinc-900/70 p-4 rounded-2xl border border-zinc-800">
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mb-1">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>TOTAL VIEWS</span>
              </div>
              <div className="font-display font-bold text-2xl text-white">
                {profile.viewsGenerated}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mb-1">
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>DELIVERED</span>
              </div>
              <div className="font-display font-bold text-2xl text-white">
                {profile.videosEdited}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>RETENTION</span>
              </div>
              <div className="font-display font-bold text-2xl text-emerald-400">
                {profile.avgRetentionBoost}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mb-1">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>EXPERIENCE</span>
              </div>
              <div className="font-display font-bold text-2xl text-white">
                {profile.yearsExperience}
              </div>
            </div>
          </div>
        </div>

        {/* The Two Portfolios Cards Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
          {/* Card 1: Long-Form Highlight */}
          <a
            href="#long-form"
            className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-amber-500/50 transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Film className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Featured Long-Form
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-800">
                {longForm.duration} • 16:9
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-300 transition-colors mb-2">
                {longForm.title}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-2">
                {longForm.subtitle} — {longForm.client}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs">
              <span className="text-zinc-500 font-mono">
                {longForm.stats.totalCuts} cuts • {longForm.stats.averageCutTime} pacing
              </span>
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>View Breakdown</span>
                <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </a>

          {/* Card 2: Short-Form Highlight */}
          <a
            href="#short-form"
            className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-rose-500/50 transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Video className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-rose-300 font-semibold">
                  Featured Short-Form
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-800">
                {shortForm.duration} • 9:16 Reel
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-display font-bold text-xl text-white group-hover:text-rose-300 transition-colors mb-2">
                {shortForm.title}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-2">
                {shortForm.subtitle} — {shortForm.client}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs">
              <span className="text-zinc-500 font-mono">
                {shortForm.stats.completionRate} completion • {shortForm.stats.views}
              </span>
              <span className="inline-flex items-center gap-1 text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>View Short-Form</span>
                <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </a>
        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#long-form"
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors py-2"
          >
            <span>SCROLL TO EXPLORE WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
