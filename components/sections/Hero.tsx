'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const stagger = (delay: number) => ({
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, delay, ease: 'easeOut' as const },
  },
});

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.52) saturate(1.1)' }}
      >
        <source src="/assets/HeyHappy.webm" type="video/webm" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,20,0.45) 0%, rgba(10,10,20,0.25) 55%, rgba(10,10,20,0.80) 100%)' }} />

      {/* Bottom fade — seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A14, transparent)' }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-7">

          <motion.h1
            variants={stagger(0.1)}
            initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white px-2"
          >
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </motion.h1>

          <motion.p
            variants={stagger(0.25)}
            initial="hidden" animate="visible"
            className="text-base sm:text-lg max-w-xl leading-relaxed px-4"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={stagger(0.4)}
            initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <a href="#games" className="bubble-btn bubble-btn-primary px-8 py-3.5 text-base text-center">
              {t('ctaGames')}
            </a>
            <a
              href="#support"
              className="bubble-btn px-8 py-3.5 text-base font-bold text-center"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', boxShadow: '0 4px 0 0 rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            >
              {t('ctaSupport')}
            </a>
          </motion.div>

          <motion.div
            variants={stagger(0.55)}
            initial="hidden" animate="visible"
            className="flex flex-wrap justify-center gap-3 mt-2"
          >
            {[
              { src: '/assets/MathsCool.webp', alt: 'MathsCool' },
              { src: '/assets/HappyGoal.webp', alt: 'HappyGoal' },
              { src: '/assets/SmartSpend.webp', alt: 'SmartSpend' },
              { src: '/assets/AutoPermis.png', alt: 'Auto-Permis' },
            ].map((app, i) => (
              <motion.div
                key={app.alt}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={app.src} alt={app.alt} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
          <div className="w-1.5 h-2.5 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
