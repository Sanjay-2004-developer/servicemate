import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success("Welcome Back!");
      // Navigate based on role saved in DB
      navigate(res.data.user.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard');
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const res = await axios.post('http://localhost:8080/api/auth/google-login', {
        email: decoded.email
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      toast.success(`Welcome back, ${res.data.user.name}`);
      navigate(res.data.user.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard');
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Account not found. Please sign up first!");
        setTimeout(() => navigate('/signup'), 2000);
      } else {
        toast.error("Google Login failed. Please try again.");
      }
    }
  };

  return (
    <LiveBackground>
      <div className="flex min-h-screen">
        {/* Sidebar Info */}
        <div className="glass-sidebar hidden lg:flex">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white">ServiceMate</h1>
            <p className="text-slate-400 text-lg leading-relaxed">Join the elite network of service professionals and customers.</p>
          </motion.div>
        </div>

        {/* Login Form Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md space-y-8 bg-slate-900/40 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2 font-display">Welcome Back</h2>
              <p className="text-slate-500 text-sm">Access your secure dashboard</p>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="premium-input-wrapper group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-500" size={20} />
                <input 
                  className="premium-input" 
                  type="email" 
                  placeholder="Email Address" 
                  onChange={e => setForm({...form, email: e.target.value})} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="premium-input-wrapper group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-500" size={20} />
                  <input 
                    className="premium-input" 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setForm({...form, password: e.target.value})} 
                    required 
                  />
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" size="sm" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Forgot Password?</Link>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-glow flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Secure Gateway</span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {/* Google Login - No role required here anymore */}
            <div className="flex justify-center">
              <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={() => toast.error("Google Login Failed")} 
                theme="filled_blue"
                shape="pill"
                width="340"
              />
            </div>

            <p className="text-center text-slate-500 text-sm">
              Don't have an account? <Link to="/signup" className="text-indigo-400 font-bold hover:underline transition-all">Create Account</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </LiveBackground>
  );
};

export default Login;