import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle, eyebrow }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_30px_80px_rgba(3,7,18,0.45)] backdrop-blur-2xl sm:p-8"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"
            >
              <ChevronLeft size={14} />
              Back
            </Link>
            <Link to="/" className="text-lg font-black tracking-tight text-white">
              ServiceMate
            </Link>
            <div className="w-[58px]" />
          </div>
          <div className="mt-5 text-center">
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {subtitle}
          </p>
          </div>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
