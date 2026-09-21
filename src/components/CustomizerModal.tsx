import React, { useState } from 'react';
import { EditorProfile, VideoProject } from '../types';
import { X, Save, RotateCcw, Film, Video, User, Check } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: EditorProfile;
  longForm: VideoProject;
  shortForm: VideoProject;
  onSave: (updatedProfile: EditorProfile, updatedLongForm: VideoProject, updatedShortForm: VideoProject) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  longForm,
  shortForm,
  onSave,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'longForm' | 'shortForm'>('profile');
  const [savedNotice, setSavedNotice] = useState(false);

  // Local form state
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [yearsExperience, setYearsExperience] = useState(profile.yearsExperience);
  const [videosEdited, setVideosEdited] = useState(profile.videosEdited);
  const [viewsGenerated, setViewsGenerated] = useState(profile.viewsGenerated);

  // Long form state
  const [lfTitle, setLfTitle] = useState(longForm.title);
  const [lfClient, setLfClient] = useState(longForm.client);
  const [lfDuration, setLfDuration] = useState(longForm.duration);
  const [lfVideoUrl, setLfVideoUrl] = useState(longForm.videoUrl);

  // Short form state
  const [sfTitle, setSfTitle] = useState(shortForm.title);
  const [sfClient, setSfClient] = useState(shortForm.client);
  const [sfDuration, setSfDuration] = useState(shortForm.duration);
  const [sfVideoUrl, setSfVideoUrl] = useState(shortForm.videoUrl);

  if (!isOpen) return null;

  const handleSaveAll = () => {
    const updatedProfile: EditorProfile = {
      ...profile,
      name,
      role,
      email,
      bio,
      yearsExperience,
      videosEdited,
      viewsGenerated,
    };

    const updatedLongForm: VideoProject = {
      ...longForm,
      title: lfTitle,
      client: lfClient,
      duration: lfDuration,
      videoUrl: lfVideoUrl,
    };

    const updatedShortForm: VideoProject = {
      ...shortForm,
      title: sfTitle,
      client: sfClient,
      duration: sfDuration,
      videoUrl: sfVideoUrl,
    };

    onSave(updatedProfile, updatedLongForm, updatedShortForm);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Personalize Your Video Portfolio
            </h3>
            <p className="text-xs text-zinc-400">
              Update your name, bio, and video URLs (supports YouTube, Vimeo, or direct MP4 links).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/50 px-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Editor Info</span>
          </button>
          <button
            onClick={() => setActiveTab('longForm')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'longForm'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Long-Form Video</span>
          </button>
          <button
            onClick={() => setActiveTab('shortForm')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'shortForm'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Short-Form Video</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">PROFESSIONAL TITLE</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">CONTACT EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">SHORT BIO & VALUE PROPOSITION</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">EXPERIENCE</label>
                  <input
                    type="text"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">VIDEOS EDITED</label>
                  <input
                    type="text"
                    value={videosEdited}
                    onChange={(e) => setVideosEdited(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">VIEWS GENERATED</label>
                  <input
                    type="text"
                    value={viewsGenerated}
                    onChange={(e) => setViewsGenerated(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'longForm' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono mb-1">PROJECT TITLE</label>
                <input
                  type="text"
                  value={lfTitle}
                  onChange={(e) => setLfTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">CLIENT / CHANNEL NAME</label>
                  <input
                    type="text"
                    value={lfClient}
                    onChange={(e) => setLfClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">DURATION (e.g. 14:24)</label>
                  <input
                    type="text"
                    value={lfDuration}
                    onChange={(e) => setLfDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">
                  VIDEO SOURCE URL (YouTube URL, Vimeo URL, or MP4 URL)
                </label>
                <input
                  type="text"
                  value={lfVideoUrl}
                  onChange={(e) => setLfVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="https://www.youtube.com/watch?v=... or https://...video.mp4"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Tip: Supports standard YouTube links (e.g. https://youtu.be/xxx), Vimeo URLs, or any direct MP4 video link.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'shortForm' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono mb-1">SHORT-FORM TITLE</label>
                <input
                  type="text"
                  value={sfTitle}
                  onChange={(e) => setSfTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">CLIENT / CREATOR NAME</label>
                  <input
                    type="text"
                    value={sfClient}
                    onChange={(e) => setSfClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">DURATION (e.g. 00:48)</label>
                  <input
                    type="text"
                    value={sfDuration}
                    onChange={(e) => setSfDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">
                  VERTICAL VIDEO SOURCE URL (Direct MP4 URL)
                </label>
                <input
                  type="text"
                  value={sfVideoUrl}
                  onChange={(e) => setSfVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="https://...video.mp4"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  For phone framing, direct 9:16 portrait MP4s play seamlessly with custom controls.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Demo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black transition-colors shadow-md shadow-amber-500/20"
            >
              {savedNotice ? <Check className="w-3.5 h-3.5 text-black" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedNotice ? 'Saved!' : 'Save & Update'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
