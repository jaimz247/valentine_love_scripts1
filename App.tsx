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
  BadgeCheck,
  Star
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
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="badge-spin absolute inset-0 border-2 border-dashed border-rose-200 rounded-full opacity-50"></div>
      <div className="bg-rose-600 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center text-center p-2 shadow-xl animate-pulse-soft z-10 border-4 border-rose-500">
        <ShieldCheck size={20} className="mb-1" />
        <span className="text-[10px] font-black leading-tight uppercase">30-Day Refund</span>
      </div>
    </div>
  );
};

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'agent' | 'user', text: string}[]>([
    { role: 'agent', text: 'Hi! I’m here to help. Do you have any questions about the Love Script Vault?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'agent', text: "That's a great question. Most people find that Module 1 helps the most with day-to-day intimacy. Can I help you with anything else?" }]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start">
      {isOpen && (
        <div className="bg-white w-80 h-[450px] rounded-[2.5rem] shadow-2xl border border-slate-100 mb-4 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center shadow-lg">
                <User size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">Nina's Support</p>
                <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Online Now</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={20} /></button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t bg-white flex items-center space-x-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..." 
              className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
            />
            <button type="submit" className="bg-rose-600 text-white p-3 rounded-full hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:bg-rose-600 transition-all transform hover:scale-110 active:scale-95 group flex items-center space-x-3"
      >
        <MessageCircle size={28} />
        {!isOpen && <span className="font-bold text-sm pr-2">Questions?</span>}
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
      style={{ animationDelay: `${index * 200}ms` }}
      className={`bg-white p-10 rounded-[2.5rem] relative transition-all duration-1000 shadow-sm hover:shadow-xl border border-slate-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="flex mb-4 text-rose-500">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
      <p className="text-slate-700 italic text-lg mb-8 relative z-10 leading-relaxed font-medium">"{testimonial.quote}"</p>
      <div className="flex items-center">
        <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-rose-100 shadow-sm" />
        <div>
          <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{testimonial.title}</p>
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
    window.open(PURCHASE_URL, '_blank');
  };

  const toggleFaq = (i: number) => {
    setActiveFaq(activeFaq === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-50 selection:text-rose-900 overflow-x-hidden">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform">
                <Heart className="text-white fill-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Vault</span>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <button onClick={() => scrollToSection('vault')} className="text-xs font-black hover:text-rose-600 transition-colors uppercase tracking-[0.2em] opacity-60 hover:opacity-100">The Vault</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-xs font-black hover:text-rose-600 transition-colors uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Reviews</button>
            <button onClick={() => scrollToSection('pricing')} className="text-xs font-black hover:text-rose-600 transition-colors uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Pricing</button>
          </div>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105 shadow-xl active:scale-95"
          >
            Claim Access
          </button>
        </div>
      </nav>

      <header className="relative pt-40 pb-24 md:pt-60 md:pb-40 overflow-hidden premium-gradient">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-[0.03] pointer-events-none scale-150">
          <Heart size={600} className="text-rose-600 rotate-12" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center px-6 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-black tracking-[0.3em] uppercase mb-10 animate-fade-in-up border border-rose-100">
            <Sparkles size={14} className="mr-2" /> Limited Valentine's Release
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] mb-10 max-w-6xl mx-auto tracking-tight">
            Stop Winging Your Most <br/>
            <span className="text-rose-600 italic serif font-medium">Important Conversations</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
            87+ Therapist-grade, word-for-word scripts to turn relationship disconnection into deep, lasting intimacy.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="group bg-rose-600 text-white px-12 py-7 rounded-[2.5rem] font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-slate-900 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200"
            >
              Access The Vault — ${PRICE}
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                <Check size={14} className="text-green-500" /> Lifetime Access
             </div>
             <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                <Check size={14} className="text-green-500" /> Instant Download
             </div>
             <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                <Check size={14} className="text-green-500" /> Free Updates
             </div>
          </div>
        </div>
      </header>

      <section id="vault" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <span className="text-rose-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">The Infrastructure</span>
             <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">What's Inside The Vault?</h2>
             <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">Seven specialized modules designed to navigate the exact conversations you've been avoiding.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {MODULES.map((mod) => (
              <div 
                key={mod.id} 
                className="group bg-slate-50 p-10 rounded-[3rem] border border-transparent hover:border-rose-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">Module 0{mod.id}</span>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-rose-600 transition-colors tracking-tight">{mod.title}</h3>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-3xl shadow-sm text-center border border-slate-100">
                    <span className="block font-black text-2xl text-rose-600">{mod.scriptsCount}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Scripts</span>
                  </div>
                </div>
                <p className="text-slate-500 mb-8 leading-relaxed text-lg">{mod.description}</p>
                <div className="space-y-4">
                  {mod.highlightScripts.map((s, idx) => (
                    <div key={idx} className="flex items-center text-slate-700 font-bold bg-white/60 px-5 py-3 rounded-2xl group-hover:bg-rose-50 transition-colors">
                      <Zap size={16} className="text-rose-500 mr-3" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="max-w-5xl w-full bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100 relative z-10">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-20 flex flex-col justify-center bg-slate-900 text-white relative">
                 <div className="absolute top-0 right-0 p-10 opacity-10"><Heart size={200}/></div>
                 <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">Your relationship is <span className="text-rose-500">worth more</span> than $27.</h2>
                 <p className="text-slate-400 text-xl mb-10 leading-relaxed">Join 4,200+ couples who have transformed their communication using this exact blueprint.</p>
                 <div className="space-y-5">
                    {["87+ Pro Scripts", "7 Scenario Modules", "Lifetime Access"].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4 font-bold tracking-wide">
                        <div className="bg-rose-600 rounded-full p-1"><Check size={14} /></div>
                        <span>{item}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-12 md:p-20 text-center flex flex-col justify-center items-center">
                <span className="text-rose-600 font-black text-xs uppercase tracking-[0.3em] mb-6">Limited Valentine's Pricing</span>
                <div className="flex flex-col items-center mb-10">
                  <span className="text-slate-300 text-3xl line-through font-black opacity-60 mb-2">${ORIGINAL_PRICE}</span>
                  <div className="flex items-baseline">
                    <span className="text-slate-900 text-8xl md:text-9xl font-black tracking-tighter relative">
                      ${PRICE}
                    </span>
                    <span className="text-slate-400 text-2xl font-bold ml-3 uppercase">USD</span>
                  </div>
                </div>
                <button 
                  onClick={redirectToPurchase}
                  className="w-full bg-rose-600 text-white px-10 py-7 rounded-[2.5rem] font-black text-2xl uppercase tracking-widest hover:bg-slate-900 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200 mb-8"
                >
                  Get The Vault Now
                </button>
                <div className="flex items-center justify-center gap-4 opacity-50">
                   <Lock size={16} />
                   <span className="text-xs font-bold uppercase tracking-widest">Secure 256-bit Checkout</span>
                </div>
                <div className="mt-10">
                  <GuaranteeBadge />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <span className="text-rose-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Proven Results</span>
          <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-tight">Real Couples, Real Intimacy.</h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button onClick={() => toggleFaq(i)} className="w-full p-8 text-left flex justify-between items-center group">
                    <span className="font-bold text-xl text-slate-900 group-hover:text-rose-600 transition-colors leading-tight pr-6">{faq.question}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-rose-600 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                        <ChevronDown size={20} />
                    </div>
                  </button>
                  <div className={`transition-all duration-500 overflow-hidden ${activeFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-8 pt-0 bg-slate-50/20">
                      <TruncatedAnswer text={faq.answer} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-950 text-slate-500 text-sm border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <Heart size={24} className="text-rose-600 fill-rose-600" />
            <span className="text-white font-black text-2xl uppercase tracking-tighter">Vault</span>
          </div>
          <p className="mb-6 opacity-40 font-bold uppercase tracking-[0.2em] text-xs">Nina James Communications &copy; 2024</p>
          <div className="flex justify-center gap-10 text-xs font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">
             <a href="#" className="hover:text-rose-500">Privacy Policy</a>
             <a href="#" className="hover:text-rose-500">Terms of Service</a>
             <a href="#" className="hover:text-rose-500">Contact Support</a>
          </div>
        </div>
      </footer>

      <LiveChat />
      
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[60] bg-white text-slate-900 p-5 rounded-full shadow-2xl hover:bg-rose-600 hover:text-white transition-all transform hover:scale-125 border border-slate-100"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowExitPopup(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl p-16 md:p-24 text-center animate-fade-in-up">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={32} />
            </button>
            <div className="w-24 h-24 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 animate-pulse">
                <Heart size={48} fill="currentColor" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Wait! Your connection matters.</h3>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed">Repair your relationship today for just $27. Risk-free, 30-day guarantee.</p>
            <button 
              onClick={redirectToPurchase}
              className="w-full bg-rose-600 text-white py-7 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-rose-200 hover:bg-slate-900 transition-all text-xl"
            >
              Secure My Access Now
            </button>
            <button onClick={() => setShowExitPopup(false)} className="mt-8 text-slate-300 font-black uppercase tracking-[0.2em] text-[10px] hover:text-rose-600 transition-colors">I'll figure it out on my own</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;