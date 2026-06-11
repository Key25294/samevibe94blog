import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  ArrowLeft, Calendar, Clock, Bookmark, Share2, Heart, 
  MessageSquare, Send, Sparkles, AlertCircle, Copy, Check 
} from 'lucide-react';
import { Post, Comment } from '../types';

interface ArticleViewProps {
  post: Post;
  relatedPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
  onSubscribe: (email: string) => void;
  onTriggerToast: (msg: string) => void;
}

export default function ArticleView({ 
  post, relatedPosts, onBack, onSelectPost, onSubscribe, onTriggerToast 
}: ArticleViewProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [likesCount, setLikesCount] = useState(14);
  const [hasLiked, setHasLiked] = useState(false);
  const [inlineEmail, setInlineEmail] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isTacked, setIsTacked] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setComments(post.comments || []);
    setLikesCount(Math.floor(Math.random() * 40) + 20);
    setHasLiked(false);
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
      onTriggerToast('Saved your quiet appreciation for this piece.');
    }
    setHasLiked(!hasLiked);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    onTriggerToast('Link copied to clipboard! Share with a kindred soul.');
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      const newComment: Comment = {
        id: Math.random().toString(),
        author: commentName.trim(),
        text: commentText.trim(),
        date: 'Just now',
        avatarColor: ['bg-lavender-primary', 'bg-lavender-secondary', 'bg-dark-theme'][Math.floor(Math.random() * 3)]
      };
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      setCommentName('');
      setCommentText('');
      onTriggerToast('Comment posted! Thank you for sharing your thoughts.');
    }
  };

  const handleInlineSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (inlineEmail.includes('@')) {
      onSubscribe(inlineEmail);
      setInlineEmail('');
      setIsTacked(true);
    }
  };

  return (
    <div className="min-h-screen bg-blush-soft pb-20" ref={topRef}>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-20 left-0 right-0 h-1 bg-rose-light/40 z-30 pointer-events-none"
      >
        <div 
          className="h-full bg-gradient-to-r from-lavender-secondary to-lavender-primary transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-light-theme hover:text-dark-theme transition-colors cursor-pointer mb-8 focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Stories</span>
        </button>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT CHANNELS: Share Rail and Table of Contents (Sticky on Desktop) */}
          <div className="lg:col-span-3 lg:sticky lg:top-36 space-y-8 hidden lg:block">
            
            {/* Writer Portfolio Card */}
            <div className="bg-white/80 border border-rose-light rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lavender-primary/10 flex items-center justify-center font-serif text-sm font-semibold text-lavender-secondary border border-rose-light">
                  {post.author.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark-theme">{post.author.name}</h4>
                  <span className="block text-[10px] text-light-theme font-semibold">{post.author.role}</span>
                </div>
              </div>
              <p className="text-xs text-light-theme leading-relaxed">
                {post.author.bio}
              </p>
            </div>

            {/* Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-lavender-secondary">Inside this Note</h4>
                <ul className="space-y-2.5 font-serif text-xs">
                  {post.tableOfContents.map((item, idx) => (
                    <li key={idx} className="group">
                      <a 
                        href={`#${item.id}`} 
                        className="text-light-theme hover:text-lavender-secondary flex items-start gap-1.5 transition-colors leading-relaxed"
                      >
                        <span className="text-[#A98AB0] italic font-semibold">{idx+1}.</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Micro Interaction Engagement Side block */}
            <div className="border border-rose-light/80 p-5 rounded-2xl space-y-4 bg-white/40">
              <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-light-theme">ENGAGE</h4>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 text-xs font-semibold p-2.5 rounded-full border transition-all ${
                    hasLiked ? 'bg-rose-light border-lavender-secondary/40 text-lavender-secondary' : 'bg-white border-rose-light text-light-theme hover:text-dark-theme'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-lavender-secondary text-lavender-secondary' : ''}`} />
                  <span>{likesCount} Likes</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-semibold p-2.5 bg-white border border-rose-light rounded-full text-light-theme hover:text-dark-theme transition-all"
                  title="Share to clipboard"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* MAIN ARTICLE AREA */}
          <article className="lg:col-span-9 bg-white border border-rose-light rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            
            {/* Meta context Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="bg-[#FBEDED] text-lavender-secondary border border-rose-light font-bold text-[10px] uppercase font-mono px-3 py-1 rounded-full">
                  {post.category}
                </span>
                
                <div className="flex items-center gap-1.5 text-light-theme font-mono text-[11px] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-light-theme font-mono text-[11px] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-theme leading-tight tracking-tight">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-light-theme italic leading-relaxed border-l-2 border-lavender-primary pl-4 py-1">
                "{post.excerpt}"
              </p>
            </div>

            {/* Editorial Cover Pattern representation */}
            <div className={`w-full h-48 sm:h-64 rounded-2xl bg-gradient-to-tr ${post.coverStyle.bgGradient} border border-rose-light flex items-center justify-center relative overflow-hidden`}>
              {/* Organic procedural drawings inside representation */}
              <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                {post.coverStyle.patternType === 'waves' && (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-lavender-secondary stroke-[0.3]">
                    <path d="M 0,50 Q 25,30 50,50 T 100,50 M 0,60 Q 25,40 50,60 T 100,60 M 0,70 Q 25,50 50,70 T 100,70" />
                  </svg>
                )}
                {post.coverStyle.patternType === 'circles' && (
                  <div className="w-48 h-48 rounded-full border border-lavender-secondary border-dashed animate-spin" style={{ animationDuration: '60s' }}></div>
                )}
                {post.coverStyle.patternType === 'blobs' && (
                  <div className="w-72 h-48 bg-lavender-primary rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] mix-blend-multiply filter blur-sm"></div>
                )}
                {post.coverStyle.patternType === 'stripes' && (
                  <div className="w-full h-full flex flex-col justify-between p-4">
                    {[...Array(6)].map((_, i) => <div key={i} className="h-[1px] bg-lavender-secondary/40 w-full"></div>)}
                  </div>
                )}
              </div>
              
              <div className="text-center z-10 px-4">
                <span className="font-serif italic font-bold text-5xl sm:text-6xl text-lavender-secondary/30 selection:bg-transparent">
                  S9
                </span>
              </div>
            </div>

            {/* Mobile Column view author block */}
            <div className="flex items-center gap-3 py-4 border-y border-rose-light lg:hidden">
              <div className="w-10 h-10 rounded-full bg-lavender-primary/10 flex items-center justify-center font-serif text-xs font-semibold text-lavender-secondary border border-rose-light">
                {post.author.avatar}
              </div>
              <div>
                <h4 className="text-xs font-bold text-dark-theme">{post.author.name}</h4>
                <p className="text-[10px] text-light-theme">{post.author.role}</p>
              </div>
            </div>

            {/* Actual Article Paragraphs */}
            <div className="font-sans text-dark-theme text-sm sm:text-base leading-relaxed space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-justify font-sans leading-relaxed text-[#514957]" id={i === 0 ? 'intro' : i === 1 ? 'overloaded' : i === 2 ? 'what-is-unlearning' : i === 3 ? 'how-to' : undefined}>
                  {para}
                </p>
              ))}
            </div>

            {/* Tags footer */}
            <div className="pt-6 border-t border-rose-light flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="text-[10px] font-semibold text-light-theme bg-[#F4E8EA]/40 px-2.5 py-1 rounded-md font-sans border border-rose-light/50">
                  #{tag}
                </span>
              ))}
            </div>

            {/* INLINE Newsletter Content Upgrade Block (CRO Strategist Special) */}
            <div className="bg-[#FBEDED] border border-lavender-primary/30 p-6 sm:p-8 rounded-2xl relative overflow-hidden text-center sm:text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-lavender-primary/10 rounded-full filter blur-xl"></div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-lavender-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-lavender-secondary" />
                </div>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-dark-theme">Enjoying Sameer's perspective?</h3>
                    <p className="text-xs text-light-theme leading-relaxed">
                      Join 10,000+ subscriber circles who receive one slow, thoughtful letter every Friday on living deeply and thinking clearly in a noisy world.
                    </p>
                  </div>
                  
                  {isTacked ? (
                    <div className="flex items-center gap-2 text-xs text-lavender-secondary font-bold font-sans">
                      <Check className="w-4 h-4 bg-lavender-primary/20 rounded-full p-0.5" />
                      <span>Thank you. Your email is registered for our quiet updates.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleInlineSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                      <input
                        id="inline-article-email"
                        type="email"
                        placeholder="Receive the next reflection..."
                        required
                        value={inlineEmail}
                        onChange={(e) => setInlineEmail(e.target.value)}
                        className="bg-white/80 border border-rose-light focus:border-lavender-secondary px-4 py-2 rounded-full text-xs outline-none w-full font-sans shadow-inner placeholder-light-theme/50"
                      />
                      <button
                        id="inline-article-submit"
                        type="submit"
                        className="bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold px-5 py-2 rounded-full shadow-sm transition-all shrink-0 cursor-pointer text-center"
                      >
                        Subscribe Free
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* COMMENT SECTION */}
            <div className="pt-8 border-t border-rose-light space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-dark-theme flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-lavender-secondary" />
                  <span>Reflections & Comments ({comments.length})</span>
                </h3>
                <span className="text-[10px] text-light-theme font-mono">COURTEOUS DISCOURSE COMPASS</span>
              </div>

              {/* Add comment form */}
              <form onSubmit={handleCommentSubmit} className="bg-[#F4E8EA]/30 border border-rose-light p-5 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-dark-theme mb-1.5">Pen Name / Display Name</label>
                    <input
                      id="comment-author-name"
                      type="text"
                      placeholder="e.g., Clara"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full bg-white border border-rose-light focus:border-lavender-secondary px-4 py-2.5 rounded-full text-xs outline-none font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-dark-theme mb-1.5">Your thoughtful reaction</label>
                  <textarea
                    id="comment-body-text"
                    rows={3}
                    placeholder="Contribute your experience or quiet observation..."
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-white border border-rose-light focus:border-lavender-secondary px-4 py-3 rounded-xl text-xs outline-none font-sans resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    id="comment-submit-btn"
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Publish Reflection</span>
                  </button>
                </div>
              </form>

              {/* Comments stream list representing community interactions */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-6 text-xs text-light-theme italic">
                    The conversation stream is empty. Be the first to leave a gentle observation.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                    {comments.map((comment, index) => (
                      <div key={comment.id} className="bg-white/50 border border-rose-light p-4 rounded-xl space-y-2 text-left fade-in">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${comment.avatarColor || 'bg-lavender-secondary'} flex items-center justify-center text-white font-serif text-[10px] font-bold uppercase`}>
                              {comment.author.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-dark-theme">{comment.author}</span>
                          </div>
                          <span className="text-[10px] text-light-theme font-mono">{comment.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#514957] font-sans leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </article>

        </div>

        {/* RELATED / RECOMMENDED ARTICLES GRID (CRO Optimization Rule) */}
        <div className="mt-20 border-t border-rose-light pt-12 space-y-6">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-dark-theme">Keep Reading</h3>
            <span className="text-xs text-lavender-secondary font-semibold font-mono">SUGGESTED PIECES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((item) => (
              <button
                id={`related-card-art-${item.id}`}
                key={item.id}
                onClick={() => onSelectPost(item)}
                className="bg-white border border-rose-light p-5 rounded-2xl hover:border-lavender-secondary/30 transition-all shadow-sm hover:shadow text-left space-y-4 flex flex-col justify-between group cursor-pointer focus:outline-none"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                    <span className="text-[#A98AB0]">{item.category}</span>
                    <span className="text-light-theme">{item.readingTime}</span>
                  </div>
                  
                  <h4 className="font-serif text-sm font-semibold text-dark-theme group-hover:text-lavender-secondary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  
                  <p className="text-xs text-light-theme line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-lavender-secondary group-hover:text-lavender-primary pt-2">
                  <span>Read Reflection</span>
                  <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
