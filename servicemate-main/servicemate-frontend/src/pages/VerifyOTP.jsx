import React, { useState, useRef, useEffect } from 'react';
import { Timer, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) navigate('/forgot-password');
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) return toast.error("OTP Expired!");
    try {
      await axios.post('http://localhost:8080/api/auth/verify-otp', { email, otp: otp.join('') });
      toast.success("Verified!");
      navigate('/reset-password', { state: { email } });
    } catch (err) { toast.error("Invalid OTP"); }
  };

  return (
    <LiveBackground>
      <div className="flex min-h-screen items-center justify-center bg-slate-950/50 p-6">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Verify OTP</h2>
          <p className="text-slate-400 mb-6 flex items-center gap-2">
            <Timer size={18} className={timeLeft < 10 ? 'text-red-500' : 'text-indigo-400'} />
            Expires in: 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </p>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((d, i) => (
              <input key={i} ref={el => inputRefs.current[i] = el} type="text" maxLength="1" 
                className="w-12 h-14 bg-slate-800 border border-slate-700 text-white text-center text-xl rounded-xl focus:border-indigo-500 outline-none"
                value={d} onChange={e => {
                  const n = [...otp]; n[i] = e.target.value.slice(-1); setOtp(n);
                  if(e.target.value && i < 5) inputRefs.current[i+1].focus();
                }}
              />
            ))}
          </div>
          <button onClick={handleVerify} disabled={timeLeft === 0} className="btn-glow w-full">Verify Code <ArrowRight /></button>
        </div>
      </div>
    </LiveBackground>
  );
};
export default VerifyOTP;