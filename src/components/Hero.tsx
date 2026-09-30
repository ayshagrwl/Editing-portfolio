import React from 'react';
import { EditorProfile, VideoProject } from '../types';
import { Film, Video, Eye, TrendingUp, Award, Play, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  profile: EditorProfile;
  longForm: VideoProject;
  shortForm: VideoProject;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, longForm, shortForm }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Delicate Light Gradient Ambient Mesh Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[460px] bg-gradient-to-b from-indigo-100/60 via-purple-50/40 to-transparent blur-[110px] pointer-events-none -z-10" />
      <div className="absolute top-16 right-10 w-96 h-96 bg-sky-100/70 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-32 left-10 w-96 h-96 bg-rose-100/60 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Minimalist Editorial Kicker (Unboxed metadata, no static pills) */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 font-mono mb-4">
          <span className="font-semibold text-slate-700 tracking-wider uppercase">
            VIDEO EDITOR
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>NARRATIVE & RETENTION</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-emerald-600 font-medium">{profile.availabilityText}</span>
        </div>

        {/* Minimalist High-Impact Headline with Light Gradient Accent */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-4">
            Pacing, sound, and story that{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              hook viewers
            </span>{' '}
            and hold retention.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* 4 Minimalist Stat Cards for Quick Scan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all">
            <div className="text-[11px] font-mono text-slate-500 mb-1 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              <span>TOTAL VIEWS</span>
            </div>
            <div className="font-display font-bold text-2xl text-slate-900">
              {profile.viewsGenerated}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all">
            <div className="text-[11px] font-mono text-slate-500 mb-1 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-violet-500" />
              <span>DELIVERED</span>
            </div>
            <div className="font-display font-bold text-2xl text-slate-900">
              {profile.videosEdited}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all">
            <div className="text-[11px] font-mono text-slate-500 mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>RETENTION LIFT</span>
            </div>
            <div className="font-display font-bold text-2xl text-emerald-600">
              {profile.avgRetentionBoost}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all">
            <div className="text-[11px] font-mono text-slate-500 mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>EXPERIENCE</span>
            </div>
            <div className="font-display font-bold text-2xl text-slate-900">
              {profile.yearsExperience}
            </div>
          </div>
        </div>

        {/* 2 Quick Review Work Launchers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Long-Form Launch */}
          <a
            href="#long-form"
            className="group relative rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-6px_rgba(99,102,241,0.12)] hover:border-indigo-200 transition-all flex flex-col justify-between"
          >
            {/* Subtle top gradient accent line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-mono font-medium text-indigo-600 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  01. Long-Form Documentary
                </span>
                <span className="font-mono text-slate-400">
                  {longForm.duration} · 16:9
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                {longForm.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                {longForm.client}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="font-mono text-slate-600">
                {longForm.stats.views} <span className="text-slate-300">·</span> {longForm.stats.retentionRate}
              </span>
              <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>View Cut</span>
                <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </a>

          {/* Card 2: Short-Form Launch */}
          <a
            href="#short-form"
            className="group relative rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-6px_rgba(236,72,153,0.12)] hover:border-pink-200 transition-all flex flex-col justify-between"
          >
            {/* Subtle top gradient accent line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-pink-500 to-rose-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-mono font-medium text-pink-600 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  02. Short-Form Viral Reel
                </span>
                <span className="font-mono text-slate-400">
                  {shortForm.duration} · 9:16
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-pink-600 transition-colors mb-1">
                {shortForm.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                {shortForm.client}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="font-mono text-slate-600">
                {shortForm.stats.views} <span className="text-slate-300">·</span> {shortForm.stats.completionRate}
              </span>
              <span className="inline-flex items-center gap-1 text-pink-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>View Reel</span>
                <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
