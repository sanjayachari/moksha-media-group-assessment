'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: "What types of AI agents do you build?",
    answer: "We build specialized autonomous AI agents for customer support, research & analysis, workflow automation, infrastructure management, and enterprise integrations. Each agent is custom-trained for your domain and use cases."
  },
  {
    question: "How long does deployment take?",
    answer: "Most deployments are completed in 5–10 business days. Simple workflow agents can go live in under a week, while complex enterprise integrations typically take 2–3 weeks including training and testing."
  },
  {
    question: "Can agents integrate with our systems?",
    answer: "Yes. Our agents integrate seamlessly with CRMs, ERPs, Slack, Microsoft Teams, internal databases, APIs, and custom tools. We support REST, GraphQL, webhooks, and legacy systems through secure connectors."
  },
  {
    question: "How is company data secured?",
    answer: "All data is encrypted in transit and at rest. We use SOC 2 compliant infrastructure, role-based access control, private VPC deployments, and never train on customer data without explicit permission. Audits available upon request."
  },
  {
    question: "Do you provide ongoing monitoring?",
    answer: "Yes. Every deployment includes 24/7 monitoring, performance dashboards, proactive alerts, and dedicated success managers. We continuously optimize agents based on real usage data."
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono text-center">FAQ</span>
        </div>

        <h2 className="text-4xl text-center md:text-5xl font-bold text-white leading-[1.05] font-display tracking-[-0.03em] mb-16">
          Frequently asked questions.
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/[0.08] rounded-2xl overflow-hidden bg-surface-700"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between group hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg text-white pr-8 font-light tracking-tight">
                  {faq.question}
                </span>
                <div className={`w-6 h-6 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-45 bg-emerald-400 border-emerald-400' : 'group-hover:border-white/50'}`}>
                  <span className="text-xl leading-none text-white">+</span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <div className="px-8 pb-8 text-white/70 leading-relaxed text-[15px] border-t border-white/[0.06] pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}