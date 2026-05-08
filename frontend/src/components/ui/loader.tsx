import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface LoaderProps {
  label?: string
  fullScreen?: boolean
  className?: string
}

export function Loader({ label = 'Loading...', fullScreen = false, className }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center gap-3 text-slate-300', fullScreen && 'min-h-screen', className)}>
      <motion.div
        className="h-5 w-5 rounded-full border-2 border-cyan-400 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.85, ease: 'linear' }}
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}
