import { FormEvent } from 'react';
import { Mail, Sparkles, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ setCurrentTab, onSubscribe }: FooterProps) {
  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem('footerEmail') as HTMLInputElement;
    if (emailInput && emailInput.value) {
      onSubscribe(emailInput.value);
      emailInput.value = '';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-theme text-white border-t border-dark-theme/20 py-16 px-6 sm:px-12 relative overflow-hidden">
      {/* Wave abstract background vector styling */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lavender-primary via-lavender-secondary to-rose-light"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Narrative */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif italic text-lg text-lavender-primary border border-white/20">
                S9
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                samevibe94
              </span>
            </div>
            
            <p className="text-sm text-light-theme/40 text-[#c2b9c7] leading-relaxed max-w-sm">
              Thoughts, stories, and lessons from everyday life. A responsive, cozy digital journal designed to rescue your attention span and help you live intentionally.
            </p>

            <div className="flex items-center gap-2 text-xs text-lavender-primary bg-white/5 py-1.5 px-3 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quiet reflections on Tuesdays and Fridays.</span>
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#BCA2BD] mb-4">Journey</h4>
              <ul className="space-y-2.5 text-sm text-[#ddd] font-sans">
                <li>
                  <button onClick={() => { setCurrentTab('home'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    Home Front
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab('blog'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    All Stories
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab('categories'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    Categories
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab('about'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    The Author
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#BCA2BD] mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-[#ddd] font-sans">
                <li>
                  <button onClick={() => { setCurrentTab('resources'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    Lead Magnets
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab('newsletter'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    Subscription
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab('contact'); window.scrollTo(0, 0); }} className="hover:text-lavender-primary transition-colors cursor-pointer text-left">
                    Say Hello
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter capture block */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#BCA2BD]">One thoughtful email a week</h4>
            <p className="text-xs text-[#c2b9c7] leading-relaxed">
              No spam. No commercial courses. Just reflections, reading suggestions, and psychological reminders designed to make your week better.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 relative mt-4">
              <input
                id="footer-email-input"
                name="footerEmail"
                type="email"
                required
                placeholder="Receive the next letter..."
                className="bg-white/10 focus:bg-white/15 text-white border border-white/20 focus:border-lavender-primary px-4 py-2.5 rounded-full text-xs outline-none w-full placeholder-white/40 transition-all font-sans"
              />
              <button
                id="footer-email-submit"
                type="submit"
                className="bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 shrink-0 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Join</span>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-[#a394ab] gap-4">
          <div className="flex items-center gap-1.5">
            <span>samevibe94 &copy; 2026. Made with</span>
            <Heart className="w-3.5 h-3.5 text-lavender-primary fill-lavender-primary" />
            <span>and intentionality. All rights integrity.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px]">WCAG AA COMPLIANT</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-lavender-primary hover:text-white transition-colors cursor-pointer font-sans"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
