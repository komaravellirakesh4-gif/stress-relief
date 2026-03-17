/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Feather } from "lucide-react";

/* ================= JOURNAL ================= */
function Journal({ dark }: { dark: boolean }){
  const [text,setText]=useState("");
  return(
    <div className={`border p-8 rounded-2xl shine-effect shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/30 border-white/10" : "bg-white border-slate-200"}`}>
      <h2 className="text-3xl font-bold mb-6 glow-text">📝 Journal</h2>
      <textarea 
        onChange={(e)=>setText(e.target.value)} 
        className={`w-full h-40 p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none ${dark ? "bg-white/10 border-white/20 text-white placeholder-white/50" : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"}`}
        placeholder="How are you feeling today?"
      />
      <div className={`mt-4 p-4 rounded-xl text-xl font-medium ${dark ? "bg-white/5" : "bg-slate-50"}`}>
        Mood detected: {text.toLowerCase().includes("sad") || text.toLowerCase().includes("bad") || text.toLowerCase().includes("stressed") ? "😢 Needs a hug" : text.length > 0 ? "😊 Doing okay" : "Waiting for thoughts..."}
      </div>
    </div>
  )
}

/* ================= BREATHING ================= */
function Breathing({ timer }: { timer: number }) {
  const phase = timer % 6;

  const text =
    phase < 2 ? "Inhale 🌬️" :
    phase < 4 ? "Hold 😌" :
    "Exhale 💨";

  return (
    <div className="flex flex-col items-center justify-center bg-black/20 p-10 rounded-2xl border border-white/10 shine-effect shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      <h2 className="text-3xl font-bold glow-text mb-8">🧘 Breathing Exercise</h2>
      <div className="w-48 h-48 rounded-full bg-blue-500/30 animate-pulse flex items-center justify-center text-3xl font-medium shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-blue-400/30">
        {text}
      </div>
      <h1 className="text-6xl mt-8 font-mono text-blue-300">{timer}s</h1>
    </div>
  );
}

