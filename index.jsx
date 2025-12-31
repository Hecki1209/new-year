import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Check, Music, Heart, Sparkles, Gift, ArrowDown, BatteryCharging, Mail, X } from 'lucide-react';

/**
 * NEW YEAR 2026 RETRO PARTY APP
 * A vertical scrolling experience with interactive elements.
 */

// --- UTILITY COMPONENTS ---

// Simple scroll reveal wrapper
const ScrollReveal = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- SECTIONS ---

// 1. Hero Section with Fireworks
const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    const colors = ['#EAC435', '#D43F00', '#F4EBD0', '#00FFF0', '#FF00CC'];

    const createFirework = (x, y) => {
      const particleCount = 80;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.01
        });
      }
    };

    const loop = () => {
      ctx.fillStyle = 'rgba(18, 78, 102, 0.2)'; // Trail effect (Teal background)
      ctx.fillRect(0, 0, width, height);

      // Random firework launch
      if (Math.random() < 0.05) {
        createFirework(Math.random() * width, Math.random() * height * 0.6);
      }

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gravity
        p.alpha -= p.decay;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) particles.splice(index, 1);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToNext = () => {
    document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full bg-[#124E66] overflow-hidden flex flex-col items-center justify-center text-[#F4EBD0]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      <div className="z-10 text-center px-4 animate-bounce-slight">
        <div className="mb-6 font-mono font-bold text-[#F4EBD0] tracking-widest text-sm md:text-base uppercase bg-black px-4 py-2 inline-block -rotate-2 transform shadow-[4px_4px_0px_#EAC435]">
          From Hardik Rohit
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-[#EAC435] drop-shadow-[4px_4px_0px_#D43F00]">
          HAPPY<br/>NEW YEAR<br/>2026!
        </h1>
        <p className="text-xl md:text-2xl font-bold bg-[#D43F00] inline-block px-4 py-2 rotate-2 transform text-white shadow-lg">
          Another year of chaos pending... 😸
        </p>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[#EAC435] hover:text-white transition-colors cursor-pointer"
      >
        <span className="font-bold text-sm uppercase tracking-widest">See what I made</span>
        <ArrowDown className="w-8 h-8 animate-bounce" />
      </button>
    </section>
  );
};

// 2. Greeting Card
const GreetingCard = () => {
  return (
    <section id="greeting" className="min-h-screen bg-[#F4EBD0] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#D43F00 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <ScrollReveal className="w-full max-w-md">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 transform transition-transform hover:rotate-0">
          <div className="flex justify-center mb-6">
             {/* Meme Cat SVG Representation */}
            <div className="w-32 h-32 bg-[#EAC435] rounded-full flex items-center justify-center border-4 border-black relative overflow-hidden">
               <span className="text-6xl">😻</span>
            </div>
          </div>
          <h2 className="text-3xl font-black text-[#124E66] mb-4 text-center uppercase">Hey You!</h2>
          <p className="text-lg font-medium text-gray-800 leading-relaxed text-center font-mono">
            Thanks for sticking by me in 2025. You made the tough days easier and the good days absolutely wild.
            <br/><br/>
            Here's to more memes, more dreams, and less screaming in 2026.
          </p>
          <div className="mt-6 flex justify-center">
            <Heart className="text-[#D43F00] w-8 h-8 fill-current animate-pulse" />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

// 3. Bucket List
const BucketList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Actually stick to a gym routine 💪", done: false },
    { id: 2, text: "Go on that trip we keep planning 🗺️", done: false },
    { id: 3, text: "Save money (for real this time) 💰", done: false },
    { id: 4, text: "Eat good food with good people 🍕", done: false },
    { id: 5, text: "Survive without a mental breakdown 🫠", done: false },
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <section className="min-h-screen bg-[#EAC435] py-20 px-4 flex flex-col items-center justify-center">
      <ScrollReveal className="w-full max-w-lg">
        <h2 className="text-4xl md:text-5xl font-black text-black mb-8 text-center drop-shadow-md">
          GOALS FOR 2026<br/>
          <span className="text-xl font-bold text-[#D43F00]">(Let's actually do these)</span>
        </h2>
        
        <div className="bg-white p-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-2 border-dashed border-gray-300 p-6 space-y-4">
            {items.map(item => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center gap-4 cursor-pointer p-3 transition-all hover:bg-gray-50 rounded-lg group ${item.done ? 'opacity-50' : ''}`}
              >
                <div className={`w-8 h-8 border-4 border-black flex items-center justify-center transition-colors ${item.done ? 'bg-[#124E66]' : 'bg-white'}`}>
                  {item.done && <Check className="text-white w-5 h-5" />}
                </div>
                <span className={`text-xl font-bold font-mono ${item.done ? 'line-through text-gray-500' : 'text-black'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

// 4. Cassette Tape Player
const CassetteTape = ({ title, label, color, isPlaying, onClick }) => (
  <div onClick={onClick} className="cursor-pointer transform transition-transform hover:scale-105 active:scale-95 mb-6">
    {/* Cassette Body */}
    <div className={`h-40 w-full max-w-sm mx-auto rounded-xl p-3 border-4 border-black relative shadow-lg ${color}`}>
      {/* Label Area */}
      <div className="bg-white h-24 rounded border-2 border-black flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-4 bg-black opacity-10"></div>
         <span className="font-black text-xl uppercase tracking-widest z-10">{label}</span>
         <span className="text-xs font-mono text-gray-500 z-10">{title}</span>
         
         {/* Spools */}
         <div className="absolute flex justify-between w-48 top-1/2 -translate-y-1/2 px-4 pointer-events-none opacity-30">
            <div className={`w-12 h-12 rounded-full border-4 border-black border-dashed ${isPlaying ? 'animate-spin' : ''}`}></div>
            <div className={`w-12 h-12 rounded-full border-4 border-black border-dashed ${isPlaying ? 'animate-spin' : ''}`}></div>
         </div>
      </div>
      
      {/* Bottom Detail */}
      <div className="absolute bottom-2 left-0 w-full px-4 flex justify-between text-black font-mono text-xs font-bold">
        <span>A</span>
        <span>60 MIN</span>
      </div>
    </div>
  </div>
);

const MusicPlayer = () => {
  const [activeTape, setActiveTape] = useState(null);

  const tapes = [
    { id: 1, title: "Count on Me - Bruno Mars", label: "Bestie Vibe", color: "bg-teal-400" },
    { id: 2, title: "I'll Be There For You", label: "F.R.I.E.N.D.S", color: "bg-orange-400" },
    { id: 3, title: "Unstoppable", label: "2026 Energy", color: "bg-pink-400" },
  ];

  return (
    <section className="min-h-screen bg-[#124E66] py-20 px-4 text-[#F4EBD0] flex flex-col items-center">
      <ScrollReveal className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
           <Music className="w-8 h-8 animate-bounce" />
           <h2 className="text-3xl font-black uppercase tracking-widest">Retro Vibes</h2>
           <Music className="w-8 h-8 animate-bounce delay-100" />
        </div>

        <div className="space-y-4">
          {tapes.map(tape => (
            <CassetteTape
              key={tape.id}
              {...tape}
              isPlaying={activeTape === tape.id}
              onClick={() => setActiveTape(activeTape === tape.id ? null : tape.id)}
            />
          ))}
        </div>

        {/* Visualizer */}
        <div className={`mt-8 h-16 bg-black rounded-lg border-2 border-gray-600 flex items-end justify-center gap-1 p-2 ${activeTape ? 'opacity-100' : 'opacity-50'}`}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 bg-green-500 transition-all duration-100 ease-in-out rounded-t-sm`}
              style={{ 
                height: activeTape ? `${Math.random() * 100}%` : '10%',
                animation: activeTape ? `equalizer 0.5s infinite ${i * 0.05}s` : 'none'
              }}
            ></div>
          ))}
        </div>
        <p className="mt-4 font-mono text-sm opacity-70">
          {activeTape ? "▶ Playing (Imagine the music... copyright laws are real 😅)" : "Click a tape to vibe"}
        </p>
      </ScrollReveal>
    </section>
  );
};

// 5. Friendship Vouchers
const Voucher = ({ title, emoji, frontText, color }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="h-48 w-full cursor-pointer perspective-1000 group"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front */}
        <div className={`absolute w-full h-full backface-hidden ${color} border-4 border-black rounded-xl p-4 flex flex-col items-center justify-center shadow-md`}>
          <Gift className="w-8 h-8 mb-2 opacity-80" />
          <h3 className="font-black text-xl text-center uppercase">{frontText}</h3>
          <p className="text-sm mt-2 font-mono bg-black text-white px-2 py-1 rounded">Tap to Flip</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border-4 border-dashed border-black rounded-xl p-4 flex flex-col items-center justify-center shadow-lg">
          <div className="text-4xl mb-2">{emoji}</div>
          <h3 className="font-bold text-center text-lg leading-tight">{title}</h3>
          <div className="mt-3 text-[10px] uppercase font-bold text-gray-400">Valid Forever • Non-Refundable</div>
        </div>

      </div>
    </div>
  );
};

const Vouchers = () => {
  return (
    <section className="min-h-screen bg-[#D43F00] py-20 px-4 flex flex-col items-center justify-center">
      <ScrollReveal className="w-full max-w-4xl">
        <h2 className="text-4xl font-black text-[#F4EBD0] text-center mb-12 drop-shadow-[4px_4px_0px_#000]">
          COUPONS JUST FOR YOU
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Voucher 
            frontText="Voucher #001" 
            title="One Free 'I'm Venting' Session 🗣️" 
            emoji="🤬" 
            color="bg-[#EAC435]" 
          />
          <Voucher 
            frontText="Voucher #002" 
            title="Lunch/Dinner Treat on Me 🍔" 
            emoji="🍟" 
            color="bg-[#00FFF0]" 
          />
          <Voucher 
            frontText="Voucher #003" 
            title="Lifetime Tech Support 💻" 
            emoji="🤖" 
            color="bg-pink-400" 
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

// 6. Loader
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading animation
          let p = 0;
          const interval = setInterval(() => {
            p += Math.random() * 5;
            if (p > 100) p = 100;
            setProgress(p);
            if (p === 100) clearInterval(interval);
          }, 100);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <section ref={ref} className="h-[50vh] bg-black flex flex-col items-center justify-center px-6">
      <BatteryCharging className="text-[#00FFF0] w-12 h-12 mb-4 animate-pulse" />
      <h2 className="text-[#00FFF0] font-mono text-xl mb-6 text-center">
        Closing 2025... Installing 2026 Update<br/>
        <span className="text-xs text-gray-500">(Patch notes: Bug fixes included)</span>
      </h2>
      
      <div className="w-full max-w-md h-8 border-2 border-[#00FFF0] p-1 rounded">
        <div 
          className="h-full bg-[#00FFF0] transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 text-[#00FFF0] font-mono font-bold">{Math.floor(progress)}%</div>
    </section>
  );
};

// 7. Final Note
const FinalNote = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen bg-[#F4EBD0] py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-2xl font-bold text-[#124E66] mb-8 uppercase tracking-widest">One Last Thing...</h2>
      
      <div className="relative w-full max-w-lg h-96 flex items-end justify-center">
        
        {/* The Letter (Moves Up) */}
        <div 
          className={`absolute w-64 md:w-80 bg-white p-6 shadow-xl transition-all duration-1000 ease-in-out border border-gray-200 ${isOpen ? 'bottom-20 rotate-0 z-20 scale-110' : 'bottom-0 rotate-1 z-0 scale-90'}`}
        >
          <div className="text-center font-handwriting">
             <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-gray-400">01.01.2026</span>
                <Sparkles className="text-[#EAC435] w-5 h-5" />
             </div>
             <p className="text-lg leading-relaxed text-gray-800 font-serif">
               "Happy New Year! Wishing you success, peace, and a lot less stress this year. Grateful to have you in my life. Let's make it a good one! 🌟"
             </p>
             <div className="mt-8 pt-4 border-t border-gray-200 text-right font-bold text-[#D43F00] transform -rotate-2">
               - Hardik Rohit
             </div>
             
             {isOpen && (
               <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
               >
                 <X size={16} />
               </button>
             )}
          </div>
        </div>

        {/* The Envelope (Front) */}
        <div 
          onClick={() => setIsOpen(true)}
          className={`relative z-10 w-72 md:w-96 h-48 bg-[#124E66] shadow-2xl cursor-pointer flex items-center justify-center transition-transform hover:scale-105 ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0'}`}
        >
          {/* Flap details */}
          <div className="absolute inset-0 border-4 border-[#EAC435] opacity-50 m-2"></div>
          <Mail className="text-[#EAC435] w-12 h-12" />
          <div className="absolute bottom-4 text-[#F4EBD0] font-bold tracking-widest text-sm">TAP TO OPEN</div>
        </div>

      </div>

      {isOpen && (
        <div className="mt-32 animate-fade-in text-center">
           <p className="text-[#D43F00] font-bold text-xl">Cheers to 2026! 🥂</p>
        </div>
      )}
    </section>
  );
};

// --- MAIN APP ---

const App = () => {
  return (
    <div className="font-sans text-gray-900 bg-[#F4EBD0] overflow-x-hidden selection:bg-[#EAC435]">
      {/* Styles for custom animations that Tailwind doesn't cover by default */}
      <style>{`
        @keyframes equalizer {
          0% { height: 10%; }
          50% { height: 100%; }
          100% { height: 10%; }
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <Hero />
      <GreetingCard />
      <BucketList />
      <MusicPlayer />
      <Vouchers />
      <Loader />
      <FinalNote />

      {/* Footer */}
      <footer className="bg-black text-[#F4EBD0] text-center py-6 font-mono text-xs">
        <p>Made with ❤️ by Hardik Rohit for 2026</p>
      </footer>
    </div>
  );
};

export default App;
