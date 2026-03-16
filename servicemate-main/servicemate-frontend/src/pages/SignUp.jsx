import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Briefcase, ArrowRight, ShieldCheck, ChevronDown, Loader2, CheckCircle2, Timer } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  
  // Timer State
  const [timer, setTimer] = useState(0);
  
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', role: 'customer', phone: '', serviceType: '' 
  });

  // Countdown Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!form.email || !form.email.includes('@')) return toast.error("Please enter a valid email");
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/signup-otp', { email: form.email });
      setOtpSent(true);
      setTimer(60); // Start 60-second countdown
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error(err.response?.data || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/verify-otp', { email: form.email, otp: enteredOtp });
      setIsVerified(true);
      setTimer(0); // Stop timer on success
      toast.success("Email verified!");
    } catch (err) {
      toast.error("Invalid or Expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) return toast.error("Please verify your email first!");
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/signup', form);
      toast.success("Registration successful!");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LiveBackground>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="glass-sidebar hidden lg:flex">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white">ServiceMate</h1>
            <p className="text-slate-400 text-lg leading-relaxed text-white">The future of professional services.</p>
          </motion.div>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">Get Started</h2>
              <p className="text-slate-500 text-sm">Create your ServiceMate profile</p>
            </div>

            <div className="flex gap-4 p-1 bg-white/5 rounded-2xl border border-white/10">
              {['customer', 'provider'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all capitalize ${
                    form.role === r ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="premium-input-wrapper group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input className="premium-input text-white" placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>

              {/* Email + Send OTP Button with Timer */}
              <div className="premium-input-wrapper group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  className={`premium-input text-white ${!isVerified ? 'pr-28' : 'pr-12'}`}
                  type="email" 
                  placeholder="Email Address" 
                  disabled={otpSent || isVerified}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  required 
                />
                {!isVerified && (
                  <button 
                    type="button" 
                    onClick={handleSendOtp}
                    disabled={loading || timer > 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl disabled:opacity-50 disabled:bg-slate-700"
                  >
                    {loading && timer === 0 ? <Loader2 className="animate-spin" size={14} /> : (timer > 0 ? `${timer}s` : "Send OTP")}
                  </button>
                )}
                {isVerified && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={20} />}
              </div>

              <AnimatePresence>
                {otpSent && !isVerified && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex gap-2">
                    <input className="premium-input text-center text-white tracking-[0.3em]" placeholder="OTP" maxLength="6" onChange={(e) => setEnteredOtp(e.target.value)} />
                    <button type="button" onClick={handleVerifyOtp} className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold">Verify</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {form.role === 'provider' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="premium-input-wrapper group relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <select
                      className="premium-input text-white appearance-none cursor-pointer pr-10"
                      onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                      required={form.role === 'provider'}
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-[#0a0a0c]">Select Specialty</option>
                      <option value="plumbing" className="bg-[#0a0a0c]">Plumbing</option>
                      <option value="electrical" className="bg-[#0a0a0c]">Electrical</option>
                      <option value="cleaning" className="bg-[#0a0a0c]">Cleaning</option>
                      <option value="carpentry" className="bg-[#0a0a0c]">Carpentry</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="premium-input-wrapper group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input className="premium-input text-white" placeholder="Phone Number" onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>

              <div className="premium-input-wrapper group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input className="premium-input text-white" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>

              <button 
                type="submit" 
                disabled={!isVerified || loading} 
                className={`btn-glow w-full mt-4 flex items-center justify-center gap-2 ${!isVerified ? 'opacity-50' : ''}`}
              >
                {loading && isVerified ? <Loader2 className="animate-spin" /> : <>Register Account <ArrowRight size={20} /></>}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm">
              Already have an account? <Link to="/login" className="text-indigo-400 font-bold hover:underline">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </LiveBackground>
  );
};

export default SignUp;