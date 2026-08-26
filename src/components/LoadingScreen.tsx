'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>

            {/* "Fixed" - entra desde la izquierda */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              {/* Borde superior izquierdo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '-12px',
                  width: 'clamp(24px, 3vw, 40px)',
                  height: 'clamp(24px, 3vw, 40px)',
                  borderTop: '3px solid #1A1F3C',
                  borderLeft: '3px solid #1A1F3C',
                }}
              />
              {/* Borde inferior izquierdo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '-12px',
                  width: 'clamp(24px, 3vw, 40px)',
                  height: 'clamp(24px, 3vw, 40px)',
                  borderBottom: '3px solid #1A1F3C',
                  borderLeft: '3px solid #1A1F3C',
                }}
              />
              <span
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 800,
                  color: '#1A1F3C',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                Fixed
              </span>
            </motion.div>

            {/* El gap - se cierra */}
            <motion.div
              initial={{ width: 'clamp(1.5rem, 5vw, 3rem)' }}
              animate={{ width: '0px' }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.8 }}
              style={{ overflow: 'hidden', flexShrink: 0 }}
            />

            {/* "Gap" - entra desde la derecha */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              {/* Borde superior derecho */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: 'clamp(24px, 3vw, 40px)',
                  height: 'clamp(24px, 3vw, 40px)',
                  borderTop: '3px solid #1F4C9C',
                  borderRight: '3px solid #1F4C9C',
                }}
              />
              {/* Borde inferior derecho */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '-12px',
                  width: 'clamp(24px, 3vw, 40px)',
                  height: 'clamp(24px, 3vw, 40px)',
                  borderBottom: '3px solid #1F4C9C',
                  borderRight: '3px solid #1F4C9C',
                }}
              />
              <span
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 800,
                  color: '#1F4C9C',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                Gap
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
