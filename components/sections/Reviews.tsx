'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import ReviewCard, { type Review } from '../ui/ReviewCard';
import ReviewModal from '../ui/ReviewModal';
import BubbleButton from '../ui/BubbleButton';
import ScrollReveal from '../ui/ScrollReveal';

const seedReviews: Review[] = [
  {
    id: 's1',
    name: 'Yasmina K.',
    message: 'MathsCool a aidé mon fils à aimer les maths ! L\'interface est si propre et ludique.',
    rating: 5,
    likes: 12,
    createdAt: '',
  },
  {
    id: 's2',
    name: 'Marc-Aural',
    message: 'Meilleur jeu de foot que j\'ai joué sur mobile cette année. Les contrôles sont excellents.',
    rating: 5,
    likes: 8,
    createdAt: '',
  },
  {
    id: 's3',
    name: 'TechBenin',
    message: 'Fier de voir une telle qualité venir de Cotonou. La stack technique est de niveau mondial.',
    rating: 5,
    likes: 15,
    createdAt: '',
  },
];

export default function Reviews() {
  const t = useTranslations('reviews');
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, 'website_reviews'),
          orderBy('createdAt', 'desc'),
          limit(12)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setReviews(
            snap.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Review, 'id'>),
              createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? '',
            }))
          );
        }
      } catch {
        // Keep seed reviews on error
      }
    })();
  }, []);

  const handleSuccess = () => {
    setSuccessMsg(t('modal.success'));
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <section
      id="reviews"
      className="py-20 px-4"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--text)' }}>
              {t('title')}{' '}
              <span className="text-primary">{t('titleHighlight')}</span>
            </h2>
            <BubbleButton variant="primary" onClick={() => setShowModal(true)}>
              {t('leaveReview')}
            </BubbleButton>
          </div>
        </ScrollReveal>

        {successMsg && (
          <ScrollReveal>
            <div
              className="mb-8 p-4 rounded-2xl border text-center font-semibold text-primary"
              style={{ background: 'rgba(0,229,160,0.08)', borderColor: 'rgba(0,229,160,0.3)' }}
            >
              {successMsg}
            </div>
          </ScrollReveal>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.07}>
              <ReviewCard review={review} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {showModal && (
        <ReviewModal onClose={() => setShowModal(false)} onSuccess={handleSuccess} />
      )}
    </section>
  );
}
