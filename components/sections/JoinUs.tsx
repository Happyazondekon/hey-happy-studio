'use client';

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import BubbleButton from '../ui/BubbleButton';
import ScrollReveal from '../ui/ScrollReveal';

const FIELD_STYLE = {
  background: 'var(--bg)',
  borderColor: 'var(--border)',
  color: 'var(--text)',
};

export default function JoinUs() {
  const t = useTranslations('joinUs');

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    skills: '',
    portfolio: '',
    motivation: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const roles: string[] = t.raw('roles') as string[];

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role || !form.motivation) return;

    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'join_requests'), {
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 200),
        role: form.role,
        skills: form.skills.trim().slice(0, 300),
        portfolio: form.portfolio.trim().slice(0, 300),
        motivation: form.motivation.trim().slice(0, 800),
        createdAt: Timestamp.now(),
      });
      setSuccess(t('success'));
      setForm({ name: '', email: '', role: '', skills: '', portfolio: '', motivation: '' });
    } catch (err: any) {
      console.error('Firestore Error (JoinUs):', err);
      setError(t('error') + (err.message ? ` (${err.message})` : ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="join" className="py-20 px-4" style={{ background: 'var(--surface)' }}>
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border p-8 flex flex-col gap-5"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            {/* Row: name + email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder={t('namePlaceholder')}
                required
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                style={FIELD_STYLE}
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder={t('emailPlaceholder')}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                style={FIELD_STYLE}
              />
            </div>

            {/* Role select */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {t('roleLabel')} *
              </label>
              <select
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                style={FIELD_STYLE}
              >
                <option value="">— {t('roleLabel')} —</option>
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {t('skillsLabel')}
              </label>
              <input
                type="text"
                value={form.skills}
                onChange={(e) => set('skills', e.target.value)}
                placeholder={t('skillsPlaceholder')}
                maxLength={300}
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                style={FIELD_STYLE}
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {t('portfolioLabel')}
              </label>
              <input
                type="url"
                value={form.portfolio}
                onChange={(e) => set('portfolio', e.target.value)}
                placeholder={t('portfolioPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                style={FIELD_STYLE}
              />
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {t('motivationLabel')} *
              </label>
              <textarea
                value={form.motivation}
                onChange={(e) => set('motivation', e.target.value)}
                placeholder={t('motivationPlaceholder')}
                required
                maxLength={800}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary resize-none"
                style={FIELD_STYLE}
              />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{form.motivation.length}/800</span>
            </div>

            {success && (
              <div
                className="p-4 rounded-2xl border text-center font-semibold text-primary"
                style={{ background: 'rgba(129,140,248,0.08)', borderColor: 'rgba(129,140,248,0.3)' }}
              >
                {success}
              </div>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}

            <BubbleButton type="submit" variant="primary" fullWidth disabled={loading} size="lg">
              {loading ? '...' : t('submit')}
            </BubbleButton>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
