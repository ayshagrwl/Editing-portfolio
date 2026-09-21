import React, { useState } from 'react';
import { EditorProfile } from '../types';
import { 
  Mail, Send, CheckCircle2, Copy, Check, Calendar, 
  ArrowUp, Sparkles, ExternalLink, MessageCircle
} from 'lucide-react';

interface ContactSectionProps {
  profile: EditorProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '16:9 Long-Form Documentary / YouTube',
    budget: '$1,500 - $3,000',
    footageLink: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Trigger success feedback
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDiscord = () => {
    if (profile.socials.discord) {
      navigator.clipboard.writeText(profile.socials.discord);
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S BUILD SOMETHING VIRAL</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Ready to scale your watch time and retention?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Send your footage link or project brief below. I typically respond within 12 hours with a timeline assessment and estimated quote.
          </p>
        </div>

        {/* Contact Form & Direct Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-zinc-900/70 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Inquiry Received!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. I've noted your interest in <strong className="text-amber-400">{formData.projectType}</strong>. I'll review your project details and follow up via <span className="text-white">{formData.email}</span> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: '16:9 Long-Form Documentary / YouTube',
                        budget: '$1,500 - $3,000',
                        footageLink: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700/80 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@creator.co"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700/80 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      PROJECT FORMAT
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="16:9 Long-Form Documentary / YouTube">16:9 Long-Form Documentary</option>
                      <option value="9:16 Short-Form Pack (10-30 Reels)">9:16 Short-Form Pack (Reels/Shorts)</option>
                      <option value="Monthly Full-Service Retainer">Monthly Full-Service Retainer</option>
                      <option value="One-Time Commercial / Ad">One-Time Commercial / Ad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      ESTIMATED BUDGET
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="$500 - $1,500">$500 - $1,500 (Individual Video)</option>
                      <option value="$1,500 - $3,000">$1,500 - $3,000 (Multi-Video Pack)</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000 (Full Retainer)</option>
                      <option value="$5,000+">$5,000+ (High-End Production)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    RAW FOOTAGE / CHANNEL LINK (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/drive/... or YouTube channel"
                    value={formData.footageLink}
                    onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700/80 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    PROJECT GOALS & PACING PREFERENCES
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your channel style, target watch time, desired turnaround date, and any reference editors or creators you admire..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700/80 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Booking */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Contact Box */}
            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
              <h3 className="font-display font-bold text-lg text-white">
                Direct Communication
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Prefer to chat directly or skip the form? Reach out directly via email, discord, or book a 15-minute video sync.
              </p>

              {/* Email Copy Card */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500">PRIMARY EMAIL</div>
                    <div className="text-xs font-semibold text-white">{profile.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Discord Copy Card */}
              {profile.socials.discord && (
                <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500">DISCORD HANDLE</div>
                      <div className="text-xs font-semibold text-white">{profile.socials.discord}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyDiscord}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    title="Copy Discord handle"
                  >
                    {copiedDiscord ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Calendly Booking Card */}
              <a
                href={profile.socials.calendly || "https://calendly.com"}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30 flex items-center justify-between hover:border-amber-500/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-400 text-black">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-amber-300">CALENDLY 15-MIN CALL</div>
                    <div className="text-xs font-semibold text-white">Schedule Timeline & Project Kickoff</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
              </a>
            </div>

            {/* Turnaround & SLA Commitments */}
            <div className="p-5 rounded-2xl bg-black/40 border border-zinc-800/80 space-y-2 text-xs">
              <div className="font-mono text-zinc-400 font-bold mb-2">MY CLIENT COMMITMENTS</div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>2 Free Revision Rounds included with every edit</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Full Stem audio delivery (Music, SFX, Dialogue separated)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Color-managed DaVinci render with zero banding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">{profile.name}</span>
            <span>• Video Editor & Narrative Architect</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#hero" className="flex items-center gap-1 hover:text-white transition-colors">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
