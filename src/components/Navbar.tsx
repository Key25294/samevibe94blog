import { useState } from 'react';
import { Menu, X, Mail, Search, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab, searchQuery, setSearchQuery }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'blog', label: 'Articles' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About' },
    { id: 'resources', label: 'Resources' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-blush-soft/95 backdrop-blur-md border-b border-rose-light/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            id="nav-logo"
            onClick={() => { setCurrentTab('home'); setIsOpen(false); }}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-lavender-secondary to-lavender-primary flex items-center justify-center text-white shadow-sm shadow-lavender-primary/30 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif italic font-bold text-sm tracking-tight">S9</span>
            </div>
            <div>
              <span className="font-serif text-xl font-semibold tracking-tight text-dark-theme group-hover:text-lavender-secondary transition-colors">
                samevibe94
              </span>
              <span className="block text-[8px] tracking-[0.2em] uppercase text-light-theme font-semibold -mt-1 font-mono">
                deep. slow. true.
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5 font-sans font-medium text-sm">
            {navItems.map((item) => (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 relative cursor-pointer focus:outline-none ${
                  currentTab === item.id
                    ? 'text-dark-theme font-semibold bg-rose-light/70 shadow-sm'
                    : 'text-light-theme hover:text-dark-theme hover:bg-rose-light/30'
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lavender-secondary"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right utility buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search option */}
            <div className="relative flex items-center">
              {showSearch ? (
                <div className="flex items-center gap-2 bg-white/70 px-3.5 py-1.5 rounded-full border border-rose-light/80 shadow-inner">
                  <Search className="w-4 h-4 text-light-theme" />
                  <input
                    id="search-input-nav"
                    type="text"
                    placeholder="Search mental notes..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (currentTab !== 'blog') setCurrentTab('blog');
                    }}
                    className="bg-transparent text-xs text-dark-theme outline-none w-36 focus:w-48 transition-all duration-300 font-sans"
                    autoFocus
                  />
                  <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-[10px] text-light-theme hover:text-dark-theme">Esc</button>
                </div>
              ) : (
                <button
                  id="nav-search-btn"
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-full hover:bg-rose-light/60 text-light-theme hover:text-dark-theme transition-all cursor-pointer"
                  title="Search articles"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Newsletter Shortcut Button */}
            <button
              id="nav-subscribe-btn"
              onClick={() => setCurrentTab('newsletter')}
              className="flex items-center gap-2 px-5 py-2.5 bg-lavender-secondary hover:bg-lavender-primary text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Newsletter</span>
            </button>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex items-center gap-3.5 md:hidden">
            <button
              id="mobile-search-toggle"
              onClick={() => {
                setShowSearch(!showSearch);
                setCurrentTab('blog');
              }}
              className="p-2 text-light-theme hover:text-dark-theme"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-dark-theme hover:bg-rose-light/40 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Expansion */}
        {showSearch && (
          <div className="py-2.5 md:hidden border-t border-rose-light/30">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-rose-light shadow-sm">
              <Search className="w-4 h-4 text-light-theme" />
              <input
                id="search-input-mobile"
                type="text"
                placeholder="Search articles & stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-dark-theme outline-none w-full font-sans"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-light-theme hover:text-dark-theme">
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blush-soft border-b border-rose-light shadow-lg slide-down-animation">
          <div className="px-5 py-4 space-y-2.5">
            {navItems.map((item) => (
              <button
                id={`nav-item-mobile-${item.id}`}
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-5 py-3 rounded-xl font-sans font-medium text-sm transition-all ${
                  currentTab === item.id
                    ? 'text-dark-theme bg-rose-light/70 font-semibold'
                    : 'text-light-theme hover:text-dark-theme hover:bg-rose-light/30'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-rose-light/40 flex flex-col gap-2.5">
              <button
                id="mobile-nav-sub"
                onClick={() => {
                  setCurrentTab('newsletter');
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-lavender-secondary text-white text-sm font-semibold rounded-xl shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe for Weekly Reflection</span>
              </button>
              <div className="flex justify-center items-center gap-1.5 text-[10px] text-light-theme py-2">
                <Sparkles className="w-3 h-3 text-lavender-secondary animate-pulse" />
                <span>Join 10,000+ subscriber circle</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
