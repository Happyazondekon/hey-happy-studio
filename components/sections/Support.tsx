'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import BubbleButton from '../ui/BubbleButton';
import ScrollReveal from '../ui/ScrollReveal';
import SuccessModal from '../ui/SuccessModal';

const PRESETS = [1000, 2500, 5000, 10000];

export default function Support() {
  const t = useTranslations('support');
  const searchParams = useSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('status') === 'success') {
      setShowSuccess(true);
      // Clean up URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('status');
      const cleanUrl = window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : '');
      router.replace(cleanUrl);
    }
  }, [searchParams, router]);

  const handleSupport = async () => {
    const num = parseInt(amount, 10);
    if (isNaN(num) || num < 1000) {
      setError(t('minHint'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/fedapay/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: num }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Use same window to avoid popup blockers
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Support Error:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="support" className="py-20 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-xl mx-auto text-center">
        <ScrollReveal>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </h2>
          <p className="leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="rounded-3xl border p-8 flex flex-col gap-6"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {/* Preset amounts */}
            <div className="flex flex-wrap justify-center gap-3">
              {PRESETS.map((p) => {
                const active = amount === String(p);
                return (
                  <button
                    key={p}
                    onClick={() => setAmount(String(p))}
                    className="px-4 py-2 rounded-full text-sm font-bold border transition-all"
                    style={{
                      background: active ? '#818CF8' : 'var(--bg)',
                      borderColor: active ? '#818CF8' : 'var(--border)',
                      color: active ? '#FFFFFF' : 'var(--text-muted)',
                    }}
                  >
                    {p.toLocaleString()} XOF
                  </button>
                );
              })}
            </div>

            {/* Custom input */}
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(''); }}
                min={1000}
                step={500}
                className="w-40 px-4 py-3 rounded-xl border text-center font-bold text-lg transition-colors focus:border-primary"
                style={{
                  background: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              />
              <span className="font-bold text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('currency')}
              </span>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {t('minHint')}
            </p>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <BubbleButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSupport}
              disabled={loading}
            >
              {loading ? '...' : t('btn')}
            </BubbleButton>

            {/* Security note */}
            <p className="text-xs flex items-center justify-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.18V11c0 3.5-2.33 6.79-6 8-3.67-1.21-6-4.5-6-8V7.18L12 5z" />
              </svg>
              {t('secure')}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
