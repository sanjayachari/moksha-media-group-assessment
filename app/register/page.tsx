'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Lock } from 'lucide-react'
import { RiGeminiFill } from 'react-icons/ri'

const DOTS = Array.from({ length: 28 }, () => ({
  x: Math.random() * 100 + '%',
  y: Math.random() * 100 + '%',
  s: Math.random() * 3 + 1.5,
  dur: Math.random() * 8 + 6,
  delay: Math.random() * -15,
}))

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log('Register Data:', formData)
    // Add your registration logic here
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex items-center justify-center">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-surface z-0" />

      {/* Silk fold — upper-left sweep */}
      <div className="absolute inset-0 z-[1]" style={{ background: `linear-gradient(122deg, transparent 0%, transparent 12%, rgba(255,255,255,0) 16%, rgba(255,255,255,0.035) 21%, rgba(255,255,255,0.075) 24%, rgba(255,255,255,0.035) 27%, rgba(255,255,255,0) 32%, transparent 42%, transparent 56%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.025) 63%, rgba(255,255,255,0.052) 65.5%, rgba(255,255,255,0.025) 68%, rgba(255,255,255,0) 72%, transparent 100%)` }} />

      {/* Silk fold — cross-diagonal */}
      <div className="absolute inset-0 z-[1]" style={{ background: `linear-gradient(148deg, transparent 0%, transparent 8%, rgba(255,255,255,0) 11%, rgba(255,255,255,0.028) 14%, rgba(255,255,255,0.065) 17%, rgba(255,255,255,0.028) 20%, rgba(255,255,255,0) 23%, transparent 35%, transparent 58%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.022) 65%, rgba(255,255,255,0.045) 67.5%, rgba(255,255,255,0.022) 70%, rgba(255,255,255,0) 74%, transparent 100%)` }} />

      {/* Silk fold — shallow center */}
      <div className="absolute inset-0 z-[1]" style={{ background: `linear-gradient(105deg, transparent 0%, transparent 45%, rgba(255,255,255,0) 49%, rgba(255,255,255,0.018) 52%, rgba(255,255,255,0.038) 54%, rgba(255,255,255,0.018) 56%, rgba(255,255,255,0) 60%, transparent 100%)` }} />

      {/* Radial light pools */}
      <div className="absolute inset-0 z-[2]" style={{ background: `radial-gradient(ellipse 130% 55% at 18% 18%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 30%, transparent 60%), radial-gradient(ellipse 90% 45% at 78% 12%, rgba(255,255,255,0.045) 0%, transparent 55%), radial-gradient(ellipse 110% 38% at 55% 82%, rgba(255,255,255,0.04) 0%, transparent 52%), radial-gradient(ellipse 70% 55% at 92% 50%, rgba(255,255,255,0.032) 0%, transparent 58%)` }} />

      {/* Edge vignette + other background layers */}
      <div className="absolute inset-0 z-[3]" style={{ background: 'radial-gradient(ellipse 85% 72% at 50% 38%, transparent 15%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.9) 100%)' }} />
      <div className="absolute inset-0 z-[3]" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 18%, transparent 35%)' }} />
      <div className="absolute inset-0 z-[3]" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.88) 92%, rgba(0,0,0,0.96) 100%)' }} />
      <div className="absolute inset-0 z-[3]" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02] z-[4]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10">
         
          <h1 className="text-4xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-white/60 mt-2">Join Aether AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-3.5 text-base placeholder:text-white/40 focus:outline-none transition"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-3.5 text-base placeholder:text-white/40 focus:outline-none transition"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-900/80 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-3.5 text-base placeholder:text-white/40 focus:outline-none transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-zinc-900/80 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-3.5 text-base placeholder:text-white/40 focus:outline-none transition"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-zinc-900/80 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-3.5 text-base placeholder:text-white/40 focus:outline-none transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-white/90 transition text-lg mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-white/60">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}