import { motion } from 'framer-motion'

const techCategories = [
  {
    title: 'Languages & Tools',
    items: ['Python', 'SQL', 'R', 'PySpark', 'Bash', 'Git'],
    color: '#00f0ff',
  },
  {
    title: 'Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'CNNs', 'LSTMs'],
    color: '#a855f7',
  },
  {
    title: 'LLMs & MLOps',
    items: ['LangChain', 'RAG', 'Hugging Face', 'Docker', 'MLflow', 'SageMaker'],
    color: '#f472b6',
  },
  {
    title: 'Data Engineering & BI',
    items: ['Talend DI', 'SSAS OLAP', 'dbt', 'Kafka', 'Tableau', 'Power BI'],
    color: '#3b82f6',
  },
  {
    title: 'Cloud Platforms',
    items: ['AWS S3', 'GCP Vertex AI', 'BigQuery', 'Azure ML', 'Snowflake', 'Databricks'],
    color: '#00f0ff',
  },
]

function CategoryPill({ title, items, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
        />
        <h4 className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color }}>
          {title}
        </h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: delay + 0.05 * i }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: `${color}20`,
              color: `${color}cc`,
              backgroundColor: `${color}08`,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section id="techstack" className="relative">
      {/* Section header */}
      <div className="h-screen flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-neon-pink/50 font-mono text-xs tracking-[0.4em] uppercase mb-4"
        >
          The tools I wield
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple bg-clip-text text-transparent"
        >
          Tech Stack
        </motion.h2>
      </div>

      {/* Category grid */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl w-full">
          {techCategories.map((cat, i) => (
            <CategoryPill
              key={cat.title}
              title={cat.title}
              items={cat.items}
              color={cat.color}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>

      <div className="h-[50vh]" />
    </section>
  )
}
