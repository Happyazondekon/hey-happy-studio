'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      className="border-t mt-16"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9">
                <Image
                  src="/assets/heyhappy.png"
                  alt="HeyHappy"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-lg" style={{ color: 'var(--text)' }}>
                HeyHappy
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('tagline')}
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-1">
              {[
                {
                  href: 'https://play.google.com/store/apps/dev?id=6296680608247349537',
                  label: 'Play Store',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.18 23.76c.37.21.8.27 1.21.17l12.38-7.15-2.89-2.89-10.7 9.87zm-1.01-19.5c-.11.25-.17.53-.17.82v17.85c0 .29.06.57.17.82l9.98-9.98-9.98-9.51zM21.16 10.3l-2.43-1.41-3.26 3.26 3.26 3.27 2.44-1.41c.7-.4.7-1.33.01-1.73l-.02.02zM4.39.07c-.41-.1-.84-.04-1.21.17l10.7 9.87 2.89-2.89L4.39.07z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://github.com/happyazondekon',
                  label: 'GitHub',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-primary hover:text-primary"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Studio links */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text)' }}
            >
              {t('studio')}
            </h4>
            <a
              href="mailto:heyhappyproject@gmail.com"
              className="text-sm transition-colors hover:text-primary"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('contact')}
            </a>
            <a href="#" className="text-sm transition-colors hover:text-primary" style={{ color: 'var(--text-muted)' }}>
              {t('privacy')}
            </a>
            <a href="#" className="text-sm transition-colors hover:text-primary" style={{ color: 'var(--text-muted)' }}>
              {t('terms')}
            </a>
          </div>

          {/* Made in Benin */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text)' }}
            >
              Studio
            </h4>
            <p className="text-sm font-semibold text-primary">{t('madeIn')}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cotonou, Bénin</p>
            <a
              href="mailto:heyhappyproject@gmail.com"
              className="text-sm transition-colors hover:text-primary"
              style={{ color: 'var(--text-muted)' }}
            >
              heyhappyproject@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t text-center text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          {t('rights')}
        </div>
      </div>
    </footer>
  );
}
