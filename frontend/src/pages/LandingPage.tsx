import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Lock, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { landingFeatures, pricingPlans, stats, testimonials } from '@/lib/constants'

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.24),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(8,145,178,0.18),transparent_25%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.65)_55%,rgba(2,6,23,1)_100%)]" />

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge variant="accent" className="mb-6">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Modern Team Task Manager
          </Badge>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            The SaaS task workspace that looks premium and ships fast.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            TaskFlow combines elegant collaboration, secure authentication, Kanban planning, and analytics-first dashboards into one polished team command center.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/register">
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {landingFeatures.map((feature) => (
              <div key={feature} className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />
          <Card className="relative overflow-hidden p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Today</p>
                <h2 className="text-2xl font-semibold text-white">Productivity pulse</h2>
              </div>
              <Badge variant="success">
                <Lock className="mr-1 h-3 w-3" /> JWT secured
              </Badge>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-cyan-300">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Team progress</span>
                <span>82%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '82%' }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { title: 'Secure authentication', text: 'JWT-based auth, protected routes, and persisted sessions for a production feel.', icon: Lock },
            { title: 'Animated productivity', text: 'Smooth Framer Motion transitions, hover states, and dashboard motion throughout.', icon: Zap },
            { title: 'Recruiter-ready UI', text: 'A polished SaaS look with glassmorphism cards, sharp spacing, and responsive structure.', icon: Sparkles },
          ].map((item) => (
            <motion.div key={item.title} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
              <Card className="h-full p-6">
                <item.icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white">Loved by product teams</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6">
              <p className="text-sm leading-7 text-slate-300">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-[0.3em] text-cyan-300 uppercase">Pricing</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Simple plans for every team size</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-6 ${plan.featured ? 'border-cyan-400/30 bg-cyan-400/10 shadow-cyan-400/10' : ''}`}
            >
              {plan.featured ? <Badge className="absolute right-6 top-6 bg-cyan-400/20 text-cyan-100">Popular</Badge> : null}
              <p className="text-lg font-semibold text-white">{plan.name}</p>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              <p className="mt-6 text-4xl font-semibold text-white">{plan.price}</p>
              <p className="text-sm text-slate-400">per month</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full" variant={plan.featured ? 'default' : 'secondary'} asChild>
                <Link to="/register">Choose plan</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        Built for TaskFlow. Ready for backend integration, interviews, and deployment.
      </footer>
    </div>
  )
}
