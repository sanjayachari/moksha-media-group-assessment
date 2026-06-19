'use client'

import { motion } from 'framer-motion'

const plans = [
  {
    name: "Starter",
    price: "499",
    period: "/month",
    description: "Perfect for small teams getting started with AI automation",
    features: [
      "Up to 5 AI Agents",
      "Basic Integrations",
      "Community Support",
      "24/7 Monitoring",
      "Standard Analytics",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "999",
    period: "/month",
    description: "Best for growing companies with complex workflows",
    features: [
      "Up to 25 AI Agents",
      "Advanced Integrations",
      "Priority Support",
      "Custom Training",
      "Advanced Analytics",
      "Dedicated Success Manager",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations needing full-scale deployment",
    features: [
      "Unlimited AI Agents",
      "Custom Development",
      "On-Premise Option",
      "SSO & Compliance",
      "SLA Guarantee",
      "White-Glove Onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingTeaser() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono">Pricing</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] font-display tracking-[-0.03em]">
            Simple, transparent<br />pricing.
          </h2>
          <div className="flex flex-col justify-end">
            <p className="text-lg text-white/60 max-w-md">
              Scale confidently with flexible plans designed for every stage of growth.
            </p>
            <p className="text-emerald-400 text-sm mt-4 font-mono">All prices in INR • Cancel anytime</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-emerald-400/60 bg-gradient-to-b from-emerald-400/[0.08] to-transparent' 
                  : 'border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-6 bg-emerald-400 text-black text-xs font-mono tracking-widest px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="text-white/60 text-sm mt-2">{plan.description}</p>
              </div>

              <div className="mb-10">
                {plan.price === "Custom" ? (
                  <div className="text-5xl font-bold text-white">Custom</div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white tracking-tighter">₹ {plan.price}</span>
                    <span className="text-white/50 ml-2 text-xl">{plan.period}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-12 text-white/70">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px]">
                    <span className="text-emerald-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                    : 'border border-white/30 hover:bg-white/5 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 text-white/40 text-sm">
          Need something custom? <a href="#contact" className="text-emerald-400 hover:underline">Talk to our team →</a>
        </div>
      </div>
    </section>
  )
}