import { useState, FormEvent } from 'react';
import { Mail, Sparkles, Check, Download, FileText, Calendar, Compass, ArrowLeft, ArrowRight } from 'lucide-react';
import { LeadMagnet } from '../types';

interface LeadMagnetViewProps {
  magnet: LeadMagnet;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

export default function LeadMagnetView({ magnet, onClose, onSubscribe }: LeadMagnetViewProps) {
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onSubscribe(email);
      setIsUnlocked(true);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSectionIndex(index);
    setTimeout(() => setCopiedSectionIndex(null), 2000);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return <FileText className="w-10 h-10 text-lavender-secondary bg-lavender-primary/10 p-2.5 rounded-2xl" />;
      case 'Calendar': return <Calendar className="w-10 h-10 text-lavender-secondary bg-lavender-primary/10 p-2.5 rounded-2xl" />;
      default: return <Compass className="w-10 h-10 text-lavender-secondary bg-lavender-primary/10 p-2.5 rounded-2xl" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-dark-theme/30 backdrop-blur-md fade-in">
      <div className="bg-blush-soft border border-rose-light w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-rose-light bg-white/80 backdrop-blur-sm sticky top-0 z-10 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-light-theme hover:text-dark-theme transition-colors cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#A98AB0] border border-rose-light px-2.5 py-1 rounded-full bg-rose-light/20">
              {magnet.badge}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {!isUnlocked ? (
            /* locked state screen */
            <div className="max-w-md mx-auto text-center space-y-6 py-6 fade-in">
              <div className="flex justify-center">{getIcon(magnet.iconName)}</div>
              
              <div className="space-y-2">
                <span className="text-[11px] font-mono tracking-widest text-lavender-secondary font-bold uppercase">{magnet.premiumLabel}</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-dark-theme tracking-tight">{magnet.title}</h3>
                <p className="text-sm text-light-theme leading-relaxed">{magnet.description}</p>
              </div>

              {/* Unlock Form */}
              <form onSubmit={handleUnlock} className="bg-white p-5 rounded-2xl border border-rose-light shadow-sm space-y-3.5">
                <div className="text-left">
                  <label htmlFor="unlock-email" className="block text-xs font-semibold text-dark-theme mb-1.5 font-sans">Enter your email to unlock immediate download:</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 text-light-theme" />
                    <input
                      id="unlock-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-blush-soft/50 hover:bg-blush-soft border border-rose-light focus:border-lavender-secondary pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all text-dark-theme placeholder-light-theme/50"
                    />
                  </div>
                </div>

                <button
                  id="btn-unlock-lead"
                  type="submit"
                  className="w-full bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock Personal Copy (Free)</span>
                </button>
              </form>

              {/* Trust badges */}
              <div className="flex justify-center items-center gap-6 pt-2 text-[10px] text-light-theme font-semibold">
                <span className="flex items-center gap-1"><Check className="w-3 text-lavender-secondary" /> Instant Screen Unlock</span>
                <span className="flex items-center gap-1"><Check className="w-3 text-lavender-secondary" /> Lifetime PDF Updates</span>
              </div>
            </div>
          ) : (
            /* unlocked view: actual printable workbook worksheets! */
            <div className="space-y-6 fade-in">
              <div className="border border-lavender-secondary/40 bg-gradient-to-tr from-white to-rose-light/20 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs text-lavender-secondary font-bold font-mono">
                  <Check className="w-4 h-4 bg-lavender-primary/10 rounded-full p-0.5" />
                  <span>UNLOCKED & GENERATED SUCCESSFULY</span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-dark-theme">{magnet.contentTitle}</h4>
                <p className="text-xs text-light-theme">
                  You can now copy individual reflection sections below or load them directly into your journal. A printable backup template has been configured for email <strong className="text-dark-theme">{email}</strong>.
                </p>
                
                <button
                  id="btn-export-magnet"
                  onClick={() => {
                    const contentString = magnet.contentSections.map(s => `${s.title}\n` + s.items.map(i => ` - ${i}`).join('\n')).join('\n\n');
                    copyToClipboard(contentString, 999);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold rounded-lg shadow-sm transition-all text-left"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedSectionIndex === 999 ? 'Copied Entire Workbook!' : 'Copy Entire Workbook'}</span>
                </button>
              </div>

              {/* Printable Journal Leaflets */}
              <div className="space-y-6">
                {magnet.contentSections.map((sec, idx) => (
                  <div key={idx} className="bg-white border border-rose-light rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm relative group hover:border-lavender-secondary/30 transition-all">
                    <div className="flex items-center justify-between pb-2 border-b border-rose-light">
                      <h5 className="font-serif text-sm font-semibold text-dark-theme flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-rose-light flex items-center justify-center font-serif text-[10px] text-lavender-secondary">{idx + 1}</span>
                        {sec.title}
                      </h5>
                      <button
                        onClick={() => copyToClipboard(sec.items.join('\n'), idx)}
                        className="text-[10px] font-semibold text-lavender-secondary hover:text-lavender-primary border border-rose-light px-2.5 py-1 rounded-md bg-blush-soft/40 cursor-pointer"
                      >
                        {copiedSectionIndex === idx ? 'Copied Segment!' : 'Copy Section'}
                      </button>
                    </div>

                    <ul className="space-y-3">
                      {sec.items.map((item, idy) => (
                        <li key={idy} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-lavender-secondary mt-1.5 shrink-0"></span>
                          <span className="text-xs sm:text-sm text-dark-theme font-sans leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-rose-light text-dark-theme text-xs font-semibold rounded-full hover:bg-rose-light/80 transition-all cursor-pointer"
                >
                  Close & Continue Reading Articles
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
