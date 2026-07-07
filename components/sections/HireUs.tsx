'use client';

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import BubbleButton from '../ui/BubbleButton';
import ScrollReveal from '../ui/ScrollReveal';

const FIELD_STYLE = {
  background: 'var(--surface)',
  borderColor: 'var(--border)',
  color: 'var(--text)',
};

export default function HireUs() {
  const t = useTranslations('hireUs');

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const projectTypes: string[] = t.raw('projectTypes') as string[];
  const budgets: string[] = t.raw('budgets') as string[];
  const timelines: string[] = t.raw('timelines') as string[];

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.description) return;

    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'hire_requests'), {
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 200),
        company: form.company.trim().slice(0, 200),
        projectType: form.projectType,
        description: form.description.trim().slice(0, 1000),
        budget: form.budget,
        timeline: form.timeline,
        createdAt: Timestamp.now(),
      });
      setSuccess(t('success'));
      setForm({ name: '', email: '', company: '', projectType: '', description: '', budget: '', timeline: '' });
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hire" className="py-20 px-4" style={{ background: 'var(--bg)' }}>
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
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
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

            {/* Company */}
            <input
              type="text"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              placeholder={t('companyPlaceholder')}
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
              style={FIELD_STYLE}
            />

            {/* Project type */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {t('projectTypeLabel')} *
              </label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((pt) => {
                  const active = form.projectType === pt;
                  return (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => set('projectType', pt)}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-all"
                      style={{
                        background: active ? '#818CF8' : 'var(--bg)',
                        borderColor: active ? '#818CF8' : 'var(--border)',
                        color: active ? '#FFFFFF' : 'var(--text-muted)',
                      }}
                    >
                      {pt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {t('descriptionLabel')} *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder={t('descriptionPlaceholder')}
                required
                maxLength={1000}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary resize-none"
                style={FIELD_STYLE}
              />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{form.description.length}/1000</span>
            </div>

            {/* Budget + Timeline */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {t('budgetLabel')}
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => set('budget', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                  style={FIELD_STYLE}
                >
                  <option value="">—</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {t('timelineLabel')}
                </label>
                <select
                  value={form.timeline}
                  onChange={(e) => set('timeline', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                  style={FIELD_STYLE}
                >
                  <option value="">—</option>
                  {timelines.map((tl) => <option key={tl} value={tl}>{tl}</option>)}
                </select>
              </div>
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

            <BubbleButton type="submit" variant="gold" fullWidth disabled={loading} size="lg">
              {loading ? '...' : t('submit')}
            </BubbleButton>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
