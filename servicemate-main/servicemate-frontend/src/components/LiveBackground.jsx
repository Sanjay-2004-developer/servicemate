import { motion } from 'framer-motion';

const LiveBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#061018]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,24,0.65),rgba(2,6,12,0.96))]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      <motion.div
        animate={{ x: [0, 90, 0], y: [0, 50, 0], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute left-[-8%] top-[-12%] h-[640px] w-[640px] rounded-full bg-cyan-400/15 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 90, 0], opacity: [0.08, 0.24, 0.08] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-18%] right-[-8%] h-[560px] w-[560px] rounded-full bg-indigo-500/20 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[40%] top-[18%] h-[380px] w-[380px] rounded-full bg-emerald-400/10 blur-[120px]"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default LiveBackground;
