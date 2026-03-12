import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-950">
      {/* Left Side: Dark Branding */}
      <div className="hidden lg:flex bg-slate-900 items-center justify-center p-12 text-white relative overflow-hidden border-r border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-900/40">
            <Sparkles size={32} />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            ServiceMate
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The future of professional services is dark, sleek, and efficient.
          </p>
        </div>
      </div>

      {/* Right Side: Dark Form */}
      <div className="flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-slate-400 mt-2 font-medium">{subtitle}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;