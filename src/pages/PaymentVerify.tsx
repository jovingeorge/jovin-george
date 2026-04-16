import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { auth } from '../lib/firebase';
import Logo from '../components/Logo';

export default function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('Verifying your Nexus transaction signal...');

  useEffect(() => {
    const verify = async () => {
      // Flutterwave sends status=successful and transaction_id
      const flwStatus = searchParams.get('status');
      const txId = searchParams.get('transaction_id');

      if (!auth.currentUser) {
        // Wait a bit if auth is still initializing
        setTimeout(() => {
           if (!auth.currentUser) {
              setStatus('failed');
              setMessage('User authentication lost. Please login again.');
           }
        }, 2000);
      }

      // Check access with backend
      try {
        const response = await fetch(`/api/access/check?email=${auth.currentUser?.email}`);
        const data = await response.json();

        if (data.access) {
          setStatus('success');
          setMessage('Intelligence access granted. Synchronizing systems.');
        } else {
          // If not verified yet (webhook might be slow), poll a few times
          let attempts = 0;
          const poll = setInterval(async () => {
             attempts++;
             const pollResp = await fetch(`/api/access/check?email=${auth.currentUser?.email}`);
             const pollData = await pollResp.json();
             if (pollData.access) {
                clearInterval(poll);
                setStatus('success');
                setMessage('Intelligence access granted. Synchronizing systems.');
             } else if (attempts > 5) {
                clearInterval(poll);
                setStatus('failed');
                setMessage('Payment verification pending. Please check your account in a few minutes or contact support if the issue persists.');
             }
          }, 3000);
        }
      } catch (err) {
        setStatus('failed');
        setMessage('Network error during clinical verification.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-3xl border border-slate-50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Logo className="w-48 h-48" />
        </div>

        {status === 'loading' && (
          <div className="relative z-10 py-8">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-8" />
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Verifying Payment</h2>
            <p className="text-slate-500 font-bold leading-relaxed italic">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="relative z-10 py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center text-emerald-600 mx-auto mb-8">
               <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Access Granted</h2>
            <p className="text-slate-500 font-bold leading-relaxed mb-10 italic">{message}</p>
            <button 
              onClick={() => navigate('/account')}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-colors shadow-xl"
            >
              Go to Intelligence Dashboard
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="relative z-10 py-8">
            <div className="w-16 h-16 bg-rose-100 rounded-[1.5rem] flex items-center justify-center text-rose-600 mx-auto mb-8">
               <XCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Verification Pending</h2>
            <p className="text-slate-500 font-bold leading-relaxed mb-10 italic">{message}</p>
            <div className="space-y-4">
               <button 
                  onClick={() => navigate('/ebooks')}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-600 transition-colors"
               >
                  Back to Publications
               </button>
               <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
               >
                  Retry Verification
               </button>
            </div>
          </div>
        )}

        <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-center gap-3 text-slate-400">
           <ShieldCheck className="w-5 h-5 text-emerald-500" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bank-Grade Security</span>
        </div>
      </motion.div>
    </div>
  );
}
