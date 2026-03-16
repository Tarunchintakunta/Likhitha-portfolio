import { motion } from 'framer-motion'
import { personalInfo } from '../../data/content'

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/[0.02] hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-300"
    >
      <span className="text-white/40 group-hover:text-neon-cyan transition-colors duration-300">
        {children}
      </span>
      <span className="text-white/50 text-sm font-medium group-hover:text-white/80 transition-colors duration-300">
        {label}
      </span>
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative">
      {/* Section header */}
      <div className="h-screen flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-neon-cyan/50 font-mono text-xs tracking-[0.4em] uppercase mb-4"
        >
          End of the line
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-cyan via-white to-neon-purple bg-clip-text text-transparent"
        >
          Let's Connect
        </motion.h2>
      </div>

      {/* Contact card — centered over the 3D portal */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="contact-card text-center max-w-md w-full"
        >
          {/* Top accent */}
          <div className="h-px w-full mb-8 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to collaborate?
          </h3>
          <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
            I'm always open to new opportunities, data science collaborations, and innovative ML projects.
          </p>

          {/* Email CTA */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/8 text-neon-cyan text-sm font-medium tracking-wide hover:bg-neon-cyan/15 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)] transition-all duration-300 mb-8"
          >
            {/* Mail icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {personalInfo.email}
          </a>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-8">
            <IconLink href={personalInfo.linkedin} label="LinkedIn">
              {/* LinkedIn icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </IconLink>

            <IconLink href={personalInfo.github} label="GitHub">
              {/* GitHub icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </IconLink>
          </div>

          {/* Bottom accent */}
          <div className="h-px w-full mb-6 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          {/* Footer */}
          <p className="text-white/20 text-xs font-mono tracking-wider">
            Built with React Three Fiber & WebGL
          </p>
        </motion.div>
      </div>

      <div className="h-[30vh]" />
    </section>
  )
}
