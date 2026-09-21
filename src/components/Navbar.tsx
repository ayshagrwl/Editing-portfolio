import React from 'react';
import { EditorProfile } from '../types';
import { Video, Film, Sparkles, Mail, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  profile: EditorProfile;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenCustomizer }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 backdrop-blur-md bg-[#090b0e]/85 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                {profile.name}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                Available
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono hidden md:block">
              {profile.role}
            </p>
          </div>
        </a>

        {/* Section Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 rounded-full px-3 py-1.5 shadow-inner">
          <a
            href="#long-form"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Long-Form Edit</span>
          </a>
          <a
            href="#short-form"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>Short-Form Edit</span>
          </a>
          <a
            href="#about-skills"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>About & Toolkit</span>
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book / Contact</span>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/80 transition-all hover:text-white cursor-pointer"
            title="Customize your portfolio details"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
