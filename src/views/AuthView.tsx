import React from 'react';
import { Button } from '../components/ui/core';
import { Zap, ArrowRight, ShieldCheck, Globe, Smartphone, Sparkles } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { toast } from 'sonner';

export const AuthView = () => {
  const handleLogin = async () => {
    const promise = signInWithPopup(auth, googleProvider);
    toast.promise(promise, {
      loading: 'Authenticating your secure session...',
      success: 'Welcome to LeadFlow Africa!',
      error: 'Authentication failed. Please try again.'
    });
    
    try {
      await promise;
    } catch (e) {
      console.error("Auth error:", e);
    }
  };

  const handleAppleLogin = () => {
    toast.info("Apple Sign-In is pending App Store verification.");
  };

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      {/* Brand Side */}
      <div className="hidden lg:flex w-1/2 bg-green-700 relative flex-col justify-between p-16 text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-white">
          <Sparkles size={400} />
        </div>
        
        <div className="relative z-10">
           <h1 className="text-3xl font-black flex items-center gap-2 mb-2">
             <Zap className="fill-white" /> LeadFlow Africa
           </h1>
           <p className="text-green-100 font-medium opacity-80">The Sales Operating System for Africa's Leading SMEs.</p>
        </div>

        <div className="relative z-10 space-y-8">
           <div className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><Globe size={20} /></div>
             <div>
               <h4 className="font-bold">Multi-Channel Ready</h4>
               <p className="text-xs text-green-100/60 leading-relaxed">Integrated with WhatsApp Cloud API, Zirzir & Mobile Money.</p>
             </div>
           </div>
           <div className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><Sparkles size={20} /></div>
             <div>
               <h4 className="font-bold">AI Powered Intelligence</h4>
               <p className="text-xs text-green-100/60 leading-relaxed">Auto-scoring leads and suggesting optimized sales replies.</p>
             </div>
           </div>
           <div className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><Smartphone size={20} /></div>
             <div>
               <h4 className="font-bold">Mobile Money Native</h4>
               <p className="text-xs text-green-100/60 leading-relaxed">Accept payments via MTN & Airtel directly in chat.</p>
             </div>
           </div>
        </div>

        <div className="text-[10px] uppercase font-bold tracking-widest text-green-200/40 opacity-50 relative z-10">
          © 2026 LeadFlow Africa Inc • Trusted by 5,000+ Businesses
        </div>
      </div>

      {/* Login Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-100 mb-4">
               <Zap className="fill-white text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-green-800 tracking-tighter">LeadFlow Africa</h1>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">Get Connected.</h2>
            <p className="text-slate-500 font-medium text-sm">Join LeadFlow Africa today and start scaling your sales.</p>
          </div>

          <div className="grid gap-4">
            <Button onClick={handleLogin} className="w-full h-12 gap-3 text-sm font-bold shadow-md shadow-green-100 hover:scale-[1.01] active:scale-[0.99] transition-transform">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-1" />
              Continue with Google
            </Button>
            <Button 
              onClick={handleAppleLogin}
              variant="outline" 
              className="w-full h-12 gap-3 text-sm font-bold border-gray-200 hover:bg-black hover:text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg viewBox="0 0 384 512" className="w-4 h-4 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              Continue with Apple
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 px-2 text-slate-400 font-bold tracking-widest">Enterprise Only</span></div>
            </div>
            <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-400 cursor-not-allowed">
              Single Sign-On (SSO)
            </Button>
          </div>

          <p className="px-4 sm:px-8 text-center text-xs text-slate-400 leading-relaxed">
            By clicking continue, you agree to our <span className="underline underline-offset-4 hover:text-slate-900 cursor-pointer">Terms of Service</span> and <span className="underline underline-offset-4 hover:text-slate-900 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
