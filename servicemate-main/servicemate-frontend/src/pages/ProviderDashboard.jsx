import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  IndianRupee,
  LogOut,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  ToggleLeft,
  ToggleRight,
  Users,
  Wrench,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';

const pipeline = [
  {
    id: 1,
    customer: 'Priya Sharma',
    service: 'Fan wiring inspection',
    time: 'Today, 5:00 PM',
    location: 'Koramangala, Bangalore',
    status: 'New lead',
  },
  {
    id: 2,
    customer: 'Rahul Menon',
    service: 'AC service follow-up',
    time: 'Today, 7:30 PM',
    location: 'Indiranagar, Bangalore',
    status: 'Confirmed',
  },
  {
    id: 3,
    customer: 'Nisha Verma',
    service: 'Switchboard replacement',
    time: '17 Mar, 11:00 AM',
    location: 'HSR Layout, Bangalore',
    status: 'Awaiting quote',
  },
];

const weeklySchedule = [
  { day: 'Mon', jobs: 4 },
  { day: 'Tue', jobs: 3 },
  { day: 'Wed', jobs: 5 },
  { day: 'Thu', jobs: 2 },
  { day: 'Fri', jobs: 6 },
  { day: 'Sat', jobs: 4 },
];

const reviews = [
  {
    name: 'Ananya',
    note: 'Arrived on time and fixed the issue in one visit.',
    rating: '5.0',
  },
  {
    name: 'Vikram',
    note: 'Clear communication, clean work and fair pricing.',
    rating: '4.9',
  },
];

const statCards = [
  {
    label: 'Pending requests',
    value: '12',
    icon: Users,
  },
  {
    label: 'Completed this week',
    value: '18',
    icon: BadgeCheck,
  },
  {
    label: 'Weekly earnings',
    value: 'Rs 24,800',
    icon: IndianRupee,
  },
];

const statusClasses = {
  'New lead': 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200',
  Confirmed: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
  'Awaiting quote': 'border-amber-300/20 bg-amber-300/10 text-amber-200',
};

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <LiveBackground>
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                <Sparkles size={14} />
                Provider Operations
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-2xl font-black text-white">
                  {user?.name?.[0] || 'P'}
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    {user?.name || 'Service Professional'}
                  </h1>
                  <p className="mt-2 text-sm text-slate-300 sm:text-base">
                    {user?.serviceType || 'General'} expert dashboard with live demand, earnings and schedule visibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() => setIsAvailable((current) => !current)}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.08]"
              >
                {isAvailable ? <ToggleRight size={18} className="text-emerald-300" /> : <ToggleLeft size={18} className="text-slate-500" />}
                {isAvailable ? 'Available for new jobs' : 'Currently offline'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {statCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="rounded-3xl border border-white/8 bg-black/20 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <Icon size={18} className="text-slate-300" />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.header>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Incoming job pipeline</h2>
                  <p className="mt-1 text-sm text-slate-400">Review your newest requests and upcoming visits.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  <ShieldCheck size={14} />
                  Verified provider
                </div>
              </div>

              <div className="space-y-4">
                {pipeline.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.24 + index * 0.08 }}
                    className="rounded-3xl border border-white/8 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{job.service}</p>
                        <p className="mt-1 text-sm text-slate-300">{job.customer}</p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusClasses[job.status] || 'border-white/10 bg-white/5 text-slate-200'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        <span>{job.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                      >
                        Accept job
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                      >
                        Send quote
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white">Customer feedback</h2>
                <p className="mt-1 text-sm text-slate-400">Recent ratings that shape your visibility.</p>
              </div>

              <div className="grid gap-4">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34 + index * 0.08 }}
                    className="rounded-3xl border border-white/8 bg-black/20 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-white">{review.name}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-200">
                        <Star size={14} className="fill-current" />
                        {review.rating}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{review.note}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-6"
          >
            <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white">Weekly schedule</h2>
                <p className="mt-1 text-sm text-slate-400">Estimated job load across the week.</p>
              </div>

              <div className="space-y-4">
                {weeklySchedule.map((slot) => (
                  <div key={slot.day}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>{slot.day}</span>
                      <span>{slot.jobs} jobs</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                        style={{ width: `${Math.min(slot.jobs * 15, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-400/12 via-white/[0.04] to-transparent p-6 backdrop-blur-xl">
              <div className="inline-flex rounded-2xl border border-emerald-200/20 bg-emerald-200/10 p-3 text-emerald-100">
                <Wrench size={20} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">Performance snapshot</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                  <span>Response time</span>
                  <span className="font-semibold text-white">8 mins</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                  <span>Completion rate</span>
                  <span className="font-semibold text-white">96%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                  <span>Average rating</span>
                  <span className="font-semibold text-white">4.9/5</span>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Clock3 size={18} className="text-cyan-200" />
                <h2 className="text-xl font-bold text-white">Today at a glance</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                You have 3 active requests, 2 confirmed visits and 1 quote waiting for approval.
              </p>
            </section>
          </motion.aside>
        </div>
      </div>
    </LiveBackground>
  );
};

export default ProviderDashboard;
