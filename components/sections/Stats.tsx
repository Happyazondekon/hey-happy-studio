'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScrollReveal from '../ui/ScrollReveal';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const steps = 60;
    const stepVal = target / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += stepVal;
      if (cur >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(cur));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-primary">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Clean SVG icons — no emojis
const IconDownload = () => (
  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const IconRocket = () => (
  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconLocation = () => (
  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

export default function Stats() {
  const t = useTranslations('stats');

  const items = [
    { icon: <IconDownload />, counter: <Counter target={16} suffix="K+" />, label: t('downloads') },
    { icon: <IconRocket />, counter: <Counter target={4} suffix="" />, label: t('apps') },
    { icon: <IconStar />, counter: <span className="text-4xl font-extrabold text-primary">4.7</span>, label: t('rating') },
    { icon: <IconLocation />, counter: <span className="text-2xl font-extrabold text-primary">Cotonou</span>, label: t('made') },
  ];

  return (
    <section
      className="py-14 px-4"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              {item.icon}
              {item.counter}
              <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

