import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, AlertCircle, Loader2, Sparkles, Stethoscope, Zap, ShieldCheck } from 'lucide-react';
import { askHealthAssistant } from '../services/gemini';
import Logo from '../components/Logo';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "SYSTEM ONLINE. I am the J-Nexus Clinical Intelligence Model. I can assist you with advanced diagnostics, heart care protocols, and herbal pharmacology insights. How can I serve your health today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await askHealthAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen pb-24 flex flex-col pt-32">
       <div className="max-w-4xl mx-auto w-full px-6 flex-1 flex flex-col">
          <div className="mb-12 text-center relative">
             <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-10" />
             <div className="bg-bg px-8 inline-block">
                <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                   <ShieldCheck className="w-4 h-4 mr-2 text-secondary" />
                   Nexus Neural Network v2.0
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                   Clinical <span className="text-secondary italic">Intelligence</span>
                </h1>
                <p className="mt-4 text-slate-400 font-bold italic tracking-tight">Access high-capacity diagnostic logic across 150+ medical domains.</p>
             </div>
          </div>

          <div className="flex-1 bg-white rounded-[4rem] shadow-4xl shadow-slate-200 border border-slate-50 overflow-hidden flex flex-col relative">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Logo className="w-96 h-96" />
             </div>

             {/* Chat Messages */}
             <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar relative z-10">
                {messages.map((msg, i) => (
                   <motion.div
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     key={i}
                     className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                      <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-6`}>
                         <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl ${
                           msg.role === 'user' ? 'bg-slate-900 shadow-slate-300' : 'bg-white border border-slate-100 text-secondary'
                         }`}>
                            {msg.role === 'user' ? <User className="text-white w-6 h-6" /> : <Bot className="w-6 h-6" />}
                         </div>
                         <div className={`p-8 rounded-[2.5rem] ${
                           msg.role === 'user' 
                             ? 'bg-slate-900 text-white rounded-tr-none shadow-3xl' 
                             : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100 italic font-bold leading-relaxed'
                         }`}>
                            <p className="text-sm md:text-base whitespace-pre-wrap tracking-tight">{msg.content}</p>
                            {msg.role === 'assistant' && (
                               <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                  <Zap className="w-3 h-3" />
                                  Processed by J-Nexus Core
                               </div>
                            )}
                         </div>
                      </div>
                   </motion.div>
                ))}
                {loading && (
                   <div className="flex justify-start">
                      <div className="bg-emerald-50 text-emerald-600 p-6 rounded-[2rem] flex items-center space-x-4 border border-emerald-100 shadow-xl shadow-emerald-500/5">
                         <Loader2 className="w-5 h-5 animate-spin" />
                         <span className="text-xs font-black uppercase tracking-widest">Neural weights synchronizing...</span>
                      </div>
                   </div>
                )}
             </div>

             {/* Warning Disclaimer */}
             <div className="px-10 py-5 bg-rose-50 border-y border-rose-100 flex items-center space-x-4 text-rose-800 text-[10px] font-black uppercase tracking-[0.1em] relative z-20">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <p>Clinical Intelligence Warning: This AI is for educational logic only. Not a substitute for a physical examination by Dr. Jovin George Mabunga.</p>
             </div>

             {/* Input Area */}
             <div className="p-10 bg-white relative z-20">
                <div className="relative flex items-center">
                   <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                     placeholder="State your clinical query (e.g. Analysis of T2 Diabetes complications)..."
                     className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 pr-24 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-black text-slate-900 tracking-tighter placeholder:text-slate-300 shadow-inner"
                     disabled={loading}
                   />
                   <button
                     onClick={handleSend}
                     disabled={loading}
                     className="absolute right-4 p-5 bg-slate-900 text-white rounded-[1.5rem] hover:bg-primary transition-all disabled:opacity-50 shadow-2xl group"
                   >
                      <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </button>
                </div>
             </div>
          </div>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">
             {[
               "What causes myocardial infarction?",
               "Herbal protocols for stress reduction",
               "Explain body system synergy",
               "Dr Jovin's clinical philosophy"
             ].map((suggest, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(suggest)} 
                  className="text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:border-secondary hover:text-secondary hover:-translate-y-1 transition-all shadow-xl shadow-slate-100"
                >
                   "{suggest}"
                </button>
             ))}
          </div>
       </div>
    </div>
  );
}
