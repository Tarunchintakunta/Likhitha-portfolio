export const personalInfo = {
  name: "Likhitha Mallarapu",
  title: "Data Scientist & ML Engineer",
  tagline: "From raw flat files to real-time inference endpoints",
  email: "lmallara@asu.edu",
  phone: "(623) 200-3955",
  location: "Tempe, Arizona",
  linkedin: "https://linkedin.com/in/likhitha-mallarapu",
  github: "https://github.com/likhitha-mallarapu",
}

export const experience = [
  {
    role: "Data Scientist",
    company: "Sageable Technologies Pvt Ltd",
    location: "Hyderabad, India",
    period: "Jun 2023 – Jun 2024",
    description:
      "Developed and deployed predictive ML models within the ETL framework to forecast business KPIs, improving operational decision-making efficiency for cross-functional stakeholders.",
    bullets: [
      "Engineered custom Python and SQL scripts to automate feature extraction from flat files and staging tables, reducing data preparation time by 30%.",
      "Optimized SSAS OLAP cubes by implementing Star and Snowflake schemas for high-performance analytical queries and multi-dimensional reporting.",
      "Executed EDA on large-scale datasets using Talend and SQL Server to identify trends and anomalies, translating findings into interactive dashboards.",
      "Accelerated model iteration cycles through automated feature engineering pipelines across 3M+ record datasets.",
    ],
    tech: ["Python", "SQL Server", "Talend DI", "SSAS OLAP", "PySpark"],
  },
  {
    role: "Data Science Intern",
    company: "Sageable Technologies Pvt Ltd",
    location: "Hyderabad, India",
    period: "Jun 2022 – May 2023",
    description:
      "Leveraged Talend DI and SQL Server to perform data wrangling and quality assessments across disparate datasets, ensuring high-fidelity inputs for downstream models.",
    bullets: [
      "Performed data wrangling and quality assessments across disparate datasets ensuring validated inputs for analytical models and reporting pipelines.",
      "Engineered robust feature sets by creating calculated columns and named queries within SSAS, improving predictive analysis accuracy.",
      "Documented technical specifications for ETL frameworks and established standardized naming conventions, improving team-wide data governance.",
    ],
    tech: ["Talend DI", "SQL Server", "SSAS", "Python", "Excel"],
  },
]

export const projects = [
  {
    title: "LLM Analytics Copilot",
    subtitle: "Natural Language to SQL System",
    period: "2025",
    description:
      "Built a natural language to SQL system over a 33.8M row PostgreSQL data warehouse using RAG with dynamic FAISS vector retrieval and LLaMA 3.3 70B via Groq API.",
    bullets: [
      "Achieved 61.2% SQL execution success with 0.62s average latency across complex analytical queries.",
      "Benchmarked against a LoRA fine-tuned TinyLlama baseline, confirming RAG outperforms small fine-tuned models under limited training data.",
      "Integrated dynamic FAISS vector retrieval for schema-aware prompt augmentation.",
    ],
    tech: ["Python", "LangChain", "PostgreSQL", "FAISS", "Groq", "Streamlit"],
    color: "#00f0ff",
  },
  {
    title: "Automated MLOps Pipeline",
    subtitle: "End-to-End ML Lifecycle Automation",
    period: "2025",
    description:
      "Built an end-to-end ML lifecycle pipeline with automated training, testing, versioned deployment, and rollback — reducing deployment cycles from 3 weeks to 3 days.",
    bullets: [
      "Maintained 92%+ model accuracy across all deployments with full version control and automated rollback on failure.",
      "Integrated MLflow for experiment tracking and Databricks Feature Store for centralized feature management.",
      "Implemented CI/CD pipelines with SageMaker for seamless model deployment and monitoring.",
    ],
    tech: ["MLflow", "Databricks", "SageMaker", "CI/CD", "Docker"],
    color: "#a855f7",
  },
  {
    title: "Dyslexia Screening System",
    subtitle: "ML-Based Classification for Early Detection",
    period: "2024",
    description:
      "Developed an ML-based classification model on 25K+ behavioral records, achieving 89% test accuracy and 0.87 F1-score, reducing false-positive rates by 18%.",
    bullets: [
      "Applied 5-fold cross-validation and systematic error analysis to ensure model generalization across experimental runs.",
      "Reduced false-positive rates by 18% over a logistic regression baseline through advanced feature engineering.",
      "Conducted failure mode investigation to refine decision boundaries and improve classification performance.",
    ],
    tech: ["Python", "Scikit-learn", "DataRobot", "Statistical Analysis"],
    color: "#f472b6",
  },
]

export const skills = {
  "Languages & Tools": ["Python", "SQL", "R", "PySpark", "Bash", "Git", "Advanced Excel"],
  "Machine Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "CNNs", "LSTMs"],
  "LLMs & MLOps": ["LangChain", "RAG", "Hugging Face", "Docker", "MLflow", "SageMaker"],
  "Data Engineering & BI": ["Talend DI", "SSAS OLAP", "dbt", "Kafka", "Tableau", "Power BI"],
  "Cloud Platforms": ["AWS S3", "SageMaker", "GCP Vertex AI", "BigQuery", "Azure ML"],
}

export const certifications = [
  "NPTEL Elite Gold - Python for Data Science (IIT Madras)",
  "Google Data Analytics Professional Certificate (Coursera)",
  "Data Analytics LIVE Project - Trainity",
]

export const education = [
  {
    degree: "M.S., Data Science, Analytics and Engineering",
    minor: "Computing and Decision Analytics Minor",
    school: "Arizona State University",
    location: "Tempe, Arizona",
    period: "May 2026",
  },
  {
    degree: "Bachelor of Engineering, Artificial Intelligence",
    minor: "Data Science Minor",
    school: "Anurag University",
    location: "Telangana, India",
    period: "May 2024",
  },
]
