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
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200/90 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Personalize Your Video Portfolio
            </h3>
            <p className="text-xs text-slate-500">
              Update your name, bio, and video URLs (supports YouTube, Vimeo, or direct MP4 links).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 bg-slate-50/30 px-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Editor Info</span>
          </button>
          <button
            onClick={() => setActiveTab('longForm')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'longForm'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Long-Form Video</span>
          </button>
          <button
            onClick={() => setActiveTab('shortForm')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'shortForm'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
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
                  <label className="block text-slate-600 font-mono mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-mono mb-1">PROFESSIONAL TITLE</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-mono mb-1">CONTACT EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-mono mb-1">SHORT BIO & VALUE PROPOSITION</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-mono mb-1">EXPERIENCE</label>
                  <input
                    type="text"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-mono mb-1">VIDEOS EDITED</label>
                  <input
                    type="text"
                    value={videosEdited}
                    onChange={(e) => setVideosEdited(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-mono mb-1">VIEWS GENERATED</label>
                  <input
                    type="text"
                    value={viewsGenerated}
                    onChange={(e) => setViewsGenerated(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'longForm' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-mono mb-1">PROJECT TITLE</label>
                <input
                  type="text"
                  value={lfTitle}
                  onChange={(e) => setLfTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-mono mb-1">CLIENT / CHANNEL NAME</label>
                  <input
                    type="text"
                    value={lfClient}
                    onChange={(e) => setLfClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-mono mb-1">DURATION (e.g. 14:24)</label>
                  <input
                    type="text"
                    value={lfDuration}
                    onChange={(e) => setLfDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-mono mb-1">
                  VIDEO SOURCE URL (YouTube URL, Vimeo URL, or MP4 URL)
                </label>
                <input
                  type="text"
                  value={lfVideoUrl}
                  onChange={(e) => setLfVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  placeholder="https://www.youtube.com/watch?v=... or https://...video.mp4"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Supports YouTube links, Vimeo URLs, or any direct MP4 video link.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'shortForm' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-mono mb-1">SHORT-FORM TITLE</label>
                <input
                  type="text"
                  value={sfTitle}
                  onChange={(e) => setSfTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-mono mb-1">CLIENT / CREATOR NAME</label>
                  <input
                    type="text"
                    value={sfClient}
                    onChange={(e) => setSfClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-mono mb-1">DURATION (e.g. 00:48)</label>
                  <input
                    type="text"
                    value={sfDuration}
                    onChange={(e) => setSfDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-mono mb-1">
                  VERTICAL VIDEO SOURCE URL (Direct MP4 URL)
                </label>
                <input
                  type="text"
                  value={sfVideoUrl}
                  onChange={(e) => setSfVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                  placeholder="https://...video.mp4"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  For phone framing, direct 9:16 portrait MP4s play seamlessly with custom controls.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Demo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-all shadow-sm shadow-indigo-500/20 cursor-pointer"
            >
              {savedNotice ? <Check className="w-3.5 h-3.5 text-white" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedNotice ? 'Saved!' : 'Save & Update'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
