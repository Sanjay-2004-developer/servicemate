import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  LogOut,
  MapPin,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';

const categories = [
  {
    name: 'Deep Cleaning',
    description: 'Home, office, move-in and recurring cleaning.',
    icon: Paintbrush,
    accent: 'from-cyan-400/30 via-cyan-400/10 to-transparent',
  },
  {
    name: 'Electrical',
    description: 'Fixtures, fan installs, diagnostics and rewiring.',
    icon: Zap,
    accent: 'from-amber-400/30 via-amber-400/10 to-transparent',
  },
  {
    name: 'Appliance Repair',
    description: 'Fast fixes for kitchens, laundry and home devices.',
    icon: Wrench,
    accent: 'from-rose-400/30 via-rose-400/10 to-transparent',
  },
  {
    name: 'Home Safety',
    description: 'Locksmith, CCTV, smoke alarm and access setup.',
    icon: ShieldCheck,
    accent: 'from-emerald-400/30 via-emerald-400/10 to-transparent',
  },
];

const upcomingBookings = [
  {
    id: 1,
    title: 'Kitchen deep clean',
    provider: 'Shine Squad',
    date: 'Today, 6:30 PM',
    address: 'BTM Layout, Bangalore',
    status: 'Arriving soon',
  },
  {
    id: 2,
    title: 'Washing machine repair',
    provider: 'FixRight Services',
    date: '18 Mar, 10:00 AM',
    address: 'HSR Layout, Bangalore',
    status: 'Confirmed',
  },
];

const featuredPros = [
  {
    name: 'Aarav Electric Co.',
    specialty: 'Certified electrical inspections',
    rating: '4.9',
    jobs: '1.2k jobs',
  },
  {
    name: 'Urban Clean Lab',
    specialty: 'Premium home and office detailing',
    rating: '4.8',
    jobs: '860 jobs',
  },
  {
    name: 'SecureNest',
    specialty: 'CCTV, smart lock and alarm setup',
    rating: '4.9',
    jobs: '540 jobs',
  },
];

const quickStats = [
  { label: 'Active bookings', value: '2' },
  { label: 'Saved providers', value: '14' },
  { label: 'Service credits', value: '₹1,200' },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) return categories;

    return categories.filter(({ name, description }) => {
      return (
        name.toLowerCase().includes(normalized) ||
        description.toLowerCase().includes(normalized)
      );
    });
  }, [searchTerm]);

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
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                <Sparkles size={14} />
                Customer Control Center
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                {`Welcome back${user?.name ? `, ${user.name}` : ''}.`}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Book trusted help, track ongoing jobs, and keep your home services moving without friction.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Book a service
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {quickStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="rounded-3xl border border-white/8 bg-black/20 p-5"
              >
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.header>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Find your next service</h2>
                  <p className="mt-1 text-sm text-slate-400">Search categories and discover verified specialists.</p>
                </div>
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Try cleaning, electrical, safety..."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:bg-black/30"
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredCategories.map((category, index) => {
                  const Icon = category.icon;

                  return (
                    <motion.button
                      key={category.name}
                      type="button"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-white/20"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-80`} />
                      <div className="relative">
                        <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-black/20 p-3 text-white">
                          <Icon size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{category.description}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                          Explore providers
                          <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {filteredCategories.length === 0 && (
                <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-slate-400">
                  No matching categories found for "{searchTerm}".
                </div>
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white">Recommended providers</h2>
                <p className="mt-1 text-sm text-slate-400">Highly rated teams available around your area.</p>
              </div>

              <div className="grid gap-4">
                {featuredPros.map((pro, index) => (
                  <motion.div
                    key={pro.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.36 + index * 0.08 }}
                    className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">{pro.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">{pro.specialty}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-300/10 px-3 py-1 text-amber-200">
                        <Star size={14} className="fill-current" />
                        {pro.rating}
                      </span>
                      <span>{pro.jobs}</span>
                    </div>
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
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Upcoming bookings</h2>
                  <p className="mt-1 text-sm text-slate-400">Your scheduled service activity.</p>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="rounded-3xl border border-white/8 bg-black/20 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-white">{booking.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{booking.provider}</p>
                      </div>
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        <span>{booking.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-400/12 via-white/[0.04] to-transparent p-6 backdrop-blur-xl">
              <div className="inline-flex rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-3 text-cyan-100">
                <Clock3 size={20} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">Need urgent help?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Use priority booking to reach the fastest available provider for emergency fixes and same-day visits.
              </p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Request priority support
                <ArrowRight size={15} />
              </button>
            </section>
          </motion.aside>
        </div>
      </div>
    </LiveBackground>
  );
};

export default CustomerDashboard;
