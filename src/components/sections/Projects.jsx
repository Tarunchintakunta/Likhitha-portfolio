import { motion } from 'framer-motion'
import { projects } from '../../data/content'

function ProjectCard({ data, index }) {
  const isEven = index % 2 === 0
  const accentColor = data.color || '#00f0ff'

  return (
    <div
      className={`min-h-screen flex items-center ${
        isEven ? 'justify-end pr-8 md:pr-16 lg:pr-24' : 'justify-start pl-8 md:pl-16 lg:pl-24'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="project-card w-full max-w-lg"
        style={{ '--accent': accentColor }}
      >
        {/* Status bar — like a terminal header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}60` }} />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 h-px bg-white/5 ml-2" />
          <span className="text-[10px] font-mono text-white/20 tracking-widest">{data.period}</span>
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-bold mb-1"
          style={{ color: accentColor }}
        >
          {data.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/40 text-sm font-mono tracking-wide mb-5"
        >
          {data.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/50 text-sm leading-relaxed mb-6"
        >
          {data.description}
        </motion.p>

        {/* Bullet points */}
        <ul className="space-y-3 mb-6">
          {data.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              className="flex items-start gap-3 text-white/40 text-sm"
            >
              <svg
                className="w-3.5 h-3.5 mt-0.5 shrink-0"
                style={{ color: accentColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {bullet}
            </motion.li>
          ))}
        </ul>

        {/* Tech stack chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {data.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                borderColor: `${accentColor}25`,
                color: `${accentColor}90`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <div
          className="h-px w-full mt-6"
          style={{
            background: `linear-gradient(to ${isEven ? 'left' : 'right'}, ${accentColor}40, transparent)`,
          }}
        />
      </motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative">
      {/* Section header */}
      <div className="h-screen flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-neon-purple/50 font-mono text-xs tracking-[0.4em] uppercase mb-4"
        >
          What I've built
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
        >
          Projects
        </motion.h2>
      </div>

      {/* Project Cards */}
      {projects.map((proj, i) => (
        <ProjectCard key={proj.title} data={proj} index={i} />
      ))}
    </section>
  )
}
