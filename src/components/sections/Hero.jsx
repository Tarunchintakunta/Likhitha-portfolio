import { motion } from 'framer-motion'
import { personalInfo } from '../../data/content'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl z-10">
        {/* Subtle top label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-neon-cyan/70 font-mono text-sm tracking-[0.3em] uppercase mb-6"
        >
          Data Science &amp; ML Portfolio
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-neon-cyan to-neon-purple bg-clip-text text-transparent"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl text-white/60 font-light mb-8"
        >
          {personalInfo.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-12"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#experience"
            className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium tracking-wide hover:bg-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 backdrop-blur-sm"
          >
            Explore My Work
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium tracking-wide hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
