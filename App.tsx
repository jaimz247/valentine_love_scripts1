import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  X, 
  Check, 
  ChevronDown,
  Lock,
  ArrowUp,
  Sparkles,
  Send,
  User,
  Star,
  Quote
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
        <span className="text-[10px] font-black leading-tight uppercase tracking-tighter">30-Day Money Back</span>
      </div>
    </div>
  );
};

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'agent' | 'user', text: string}[]>([
    { role: 'agent', text: 'Hi! Nina’s support team here. Any questions about the vault?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: 'user', text: currentInput }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'agent', text: "That's a great question. All 87+ scripts are delivered instantly as a digital PDF for just $27. Can I help with anything else?" }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start">
      {isOpen && (
        <div className="bg-white w-80 h-[450px] rounded-[2.5rem] shadow-2xl border border-slate-100 mb-4 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                <Heart size={20} fill="white" className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-tight">Support Agent</p>
                <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Online Now</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={20} /></button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white text-slate-700 shadow-sm border border-slate-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t bg-white flex items-center space-x-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
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
        className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl hover:bg-rose-600 transition-all transform hover:scale-110 active:scale-95 group flex items-center space-x-3"
      >
        <MessageCircle size={28} />
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
      style={{ animationDelay: `${index * 200}ms` }}
      className={`bg-white p-10 rounded-[2.5rem] relative transition-all duration-1000 shadow-sm hover:shadow-xl border border-slate-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="flex mb-6 text-rose-500">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
      <Quote size={40} className="text-rose-100 absolute top-10 right-10 opacity-50" />
      <p className="text-slate-700 italic text-lg mb-8 relative z-10 leading-relaxed font-medium">"{testimonial.quote}"</p>
      <div className="flex items-center mt-auto">
        <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-rose-100 shadow-sm" />
        <div>
          <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{testimonial.title}</p>
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

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
                <Heart className="text-white fill-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Vault</span>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <button onClick={() => scrollToSection('vault')} className="text-xs font-black hover:text-rose-600 transition-colors uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Modules</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-xs font-black hover:text-rose-600 transition-colors uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Success</button>
            <button onClick={() => scrollToSection('faq')} className="text-xs font-black hover:text-rose-600 transition-colors uppercase tracking-[0.2em] opacity-60 hover:opacity-100">FAQ</button>
          </div>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105 shadow-xl active:scale-95"
          >
            Claim Access — $27
          </button>
        </div>
      </nav>

      <header className="relative pt-40 pb-24 md:pt-60 md:pb-40 overflow-hidden premium-gradient">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-[0.03] pointer-events-none scale-150">
          <Heart size={600} className="text-rose-600 rotate-12" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center px-6 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-10 animate-fade-in-up border border-rose-100 shadow-sm">
            <Sparkles size={14} className="mr-2" /> Limited Release Release
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.05] mb-10 max-w-6xl mx-auto tracking-tight">
            Stop Winging Your Most <br/>
            <span className="text-rose-600 italic serif font-medium">Important Conversations</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
            Get 87+ therapist-grade scripts to navigate conflict, rebuild intimacy, and communicate like an expert.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="group bg-rose-600 text-white px-12 py-7 rounded-[2.5rem] font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-slate-900 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200"
            >
              Access The Vault — $27
            </button>
          </div>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all">
             {["Lifetime Access", "Instant Download", "Free Updates", "Secure Payment"].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                  <Check size={14} className="text-green-600" /> {feat}
                </div>
             ))}
          </div>
        </div>
      </header>

      <section id="vault" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <span className="text-rose-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">The Infrastructure</span>
             <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Inside The Script Vault</h2>
             <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">Expertly crafted modules for every stage of your relationship journey.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {MODULES.map((mod) => (
              <div 
                key={mod.id} 
                className="group bg-slate-50 p-10 rounded-[3.5rem] border border-transparent hover:border-rose-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">Module 0{mod.id}</span>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-rose-600 transition-colors tracking-tight leading-tight">{mod.title}</h3>
                  </div>
                  <div className="bg-white px-5 py-3 rounded-2xl shadow-sm text-center border border-slate-100">
                    <span className="block font-black text-2xl text-rose-600 leading-none mb-1">{mod.scriptsCount}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Scripts</span>
                  </div>
                </div>
                <p className="text-slate-500 mb-8 leading-relaxed text-lg">{mod.description}</p>
                <div className="space-y-4">
                  {mod.highlightScripts.map((s, idx) => (
                    <div key={idx} className="flex items-center text-slate-800 font-bold bg-white/60 px-5 py-4 rounded-2xl group-hover:bg-rose-50 transition-colors border border-transparent group-hover:border-rose-100">
                      <Zap size={16} className="text-rose-500 mr-3 flex-shrink-0" /> <span className="text-sm">{s}</span>
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
                 <p className="text-slate-400 text-xl mb-10 leading-relaxed font-medium">Join 4,200+ partners who stopped arguing and started communicating.</p>
                 <div className="space-y-5">
                    {["87+ Pro Communication Scripts", "Instant Digital Access", "7 Scenario-Specific Modules", "Lifetime Free Updates"].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4 font-bold tracking-wide">
                        <div className="bg-rose-600 rounded-full p-1"><Check size={14} /></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-12 md:p-20 text-center flex flex-col justify-center items-center">
                <span className="text-rose-600 font-black text-[10px] uppercase tracking-[0.4em] mb-6">One-Time Limited Offer</span>
                <div className="flex flex-col items-center mb-10">
                  <span className="text-slate-300 text-3xl line-through font-black opacity-60 mb-2">$297</span>
                  <div className="flex items-baseline">
                    <span className="text-slate-900 text-8xl md:text-9xl font-black tracking-tighter relative">
                      $27
                    </span>
                    <span className="text-slate-400 text-2xl font-bold ml-3 uppercase">USD</span>
                  </div>
                </div>
                <button 
                  onClick={redirectToPurchase}
                  className="w-full bg-rose-600 text-white px-10 py-7 rounded-[2.5rem] font-black text-2xl uppercase tracking-widest hover:bg-slate-900 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200 mb-8"
                >
                  Unlock Access Now
                </button>
                <div className="flex items-center justify-center gap-4 opacity-40 mb-10">
                   <Lock size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
                </div>
                <GuaranteeBadge />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <span className="text-rose-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Community Feedback</span>
          <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-tight">Real People, Real Connection.</h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button onClick={() => toggleFaq(i)} className="w-full p-8 text-left flex justify-between items-center group focus:outline-none">
                    <span className="font-bold text-xl text-slate-900 group-hover:text-rose-600 transition-colors leading-tight pr-6">{faq.question}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${activeFaq === i ? 'bg-rose-600 text-white rotate-180 shadow-lg shadow-rose-200' : 'bg-slate-50 text-slate-400'}`}>
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

      <footer className="py-20 bg-slate-950 text-slate-500 text-sm">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <Heart size={24} className="text-rose-600 fill-rose-600" />
            <span className="text-white font-black text-2xl uppercase tracking-tighter">Vault</span>
          </div>
          <p className="mb-8 opacity-40 font-black uppercase tracking-[0.2em] text-[10px]">Nina James Communications &copy; 2024</p>
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">
             <a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-rose-500 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

      <LiveChat />
      
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[60] bg-white text-slate-900 p-5 rounded-full shadow-2xl hover:bg-rose-600 hover:text-white transition-all transform hover:scale-125 border border-slate-100 active:scale-90"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {showExitPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowExitPopup(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl p-16 md:p-24 text-center animate-fade-in-up">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={32} />
            </button>
            <div className="w-24 h-24 bg-rose-50 text-rose-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 animate-pulse shadow-inner">
                <Heart size={48} fill="currentColor" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Wait! Is intimacy worth $27?</h3>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">Repair your connection today with 87+ therapist-grade scripts. One small step for a lifetime of love.</p>
            <button 
              onClick={redirectToPurchase}
              className="w-full bg-rose-600 text-white py-7 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-rose-200 hover:bg-slate-900 transition-all text-xl"
            >
              Get The Vault Now — $27
            </button>
            <button onClick={() => setShowExitPopup(false)} className="mt-8 text-slate-300 font-black uppercase tracking-[0.2em] text-[10px] hover:text-rose-600 transition-colors">I'll skip this opportunity</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;