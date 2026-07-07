'use client';

import { useState } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import StarRating from './StarRating';

export interface Review {
  id: string;
  name: string;
  message: string;
  rating: number;
  likes: number;
  createdAt: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  const [likes, setLikes] = useState(review.likes ?? 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1);
    try {
      await updateDoc(doc(db, 'website_reviews', review.id), {
        likes: increment(1),
      });
    } catch {
      setLiked(false);
      setLikes((l) => l - 1);
    }
  };

  return (
    <div
      className="flex flex-col gap-3 p-5 rounded-2xl border h-full"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <StarRating value={review.rating} readOnly size="sm" />
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text)' }}>
        &ldquo;{review.message}&rdquo;
      </p>
      <div
        className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Avatar + name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
            {review.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {review.name}
          </span>
        </div>
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-all ${
            liked ? 'scale-110' : 'hover:scale-105'
          }`}
          style={{ color: liked ? '#FF6B8A' : 'var(--text-muted)' }}
          aria-label="Like this review"
        >
          {liked ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          )}
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
