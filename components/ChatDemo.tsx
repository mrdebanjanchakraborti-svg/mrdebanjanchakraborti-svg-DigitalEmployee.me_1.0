
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Neural link established. I'm your Digital Architecture Agent. Tell me which industry you're in, and I'll show you how we can automate your revenue." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a professional Deployment Architect for 'DigitalEmployee.me'. Your mission is to convince local business owners of the value of custom Generative AI agents. 
          Context: We serve 7 sectors: Healthcare, Professional Services (incl. CAs/Tax), Education, Food/Hospitality, Personal Care, Retail, and Home Services.
          Voice: Direct, silicon valley standard, ROI-focused, and confident. 
          Rules:
          - Use industry-specific terminology.
          - Be brief. Maximum 2 sentences.
          - End by suggesting they book a 'Neural Audit' below.`,
          temperature: 0.7,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection lost. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Deployment nodes are at capacity. Please book an audit session via the form below." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
              <span className="inline-block bg-red-600 px-6 py-2 transform -skew-x-2 mb-4">Experience Local Intelligence.</span>
              <br/>Test our neural reasoning core live.
            </h3>
            <p className="text-slate-400 text-lg mb-10 max-w-xl font-light leading-relaxed">
              Interact with our deployment architect. Describe your business friction, and watch how we map out a 24/7 autonomous workforce solution in seconds.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
               {['Healthcare', 'Real Estate', 'Retail'].map(industry => (
                 <button 
                  key={industry}
                  onClick={() => setInput(industry)}
                  className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:border-red-500 transition-all"
                 >
                   {industry}
                 </button>
               ))}
            </div>
          </div>

          {/* Right Side: Phone Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3.5rem] p-3 border-[6px] border-slate-800 shadow-[0_0_80px_rgba(239,68,68,0.1)] outline outline-1 outline-white/10">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800 ml-auto mr-4"></div>
              </div>

              {/* Status Bar */}
              <div className="absolute top-8 left-0 right-0 px-8 flex justify-between items-center z-20">
                <span className="text-[10px] font-black text-white/40">9:41</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-3 h-1.5 bg-white/20 rounded-[2px] relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-3/4 bg-white/60"></div>
                  </div>
                  <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                </div>
              </div>

              {/* Phone Content (Screen) */}
              <div className="w-full h-full bg-[#020617] rounded-[2.8rem] overflow-hidden flex flex-col pt-16 border border-white/5 relative">
                
                {/* Chat Header */}
                <div className="px-6 pb-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-xs font-black shadow-lg shadow-red-600/20">DE</div>
                  <div>
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Architect Agent</div>
                    <div className="text-[8px] text-green-500 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth no-scrollbar">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-[11px] leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/10' 
                          : 'bg-slate-900 text-slate-300 border border-white/5'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900 px-4 py-3 rounded-2xl border border-white/5">
                        <span className="flex gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></span>
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-900/50 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type industry..."
                      className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white focus:outline-none focus:border-red-600 transition-all font-medium"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isTyping}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-red-600/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </button>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="h-1.5 w-32 bg-white/10 rounded-full mx-auto mb-2 mt-2"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
