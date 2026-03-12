import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success("Welcome Back!");
      navigate(res.data.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard');
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <LiveBackground>
      <div className="flex min-h-screen">
        <div className="glass-sidebar">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white">ServiceMate</h1>
            <p className="text-slate-400 text-lg">The future of professional services.</p>
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md space-y-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-3">Welcome Back</h2>
              <p className="text-slate-500">Securely sign in to your workspace</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="premium-input-wrapper group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400" size={20} />
                <input className="premium-input" type="email" placeholder="Email Address" onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              
              <div className="space-y-2">
                <div className="premium-input-wrapper group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400" size={20} />
                  <input className="premium-input" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
                </div>
                
                {/* Added Forgot Password Link */}
                <div className="flex justify-end">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button type="submit" className="btn-glow">Sign In <ArrowRight size={20} /></button>
            </form>
            <p className="text-center text-slate-500">New here? <Link to="/signup" className="text-indigo-400 font-bold hover:underline">Create Account</Link></p>
          </motion.div>
        </div>
      </div>
    </LiveBackground>
  );
};
export default Login;