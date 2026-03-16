import { motion } from 'framer-motion'
import { education, certifications } from '../../data/content'

export default function Education() {
  return (
    <section id="education" className="relative">
      {/* Section header */}
      <div className="h-screen flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-neon-blue/50 font-mono text-xs tracking-[0.4em] uppercase mb-4"
        >
          Academic Background
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent"
        >
          Education
        </motion.h2>
      </div>

      {/* Education & Certifications */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full space-y-6">
          {/* Degrees */}
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
            >
              <div
                className={`h-px w-full mb-5 ${
                  i === 0
                    ? 'bg-gradient-to-r from-neon-cyan/60 to-transparent'
                    : 'bg-gradient-to-r from-transparent to-neon-purple/60'
                }`}
              />

              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    i === 0
                      ? 'bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                      : 'bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.6)]'
                  }`}
                />
                <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
                  {edu.period}
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                {edu.degree}
              </h3>
              {edu.minor && (
                <p className="text-white/40 text-sm mb-3">{edu.minor}</p>
              )}
              <p className={`text-lg font-medium ${i === 0 ? 'text-neon-cyan/80' : 'text-neon-purple/80'}`}>
                {edu.school}
                <span className="text-white/30 text-sm ml-2">/ {edu.location}</span>
              </p>
            </motion.div>
          ))}

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
          >
            <div className="h-px w-full mb-5 bg-gradient-to-r from-neon-pink/60 via-neon-pink/30 to-transparent" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-neon-pink/80">
                Certifications
              </h4>
            </div>

            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 text-white/50 text-sm"
                >
                  <svg
                    className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neon-pink"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {cert}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="h-[50vh]" />
    </section>
  )
}
