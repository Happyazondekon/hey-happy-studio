'use client';

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import StarRating from './StarRating';
import BubbleButton from './BubbleButton';

interface ReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({ onClose, onSuccess }: ReviewModalProps) {
  const t = useTranslations('reviews.modal');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'website_reviews'), {
        name: name.trim().slice(0, 100),
        message: message.trim().slice(0, 500),
        rating,
        likes: 0,
        createdAt: Timestamp.now(),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Firestore Error (Review):', err);
      setError(t('error') + (err.message ? ` (${err.message})` : ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-3xl p-6 border shadow-2xl"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            {t('title')}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Fermer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
              {t('ratingLabel')}
            </label>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              {t('nameLabel')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              maxLength={100}
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:border-primary"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              {t('messageLabel')}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('messagePlaceholder')}
              maxLength={500}
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:border-primary resize-none"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {message.length}/500
            </span>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <BubbleButton type="button" variant="outline" onClick={onClose} className="flex-1 text-sm">
              {t('cancel')}
            </BubbleButton>
            <BubbleButton type="submit" variant="primary" disabled={loading} className="flex-1 text-sm">
              {loading ? '...' : t('submit')}
            </BubbleButton>
          </div>
        </form>
      </div>
    </div>
  );
}
