'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  const hidden = {
    opacity: 0,
    y: direction === 'up' ? 36 : 0,
    x: direction === 'left' ? -36 : direction === 'right' ? 36 : 0,
  };

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: 'easeOut' as const,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden, visible }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
