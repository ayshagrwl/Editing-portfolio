import React, { useState } from 'react';
import { EditorProfile, SoftwareSkill, WorkflowStep } from '../types';
import { 
  Sparkles, CheckCircle, Award, Workflow, MessageSquareQuote, 
  Layers, Sliders, Cpu, ArrowRight, ShieldCheck, HeartHandshake
} from 'lucide-react';

interface AboutAndSkillsProps {
  profile: EditorProfile;
  skills: SoftwareSkill[];
  workflow: WorkflowStep[];
}

export const AboutAndSkills: React.FC<AboutAndSkillsProps> = ({ profile, skills, workflow }) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  const categories = ['All', 'NLE / Editing', 'Color & Finish', 'Motion & VFX', 'Audio & SFX'];

  const filteredSkills = activeSkillCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeSkillCategory);

  return (
    <section id="about-skills" className="py-20 px-4 sm:px-6 border-b border-zinc-800/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top: About Narrative & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BASIC INFO & EDITING PHILOSOPHY</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              A story isn't told by the raw footage. It's built in the timeline.
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Hi, I'm <strong className="text-white">{profile.name}</strong>. Over the last {profile.yearsExperience}, I've edited {profile.videosEdited} videos generating {profile.viewsGenerated} views across YouTube, short-form algorithms, and commercial broadcasts.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              My philosophy centers on <em>Narrative Flow & Invisible Pacing</em>: An audience never drops off because of video length — they drop off when visual momentum stalls. By pairing rhythmic pattern interrupts with psychological sound design and film-grade color grading, every cut feels purposeful and effortless.
            </p>

            {/* Credibility highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs font-mono text-zinc-400 mb-1">TURNAROUND</div>
                <div className="text-white font-bold text-sm">24-48h (Shorts)</div>
                <div className="text-[11px] text-zinc-500">4-6d (Documentary)</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs font-mono text-zinc-400 mb-1">AUDIO SPEC</div>
                <div className="text-white font-bold text-sm">-14 LUFS Clean</div>
                <div className="text-[11px] text-zinc-500">iZotope de-noised</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs font-mono text-zinc-400 mb-1">RESOLUTION</div>
                <div className="text-white font-bold text-sm">Up to 4K DCI</div>
                <div className="text-[11px] text-zinc-500">ProRes / H.265</div>
              </div>
            </div>
          </div>

          {/* Right Card: Editor Identity Profile Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-black border border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-amber-500/20">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-mono">
                    {profile.role}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    📍 {profile.location}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Availability</span>
                  <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {profile.availabilityText}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Direct Contact</span>
                  <a href={`mailto:${profile.email}`} className="text-white hover:text-amber-400 font-mono">
                    {profile.email}
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Specialty Formats</span>
                  <span className="text-zinc-200 font-mono">16:9 Long & 9:16 Short</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400">Client Retention Lift</span>
                  <span className="text-emerald-400 font-mono font-bold">{profile.avgRetentionBoost} Average</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#contact"
                  className="block w-full text-center py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors border border-zinc-700/80"
                >
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Software Arsenal & Tool Mastery */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>TECHNICAL CAPABILITIES</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Software & Tool Arsenal
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activeSkillCategory === cat
                      ? 'bg-amber-400 text-black font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {skill.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {skill.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white mb-1.5">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="text-zinc-500">Mastery</span>
                    <span className="text-white font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-zinc-500 italic">
                    Best for: {skill.featuredFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: 4-Step Editing Pipeline */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
              <Workflow className="w-3.5 h-3.5 text-emerald-400" />
              <span>TRANSPARENT CLIENT PIPELINE</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              How We Work Together From Raw A-Roll to Viral Export
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 relative group hover:border-zinc-700 transition-colors"
              >
                <div className="font-mono font-black text-3xl text-zinc-700 group-hover:text-amber-500/50 transition-colors mb-2">
                  {item.step}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-bold text-sm text-white">
                    {item.title}
                  </h4>
                </div>
                <span className="inline-block text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded mb-3">
                  {item.duration}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-zinc-800/80 space-y-1">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Deliverables:</div>
                  {item.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Endorsement Quote */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed">
              "Ayush is the rare editor who doesn't just cut clips—he truly understands story retention mechanics. Our average watch time jumped from 4:10 to 7:45 in just 3 videos, directly fueling our channel's 200K subscriber growth."
            </p>
            <div className="text-xs font-mono text-zinc-400 pt-1">
              — <span className="text-white font-bold">Marcus Vance</span>, Executive Producer at FutureBuilt Media
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
