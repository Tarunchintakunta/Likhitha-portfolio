import { motion } from 'framer-motion'
import { experience } from '../../data/content'

function GlassCard({ data, index }) {
  const isEven = index % 2 === 0

  return (
    <div
      className={`min-h-screen flex items-center ${
        isEven ? 'justify-end pr-8 md:pr-20' : 'justify-start pl-8 md:pl-20'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? 80 : -80, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-xl"
      >
        {/* Top accent line */}
        <div
          className={`h-px w-full mb-6 ${
            isEven
              ? 'bg-gradient-to-r from-neon-cyan/60 to-transparent'
              : 'bg-gradient-to-r from-transparent to-neon-purple/60'
          }`}
        />

        {/* Period badge */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-2 h-2 rounded-full ${
              isEven ? 'bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.6)]'
            }`}
          />
          <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
            {data.period}
          </span>
        </div>

        {/* Role & Company */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
          {data.role}
        </h3>
        <p
          className={`text-lg font-medium mb-4 ${
            isEven ? 'text-neon-cyan/80' : 'text-neon-purple/80'
          }`}
        >
          {data.company}
          <span className="text-white/30 text-sm ml-2">/ {data.location}</span>
        </p>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Bullet points */}
        <ul className="space-y-2 mb-6">
          {data.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="flex items-start gap-3 text-white/40 text-sm"
            >
              <span
                className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${
                  isEven ? 'bg-neon-cyan/50' : 'bg-neon-purple/50'
                }`}
              />
              {bullet}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        {data.tech && (
          <div className="flex flex-wrap gap-2">
            {data.tech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-full text-xs font-mono border ${
                  isEven
                    ? 'border-neon-cyan/20 text-neon-cyan/60 bg-neon-cyan/5'
                    : 'border-neon-purple/20 text-neon-purple/60 bg-neon-purple/5'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative">
      {/* Section entrance title */}
      <div className="h-screen flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-neon-cyan/50 font-mono text-xs tracking-[0.4em] uppercase mb-4"
        >
          Where I've worked
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>
      </div>

      {/* Experience Cards */}
      {experience.map((exp, i) => (
        <GlassCard key={exp.company} data={exp} index={i} />
      ))}
    </section>
  )
}
