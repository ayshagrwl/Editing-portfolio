import React from 'react';
import { EditorProfile } from '../types';
import { Video, Film, Sparkles, Mail, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  profile: EditorProfile;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenCustomizer }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3.5 transition-all duration-300 backdrop-blur-xl bg-white/80 border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-500 flex items-center justify-center font-bold text-sm text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                {profile.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono hidden md:block">
              {profile.role}
            </p>
          </div>
        </a>

        {/* Minimalist Section Links (Clean typography, no chunky pill wrappers) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <a
            href="#long-form"
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
          >
            <Film className="w-3.5 h-3.5 text-violet-500" />
            <span>Long-Form (16:9)</span>
          </a>
          <a
            href="#short-form"
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-pink-500" />
            <span>Short-Form (9:16)</span>
          </a>
          <a
            href="#about-skills"
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Toolkit & About</span>
          </a>
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
            title="Edit portfolio text & video links"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:from-violet-700 hover:to-indigo-700 shadow-sm shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <span>Email Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
