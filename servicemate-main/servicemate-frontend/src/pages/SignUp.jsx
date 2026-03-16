import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Briefcase, ArrowRight, ShieldCheck, ChevronDown, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [timer, setTimer] = useState(0);
  
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'customer', 
    phone: '', 
    serviceType: '' 
  });

  // Timer logic for manual OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Google Sync (Auto-fills name/email, keeps password/phone empty)
  const handleGoogleSync = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setForm({
        ...form,
        name: decoded.name,
        email: decoded.email,
        password: '' // Kept empty for user to fill
      });
      setIsVerified(true); // Google email is pre-verified
      toast.success("Details synced! Please set your phone number and password.");
    } catch (err) {
      toast.error("Google Sync failed");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setForm({ ...form, phone: value });
    }
  };

  const handleSendOtp = async () => {
    if (!form.email.includes('@')) return toast.error("Invalid email");
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/signup-otp', { email: form.email });
      setOtpSent(true);
      setTimer(60);
      toast.success("OTP Sent!");
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
      toast.success("Verified!");
    } catch (err) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) return toast.error("Phone must be 10 digits");
    if (!form.password) return toast.error("Please set a password");
    if (form.role === 'provider' && !form.serviceType) return toast.error("Please select a specialty");
    
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/signup', form);
      toast.success("Registration Successful!");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LiveBackground>
      <div className="flex min-h-screen items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md space-y-6 bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
            <p className="text-slate-400 text-sm mb-6">Create your ServiceMate profile</p>
            
            <div className="flex justify-center mb-6">
              <GoogleLogin 
                onSuccess={handleGoogleSync}
                onError={() => toast.error("Google Sync Failed")}
                text="signup_with"
                shape="pill"
                theme="filled_blue"
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">Or fill manually</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Switcher */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
              {['customer', 'provider'].map(r => (
                <button 
                  key={r} 
                  type="button" 
                  onClick={() => setForm({...form, role: r})} 
                  className={`flex-1 py-2 rounded-xl capitalize font-bold transition-all ${form.role === r ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Full Name */}
            <div className="premium-input-wrapper group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input className="premium-input" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>

            {/* Email */}
            <div className="premium-input-wrapper group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                className="premium-input pr-24" 
                type="email" 
                placeholder="Email Address" 
                value={form.email}
                disabled={isVerified}
                onChange={e => setForm({...form, email: e.target.value})} 
                required 
              />
              {!isVerified && (
                <button 
                  type="button" 
                  onClick={handleSendOtp} 
                  disabled={timer > 0 || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl disabled:opacity-50 transition-colors"
                >
                  {timer > 0 ? `${timer}s` : "Send OTP"}
                </button>
              )}
              {isVerified && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={20} />}
            </div>

            {/* OTP Verification */}
            <AnimatePresence>
              {otpSent && !isVerified && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex gap-2 overflow-hidden">
                  <input className="premium-input text-center tracking-widest font-bold" placeholder="6-digit OTP" onChange={e => setEnteredOtp(e.target.value)} />
                  <button type="button" onClick={handleVerifyOtp} className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm">Verify</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Specialty (Provider Only) */}
            <AnimatePresence>
              {form.role === 'provider' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="premium-input-wrapper group relative overflow-hidden">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <select
                    className="premium-input appearance-none cursor-pointer pr-10"
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    required={form.role === 'provider'}
                    value={form.serviceType}
                  >
                    <option value="" disabled className="bg-[#0a0a0c]">Select Specialty</option>
                    <option value="plumbing" className="bg-[#0a0a0c]">🚰 Plumbing</option>
                    <option value="electrical" className="bg-[#0a0a0c]">⚡ Electrical</option>
                    <option value="cleaning" className="bg-[#0a0a0c]">🧹 Cleaning</option>
                    <option value="carpentry" className="bg-[#0a0a0c]">🪑 Carpentry</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Number */}
            <div className="premium-input-wrapper group relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-700 pr-2">+91</span>
              <input 
                className="premium-input pl-24" 
                placeholder="Mobile Number" 
                value={form.phone}
                onChange={handlePhoneChange}
                required 
              />
            </div>

            {/* Manual Password */}
            <div className="premium-input-wrapper group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                className="premium-input" 
                type="password" 
                placeholder="Set Password" 
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})} 
                required 
              />
            </div>

            <button type="submit" disabled={!isVerified || loading} className="btn-glow w-full flex items-center justify-center gap-2 mt-4">
              {loading ? <Loader2 className="animate-spin" size={20}/> : <>Register Account <ArrowRight size={20}/></>}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            Already have an account? <Link to="/login" className="text-indigo-400 font-bold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </LiveBackground>
  );
};

export default SignUp;