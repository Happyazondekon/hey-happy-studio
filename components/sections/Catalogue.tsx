'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '../ui/ScrollReveal';
import ProductCard, { type Product } from '../ui/ProductCard';

export default function Catalogue() {
  const t = useTranslations('catalogue');

  const products: Product[] = [
    {
      id: 'mathscool',
      name: t('products.mathscool.name'),
      desc: t('products.mathscool.desc'),
      image: '/assets/MathsCool.webp',
      playStore: 'https://play.google.com/store/apps/details?id=com.heyhappy.mathscool',
      tag: '4.7 / 5 · 16K+',
    },
    {
      id: 'happygoal',
      name: t('products.happygoal.name'),
      desc: t('products.happygoal.desc'),
      image: '/assets/HappyGoal.webp',
      playStore: 'https://play.google.com/store/apps/details?id=com.heyhappy.happygoal',
    },
    {
      id: 'smartspend',
      name: t('products.smartspend.name'),
      desc: t('products.smartspend.desc'),
      image: '/assets/SmartSpend.webp',
      playStore: 'https://play.google.com/store/apps/details?id=com.heyhappy.smartspend',
    },
    {
      id: 'autopermis',
      name: t('products.autopermis.name'),
      desc: t('products.autopermis.desc'),
      image: '/assets/AutoPermis.png',
      webUrl: 'https://auto-permis.com',
    },
    {
      id: 'collabo',
      name: t('products.collabo.name'),
      desc: t('products.collabo.desc'),
      image: '/assets/cologo.png',
      isComingSoon: true,
    },
    {
      id: 'komiko',
      name: t('products.komiko.name'),
      desc: t('products.komiko.desc'),
      image: '/assets/Komiko.webp',
      isComingSoon: true,
    },
  ];

  return (
    <section id="games" className="py-20 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--text)' }}>
              {t('title')}{' '}
              <span className="text-primary">{t('titleHighlight')}</span>
            </h2>
            <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
