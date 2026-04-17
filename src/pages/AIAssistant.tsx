import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, AlertCircle, Loader2, Sparkles, Stethoscope } from 'lucide-react';
import { askHealthAssistant } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your J-Nexus Health AI Assistant. I can help you understand medical conditions, body systems, or explore healthy lifestyle choices. How can I assist you today?" }
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
    <div className="max-w-4xl mx-auto py-12 px-4 h-[calc(100vh-120px)] flex flex-col">
       <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4">
             <Sparkles className="w-4 h-4 mr-2" />
             AI Health Intelligence
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">Virtual Health Guide</h1>
          <p className="mt-2 text-slate-500">Ask questions about medical terms, symptoms, or preventive care.</p>
       </div>

       <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-blue-50 overflow-hidden flex flex-col">
          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
             {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                   <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-100 text-blue-600'
                      }`}>
                         {msg.role === 'user' ? <User className="text-white w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className={`p-4 rounded-3xl ${
                        msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                      }`}>
                         <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                   </div>
                </motion.div>
             ))}
             {loading && (
                <div className="flex justify-start">
                   <div className="bg-slate-50 text-blue-600 p-4 rounded-3xl flex items-center space-x-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm font-medium">Assistant is thinking...</span>
                   </div>
                </div>
             )}
          </div>

          {/* Warning Disclaimer */}
          <div className="px-6 py-2 bg-amber-50 border-y border-amber-100 flex items-center space-x-3 text-amber-800 text-[10px]">
             <AlertCircle className="w-3 h-3 shrink-0" />
             <p>This AI provides educational content only. It cannot diagnose or treat conditions. Always seek professional help in emergencies.</p>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gray-50/50">
             <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a health question... (e.g. Symptoms of anemia)"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm shadow-blue-50/50"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="absolute right-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                   <Send className="w-5 h-5" />
                </button>
             </div>
          </div>
       </div>

       <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button onClick={() => setInput("What causes high blood pressure?")} className="text-xs font-medium px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">"High BP causes?"</button>
          <button onClick={() => setInput("Describe the cardiovascular system.")} className="text-xs font-medium px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">"Cardiovascular system?"</button>
          <button onClick={() => setInput("Safe herbs for heart health")} className="text-xs font-medium px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">"Safe heart herbs?"</button>
       </div>
    </div>
  );
}
