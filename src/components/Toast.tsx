import { useEffect } from 'react';
import { Sparkles, CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClear: () => void;
}

export default function Toast({ message, onClear }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClear();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce sm:animate-none flex items-center gap-3 bg-dark-theme text-white px-5 py-4.5 rounded-2xl shadow-2xl border border-white/10 max-w-sm fade-in">
      <div className="w-6 h-6 rounded-full bg-lavender-secondary/20 flex items-center justify-center text-lavender-primary">
        <Sparkles className="w-4 h-4 fill-lavender-primary" />
      </div>
      
      <div className="flex-1 text-xs font-sans leading-relaxed text-[#eee]">
        {message}
      </div>

      <button
        onClick={onClear}
        className="p-1 text-[#aaa] hover:text-white rounded-md transition-colors cursor-pointer"
        title="Dismiss notice"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
