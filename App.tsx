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
  Lock,
  ArrowRightCircle,
  ArrowUp,
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
        <div className="bg-white w-80 h-96 rounded-3xl shadow-2xl border border-slate-100 mb-4 flex flex-col overflow-hidden animate-fade-in-up">
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
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      style={{ animationDelay: `${index * 150}ms` }}
      className={`bg-slate-50 p-8 rounded-3xl relative transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="absolute -top-4 -left-4 text-6xl text-rose-200 serif select-none opacity-50">"</div>
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

  useEffect(() => {
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
    const w = window as any;
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'InitiateCheckout', {
        value: PRICE,
        currency: 'USD',
        content_name: "Valentine's Love Script Vault",
      });
    }
    window.open(PURCHASE_URL, '_blank');
  };

  const toggleFaq = (i: number) => {
    setActiveFaq(activeFaq === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Heart className="text-rose-600 fill-rose-600 transition-transform group-hover:scale-125" size={24} />
            <span className="font-bold text-xl tracking-tight uppercase">Love Script Vault</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('vault')} className="text-sm font-medium hover:text-rose-600 transition-colors uppercase tracking-widest">Inside The Vault</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-rose-600 transition-colors uppercase tracking-widest">Pricing</button>
          </div>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-rose-600 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-rose-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-rose-300"
          >
            Claim My Scripts
          </button>
        </div>
      </nav>

      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-rose-50/50">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 opacity-10 pointer-events-none">
          <Heart size={400} className="text-rose-600 rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in-up">
            Stop winging your most important conversations
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-8 max-w-5xl mx-auto">
            Words That <span className="text-rose-600 italic font-medium serif">Repair, Reconnect,</span> & Rebuild
          </h1>
          <p className="text-xl md:text-3xl font-bold text-slate-700 mb-6 max-w-4xl mx-auto">
            87+ Word-for-word scripts to turn relationship disconnection into deep intimacy.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="group bg-rose-600 text-white px-8 py-5 rounded-2xl font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-rose-700 transition-all transform hover:scale-110 active:scale-95 shadow-2xl shadow-rose-200 w-full md:w-auto overflow-hidden relative"
            >
              Access the Vault — $27
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500 flex items-center justify-center">
            <ShieldCheck size={18} className="mr-2 text-green-500" />
            30-Day "Better Conversations" Money Back Guarantee
          </p>
        </div>
      </header>

      <section id="vault" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Inside The Infrastructure</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Seven modules designed to handle the conversations you've been avoiding.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {MODULES.map((mod) => (
              <div 
                key={mod.id} 
                className="group bg-slate-50 p-8 rounded-[2rem] border-2 border-transparent hover:border-rose-300 transition-all duration-300 hover:bg-white hover:shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-rose-100 text-rose-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Module {mod.id}</span>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">{mod.title}</h3>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-center border border-slate-100">
                    <span className="block font-black text-xl text-rose-600">{mod.scriptsCount}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Scripts</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">{mod.description}</p>
                <div className="space-y-3">
                  {mod.highlightScripts.map((s, idx) => (
                    <div key={idx} className="flex items-center text-slate-800 font-medium bg-white/60 px-4 py-2 rounded-xl">
                      <Zap size={14} className="text-rose-500 mr-2" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-rose-50 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-rose-600 relative z-10">
            <div className="ribbon">
              <span className="ribbon-inner animate-ribbon-glow">Limited Offer</span>
            </div>
            
            <div className="bg-rose-600 text-white text-center py-6">
              <span className="font-black text-xl uppercase tracking-widest">90% Discount Applied</span>
            </div>

            <div className="p-8 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Everything For <span className="text-rose-600">Rebuilding Intimacy</span></h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-12 text-left max-w-2xl mx-auto">
                {["87+ Therapist Scripts", "Lifetime Updates", "7 Scenario Modules", "Bonus: Date Night Directory"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-700 font-bold">
                    <Check className="text-green-600" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center mb-8">
                <span className="text-slate-400 text-2xl line-through font-bold opacity-60">Value: $297</span>
                <div className="flex items-baseline">
                  <span className="text-rose-600 text-6xl md:text-8xl font-black tracking-tighter relative">
                    $27
                  </span>
                  <span className="text-rose-600 text-xl font-bold ml-2">USD</span>
                </div>
              </div>

              <button 
                onClick={redirectToPurchase}
                className="group w-full bg-rose-600 text-white px-10 py-6 rounded-[2rem] font-black text-2xl md:text-3xl uppercase tracking-widest hover:bg-rose-700 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200 mb-8"
              >
                Get Instant Access
              </button>
              
              <GuaranteeBadge />
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Common Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <button onClick={() => toggleFaq(i)} className="w-full p-6 text-left flex justify-between items-center group">
                    <span className="font-bold text-lg text-slate-900 group-hover:text-rose-600">{faq.question}</span>
                    <ChevronDown className={`text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === i && (
                    <div className="p-6 pt-0 bg-slate-50/30">
                      <TruncatedAnswer text={faq.answer} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 text-slate-500 text-sm text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Heart size={20} className="text-rose-600" />
            <span className="text-white font-black uppercase tracking-widest">Love Script Vault</span>
          </div>
          <p className="mb-4">© 2024 Nina James. All rights reserved.</p>
        </div>
      </footer>

      <LiveChat />
      
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[60] bg-rose-600 text-white p-4 rounded-full shadow-2xl hover:bg-rose-700 transition-all transform hover:scale-125 active:scale-90"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowExitPopup(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl p-10 text-center">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
              <X size={32} />
            </button>
            <Heart size={64} className="mx-auto text-rose-600 mb-6 animate-pulse" />
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Wait! Your Relationship is worth it.</h3>
            <p className="text-slate-600 mb-8">Repair your relationship today for just $27. Risk-free.</p>
            <button 
              onClick={redirectToPurchase}
              className="w-full bg-rose-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all"
            >
              Get The Vault Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;