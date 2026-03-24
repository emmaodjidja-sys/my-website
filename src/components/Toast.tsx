'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, visible, onDismiss, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [visible, onDismiss, duration])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="toast bg-ink-800 text-cream-200 border border-ink-700/60 light:bg-cream-100 light:text-ink-800 light:border-cream-300"
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
