'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal from '../ui/ScrollReveal';

const techBadges = ['Flutter', 'React', 'Laravel', 'Node.js', 'Python', 'Java'];

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left: Story */}
        <ScrollReveal direction="left">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight"
              style={{ color: 'var(--text)' }}
            >
              {t('title')}{' '}
              <span className="text-primary">{t('titleHighlight')}</span>
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('story')}
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('story2')}
            </p>
          </div>
        </ScrollReveal>

        {/* Right: Founder card */}
        <ScrollReveal direction="right" delay={0.1}>
          <div
            className="rounded-3xl border p-6 flex flex-col gap-5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2"
                style={{ borderColor: 'rgba(0,229,160,0.4)' }}
              >
                <Image
                  src="/assets/Happy AZONDEKON.jpeg"
                  alt="Happy AZONDEKON"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>
                  Happy AZONDEKON
                </h3>
                <p className="text-xs font-bold tracking-widest text-primary uppercase">
                  {t('founderTitle')}
                </p>
              </div>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {techBadges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    background: 'var(--bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Quote */}
            <div
              className="pt-4 border-t flex items-center justify-between gap-4"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
                {t('founderQuote')}
              </p>
              <div className="flex gap-1 text-primary shrink-0">
                {/* Code icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
