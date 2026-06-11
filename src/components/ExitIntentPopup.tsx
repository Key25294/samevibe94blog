import { useState, useEffect, FormEvent } from 'react';
import { Mail, Sparkles, X, Check, BookOpen, Clock } from 'lucide-react';

interface ExitIntentPopupProps {
  onSubscribe: (email: string) => void;
}

export default function ExitIntentPopup({ onSubscribe }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed or seen this in this session
    const hasSeen = sessionStorage.getItem('samevibe_exit_popup_seen');
    if (hasSeen === 'true') return;

    const handleMouseLeave = (e: MouseEvent) => {
      // e.clientY < 20 triggers if customer mouse exits near the top URL address bar
      if (e.clientY < 20) {
        setIsOpen(true);
        sessionStorage.setItem('samevibe_exit_popup_seen', 'true');
      }
    };

    // Also fallback timer to engage after 45 seconds of peaceful reading
    const fallbackTimer = setTimeout(() => {
      const hasSeenFall = sessionStorage.getItem('samevibe_exit_popup_seen');
      if (!hasSeenFall) {
        setIsOpen(true);
        sessionStorage.setItem('samevibe_exit_popup_seen', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onSubscribe(email);
      setIsJoined(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-dark-theme/30 backdrop-blur-md fade-in">
      <div className="bg-blush-soft border border-rose-light w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative p-6 sm:p-8 space-y-6 text-center">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-light-theme hover:text-dark-theme hover:bg-rose-light/50 transition-colors cursor-pointer focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {isJoined ? (
          <div className="py-8 space-y-4 fade-in">
            <div className="w-12 h-12 rounded-full bg-lavender-primary/20 flex items-center justify-center mx-auto text-lavender-secondary">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-bold text-dark-theme">You are officially in.</h3>
              <p className="text-xs text-light-theme leading-relaxed">
                Check your inbox for your 30 Reflection Questions workbook template. Let's embark on this slower, intentional journey together.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5 fade-in py-1">
            <div className="w-12 h-12 rounded-full bg-lavender-primary/10 flex items-center justify-center mx-auto text-lavender-secondary">
              <BookOpen className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-[#A98AB0] font-bold uppercase">WAIT, KINDRED SOUL...</span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-dark-theme leading-tight">
                Before you step away into the noisy digital web...
              </h3>
              <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                We compiled our absolute best writing prompts into an exquisite workbook: <strong className="text-dark-theme">30 Reflection Questions for Deep Growth</strong>. Thousands of readers use it to find mental clarity weekly.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="bg-white p-4.5 rounded-2xl border border-rose-light shadow-sm space-y-3 text-left">
              <div>
                <label htmlFor="exit-email-input" className="block text-[10px] font-bold text-dark-theme uppercase tracking-wider mb-1 font-sans">CLAIM YOUR COMPLIMENTARY WORKBOOK</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 text-light-theme" />
                  <input
                    id="exit-email-input"
                    type="email"
                    required
                    placeholder="Where should we send your workbook?"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FBEDED]/50 hover:bg-[#FBEDED] border border-rose-light focus:border-lavender-secondary pl-10 pr-4 py-3 rounded-xl text-xs outline-none transition-all text-dark-theme placeholder-light-theme/50"
                  />
                </div>
              </div>

              <button
                id="btn-submit-exit-form"
                type="submit"
                className="w-full bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Add Me & Send PDF Prompts</span>
              </button>
            </form>

            <span className="block text-[10px] text-light-theme font-mono italic">
              No pressure. Cancel anytime with a single click. Respecting your attention.
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
