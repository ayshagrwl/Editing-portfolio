import React, { useState } from 'react';
import { EditorProfile, SoftwareSkill, WorkflowStep } from '../types';
import { 
  Sparkles, CheckCircle, Workflow, Cpu, Copy, Check, ArrowUpRight
} from 'lucide-react';

interface AboutAndSkillsProps {
  profile: EditorProfile;
  skills: SoftwareSkill[];
  workflow: WorkflowStep[];
}

export const AboutAndSkills: React.FC<AboutAndSkillsProps> = ({ profile, skills, workflow }) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'NLE / Editing', 'Color & Finish', 'Motion & VFX', 'Audio & SFX'];

  const filteredSkills = activeSkillCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeSkillCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about-skills" className="py-16 px-4 sm:px-6 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top: Minimalist Bio & Editor Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT & EDITING STANDARDS</span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Pacing is psychological. Every cut moves the needle.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              I'm <strong className="text-slate-900">{profile.name}</strong>, a video editor specializing in YouTube documentaries and viral short-form retention. Over {profile.yearsExperience}, my cuts have generated <strong className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{profile.viewsGenerated} views</strong> across {profile.videosEdited} projects.
            </p>

            {/* Quick Credibility Specs */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-mono text-slate-400">TURNAROUND</div>
                <div className="text-slate-900 font-bold text-xs sm:text-sm">24-48h <span className="text-[10px] text-slate-500 font-normal">Shorts</span></div>
                <div className="text-[10px] text-slate-500">4-6d Docs</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-mono text-slate-400">AUDIO SPEC</div>
                <div className="text-slate-900 font-bold text-xs sm:text-sm">-14 LUFS Clean</div>
                <div className="text-[10px] text-slate-500">iZotope RX</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-mono text-slate-400">DELIVERY</div>
                <div className="text-slate-900 font-bold text-xs sm:text-sm">Up to 4K DCI</div>
                <div className="text-[10px] text-slate-500">ProRes / H.265</div>
              </div>
            </div>
          </div>

          {/* Right Card: Editor Identity Mini Card (No form - direct quick actions) */}
          <div className="lg:col-span-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
              {/* Subtle light gradient background glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-indigo-100/60 to-purple-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-500 flex items-center justify-center font-bold text-lg text-white shadow-sm shadow-indigo-500/20">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-mono">
                    {profile.role}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    📍 {profile.location}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Availability</span>
                  <span className="text-emerald-700 font-mono font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {profile.availabilityText}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Email</span>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${profile.email}`} className="text-slate-900 hover:text-indigo-600 font-mono">
                      {profile.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Formats</span>
                  <span className="text-slate-700 font-mono">16:9 Long & 9:16 Short</span>
                </div>
              </div>

              <div className="mt-4 pt-1 flex gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm shadow-indigo-500/20"
                >
                  Direct Inquiry
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Software Arsenal & Tool Mastery */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                <span>TOOLKIT</span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                Software Arsenal
              </h3>
            </div>

            {/* Category Filter Tabs (Interactive filter controls) */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeSkillCategory === cat
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                    <span>{skill.category}</span>
                    <span className="text-indigo-600 font-semibold">{skill.badge}</span>
                  </div>

                  <h4 className="font-display font-bold text-base text-slate-900 mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-slate-400">Proficiency</span>
                    <span className="text-slate-800 font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: 4-Step Editing Pipeline */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <Workflow className="w-3.5 h-3.5 text-indigo-500" />
              <span>TRANSPARENT CLIENT PROCESS</span>
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">
              From Raw Footage to Viral Export
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs relative group hover:border-slate-300 transition-colors"
              >
                <div className="font-mono font-bold text-2xl text-indigo-600 mb-1">
                  {item.step}
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 mb-0.5">
                  {item.title}
                </h4>
                <div className="text-[11px] font-mono text-slate-500 mb-2">
                  {item.duration}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  {item.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