/* ================= MINI GAMES ================= */
function MiniGames({ setStress }: { setStress: React.Dispatch<React.SetStateAction<number>> }) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // States for games
  const [bubbles, setBubbles] = useState(Array(16).fill(false));
  const [worryPos, setWorryPos] = useState(4);
  const [compliment, setCompliment] = useState("Click for hype!");
  const [petCount, setPetCount] = useState(0);
  const [fortune, setFortune] = useState("Crack the cookie!");
  const [ballText, setBallText] = useState("Ask a question & click");
  const [smashScale, setSmashScale] = useState(1);
  const [color, setColor] = useState("bg-black/30");

  const games = [
    { id: "bubble", name: "Bubble Wrap", icon: "🫧", desc: "Pop the stress away" },
    { id: "whack", name: "Whack-a-Worry", icon: "🔨", desc: "Smash bad thoughts" },
    { id: "compliment", name: "Hype Machine", icon: "✨", desc: "You are awesome" },
    { id: "pet", name: "Pet the Cat", icon: "🐱", desc: "Purr therapy" },
    { id: "fortune", name: "Fortune Cookie", icon: "🥠", desc: "Funny predictions" },
    { id: "8ball", name: "Sassy 8-Ball", icon: "🎱", desc: "Ask it anything" },
    { id: "smash", name: "Rage Button", icon: "😡", desc: "Just smash it" },
    { id: "color", name: "Color Splash", icon: "🎨", desc: "Make a mess" },
  ];

  const popBubble = (i: number) => {
    const newB = [...bubbles];
    if (!newB[i]) {
      newB[i] = true;
      setBubbles(newB);
      setStress(s => Math.max(0, s - 1));
    }
  };

  const whack = (i: number) => {
    if (i === worryPos) {
      setStress(s => Math.max(0, s - 5));
      setWorryPos(Math.floor(Math.random() * 9));
    }
  };

  const getCompliment = () => {
    const comps = [
      "You're a glowing star! 🌟", 
      "Your code compiles on the first try! 💻", 
      "You have great hair today! 💇", 
      "You're a majestic unicorn! 🦄", 
      "Stress fears YOU! 🦸", 
      "You are a coding wizard! 🧙‍♂️", 
      "Take a deep breath, you're doing great! 🌬️"
    ];
    setCompliment(comps[Math.floor(Math.random() * comps.length)]);
    setStress(s => Math.max(0, s - 5));
  };

  const getFortune = () => {
    const fortunes = [
      "You will find a forgotten french fry in your bag. 🍟", 
      "A nap is in your near future. 😴", 
      "Someone thinks you're cute. 👀", 
      "Your bugs will magically fix themselves. 🐛", 
      "Coffee will taste extra good today. ☕", 
      "You will soon discover a new favorite song. 🎵"
    ];
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
    setStress(s => Math.max(0, s - 5));
  };

  const shake8Ball = () => {
    const responses = [
      "Outlook good, but drink water.", 
      "Don't count on it, but who cares?", 
      "Yes, absolutely! (Maybe)", 
      "Ask again after a nap.", 
      "Signs point to pizza. 🍕", 
      "My sources say: take a break.", 
      "Without a doubt, you got this."
    ];
    setBallText(responses[Math.floor(Math.random() * responses.length)]);
    setStress(s => Math.max(0, s - 2));
  };

  const smash = () => {
    setSmashScale(s => s + 0.1);
    setStress(s => Math.max(0, s - 2));
    setTimeout(() => setSmashScale(1), 150);
  };

  const splash = () => {
    const colors = [
      "bg-red-500/40", "bg-blue-500/40", "bg-emerald-500/40", 
      "bg-yellow-500/40", "bg-pink-500/40", "bg-purple-500/40", 
      "bg-orange-500/40", "bg-teal-500/40"
    ];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
    setStress(s => Math.max(0, s - 2));
  };

  if (!activeGame) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map(g => (
          <div key={g.id} onClick={() => setActiveGame(g.id)} className="bg-black/30 border border-white/10 p-6 rounded-2xl shine-effect shadow-[0_0_30px_rgba(0,0,0,0.3)] cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,139,250,0.4)] group text-center flex flex-col items-center justify-center min-h-[180px]">
            <div className="text-5xl mb-4 group-hover:animate-bounce">{g.icon}</div>
            <h3 className="text-xl font-bold glow-text">{g.name}</h3>
            <p className="text-white/60 text-sm mt-2">{g.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`border border-white/10 p-8 rounded-2xl shine-effect shadow-[0_0_40px_rgba(167,139,250,0.3)] relative transition-colors duration-500 ${activeGame === 'color' ? color : 'bg-black/30'}`}>
      <button onClick={() => setActiveGame(null)} className="absolute top-4 left-4 text-white/80 hover:text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition z-10">← Back to Games</button>
      
      <div className="mt-12 text-center min-h-[300px] flex flex-col items-center justify-center">
        {activeGame === "bubble" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">🫧 Bubble Wrap</h2>
            <div className="grid grid-cols-4 gap-4">
              {bubbles.map((popped, i) => (
                <button key={i} onClick={() => popBubble(i)} className={`w-16 h-16 rounded-full transition-all duration-300 ${popped ? 'bg-white/5 scale-90' : 'bg-blue-400/50 hover:bg-blue-300/60 shadow-[inset_0_-4px_6px_rgba(0,0,0,0.4)] hover:scale-110'}`}>
                  {popped ? '💥' : ''}
                </button>
              ))}
            </div>
            <button onClick={() => setBubbles(Array(16).fill(false))} className="mt-8 text-sm text-white/50 hover:text-white underline">Get new bubble wrap</button>
          </>
        )}

        {activeGame === "whack" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">🔨 Whack-a-Worry</h2>
            <p className="mb-4 text-white/70">Click the worry demon to smash it!</p>
            <div className="grid grid-cols-3 gap-2 bg-black/40 p-4 rounded-xl">
              {[0,1,2,3,4,5,6,7,8].map(i => (
                <div key={i} onClick={() => whack(i)} className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
                  {worryPos === i && <span className="text-4xl animate-bounce">👿</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {activeGame === "compliment" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">✨ Hype Machine</h2>
            <p className="text-2xl mb-8 min-h-[80px] flex items-center justify-center text-emerald-300 font-medium px-4">{compliment}</p>
            <button onClick={getCompliment} className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 rounded-full text-xl font-bold hover:scale-110 transition shadow-[0_0_20px_rgba(16,185,129,0.5)]">Hype Me Up!</button>
          </>
        )}

        {activeGame === "pet" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">🐱 Pet the Cat</h2>
            <p className="mb-4 text-white/70">Click to pet the cat for instant relaxation.</p>
            <div onClick={() => { setPetCount(p => p + 1); setStress(s => Math.max(0, s - 1)); }} className="text-8xl cursor-pointer hover:scale-110 transition active:scale-95 select-none">
              {petCount % 2 === 0 ? '😺' : '😸'}
            </div>
            <p className="mt-8 text-xl text-purple-300 font-medium">Purr level: {petCount} {petCount > 0 && '〰️'.repeat(Math.min(petCount, 10))}</p>
          </>
        )}

        {activeGame === "fortune" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">🥠 Fortune Cookie</h2>
            <p className="mb-4 text-white/70">Crack open the cookie for a fun prediction.</p>
            <div onClick={getFortune} className="text-8xl cursor-pointer hover:scale-110 transition active:scale-95 hover:rotate-12 select-none mb-8">
              🥠
            </div>
            <p className="text-2xl text-yellow-300 min-h-[60px] font-medium px-4">{fortune}</p>
          </>
        )}

        {activeGame === "8ball" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">🎱 Sassy 8-Ball</h2>
            <p className="mb-4 text-white/70">Think of a question, then click the 8-ball.</p>
            <div onClick={shake8Ball} className="w-40 h-40 bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition active:scale-95 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.2),0_0_30px_rgba(0,0,0,0.8)] mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-4xl">8</span>
              </div>
            </div>
            <p className="text-xl text-blue-300 min-h-[60px] font-medium px-4">{ballText}</p>
          </>
        )}

        {activeGame === "smash" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">😡 Rage Button</h2>
            <p className="mb-8 text-white/70">Take your frustration out on this button.</p>
            <button 
              onClick={smash} 
              style={{ transform: `scale(${smashScale})` }}
              className="bg-red-600 w-48 h-48 rounded-full text-4xl font-bold shadow-[0_10px_0_rgb(153,27,27),0_15px_20px_rgba(0,0,0,0.4)] active:shadow-[0_0px_0_rgb(153,27,27),0_0px_0px_rgba(0,0,0,0.4)] active:translate-y-[10px] transition-all"
            >
              SMASH
            </button>
          </>
        )}

        {activeGame === "color" && (
          <>
            <h2 className="text-3xl font-bold glow-text mb-6">🎨 Color Splash</h2>
            <p className="mb-8 text-white/90">Click the button to splash colors everywhere!</p>
            <button onClick={splash} className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full text-xl font-bold hover:bg-white/30 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Splash! 💦
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= MUSIC TRACK ================= */
function MusicTrack({ track, dark }: { track: { name: string, url: string }, dark: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleStopAll = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setTimeLeft(null);
    };
    window.addEventListener('stop-all-music', handleStopAll);
    return () => window.removeEventListener('stop-all-music', handleStopAll);
  }, []);

  useEffect(() => {
    let t: any;
    if (timeLeft !== null && timeLeft > 0 && isPlaying) {
      t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setTimeLeft(null);
    }
    return () => clearTimeout(t);
  }, [timeLeft, isPlaying]);

  return (
    <div className={`p-4 rounded-xl border ${dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">{track.name}</h3>
        <button 
          onClick={() => {
            if (timeLeft !== null) {
              setTimeLeft(null);
              if (audioRef.current) audioRef.current.pause();
            } else {
              setTimeLeft(240); // 4 mins
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }
            }
          }}
          className={`text-xs px-3 py-1 rounded-full transition ${timeLeft !== null ? "bg-rose-500 hover:bg-rose-400 text-white" : "bg-purple-500 hover:bg-purple-400 text-white"}`}
        >
          {timeLeft !== null ? `Stop (${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2, '0')})` : "Play 4 Min"}
        </button>
      </div>
      <audio 
        ref={audioRef}
        controls 
        loop 
        className="w-full h-10 outline-none" 
        src={track.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

/* ================= MAIN APP ================= */

export default function App() {
  const [page, setPage] = useState("login");
  const [stress, setStress] = useState(0);
  const [active, setActive] = useState("Home");
  const [mode, setMode] = useState("questions");
  const [timer, setTimer] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");

  /* ================= SAVE DATA ================= */
  useEffect(() => {
    localStorage.setItem("stress", stress.toString());
    localStorage.setItem("history", JSON.stringify(history));
  }, [stress, history]);

  useEffect(() => {
    const saved = localStorage.getItem("stress");
    const savedHistory = localStorage.getItem("history");
    if (saved) setStress(Number(saved));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  /* ================= QUESTIONS ================= */
  const questions = [
    {
      q: "How is your mind right now?",
      options: [
        { text: "Calm 😌", val: -10 },
        { text: "Okay 😐", val: 5 },
        { text: "Overthinking 😓", val: 15 },
      ],
    },
    {
      q: "How is your body feeling?",
      options: [
        { text: "Relaxed 🧘", val: -10 },
        { text: "Normal 🙂", val: 5 },
        { text: "Tense 😣", val: 10 },
      ],
    },
  ];

  /* ================= HANDLE ANSWERS ================= */
  const answer = (val: number) => {
    let newStress = Math.min(Math.max(stress + val, 0), 100);
    setStress(newStress);
    setHistory((h) => [...h.slice(-9), newStress]);

    if (newStress >= 100) {
      setMode("game");
      setTimer(60);
    } else if (newStress >= 60) {
      setMode("activity");
      setTimer(30);
    } else if (newStress >= 40) {
      setMode("breathing");
      setTimer(30);
    } else {
      setQIndex((prev) => (prev + 1) % questions.length);
    }
  };

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0 && mode !== "questions") {
      if (mode === "game") setStress(0);
      setMode("questions");
    }
  }, [timer, mode]);

  /* ================= LOGIN ================= */
  if (page === "login") {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-900 animate-gradient-xy text-white p-6">
        <div className="bg-black/20 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] w-full max-w-md border border-white/10 shine-effect animate-float">
          <h1 className="text-4xl font-bold mb-6 text-center glow-text flex items-center justify-center gap-3">
            <Feather className="w-10 h-10 text-purple-400" />
            Stress Relief
          </h1>
          <p className="text-center mb-8 text-white/80">Log in to track your mood and manage stress.</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 rounded-xl bg-white/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"/>
          <input type="password" placeholder="Password" className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"/>
          <button onClick={() => setPage("dashboard")} className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(167,139,250,0.6)] mt-4 relative overflow-hidden group">
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          </button>
          <p onClick={() => setPage("register")} className="mt-4 text-center cursor-pointer text-white/70 hover:text-white transition">
            Create account
          </p>
        </div>
      </div>
    );
  }

  /* ================= REGISTER ================= */
  if (page === "register") {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-900 animate-gradient-xy text-white p-6">
        <div className="bg-black/20 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] w-full max-w-md border border-white/10 shine-effect animate-float">
          <h1 className="text-4xl font-bold mb-6 text-center glow-text flex items-center justify-center gap-3">
            <Feather className="w-10 h-10 text-purple-400" />
            Register
          </h1>
          <input placeholder="Name" className="w-full p-3 mb-3 rounded-xl bg-white/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 rounded-xl bg-white/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"/>
          <input type="password" placeholder="Password" className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"/>
          <button onClick={() => setPage("login")} className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(167,139,250,0.6)] mt-4 relative overflow-hidden group">
            <span className="relative z-10">Register</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          </button>
        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${dark ? "bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-900 text-white" : "bg-slate-50 text-slate-900"}`}>

      {/* SIDEBAR */}
      <div className="w-72 p-6 shadow-2xl border-r flex flex-col relative transition-colors duration-500 bg-white border-slate-200 text-slate-900 z-20 sticky top-0 h-screen overflow-y-auto">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-100 to-transparent"></div>
        <h1 className="text-3xl font-bold mb-8 animate-pulse flex items-center gap-3 text-purple-500">
          <Feather className="w-8 h-8 text-purple-500" />
          Stress Relief
        </h1>

        <div className="flex-1 space-y-3 z-10">
          {["Dashboard","Home","Cognitive Exercises","Music","Focus","Daily Journal","Game","Progress"].map(i=>(
            <div 
              key={i} 
              onClick={()=>setActive(i)} 
              className={`p-4 rounded-xl cursor-pointer font-medium transition-all duration-300 hover:scale-105 flex items-center gap-3 ${
                active === i 
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-[0_0_20px_rgba(167,139,250,0.5)]" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="text-xl">
                {i === "Dashboard" ? "📊" : i === "Home" ? "🏠" : i === "Cognitive Exercises" ? "🧠" : i === "Music" ? "🎵" : i === "Focus" ? "🎯" : i === "Daily Journal" ? "📝" : i === "Game" ? "🎮" : "📈"}
              </span>
              {i}
            </div>
          ))}
        </div>
        <button onClick={()=>setDark(!dark)} className="mt-auto mb-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 text-left font-medium z-10 flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-800">
          <span className="text-xl">{dark ? "☀️" : "🌙"}</span>
          Toggle Theme
        </button>
        <button onClick={()=>setPage("login")} className="p-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(248,113,113,0.6)] text-left font-medium z-10 flex items-center gap-3">
          <span className="text-xl">🚪</span>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8 glow-text">{active}</h1>

        {/* DASHBOARD VIEW */}
        {active === "Dashboard" && (
          <div className="space-y-6">
            <div className={`p-8 rounded-2xl shine-effect shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/30 border border-white/10" : "bg-white border border-slate-200"}`}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(167,139,250,0.5)]">
                  👤
                </div>
                <div>
                  <h2 className="text-3xl font-bold glow-text">Welcome, {email ? email.split('@')[0] : 'User'}!</h2>
                  <p className={`text-lg mt-1 ${dark ? "text-white/70" : "text-slate-500"}`}>{email || 'Guest Account'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                  <h3 className="text-lg font-medium mb-2 opacity-70">Current Stress</h3>
                  <p className="text-4xl font-bold text-rose-400">{stress}%</p>
                </div>
                <div className={`p-6 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                  <h3 className="text-lg font-medium mb-2 opacity-70">Relaxation</h3>
                  <p className="text-4xl font-bold text-emerald-400">{100 - stress}%</p>
                </div>
                <div className={`p-6 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                  <h3 className="text-lg font-medium mb-2 opacity-70">Sessions Completed</h3>
                  <p className="text-4xl font-bold text-purple-400">{history.length}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-8 rounded-2xl shine-effect shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/30 border border-white/10" : "bg-white border border-slate-200"}`}>
                <h3 className="text-2xl font-bold mb-4 glow-text">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setActive("Home")} className="w-full p-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 font-medium transition text-left flex items-center gap-3">
                    <span>📝</span> Take Mood Check
                  </button>
                  <button onClick={() => {setMode("breathing"); setTimer(30);}} className="w-full p-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 font-medium transition text-left flex items-center gap-3">
                    <span>🧘</span> Quick Breathing (30s)
                  </button>
                  <button onClick={() => setActive("Game")} className="w-full p-4 rounded-xl bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 font-medium transition text-left flex items-center gap-3">
                    <span>🎮</span> Play a Mini Game
                  </button>
                </div>
              </div>
              
              <div className={`p-8 rounded-2xl shine-effect shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/30 border border-white/10" : "bg-white border border-slate-200"}`}>
                <h3 className="text-2xl font-bold mb-4 glow-text">Recent History</h3>
                <div className={`flex items-end gap-3 h-48 p-4 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                  {history.length === 0 ? (
                    <p className="text-center w-full opacity-50 self-center">No history yet.</p>
                  ) : (
                    history.slice(-7).map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                        <div 
                          style={{ height: `${Math.max(h, 5)}%` }} 
                          className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md transition-all duration-500"
                        ></div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STRESS BAR */}
        <div className={`mb-8 p-6 rounded-2xl border shine-effect ${dark ? "bg-black/20 border-white/5" : "bg-white border-slate-200 shadow-lg"}`}>
          <div className={`w-full h-8 rounded-full overflow-hidden border relative ${dark ? "bg-black/40 border-white/10" : "bg-slate-200 border-slate-300"}`}>
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-rose-500 transition-all duration-1000 ease-out relative"
              style={{ width: `${stress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-3 text-xl font-medium glow-text">Stress Level: {stress}%</p>
          
          {/* AI GUIDE */}
          <div className={`mt-4 p-4 rounded-xl font-medium text-lg ${dark ? "bg-purple-500/40 text-purple-100 border border-purple-400/30" : "bg-purple-100 text-purple-800 border border-purple-200"}`}>
            💡 AI Guide: {stress > 70 ? "Take a deep breath 🧘" : stress > 40 ? "Relax a bit 🌿" : "You are doing great 💜"}
          </div>
        </div>

        {/* HOME QUESTIONS */}
        {active==="Home" && mode==="questions" && (
          <div className={`p-8 rounded-2xl backdrop-blur-lg border shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/20 border-white/10" : "bg-white border-slate-200"}`}>
            <h2 className="mb-6 text-2xl font-medium">{questions[qIndex].q}</h2>
            <div className="space-y-4">
              {questions[qIndex].options.map((o,i)=>(
                <button key={i} onClick={()=>answer(o.val)} className="block w-full bg-purple-600/80 hover:bg-purple-500 p-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.5)] text-lg text-white">
                  {o.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BREATHING */}
        {mode==="breathing" && <Breathing timer={timer} />}

        {/* ACTIVITY */}
        {mode==="activity" && (
          <div className="text-center bg-yellow-300 text-black p-6 rounded-2xl">
            <h2 className="text-xl">🤸 Stretch Exercise</h2>
            <h1 className="text-5xl mt-4">{timer}s</h1>
          </div>
        )}

        {/* GAME */}
        {mode==="game" && (
          <div className="text-center bg-pink-400 p-6 rounded-2xl">
            <h2 className="text-xl">🎮 Tap Game</h2>
            <h1 className="text-4xl mt-2">{timer}s</h1>
            <button onClick={()=>setStress(s=>Math.max(0,s-5))} className="mt-4 bg-white text-black px-6 py-2 rounded hover:scale-110 transition">
              Tap 💥
            </button>
          </div>
        )}

        {/* EXERCISES */}
        {active==="Cognitive Exercises" && (
          <div className="grid md:grid-cols-2 gap-6">
            {["🧘 Yoga","💨 Breathing","🤸 Stretch","🚶 Walk", "🧩 Puzzle Solving", "🧠 Memory Match", "🤔 Riddles", "🔢 Sudoku"].map(e=>(
              <div 
                key={e} 
                onClick={() => {
                  setMode("activity");
                  setTimer(30);
                }}
                className={`border p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,139,250,0.4)] cursor-pointer ${dark ? "bg-black/30 border-white/10" : "bg-white border-slate-200"}`}
              >
                <h3 className="text-xl font-medium">{e}</h3>
                <p className={`mt-2 text-sm ${dark ? "text-white/50" : "text-slate-500"}`}>Click to start 30s timer</p>
              </div>
            ))}
          </div>
        )}

        {/* MUSIC */}
        {active==="Music" && (
          <div className={`border p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/30 border-white/10" : "bg-white border-slate-200"}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl glow-text m-0">Relaxing Sounds 🎧</h2>
              <button 
                onClick={() => window.dispatchEvent(new Event('stop-all-music'))}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "🌧️ Rain & Thunder", url: "https://assets.mixkit.co/active_storage/sfx/2391/2391-preview.mp3" },
                { name: "🌊 Ocean Waves", url: "https://assets.mixkit.co/active_storage/sfx/116/116-preview.mp3" },
                { name: "🔥 Crackling Fire", url: "https://assets.mixkit.co/active_storage/sfx/2398/2398-preview.mp3" },
                { name: "🐦 Forest Birds", url: "https://assets.mixkit.co/active_storage/sfx/2408/2408-preview.mp3" },
                { name: "🎹 Soft Piano", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
                { name: "💧 Water Stream", url: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" }
              ].map((track, i) => (
                <MusicTrack key={i} track={track} dark={dark} />
              ))}
            </div>
          </div>
        )}

        {/* FOCUS */}
        {active==="Focus" && <Focus />}

        {/* JOURNAL */}
        {active==="Daily Journal" && <Journal dark={dark} />}

        {/* GAME */}
        {active==="Game" && <MiniGames setStress={setStress} />}

        {/* PROGRESS */}
        {active==="Progress" && (
          <div className={`border p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] ${dark ? "bg-black/30 border-white/10" : "bg-white border-slate-200"}`}>
            <h2 className="text-3xl font-bold mb-6 glow-text">📊 Progress</h2>
            <div className="space-y-4 text-xl mb-8">
              <div className={`flex justify-between items-center p-4 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                <span>Current Stress</span>
                <span className="font-bold text-rose-400">{stress}%</span>
              </div>
              <div className={`flex justify-between items-center p-4 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                <span>Relaxation Level</span>
                <span className="font-bold text-emerald-400">{100 - stress}%</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 glow-text">📈 Stress History</h3>
            <div className={`flex items-end gap-4 h-40 p-6 rounded-xl ${dark ? "bg-white/5" : "bg-slate-50"}`}>
              {history.length === 0 ? (
                <p className="text-center w-full opacity-50">No history yet. Answer questions to track!</p>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div 
                      style={{ height: `${Math.max(h, 5)}%` }} 
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md"
                    ></div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= FOCUS MODE ================= */

function Focus(){
  const [time,setTime]=useState(300);
  const [run,setRun]=useState(false);

  useEffect(()=>{
    if(!run) return;
    const t=setInterval(()=>setTime(p=>p>0?p-1:0),1000);
    return ()=>clearInterval(t);
  },[run]);

  return(
    <div className="text-center bg-black/30 border border-white/10 p-10 rounded-2xl shine-effect shadow-[0_0_40px_rgba(167,139,250,0.3)] animate-float">
      <h2 className="text-3xl font-bold glow-text mb-4">🎯 Focus Mode</h2>
      <h1 className="text-6xl font-mono text-purple-300">{Math.floor(time/60)}:{(time%60).toString().padStart(2, '0')}</h1>
      
      <div className="flex gap-4 justify-center mt-8">
        <button onClick={()=>setRun(true)} className="bg-emerald-500/80 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]">Start</button>
        <button onClick={()=>setRun(false)} className="bg-yellow-500/80 hover:bg-yellow-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]">Pause</button>
        <button onClick={()=>{setTime(300);setRun(false)}} className="bg-rose-500/80 hover:bg-rose-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(244,63,94,0.6)]">Reset</button>
      </div>
    </div>
  )
}
