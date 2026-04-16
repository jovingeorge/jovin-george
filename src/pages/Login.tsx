import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Lock, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || 'Guest User',
          email: user.email,
          role: 'client',
          createdAt: serverTimestamp()
        });
      }
      navigate('/account');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          name: name,
          email: email,
          role: 'client',
          createdAt: serverTimestamp()
        });
      }
      navigate('/account');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-104px)] bg-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] card-theme"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 justify-center mb-6">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-extrabold text-primary tracking-tight">J-Nexus</span>
          </Link>
          <h2 className="text-2xl font-bold text-text-main">
            {isLogin ? 'Welcome Back' : 'Join J-Nexus Health'}
          </h2>
          <p className="mt-2 text-text-muted text-sm leading-relaxed max-w-[300px] mx-auto">
            {isLogin ? 'Continue your health journey with our specialized clinical tools.' : 'Create an account to access premium cardiology guides and AI tools.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-[13px] font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-text-muted px-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-border-theme rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20"
                placeholder="Jovin George"
              />
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-text-muted px-1">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted opacity-40" />
               <input
                 type="email"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 border border-border-theme rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20"
                 placeholder="name@example.com"
               />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-text-muted px-1">Password</label>
            <div className="relative">
               <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted opacity-40" />
               <input
                 type="password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 border border-border-theme rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20"
                 placeholder="••••••••"
               />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-theme-primary flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4 text-xs font-bold text-text-muted uppercase tracking-widest">
           <div className="h-[1px] bg-border-theme flex-1"></div>
           <span>Or</span>
           <div className="h-[1px] bg-border-theme flex-1"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-white border border-border-theme rounded-lg text-sm font-semibold text-text-main hover:bg-bg transition-colors shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-text-muted">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
