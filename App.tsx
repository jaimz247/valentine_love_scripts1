
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  Clock, 
  X, 
  Check, 
  ArrowRight,
  ChevronDown,
  Gift,
  Lock,
  ArrowRightCircle,
  ArrowUp,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Sparkles,
  ArrowDown,
  Send,
  User,
  BadgeCheck
} from 'lucide-react';
import { MODULES, TESTIMONIALS, FAQS, PRICE, ORIGINAL_PRICE, PURCHASE_URL } from './constants';

const TruncatedAnswer: React.FC<{ text: string }> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 150;
  const displayText = isExpanded ? text : text.slice(0, 150) + (shouldTruncate ? '...' : '');

  return (
    <div className="space-y-2">
      <p className="text-slate-600 leading-relaxed transition-all duration-300">{displayText}</p>
      {shouldTruncate && (
        <button 
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          className="text-rose-600 text-sm font-bold uppercase tracking-widest hover:text-rose-700 underline underline-offset-4 decoration-rose-200 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Read Full Answer'}
        </button>
      )}
    </div>
  );
};

const GuaranteeBadge: React.FC = () => {
  return (
    <div className="badge-container relative w-32 h-32 flex items-center justify-center">
      <div className="badge-spin absolute inset-0 border-2 border-dashed border-rose-200 rounded-full"></div>
      <div className="bg-rose-600 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center text-center p-2 shadow-xl animate-pulse-soft z-10 border-4 border-rose-500">
        <ShieldCheck size={20} className="mb-1" />
        <span className="text-[10px] font-black leading-tight uppercase">30-Day Money Back</span>
      </div>
    </div>
  );
};

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'agent' | 'user', text: string}[]>([
    { role: 'agent', text: 'Hey there! Nina James team here. Have a question about the Love Script Vault?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'agent', text: "I've passed your question to Nina. In the meantime, did you see our 30-day guarantee? It makes your purchase 100% risk-free!" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-start">
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-3xl shadow-2xl border border-slate-100 mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-rose-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
              <div>
                <p className="font-bold text-sm">Nina James Support</p>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-3 border-t bg-white flex items-center space-x-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
            <button type="submit" className="bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-rose-600 transition-all transform hover:scale-110 active:scale-95 group flex items-center space-x-3"
      >
        <MessageCircle size={24} />
        {!isOpen && <span className="font-bold text-sm pr-2">Chat with us</span>}
      </button>
    </div>
  );
};

const TestimonialCard: React.FC<{ testimonial: any; index: number }> = ({ testimonial, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Don't unobserve yet if we want re-triggers, but usually for entrance we do.
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      style={{ animationDelay: `${index * 200}ms` }}
      className={`bg-slate-50 p-8 rounded-3xl relative transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-20'}`}
    >
      <div className="absolute -top-4 -left-4 text-6xl text-rose-200 serif select-none">"</div>
      <p className="text-slate-700 italic mb-8 relative z-10 leading-relaxed">{testimonial.quote}</p>
      <div className="flex items-center">
        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-rose-200 shadow-sm" />
        <div>
          <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
          <p className="text-xs text-slate-500 uppercase tracking-widest">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const [ctaVariation, setCtaVariation] = useState<'A' | 'B'>('A');

  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const savedVariation = localStorage.getItem('love_vault_cta_var');
    if (savedVariation === 'A' || savedVariation === 'B') {
      setCtaVariation(savedVariation as 'A' | 'B');
    } else {
      const selected = Math.random() > 0.5 ? 'B' : 'A';
      localStorage.setItem('love_vault_cta_var', selected);
      setCtaVariation(selected);
    }

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exit-popup-shown')) {
        setShowExitPopup(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const redirectToPurchase = () => {
    console.log(`Tracking: Clicked CTA variation ${ctaVariation}`);
    // FB Pixel Conversion Tracking
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: PRICE,
        currency: 'USD',
        content_name: "Valentine's Love Script Vault",
        content_category: 'Digital Product'
      });
    }
    window.open(PURCHASE_URL, '_blank');
  };

  const toggleFaq = (i: number) => {
    const isClosing = activeFaq === i;
    const nextValue = isClosing ? null : i;
    setActiveFaq(nextValue);
    
    // Improved smooth scroll behavior for both expand and collapse
    setTimeout(() => {
      if (faqRefs.current[i]) {
        if (!isClosing) {
          // When opening, scroll the item into view
          faqRefs.current[i]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } else {
          // When closing, ensure the header is still visible by scrolling to top of the item
          faqRefs.current[i]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }, 150); // Small delay to let the grid transition begin
  };

  const ctaText = ctaVariation === 'A' ? 'Claim My Scripts' : 'Get Instant Access';

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Heart className="text-rose-600 fill-rose-600 transition-transform group-hover:scale-125" size={24} />
            <span className="font-bold text-xl tracking-tight uppercase">Love Script Vault</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('problem')} className="text-sm font-medium hover:text-rose-600 transition-colors uppercase tracking-widest">The Problem</button>
            <button onClick={() => scrollToSection('vault')} className="text-sm font-medium hover:text-rose-600 transition-colors uppercase tracking-widest">Inside The Vault</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-rose-600 transition-colors uppercase tracking-widest">Pricing</button>
          </div>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-rose-600 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-rose-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-rose-300 cta-hover-pulse"
          >
            {ctaText}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-rose-50/50">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 opacity-10 pointer-events-none">
          <Heart size={400} className="text-rose-600 rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in-up">
            Curiosity Hook: Is communication the missing link?
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-8 max-w-5xl mx-auto">
            Stop Winging Your Most <span className="text-rose-600 italic font-medium serif transition-all duration-500 hover:text-rose-500">Important Conversations</span>
          </h1>
          <p className="text-xl md:text-3xl font-bold text-slate-700 mb-6 max-w-4xl mx-auto">
            87+ Word-For-Word Scripts That Turn Disconnection Into Deep Intimacy
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="group bg-rose-600 text-white px-8 py-5 rounded-2xl font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-rose-700 transition-all transform hover:scale-110 active:scale-95 shadow-2xl shadow-rose-200 w-full md:w-auto overflow-hidden relative cta-hover-pulse"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
              <span className="flex items-center justify-center relative z-10">
                Access the Vault Now — ${PRICE}
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500 flex items-center justify-center">
            <ShieldCheck size={18} className="mr-2 text-green-500" />
            30-Day "Better Conversations" Money Back Guarantee
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="bg-slate-900 py-8 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="text-white/40 font-bold uppercase tracking-widest text-sm flex items-center hover:text-white transition-colors duration-300"><Zap size={20} className="mr-2 text-rose-500" /> Therapist-Grade</div>
          <div className="text-white/40 font-bold uppercase tracking-widest text-sm flex items-center hover:text-white transition-colors duration-300"><MessageCircle size={20} className="mr-2 text-rose-500" /> 87+ Scripts</div>
          <div className="text-white/40 font-bold uppercase tracking-widest text-sm flex items-center hover:text-white transition-colors duration-300"><Check size={20} className="mr-2 text-rose-500" /> Instant Access</div>
          <div className="text-white/40 font-bold uppercase tracking-widest text-sm flex items-center hover:text-white transition-colors duration-300"><Clock size={20} className="mr-2 text-rose-500" /> Zero Waitlist</div>
        </div>
      </div>

      {/* Vault breakdown */}
      <section id="vault" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">The Vault Infrastructure</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Seven modules designed to handle the conversations you've been avoiding.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {MODULES.map((mod) => (
              <div 
                key={mod.id} 
                className="group bg-slate-50 p-8 rounded-[2rem] border-2 border-transparent hover:border-rose-300 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-rose-100/50 hover:scale-[1.02] cursor-default"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-rose-100 text-rose-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Module {mod.id}</span>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">{mod.title}</h3>
                    <p className="text-rose-500 font-bold italic">{mod.subtitle}</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-center border border-slate-100 group-hover:border-rose-100 transition-colors">
                    <span className="block font-black text-xl text-rose-600">{mod.scriptsCount}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Scripts</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">{mod.description}</p>
                <div className="space-y-3">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">High-Impact Scripts:</div>
                  {mod.highlightScripts.map((s, idx) => (
                    <div key={idx} className="flex items-center text-slate-800 font-medium bg-white/60 px-4 py-2 rounded-xl group-hover:bg-rose-50 transition-colors">
                      <Zap size={14} className="text-rose-500 mr-2" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Visual Flourish */}
      <section id="pricing" className="py-24 bg-rose-50 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-rose-600 relative z-10 pricing-card transition-all duration-700 hover:shadow-rose-200/60">
            {/* Enhanced Ribbon with Looping Glow */}
            <div className="ribbon">
              <span className="ribbon-inner animate-ribbon-glow">Most Popular</span>
            </div>
            
            <div className="bg-rose-600 text-white text-center py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
              <div className="flex items-center justify-center space-x-3 relative z-10 animate-soft-attention">
                <BadgeCheck size={24} className="text-yellow-400" />
                <span className="font-black text-xl uppercase tracking-widest">Flash Sale: 90% Discount Applied</span>
              </div>
            </div>

            <div className="p-8 md:p-16 text-center relative flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-tight">Everything You Need To <span className="text-rose-600">Rebuild Intimacy</span></h2>
                
                <div className="space-y-4 mb-8">
                  {["87+ Therapist-Grade Scripts", "Lifetime Access & Free Updates", "7 Specialized Scenario Modules", "The Date Night Directory Bonus"].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-slate-700 font-bold group">
                      <div className="bg-green-100 p-1 rounded-full group-hover:bg-green-600 transition-colors"><Check className="text-green-600 group-hover:text-white" size={16} /></div>
                      <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-4 mb-8">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xl line-through font-bold opacity-60">Value: ${ORIGINAL_PRICE}</span>
                    <div className="flex items-baseline">
                      <span className="text-rose-600 text-6xl md:text-8xl font-black tracking-tighter relative drop-shadow-sm">
                        ${PRICE}
                        <ArrowDown className="absolute -top-12 -right-8 text-rose-600 animate-bounce hidden md:block" size={40} />
                      </span>
                      <span className="text-rose-600 text-xl font-bold ml-2">USD</span>
                    </div>
                  </div>
                  <div className="ml-auto hidden lg:block">
                    <GuaranteeBadge />
                  </div>
                </div>

                <button 
                  onClick={redirectToPurchase}
                  className="group w-full bg-rose-600 text-white px-10 py-6 rounded-[2rem] font-black text-2xl md:text-3xl uppercase tracking-widest hover:bg-rose-700 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200 mb-8 overflow-hidden relative cta-hover-pulse"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                  <span className="flex items-center justify-center relative z-10">
                    {ctaText}
                    <ArrowRightCircle className="ml-4 group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </button>
              </div>
              
              <div className="hidden md:flex flex-col items-center space-y-6 lg:hidden">
                <GuaranteeBadge />
              </div>
            </div>
            
            <div className="bg-slate-50 py-6 border-t border-slate-100 flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center space-x-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <Lock size={14} className="text-green-500" />
                <span>Secure SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <Clock size={14} className="text-rose-500" />
                <span>Offer ends soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with staggered animation */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">Real Couples. Real Breakthroughs.</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Refined Transitions */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Common Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div 
                  key={i} 
                  ref={el => faqRefs.current[i] = el}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full p-6 text-left flex justify-between items-center group transition-colors duration-300"
                  >
                    <span className={`font-bold text-lg transition-colors ${activeFaq === i ? 'text-rose-600' : 'text-slate-900 group-hover:text-rose-600'}`}>{faq.question}</span>
                    <ChevronDown className={`text-slate-400 transition-all duration-300 ${activeFaq === i ? 'rotate-180 text-rose-600' : ''}`} />
                  </button>
                  <div className={`faq-content ${activeFaq === i ? 'open' : ''}`}>
                    <div className="faq-inner">
                      <div className="p-6 pt-0 border-t border-slate-50 bg-slate-50/30">
                        <TruncatedAnswer text={faq.answer} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Glow */}
      <section className="py-24 bg-rose-600 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Your relationship is worth $27.</h2>
          <p className="text-xl md:text-2xl mb-12 text-rose-100 max-w-2xl mx-auto">
            Stop letting small misunderstandings turn into huge divides. Use the vault and communicate with confidence today.
          </p>
          <button 
            onClick={redirectToPurchase}
            className="group bg-white text-rose-600 px-12 py-6 rounded-[2rem] font-black text-2xl uppercase tracking-widest hover:bg-rose-50 transition-all transform hover:scale-110 active:scale-95 shadow-2xl cta-hover-pulse animate-glow-pulse"
          >
            Get The Vault Now
          </button>
          <p className="mt-8 opacity-75 font-medium italic">Instant download. Secure checkout. 30-day guarantee.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-500 text-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-8 group cursor-default">
            <Heart size={20} className="text-rose-600 group-hover:fill-rose-600 transition-all" />
            <span className="text-white font-black uppercase tracking-widest group-hover:text-rose-400 transition-colors">Love Script Vault</span>
          </div>
          <p className="mb-4">© 2024 Nina James & The Valentine's Love Script Vault. All rights reserved.</p>
        </div>
      </footer>

      <LiveChat />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[60] bg-rose-600 text-white p-4 rounded-full shadow-2xl hover:bg-rose-700 transition-all transform hover:scale-125 active:scale-90 animate-fade-in-up flex items-center justify-center border-2 border-white/20"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setShowExitPopup(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors z-20">
              <X size={32} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="hidden md:block bg-rose-600 p-12 text-white flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Sparkles size={100} />
                </div>
                <Heart size={64} className="mb-6 opacity-30 animate-pulse" />
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-tight">Wait! Your relationship is worth it.</h3>
                <p className="text-rose-100 font-bold italic">Transform your communication for just ${PRICE}.</p>
              </div>
              <div className="p-10 text-center md:text-left">
                <div className="inline-block bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Limited Availability</div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">Try it risk-free.</h4>
                <p className="text-slate-600 mb-8">Better conversations or your money back. 30-day guarantee.</p>
                <button 
                  onClick={redirectToPurchase}
                  className="group w-full bg-rose-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all transform hover:scale-105 relative overflow-hidden cta-hover-pulse"
                >
                  <span className="relative z-10">{ctaText} — ${PRICE}</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[0] transition-transform duration-300"></div>
                </button>
                <button onClick={() => setShowExitPopup(false)} className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-rose-600 transition-colors block mx-auto md:mx-0">I'll figure it out later</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
