'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ScrollReveal';

export interface Product {
  id: string;
  name: string;
  desc: string;
  image: string;
  playStore?: string;
  webUrl?: string;
  isComingSoon?: boolean;
  tag?: string;
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const t = useTranslations('catalogue');

  return (
    <ScrollReveal delay={index * 0.08}>
      <div
        className="relative flex flex-col rounded-2xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1 h-full"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: '0 0 0 transparent',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            '0 0 30px rgba(0,229,160,0.12)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 transparent';
        }}
      >
        {/* Image area */}
        <div className="relative h-40 sm:h-44 overflow-hidden" style={{ background: 'var(--bg)' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain p-6 transition-transform duration-300 group-hover:scale-105 ${
              product.isComingSoon ? 'blur-sm scale-105' : ''
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {product.isComingSoon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="px-4 py-2 rounded-full font-bold text-sm text-black"
                style={{ background: '#FFD700', boxShadow: '0 0 24px rgba(255,215,0,0.5)' }}
              >
                {t('comingSoon')}
              </span>
            </div>
          )}

          {product.tag && !product.isComingSoon && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-white">
              {product.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>
            {product.name}
          </h3>
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-muted)' }}>
            {product.desc}
          </p>

          {!product.isComingSoon && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {product.playStore && (
                <a
                  href={product.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:border-primary hover:text-primary"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.37.21.8.27 1.21.17l12.38-7.15-2.89-2.89-10.7 9.87zm-1.01-19.5c-.11.25-.17.53-.17.82v17.85c0 .29.06.57.17.82l9.98-9.98-9.98-9.51zM21.16 10.3l-2.43-1.41-3.26 3.26 3.26 3.27 2.44-1.41c.7-.4.7-1.33.01-1.73l-.02.02zM4.39.07c-.41-.1-.84-.04-1.21.17l10.7 9.87 2.89-2.89L4.39.07z" />
                  </svg>
                  {t('playStore')}
                </a>
              )}
              {product.webUrl && !product.playStore && (
                <a
                  href={product.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:border-primary hover:text-primary"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {t('webApp')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
