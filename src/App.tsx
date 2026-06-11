import { useState, useEffect, FormEvent } from 'react';
import { 
  Compass, Brain, Maximize2, Sparkles, Paintbrush, Heart, 
  ArrowRight, ChevronRight, Mail, FileText, Calendar, 
  Activity, ShieldAlert, Check, CheckCircle, MessageSquare, 
  Send, Star, Search, Rss, ArrowLeft, Loader2, RefreshCw 
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArticleView from './components/ArticleView';
import LeadMagnetView from './components/LeadMagnetView';
import ExitIntentPopup from './components/ExitIntentPopup';
import Toast from './components/Toast';

import { Post, Category, LeadMagnet } from './types';
import { POSTS, CATEGORIES, LEAD_MAGNETS, TESTIMONIALS, TRUST_POINTS } from './data';

export default function App() {
  // Core Navigation
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filtering states on blog tab
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Interactive local states
  const [subscribersCount, setSubscribersCount] = useState<number>(10248);
  const [subscriberEmail, setSubscriberEmail] = useState<string>('');
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  
  // Newsletter specific form
  const [newsLetterFormEmail, setNewsLetterFormEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Active Lead Magnet for detail download popups
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);

  // Contact form submission
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactType, setContactType] = useState<string>('Saying Hello');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hydrate subscription count and check historical status
  useEffect(() => {
    const historicalEmails = localStorage.getItem('samevibe94_subscribers');
    if (historicalEmails) {
      const list = JSON.parse(historicalEmails);
      setSubscribersCount(10248 + list.length);
    }
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
  };

  const handleSubscribe = (email: string) => {
    if (!email.trim() || !email.includes('@')) return;
    
    const historical = localStorage.getItem('samevibe94_subscribers');
    let list = historical ? JSON.parse(historical) : [];
    
    if (list.includes(email)) {
      triggerToast("Welcome back! You are already subscribed to samevibe94.");
      return;
    }

    list.push(email);
    localStorage.setItem('samevibe94_subscribers', JSON.stringify(list));
    setSubscribersCount(10248 + list.length);
    setHasSubscribed(true);
    setNewsletterSubscribed(true);
    triggerToast("✨ Welcome to the circle! A gentle confirmation letter has been dispatched.");
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      const msgObject = {
        name: contactName,
        email: contactEmail,
        type: contactType,
        message: contactMessage,
        date: new Date().toLocaleDateString()
      };

      const historical = localStorage.getItem('samevibe94_contact_messages');
      let list = historical ? JSON.parse(historical) : [];
      list.push(msgObject);
      localStorage.setItem('samevibe94_contact_messages', JSON.stringify(list));

      setContactSubmitted(true);
      triggerToast("📬 Message received. Sameer will review and write back in 1 to 2 ordinary business days.");
    }
  };

  // Switch tabs cleanly, reset active reading post
  const navigateToTab = (tabId: string) => {
    setCurrentTab(tabId);
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to dynamically get Category Icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-lavender-secondary" />;
      case 'Brain': return <Brain className="w-5 h-5 text-lavender-secondary" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5 text-lavender-secondary" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-lavender-secondary" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-lavender-secondary" />;
      case 'Heart': return <Heart className="w-5 h-5 text-lavender-secondary" />;
      default: return <Compass className="w-5 h-5 text-lavender-secondary" />;
    }
  };

  // Helper for Trust Point icons
  const getTrustIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <Compass className="w-6 h-6 text-lavender-secondary" />;
      case 'Heart': return <Heart className="w-6 h-6 text-lavender-secondary" />;
      case 'Activity': return <Activity className="w-6 h-6 text-lavender-secondary" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-lavender-secondary" />;
      default: return <Sparkles className="w-6 h-6 text-lavender-secondary" />;
    }
  };

  // Filter posts dynamically
  const filteredPosts = POSTS.filter((post) => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.some(para => para.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || 
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesTag = selectedTag === 'all' || 
      post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Unique tags for tag cloud filtering
  const allTags = ['all', ...Array.from(new Set(POSTS.flatMap(p => p.tags)))];

  return (
    <div className="min-h-screen bg-blush-soft text-dark-theme font-sans flex flex-col justify-between selection:bg-lavender-primary/30">
      
      {/* Header / Navbar bar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={navigateToTab} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main page router viewport content */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {currentTab === 'home' && !activePost && (
          <div className="space-y-24 pb-20 fade-in col-span-1">
            
            {/* SECTION 1 - HERO */}
            <section className="relative overflow-hidden py-16 sm:py-24 px-5 sm:px-8 border-b border-rose-light bg-gradient-to-b from-white/30 to-transparent">
              {/* Logo procedural background lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" className="w-[80vw] h-[80vw] stroke-lavender-secondary stroke-[0.1]">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M10,50 C30,20 70,80 90,50" />
                </svg>
              </div>

              <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#FBEDED] text-lavender-secondary border border-rose-light font-bold text-[10px] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 bg-lavender-secondary rounded-full animate-ping"></span>
                  <span>THE ART OF INTENTIONAL PRESENCE</span>
                </div>

                <div className="space-y-4">
                  <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-dark-theme leading-tight">
                    Thoughts, stories, and <br />
                    <span className="italic text-lavender-secondary">lessons from everyday life.</span>
                  </h1>
                  <p className="text-base sm:text-lg text-light-theme font-sans max-w-2xl mx-auto leading-relaxed">
                    A calm editorial journal on personal growth, practical cognitive psychology, mindful routines, and living intentionally in our high-friction digital era.
                  </p>
                </div>

                {/* Home Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    id="hero-cta-read"
                    onClick={() => navigateToTab('blog')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-dark-theme hover:bg-dark-theme/90 text-white font-medium text-sm rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start Reading</span>
                    <ArrowRight className="w-4 h-4 text-lavender-primary" />
                  </button>

                  <button
                    id="hero-cta-sub"
                    onClick={() => navigateToTab('newsletter')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-rose-light/50 text-dark-theme font-semibold text-sm rounded-full transition-all border border-rose-light shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-lavender-secondary" />
                    <span>Join 10,000+ Readers</span>
                  </button>
                </div>

                {/* Mini trust badges */}
                <div className="flex items-center justify-center gap-8 pt-6 border-t border-rose-light/40 max-w-lg mx-auto text-[10px] font-mono uppercase text-light-theme tracking-wider">
                  <span>🍃 Completely Ad-free</span>
                  <span>🕰️ 4-minute average read</span>
                  <span>🔒 Respects Attention</span>
                </div>

              </div>
            </section>

            {/* SECTION 2 - FEATURED POSTS */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
              <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">MIND HIGHLIGHTS</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-dark-theme">Editor's Featured Notes</h2>
                </div>
                <button 
                  onClick={() => navigateToTab('blog')}
                  className="text-xs font-bold text-lavender-secondary hover:text-lavender-primary flex items-center gap-1 group cursor-pointer focus:outline-none"
                >
                  <span>Explore the full archive</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Grid of 3 featured pieces */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {POSTS.filter(p => p.isFeatured).slice(0, 3).map((post) => (
                  <div 
                    id={`featured-card-${post.id}`}
                    key={post.id}
                    className="bg-white border border-rose-light/70 rounded-3xl overflow-hidden hover:border-lavender-secondary/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="p-6 sm:p-7 space-y-4">
                      {/* Abstract header block */}
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest font-bold text-light-theme">
                        <span className="text-lavender-secondary uppercase">{post.category}</span>
                        <span>{post.readingTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-dark-theme leading-tight group-hover:text-lavender-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-light-theme leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer bar */}
                    <div className="border-t border-rose-light/50 px-6 py-4.5 bg-rose-light/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-lavender-primary/20 flex items-center justify-center font-serif text-[10px] font-bold text-lavender-secondary">
                          {post.author.avatar}
                        </div>
                        <span className="text-xs font-semibold text-dark-theme">{post.author.name}</span>
                      </div>

                      <button
                        id={`btn-read-feat-card-${post.id}`}
                        onClick={() => {
                          setActivePost(post);
                          setCurrentTab('blog');
                        }}
                        className="text-xs font-bold text-lavender-secondary group-hover:text-lavender-primary flex items-center gap-1 cursor-pointer focus:outline-none"
                      >
                        <span>Read Note</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3 - WHY SAMEVIBE94 */}
            <section className="bg-white py-20 border-y border-rose-light/60 px-5 sm:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Text section */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-[#A98AB0] uppercase">OUR EDITORIAL CHARTER</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-dark-theme leading-tight">
                      Why reading samevibe94 feels different.
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-light-theme leading-relaxed">
                    We designed this space to contrast with the high-pitch urgency of the modern workplace. We don't preach rapid success or 5 AM billionaire micro-habits. We seek depth, slow inquiry, and neuro-coherence.
                  </p>
                  
                  <blockquote className="border-l-3 border-lavender-primary pl-4 py-1 italic text-xs text-light-theme">
                    "This isn't a factory of advice. It’s a quiet front porch for sharing tea, observations, and calm reflections."
                    <span className="block text-[10px] font-mono font-bold mt-1 text-[#A98AB0] not-italic">— SAMEER, FOUNDER</span>
                  </blockquote>
                </div>

                {/* Grid cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {TRUST_POINTS.map((pt, idx) => (
                    <div key={idx} className="bg-blush-soft/40 border border-rose-light/50 p-6 rounded-2xl space-y-3 hover:bg-blush-soft/60 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        {getTrustIcon(pt.iconName)}
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-dark-theme">{pt.title}</h4>
                      <p className="text-xs text-light-theme leading-relaxed">{pt.description}</p>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* SECTION 4 - POPULAR CATEGORIES */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">GUIDE ARCHETYPES</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-dark-theme">Filter Your Curiosity</h2>
              </div>

              {/* Grid of categories cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                  <button
                    id={`popular-cat-box-${cat.id}`}
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      navigateToTab('blog');
                    }}
                    className="bg-white border border-rose-light/70 p-6 rounded-3xl text-left hover:border-lavender-primary/40 hover:shadow-lg transition-transform hover:-translate-y-1 space-y-4 group flex flex-col justify-between cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FBEDED] border border-rose-light flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      
                      <h3 className="font-serif text-base font-semibold text-dark-theme group-hover:text-lavender-secondary transition-colors">
                        {cat.name}
                      </h3>
                      
                      <p className="text-xs text-light-theme leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-rose-light/40 text-[10px] tracking-wide font-mono font-bold uppercase text-lavender-secondary">
                      <span>{cat.count} published letters</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION 5 & 8 - NEWSLETTER LEAD MAGNET & CONVERSION HERO COMPACT */}
            <section className="max-w-[1000px] mx-auto px-5 sm:px-8">
              <div className="bg-gradient-to-tr from-white to-[#F4E8EA]/40 border border-lavender-primary/30 rounded-[2rem] p-8 sm:p-12 relative overflow-hidden flex flex-col sm:flex-row items-center gap-10 shadow-lg">
                
                {/* Background soft textures */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-lavender-primary/10 rounded-full filter blur-2xl"></div>
                
                <div className="space-y-5 text-center sm:text-left flex-1 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#FBEDED] border border-rose-light px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase text-lavender-secondary tracking-widest mb-1.5">
                    <Sparkles className="w-3 h-3 text-lavender-secondary animate-pulse" />
                    <span>OUR MOST VALUED COMPLIMENTARY WORKBOOK</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl font-semibold text-dark-theme leading-tight">
                    One thoughtful email <br />
                    every single Friday.
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                    Over 10,000 readers use our weekly briefings to center their focus, deconstruct toxic performance habits, and discover psychology-backed presence.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      id="btn-trigger-popular-magnet"
                      onClick={() => setSelectedMagnet(LEAD_MAGNETS[0])}
                      className="px-6 py-3 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold rounded-full shadow-sm transition-all text-center cursor-pointer"
                    >
                      Unlock Free Workbook PDF
                    </button>
                    
                    <button
                      id="btn-go-newsletter-tab"
                      onClick={() => navigateToTab('newsletter')}
                      className="px-6 py-3 bg-rose-light text-dark-theme text-xs font-semibold rounded-full hover:bg-rose-light/80 transition-all text-center cursor-pointer"
                    >
                      Join Email Circle
                    </button>
                  </div>
                </div>

                {/* Styled illustration preview representing reflection journal */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-blush-soft border border-rose-light rounded-2xl flex items-center justify-center relative shadow-inner p-4 shrink-0 group hover:border-[#A98AB0]/30 transition-all duration-300">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm border border-rose-light">
                      <FileText className="w-5 h-5 text-lavender-secondary" />
                    </div>
                    <span className="block text-[8px] font-mono tracking-widest text-[#BCA2BD] font-bold">LIMITED RESOURCE</span>
                    <h4 className="font-serif text-xs font-semibold text-dark-theme line-clamp-2">30 Reflection Questions Workbook</h4>
                    <span className="inline-block text-[9px] font-semibold text-lavender-secondary border border-rose-light/60 px-2 py-0.5 roundedbg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      PDF Version
                    </span>
                  </div>
                  {/* Floating abstract decorative dot */}
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-lavender-secondary rounded-full animate-ping"></div>
                </div>

              </div>
            </section>

            {/* SECTION 6 - TESTIMONIALS */}
            <section className="bg-[#F4E8EA]/30 py-20 border-y border-rose-light/40 px-5 sm:px-8">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-widest font-bold text-[#A98AB0] uppercase">MEMBER APPRECATION</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-dark-theme">Kind Notes from Kindred Readers</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white border border-rose-light p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
                      <p className="text-xs sm:text-sm text-light-theme leading-relaxed italic">
                        "{t.text}"
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-rose-light/50">
                        <div>
                          <strong className="block text-xs font-sans text-dark-theme">{t.name}</strong>
                          <span className="text-[10px] text-light-theme font-semibold">{t.role}</span>
                        </div>

                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-lavender-secondary fill-lavender-secondary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 7 - LATEST ARTICLES FEED */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
              <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-rose-light/80 pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">THE CHRONICLE</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-dark-theme">Browse Latest Reflections</h2>
                </div>
                <button
                  onClick={() => navigateToTab('blog')}
                  className="text-xs font-bold text-lavender-secondary hover:text-lavender-primary flex items-center gap-1 font-mono uppercase tracking-wider"
                >
                  <span>Archives ({POSTS.length} posts)</span>
                </button>
              </div>

              {/* Feed List Stack */}
              <div className="space-y-6">
                {POSTS.slice(0, 3).map((post) => (
                  <button
                    id={`latest-feed-btn-${post.id}`}
                    key={post.id}
                    onClick={() => {
                      setActivePost(post);
                      setCurrentTab('blog');
                    }}
                    className="w-full bg-white border border-rose-light p-6 rounded-2xl hover:border-lavender-secondary/30 hover:shadow-md transition-all text-left flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-6 group cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest font-bold text-[#A98AB0] uppercase">
                        <span>{post.category}</span>
                        <span className="text-light-theme font-medium">{post.date}</span>
                      </div>
                      
                      <h3 className="font-serif text-lg font-semibold text-dark-theme group-hover:text-lavender-secondary transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-light-theme line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-lavender-secondary shrink-0 pt-2 sm:pt-0">
                      <span>Enter Reflection</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-12 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* FINAL SIGNUP ACTION ROW BLOCK */}
            <section className="bg-dark-theme text-white py-16 px-5 sm:px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
              
              <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
                <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#BCA2BD]">JOIN OUR WEEKLY COHORT</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  Restore quietness <br />to your weekly schedule dashboard.
                </h2>
                <p className="text-xs sm:text-sm text-[#c2b9c7] max-w-lg mx-auto leading-relaxed">
                  Join a group of {subscribersCount.toLocaleString()} intentional individuals. Zero promotion. One raw letter on mental blocks, habits, and psychology secrets.
                </p>

                {/* Email Form */}
                {hasSubscribed ? (
                  <div className="bg-white/5 border border-white/10 max-w-md mx-auto p-5 rounded-2xl flex flex-col items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-lavender-primary" />
                    <span className="text-sm font-semibold">Thank you! Your email is verified. Welcome to samevibe94.</span>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubscribe(subscriberEmail);
                    }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto mt-6"
                  >
                    <input
                      id="hero-final-email"
                      type="email"
                      placeholder="Your favorite email addresses..."
                      required
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      className="bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white border border-white/20 focus:border-lavender-primary px-4 py-3 rounded-full text-xs outline-none w-full placeholder-white/30 transition-all font-sans"
                    />
                    <button
                      id="hero-final-submit"
                      type="submit"
                      className="w-full sm:w-auto bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold px-6 py-3 rounded-full shadow-md transition-all shrink-0 cursor-pointer text-center"
                    >
                      Join 10,000+ Readers
                    </button>
                  </form>
                )}

                <div className="flex items-center justify-center gap-2 text-[9px] text-[#A98AB0] font-semibold mt-2.5">
                  <Check className="w-3" />
                  <span>Respecting privacy. Unsubscribe cleanly in one tap.</span>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: BLOG/ARTICLES */}
        {currentTab === 'blog' && (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 space-y-10 fade-in">
            {activePost ? (
              /* Specific Article Reader View */
              <ArticleView 
                post={activePost}
                relatedPosts={POSTS.filter(p => p.id !== activePost.id && p.category === activePost.category)}
                onBack={() => {
                  setActivePost(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onSelectPost={(p) => {
                  setActivePost(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSubscribe={handleSubscribe}
                onTriggerToast={triggerToast}
              />
            ) : (
              /* Archive Directory Search Filters & Feed List */
              <div className="space-y-12">
                
                {/* Section title header */}
                <div className="text-center max-w-xl mx-auto space-y-4">
                  <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">THE RAW LOGS</span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-dark-theme tracking-tight">The quiet archive.</h1>
                  <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                    Filter across our notes, research, and reflections on living intentionally, deconstructing habits, and establishing cognitive stillness.
                  </p>
                </div>

                {/* Advanced Search Bar Block */}
                <div className="max-w-xl mx-auto bg-white p-2.5 rounded-full border border-rose-light shadow-sm flex items-center gap-3">
                  <Search className="w-5 h-5 text-light-theme shrink-0 ml-1.5" />
                  <input
                    id="blog-archive-search"
                    type="text"
                    placeholder="Search mental models, habits, or psychology insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm text-dark-theme outline-none w-full font-sans"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-lavender-secondary hover:text-lavender-primary pr-2 font-semibold font-sans focus:outline-none"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Grid list filter rows */}
                <div className="space-y-3.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-light-theme text-center sm:text-left">FILTER CATEGORY</h4>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 font-sans">
                    <button
                      id="cat-filter-all"
                      onClick={() => { setSelectedCategory('all'); }}
                      className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-lavender-secondary text-white shadow-sm'
                          : 'bg-white hover:bg-rose-light/50 text-light-theme border border-rose-light/80'
                      }`}
                    >
                      All Subjects
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        id={`cat-filter-item-${cat.slug}`}
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.slug); }}
                        className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                          selectedCategory === cat.slug
                            ? 'bg-lavender-secondary text-white shadow-sm'
                            : 'bg-white hover:bg-rose-light/50 text-light-theme border border-rose-light/80'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tag pill filters */}
                <div className="space-y-2.5 border-t border-rose-light/40 pt-4">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-light-theme">REFLECTIVE KEYWORDS</h4>
                  <div className="flex flex-wrap items-center gap-1.5 font-sans">
                    {allTags.map((tag) => (
                      <button
                        id={`tag-filter-item-${tag}`}
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all border ${
                          selectedTag === tag
                            ? 'bg-dark-theme text-white border-dark-theme'
                            : 'bg-[#F4E8EA]/40 text-light-theme border-rose-light/40 hover:bg-[#F4E8EA]/80'
                        }`}
                      >
                        {tag === 'all' ? 'All Tags' : `#${tag}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Archive Streams Results */}
                <div className="pt-4">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-rose-light space-y-4">
                      <div className="w-12 h-12 rounded-full bg-rose-light/30 flex items-center justify-center mx-auto text-light-theme">
                        <Loader2 className="w-6 h-6 animate-spin text-lavender-secondary" />
                      </div>
                      <h3 className="font-serif text-lg font-bold">No written reflections found</h3>
                      <p className="text-xs text-light-theme leading-relaxed max-w-sm mx-auto">
                        No matches were found for your filter criteria. Try resetting your search phrase or choosing "All Subjects".
                      </p>
                      
                      <button
                        id="btn-unfilter-search"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSelectedTag('all');
                        }}
                        className="px-5 py-2 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold rounded-full shadow-sm"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredPosts.map((post) => (
                        <div
                          id={`blog-grid-card-${post.id}`}
                          key={post.id}
                          className="bg-white border border-rose-light hover:border-lavender-secondary/30 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div className="p-6 sm:p-8 space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-light-theme">
                              <span className="text-lavender-secondary">{post.category}</span>
                              <div className="flex items-center gap-1.5 font-medium">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                              </div>
                            </div>

                            <button
                              id={`title-btn-card-${post.id}`}
                              onClick={() => {
                                setActivePost(post);
                                window.scrollTo(0, 0);
                              }}
                              className="w-full text-left font-serif text-xl font-semibold text-dark-theme leading-snug group-hover:text-lavender-secondary transition-colors cursor-pointer focus:outline-none"
                            >
                              {post.title}
                            </button>

                            <p className="text-xs sm:text-sm text-light-theme leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>

                            {/* Pill Tags preview */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {post.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-[9px] font-bold text-light-theme/80 bg-[#F4E8EA]/30 px-2 py-0.5 rounded-full">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-rose-light px-6 py-4 bg-rose-light/10 flex items-center justify-between">
                            <span className="text-xs text-dark-theme font-medium font-sans">
                              By {post.author.name}
                            </span>

                            <button
                              id={`read-article-grid-btn-${post.id}`}
                              onClick={() => {
                                setActivePost(post);
                                window.scrollTo(0, 0);
                              }}
                              className="text-xs font-bold text-lavender-secondary group-hover:text-lavender-primary flex items-center gap-1 transition-all cursor-pointer focus:outline-none"
                            >
                              <span>Enter Reading</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

        {/* VIEW 3: CATEGORIES */}
        {currentTab === 'categories' && (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 space-y-12 fade-in text-center sm:text-left">
            <div className="max-w-xl mx-auto text-center space-y-2">
              <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">MIND ARCHITECTS</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-dark-theme tracking-tight">Our Core Classrooms</h1>
              <p className="text-sm text-light-theme leading-relaxed">
                Discover curated streams of written advice depending on your current cognitive friction or emotional milestone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white border border-rose-light rounded-3xl p-6 sm:p-8 hover:border-lavender-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FBEDED] border border-rose-light flex items-center justify-center">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    
                    <h3 className="font-serif text-xl font-semibold text-dark-theme">
                      {cat.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-rose-light flex items-center justify-between">
                    <span className="text-xs text-lavender-secondary font-bold font-mono">
                      {cat.count} published logs
                    </span>

                    <button
                      id={`btn-explore-cat-${cat.id}`}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        navigateToTab('blog');
                      }}
                      className="px-4 py-2 bg-rose-light hover:bg-lavender-secondary hover:text-white text-dark-theme transition-all text-xs font-semibold rounded-full flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Segment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Callout */}
            <div className="bg-[#FBEDED] border border-rose-light p-6 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-8 mt-12 text-left">
              <div className="space-y-1.5 max-w-xl">
                <h4 className="font-serif text-lg font-bold text-dark-theme">Can't decide which segment to start?</h4>
                <p className="text-xs text-light-theme leading-relaxed">
                  Join our weekly correspondence circle. Every Friday morning, we deliver a synthesized selection of thoughts spanning all subjects directly into your virtual screen.
                </p>
              </div>

              <button
                id="btn-cat-subscribe"
                onClick={() => navigateToTab('newsletter')}
                className="px-6 py-3 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-bold rounded-full shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                Join Weekly Newsletter
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: ABOUT */}
        {currentTab === 'about' && (
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 space-y-16 fade-in text-justify sm:text-left">
            
            {/* Introductory profile spacing */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-lavender-secondary to-lavender-primary flex items-center justify-center font-serif italic text-3xl font-bold text-white shadow-xl mx-auto">
                S9
              </div>
              <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase block">WHO WE ARE</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-dark-theme tracking-tight">The soul behind samevibe94</h1>
              <p className="text-sm text-light-theme leading-relaxed text-center">
                A collaborative editorial playground hosted by Sameer Vibe and Dr. Elena Thorne to explore and practice simple presence.
              </p>
            </div>

            {/* Double column profile portrait representation layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-4 bg-gradient-to-tr from-[#FBEDED] to-rose-light/50 border border-rose-light p-8 rounded-3xl flex flex-col justify-center items-center text-center space-y-4 h-full relative overflow-hidden shadow-sm">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center font-serif text-lg font-bold text-lavender-secondary border border-rose-light">
                  SV
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-dark-theme">Sameer Vibe</h3>
                  <span className="block text-[9px] font-mono text-lavender-secondary uppercase tracking-widest font-extrabold mt-0.5">FOUNDER & WRITER</span>
                </div>
                <p className="text-[11px] text-light-theme leading-relaxed italic">
                  "I wanted a digital corner that felt like a warm living room, where we can think about our minds without being shouted at by commercial gurus."
                </p>
              </div>

              <div className="md:col-span-8 space-y-4 text-justify font-sans text-sm text-[#4F4754] leading-relaxed">
                <h3 className="font-serif text-xl font-bold text-dark-theme text-left">The Vision: Slow notes in a hyper-active environment</h3>
                <p>
                  In 2024, I realized that my attention span was behaving like a wild cursor. I was looking at five different Slack channels while refreshing a sports feed, only to realize I couldn’t read a long news piece without checking my phone three times. We are collectively suffering from cognitive fracture.
                </p>
                <p>
                  samevibe94 was created to act as visual and cognitive therapy. It’s an interactive personal log dedicated to slow thoughts. By keeping the interface clean and spacious—and anchoring topics around authentic emotional hurdles and practical neuroscience—we seek to build a playground of slow thinkers.
                </p>
                <p>
                  In 2025, Dr. Elena Thorne joined as a contributing psychologist. She brings clinical authority to the platform, backing Sameer's poetic journal observations with verified CBT protocols and neuro-plasticity principles.
                </p>
              </div>

            </div>

            {/* Structured Timeline Milestones */}
            <div className="space-y-8 bg-white border border-rose-light p-6 sm:p-10 rounded-[2rem]">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-dark-theme text-left">Our Creative Journey</h3>
              
              <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-rose-light">
                
                <div className="relative pl-10 text-left space-y-1">
                  <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-lavender-secondary border border-white"></span>
                  <span className="text-[10px] font-mono font-bold text-lavender-secondary">MAY 2024</span>
                  <h4 className="font-serif text-sm font-semibold text-dark-theme">The Solitary Ink Project</h4>
                  <p className="text-xs text-light-theme leading-relaxed">
                    Sameer publishes the first raw letter to 12 close friends. The focus was simple: Deconstructing why we are driven to overwork ourselves.
                  </p>
                </div>

                <div className="relative pl-10 text-left space-y-1">
                  <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-lavender-secondary border border-white"></span>
                  <span className="text-[10px] font-mono font-bold text-lavender-secondary">FEBRUARY 2025</span>
                  <h4 className="font-serif text-sm font-semibold text-dark-theme">Enter Neuro-Science Logic</h4>
                  <p className="text-xs text-light-theme leading-relaxed">
                    Dr. Elena Thorne contributes her first piece on emotional resistance. Subscriptions scale to 4,000+ readers. We launch our signature Reflection templates.
                  </p>
                </div>

                <div className="relative pl-10 text-left space-y-1">
                  <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-lavender-secondary border border-white"></span>
                  <span className="text-[10px] font-mono font-bold text-lavender-secondary">MID 2026</span>
                  <h4 className="font-serif text-sm font-semibold text-dark-theme">Living Deeply Today</h4>
                  <p className="text-xs text-light-theme leading-relaxed">
                    Over 10,000 subscriber circles now receive our Friday correspondence. We are expanding into customizable PDF journals while maintaining a raw, ad-free environment.
                  </p>
                </div>

              </div>
            </div>

            {/* Core Values Section */}
            <div className="space-y-6 text-center">
              <h3 className="font-serif text-lg font-bold text-dark-theme">Our Baseline Commitments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <div className="bg-white/40 border border-rose-light p-6 rounded-2xl">
                  <h4 className="font-serif text-sm font-semibold text-dark-theme mb-2">Absolute Privacy</h4>
                  <p className="text-xs text-light-theme leading-relaxed">
                    We will never sell your contact information or partner with marketing programs. Your email is only safe-kept for our virtual letter.
                  </p>
                </div>
                <div className="bg-white/40 border border-rose-light p-6 rounded-2xl">
                  <h4 className="font-serif text-sm font-semibold text-dark-theme mb-2">No Pop-up Fatigue</h4>
                  <p className="text-xs text-light-theme leading-relaxed">
                    Our subscription forms are clean and integrated. We do not block your view with flashy banners or countdown timers.
                  </p>
                </div>
                <div className="bg-white/40 border border-rose-light p-6 rounded-2xl">
                  <h4 className="font-serif text-sm font-semibold text-dark-theme mb-2">Human Integrity First</h4>
                  <p className="text-xs text-light-theme leading-relaxed">
                    Every article is researched and written by biological hearts and minds. We do not use automated copy factories.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 5: RESOURCES / LEAD MAGNETS */}
        {currentTab === 'resources' && (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 space-y-12 fade-in text-center sm:text-left">
            
            <div className="max-w-xl mx-auto text-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">INTENTIONAL ASSETS</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-dark-theme tracking-tight">Free downloadable worksheets.</h1>
              <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                Take the samevibe94 temperament offline. Fully printable worksheets, Obsidian/Notion markdown sheets, and habit logs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEAD_MAGNETS.map((magnet) => (
                <div
                  key={magnet.id}
                  className="bg-white border border-rose-light rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 hover:border-lavender-secondary/30 transition-all group text-left"
                >
                  <div className="space-y-4 uppercase">
                    <span className="inline-block text-[9px] font-mono font-bold tracking-widest text-[#A98AB0] border border-rose-light px-2.5 py-1 rounded bg-blush-soft/40">
                      {magnet.badge}
                    </span>
                    
                    <h3 className="font-serif text-xl font-semibold text-dark-theme tracking-tight normal-case group-hover:text-lavender-secondary transition-colors">
                      {magnet.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-light-theme leading-relaxed normal-case">
                      {magnet.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-rose-light">
                    <button
                      id={`btn-open-magnet-mod-${magnet.id}`}
                      onClick={() => setSelectedMagnet(magnet)}
                      className="w-full justify-center px-5 py-3 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Unlock Interactive PDF</span>
                    </button>
                    <span className="block text-[9px] text-center text-light-theme font-mono mt-2 uppercase tracking-wide">
                      ⚡ IMMEDIATE UNLOCK
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Content Upgrade Block */}
            <div className="bg-[#FBEDED] border border-rose-light p-6 sm:p-10 rounded-[2rem] text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto mt-16">
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-lavender-secondary">UPCOMING DIGITALS</span>
                <h4 className="font-serif text-lg font-bold text-dark-theme">Seeking a complete guided physical planner?</h4>
                <p className="text-xs text-light-theme leading-relaxed">
                  We are currently typesetting our 140-page clothbound hardcopy log: <strong className="text-dark-theme">"The 90-Day Mind Align Planner"</strong>. Email subscribers get priority pre-orders and a 30% discount. Join our circle to receive development notes.
                </p>
              </div>

              <button
                id="btn-rs-newsletter-cta"
                onClick={() => navigateToTab('newsletter')}
                className="px-6 py-2.5 bg-dark-theme text-white text-xs font-semibold rounded-full hover:bg-dark-theme/90 transition-colors cursor-pointer shrink-0"
              >
                Join Announcement Circle
              </button>
            </div>

          </div>
        )}

        {/* VIEW 6: NEWSLETTER */}
        {currentTab === 'newsletter' && (
          <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 space-y-16 fade-in text-center sm:text-left">
            
            {/* Newsletter Headline */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">WEEKLY DISPATCH</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-dark-theme tracking-tight">One thoughtful email <br />every single Friday.</h1>
              <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                Join a circle of {subscribersCount.toLocaleString()} readers around the globe. No promotion, no clutter, completely reader-funded and simple.
              </p>
            </div>

            {/* Funnel sequence visual layouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Left Form Column */}
              <div className="space-y-6">
                <div className="space-y-3.5 text-left">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-dark-theme">What you receive on joining:</h3>
                  
                  <ul className="space-y-3 font-sans">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-lavender-secondary bg-lavender-primary/15 rounded-full p-0.5 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-dark-theme block">The Sunday Slate Template</strong>
                        <span className="text-light-theme">A customizable template to clean the mental slate and align starting intent.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-lavender-secondary bg-lavender-primary/15 rounded-full p-0.5 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-dark-theme block">Practical Psychology Insights</strong>
                        <span className="text-light-theme">Concepts deconstructed by Dr. Elena Thorne into real behavioral actions in 3 minutes.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-lavender-secondary bg-lavender-primary/15 rounded-full p-0.5 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-dark-theme block">Exclusive Access to PDF Library</strong>
                        <span className="text-light-theme">Immediate, perpetual free access to all current and upcoming printable worksheets.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Main Email Input Funnel */}
                {newsletterSubscribed ? (
                  <div className="bg-white border border-lavender-secondary/40 p-6 rounded-2xl text-center space-y-3 fade-in">
                    <div className="w-10 h-10 rounded-full bg-lavender-primary/20 flex items-center justify-center mx-auto text-lavender-secondary">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-dark-theme">Welcome to samevibe94</h4>
                    <p className="text-xs text-light-theme">
                      Thank you for trusting us with your screen space. A customized welcoming layout has been dispatched to your favorite inbox. You can unlock worksheets inside the <button onClick={() => navigateToTab('resources')} className="text-lavender-secondary underline font-bold cursor-pointer">Resources</button> tab.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubscribe(newsLetterFormEmail);
                    }}
                    className="bg-white p-6 rounded-[2rem] border border-rose-light/80 shadow-md space-y-4 text-left"
                  >
                    <div>
                      <label htmlFor="newsletter-tab-email" className="block text-xs font-semibold text-dark-theme mb-1.5 font-sans">Secure your complimentary letter slot:</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 text-light-theme" />
                        <input
                          id="newsletter-tab-email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={newsLetterFormEmail}
                          onChange={(e) => setNewsLetterFormEmail(e.target.value)}
                          className="w-full bg-[#FBEDED]/50 hover:bg-[#FBEDED] border border-rose-light focus:border-lavender-secondary pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all text-dark-theme placeholder-light-theme/50 font-sans"
                        />
                      </div>
                    </div>

                    <button
                      id="btn-sub-newsletter-tab"
                      type="submit"
                      className="w-full bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Join {subscribersCount.toLocaleString()}+ Mindful Readers</span>
                    </button>
                    
                    <span className="block text-[10px] text-center text-light-theme font-mono italic">
                      Zero commercial pitches. Opt-out in 1-click anytime.
                    </span>
                  </form>
                )}

              </div>

              {/* Right Column: Beautiful interactive welcome email sequence preview */}
              <div className="bg-[#4B4250] text-[#eee] p-5 sm:p-6 rounded-3xl border border-white/5 shadow-2xl relative space-y-4 text-left font-sans">
                
                {/* Simulated browser header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono tracking-wide text-white/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  </div>
                  <span>INBOX DECRYPTED: WELCOME_01</span>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-mono space-y-1 border-b border-white/5 pb-2.5 text-white/40">
                    <div><strong>From:</strong> sameer@samevibe94.co</div>
                    <div><strong>Subject:</strong> welcome to the slow lane (Workbook inside)</div>
                  </div>

                  <div className="font-serif text-xs leading-relaxed space-y-3.5 text-[#ddd]">
                    <p className="font-bold text-white font-sans text-xs">Kindred soul,</p>
                    <p>
                      Thank you for deciding to spend some of your valuable, easily-fractured attention with samevibe94.
                    </p>
                    <p>
                      If you're anything like me, your days are likely filled with quick responses, red notification pills, and mental coordinates that change too rapidly. Inside this circle, we will try to make one quiet Tuesday and Thursday in our month the slow anchor day.
                    </p>
                    <p>
                      Inside, you will find your downloadable PDF sheets and customized weekly templates. Start simple: Print the <strong>"30 Questions Worksheet"</strong> and try looking at just one question tonight before sleep.
                    </p>
                    <p className="font-serif italic text-lavender-primary text-right">— Sameer Vibe</p>
                  </div>
                </div>

                <span className="absolute bottom-3 right-3 text-[8px] font-mono text-white/20">PREVIEWING WELCOME LETTER</span>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 7: CONTACT */}
        {currentTab === 'contact' && (
          <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 space-y-12 fade-in text-center sm:text-left">
            
            {/* Contact title */}
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-[10px] font-mono tracking-widest font-bold text-lavender-secondary uppercase">CORRESPONDENCE</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-dark-theme tracking-tight">Say Hello.</h1>
              <p className="text-xs sm:text-sm text-light-theme leading-relaxed">
                Whether you have an inquiry about a collaboration, want to share an emotional hurdle, or simply want to share a hot tea suggestion, sameer is happy to listen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Coordinates details */}
              <div className="md:col-span-5 bg-white border border-rose-light p-6 sm:p-8 rounded-[2rem] space-y-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-dark-theme">Other points of contact</h3>
                  <p className="text-xs text-light-theme leading-relaxed">
                    We intentionally do not support rapid-response social networks because we value presence. Writing structured letters is our preferred conversation pace.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase font-bold text-lavender-secondary">COSMOS EMAIL</h4>
                    <span className="text-xs font-semibold text-dark-theme">hello@samevibe94.co</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase font-bold text-lavender-secondary">PREFER PEN-PALS?</h4>
                    <span className="text-xs text-light-theme leading-relaxed block">
                      Sameer Vibe<br />
                      P.O. Box 9422<br />
                      Kyoto Sub-district, JP
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-light-theme font-mono py-1 border-t border-rose-light">
                  <Activity className="w-3.5 h-3.5 text-lavender-secondary animate-pulse" />
                  <span>Avg Response: 24-48 quiet hours</span>
                </div>
              </div>

              {/* Right Column: Contact form */}
              <div className="md:col-span-7">
                {contactSubmitted ? (
                  <div className="bg-white border border-lavender-secondary/40 p-8 rounded-[2rem] text-center space-y-4 h-full flex flex-col justify-center items-center fade-in">
                    <div className="w-12 h-12 bg-lavender-primary/20 rounded-full flex items-center justify-center text-lavender-secondary">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold text-dark-theme">Letter dispatched successfully</h3>
                    <p className="text-xs text-light-theme leading-relaxed max-w-sm">
                      Thank you, <strong className="text-dark-theme">{contactName}</strong>. Your thoughtful reflection has been safely stored in Sameer's correspondence log. He reviews letters at sunset with a warm cup of sencha tea and will write back soon.
                    </p>

                    <button
                      id="btn-back-contact"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactEmail('');
                        setContactMessage('');
                      }}
                      className="px-5 py-2 bg-rose-light text-dark-theme text-xs font-semibold rounded-full hover:bg-rose-light/80 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit}
                    className="bg-white border border-rose-light p-6 sm:p-8 rounded-[2rem] space-y-4 text-left shadow-sm h-full"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-dark-theme mb-1 font-sans">Your Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="e.g., Mia"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-[#FBEDED]/40 hover:bg-[#FBEDED] border border-rose-light focus:border-lavender-secondary px-4 py-2.5 rounded-full text-xs outline-none font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-dark-theme mb-1 font-sans">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="mia@example.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-[#FBEDED]/40 hover:bg-[#FBEDED] border border-rose-light focus:border-lavender-secondary px-4 py-2.5 rounded-full text-xs outline-none font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-reason" className="block text-xs font-semibold text-dark-theme mb-1 font-sans">Reason for Letter</label>
                      <select
                        id="contact-reason"
                        value={contactType}
                        onChange={(e) => setContactType(e.target.value)}
                        className="w-full bg-[#FBEDED]/40 hover:bg-[#FBEDED] border border-rose-light focus:border-lavender-secondary px-4 py-2.5 rounded-full text-xs outline-none font-sans text-dark-theme"
                      >
                        <option value="Saying Hello">Just Saying Hello</option>
                        <option value="Collaboration Inquiry">Potential Creative Collaboration</option>
                        <option value="Reader Reflection">Reader Reflection Feedback</option>
                        <option value="General Question">General Mindset Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-body" className="block text-xs font-semibold text-dark-theme mb-1 font-sans">Your Message</label>
                      <textarea
                        id="contact-body"
                        required
                        rows={5}
                        placeholder="Share your experience, mindset hurdle, or cozy thought with sameer..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-[#FBEDED]/40 hover:bg-[#FBEDED] border border-rose-light focus:border-lavender-secondary px-4 py-3 rounded-2xl text-xs outline-none font-sans resize-none"
                      />
                    </div>

                    <button
                      id="btn-submit-contact-form"
                      type="submit"
                      className="w-full bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Dispatch Letter to Sameer</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Shared Footer component across all routes */}
      <Footer 
        setCurrentTab={navigateToTab} 
        onSubscribe={handleSubscribe} 
      />

      {/* MODAL VIEW: Interactive Lead Magnet downloads */}
      {selectedMagnet && (
        <LeadMagnetView 
          magnet={selectedMagnet} 
          onClose={() => setSelectedMagnet(null)}
          onSubscribe={handleSubscribe}
        />
      )}

      {/* Exit Intent automated tracking popup for conversion optimization */}
      <ExitIntentPopup onSubscribe={handleSubscribe} />

      {/* Shared subtle toast announcement notice channel */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClear={() => setToastMessage(null)} 
        />
      )}

    </div>
  );
}
