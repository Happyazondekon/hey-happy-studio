'use client';

import { useTranslations } from 'next-intl';
import BubbleButton from './BubbleButton';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const t = useTranslations('support');

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-sm rounded-3xl p-8 border shadow-2xl text-center relative overflow-hidden"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {/* Animated particles background (optional effect) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
               <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Success Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              {t('thankYouTitle') || 'Merci !'}
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
              {t('thankYou')}
            </p>

            <BubbleButton variant="primary" fullWidth onClick={onClose}>
              OK
            </BubbleButton>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
