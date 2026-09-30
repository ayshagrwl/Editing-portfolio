import React, { useState } from 'react';
import { EditorProfile, VideoProject } from './types';
import { 
  initialEditorProfile, 
  initialLongFormProject, 
  initialShortFormProject,
  softwareSkills,
  workflowSteps 
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LongFormShowcase } from './components/LongFormShowcase';
import { ShortFormShowcase } from './components/ShortFormShowcase';
import { AboutAndSkills } from './components/AboutAndSkills';
import { CustomizerModal } from './components/CustomizerModal';

export default function App() {
  const [profile, setProfile] = useState<EditorProfile>(() => {
    const saved = localStorage.getItem('editor_portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to initial
      }
    }
    return initialEditorProfile;
  });

  const [longForm, setLongForm] = useState<VideoProject>(() => {
    const saved = localStorage.getItem('editor_portfolio_long_form');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return initialLongFormProject;
  });

  const [shortForm, setShortForm] = useState<VideoProject>(() => {
    const saved = localStorage.getItem('editor_portfolio_short_form');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return initialShortFormProject;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const handleSaveCustomization = (
    updatedProfile: EditorProfile,
    updatedLongForm: VideoProject,
    updatedShortForm: VideoProject
  ) => {
    setProfile(updatedProfile);
    setLongForm(updatedLongForm);
    setShortForm(updatedShortForm);

    localStorage.setItem('editor_portfolio_profile', JSON.stringify(updatedProfile));
    localStorage.setItem('editor_portfolio_long_form', JSON.stringify(updatedLongForm));
    localStorage.setItem('editor_portfolio_short_form', JSON.stringify(updatedShortForm));
  };

  const handleResetToDemo = () => {
    localStorage.removeItem('editor_portfolio_profile');
    localStorage.removeItem('editor_portfolio_long_form');
    localStorage.removeItem('editor_portfolio_short_form');

    setProfile(initialEditorProfile);
    setLongForm(initialLongFormProject);
    setShortForm(initialShortFormProject);
    setIsCustomizerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 selection:bg-violet-500 selection:text-white relative">
      {/* Navigation Bar */}
      <Navbar
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          longForm={longForm}
          shortForm={shortForm}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Long-Form Showcase (16:9) */}
        <LongFormShowcase
          project={longForm}
        />

        {/* Short-Form Showcase (9:16) */}
        <ShortFormShowcase
          project={shortForm}
        />

        {/* About, Software Toolkit & 4-Step Pipeline */}
        <AboutAndSkills
          profile={profile}
          skills={softwareSkills}
          workflow={workflowSteps}
        />
      </main>

      {/* Minimalist Footer without contact form */}
      <footer className="py-10 px-4 sm:px-6 border-t border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-slate-900 text-sm">
              {profile.name}
            </span>
            <span className="text-slate-400 font-mono">
              · {profile.role}
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-indigo-600 transition-colors font-mono"
            >
              {profile.email}
            </a>
            {profile.socials?.twitter && (
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                Twitter / X
              </a>
            )}
            {profile.socials?.youtube && (
              <a
                href={profile.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* Customizer Drawer / Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        longForm={longForm}
        shortForm={shortForm}
        onSave={handleSaveCustomization}
        onReset={handleResetToDemo}
      />
    </div>
  );
}
