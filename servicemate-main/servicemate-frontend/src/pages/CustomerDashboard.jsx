import React from 'react';
import { motion } from 'framer-motion';
import { Search, Paintbrush, Zap, Hammer, ShieldCheck, LogOut } from 'lucide-react';
import LiveBackground from '../components/LiveBackground';

const CustomerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const categories = [
    { name: "Cleaning", icon: <Paintbrush />, color: "text-blue-400" },
    { name: "Electrical", icon: <Zap />, color: "text-yellow-400" },
    { name: "Repairs", icon: <Hammer />, color: "text-orange-400" },
    { name: "Security", icon: <ShieldCheck />, color: "text-green-400" }
  ];

  return (
    <LiveBackground>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Nav Section */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-16"
        >
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome back, <span className="glow-text">{user?.name}</span>
            </h1>
            <p className="text-slate-400 mt-2">What can we help you with tonight?</p>
          </div>
          <button className="p-3 glass-card text-red-400 hover:text-red-300">
            <LogOut size={20} />
          </button>
        </motion.header>

        {/* Search Section */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-20"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="premium-input text-lg shadow-2xl shadow-indigo-500/5"
          />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* Inner Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 ${cat.color} group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
              <p className="text-slate-500">Verified {cat.name.toLowerCase()} experts ready to help.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </LiveBackground>
  );
};

export default CustomerDashboard;