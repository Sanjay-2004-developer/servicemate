import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Wrench, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';

const Home = () => {
  return (
    <LiveBackground>
      <div className="min-h-screen px-5 py-6 sm:px-8 lg:px-12">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/45 px-4 py-3 backdrop-blur-xl sm:px-6">
          <Link to="/" className="text-xl font-black tracking-tight text-white">
            ServiceMate
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-white"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-200"
            >
              Sign Up
            </Link>
          </nav>
        </header>

        <main className="mx-auto grid min-h-[calc(100vh-120px)] w-full max-w-7xl items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
              Home Services Platform
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Book trusted services and manage every job in one place.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              ServiceMate helps customers find providers faster and gives professionals a cleaner workspace for handling requests, schedules, and follow-ups.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="btn-glow w-auto min-w-[180px] px-6">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="flex min-w-[180px] items-center justify-center rounded-[1.35rem] border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-2xl"
          >
            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck className="text-cyan-200" size={22} />
                <h2 className="mt-4 text-xl font-bold text-white">Secure customer and provider access</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Separate role-based flows with a simple entry point and cleaner account setup.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <Users className="text-cyan-200" size={22} />
                  <h3 className="mt-4 text-lg font-bold text-white">For customers</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Request help, track progress, and stay connected with service providers.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <Wrench className="text-cyan-200" size={22} />
                  <h3 className="mt-4 text-lg font-bold text-white">For providers</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Organize incoming work, manage your service type, and respond faster.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </LiveBackground>
  );
};

export default Home;
