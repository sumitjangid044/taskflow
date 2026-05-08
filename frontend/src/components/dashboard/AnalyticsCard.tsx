import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'

interface AnalyticsCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  tone?: 'indigo' | 'cyan' | 'emerald' | 'violet'
}

const toneMap = {
  indigo: 'from-indigo-500/20 to-indigo-500/5 text-indigo-200 ring-indigo-400/20',
  cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-200 ring-cyan-400/20',
  emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-200 ring-emerald-400/20',
  violet: 'from-violet-500/20 to-violet-500/5 text-violet-200 ring-violet-400/20',
} as const

export function AnalyticsCard({ label, value, change, icon: Icon, tone = 'indigo' }: AnalyticsCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
      <Card className={`h-full border-white/10 bg-gradient-to-br ${toneMap[tone]} p-5 shadow-xl shadow-indigo-950/20`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
            <p className="mt-2 text-sm text-emerald-300">{change} from last week</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
