import { motion } from 'framer-motion';

const LiveBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0c] overflow-hidden">
      {/* Moving Glow Orbs */}
      <motion.div 
        animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ x: [0, -60, 0], y: [0, 80, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default LiveBackground;