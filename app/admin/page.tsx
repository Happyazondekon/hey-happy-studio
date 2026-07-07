'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

interface JoinRequest {
  id: string;
  name: string;
  email: string;
  role: string;
  skills?: string;
  portfolio?: string;
  motivation: string;
  createdAt: string | null;
}

interface HireRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  description: string;
  budget?: string;
  timeline?: string;
  createdAt: string | null;
}

interface AdminData {
  joinRequests: JoinRequest[];
  hireRequests: HireRequest[];
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all"
      style={{ borderColor: copied ? '#818CF8' : 'var(--border)', color: copied ? '#818CF8' : 'var(--text-muted)', background: 'transparent' }}>
      {copied ? 'Copié' : 'Copier'}
    </button>
  );
}

function Tag({ label, color = '#818CF8' }: { label: string; color?: string }) {
  return <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: color + '18', color, border: '1px solid ' + color + '35' }}>{label}</span>;
}

const PROJECT_COLORS: Record<string, string> = {
  'Jeu Mobile': '#F59E0B', 'Mobile Game': '#F59E0B',
  'Application Mobile': '#06B6D4', 'Mobile App': '#06B6D4',
  'Application Web': '#10B981', 'Web Application': '#10B981',
  'Jeu PC / Console': '#8B5CF6', 'PC / Console Game': '#8B5CF6',
};

function JoinCard({ req, index }: { req: JoinRequest; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-[0_0_24px_rgba(129,140,248,0.1)]"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors" onClick={() => setOpen(v => !v)}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0" style={{ background: 'rgba(129,140,248,0.12)', color: '#818CF8' }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="text-left">
            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{req.name}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{req.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Tag label={req.role} />
          <span className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>{formatDate(req.createdAt)}</span>
          <svg className={'w-4 h-4 transition-transform ' + (open ? 'rotate-180' : '')} style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t flex flex-col gap-5" style={{ borderColor: 'var(--border)' }}>
          <div className="pt-5 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</p>
              <div className="flex items-center flex-wrap gap-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{req.email}</span>
                <CopyBtn text={req.email} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Role</p>
              <Tag label={req.role} />
            </div>
            {req.skills && <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Competences</p><p className="text-sm" style={{ color: 'var(--text)' }}>{req.skills}</p></div>}
            {req.portfolio && <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Portfolio</p><a href={req.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline break-all">{req.portfolio}</a></div>}
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}><p className="font-semibold uppercase tracking-widest mb-1">Date</p><p>{formatDate(req.createdAt)}</p></div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Motivation</p>
            <p className="text-sm leading-relaxed p-4 rounded-xl" style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>{req.motivation}</p>
          </div>
          <a href={'mailto:' + req.email + '?subject=HeyHappy — Votre candidature&body=Bonjour ' + req.name + ',%0A%0A'} className="bubble-btn bubble-btn-primary px-5 py-2.5 text-sm w-fit">Repondre par email</a>
        </div>
      )}
    </div>
  );
}

function HireCard({ req, index }: { req: HireRequest; index: number }) {
  const [open, setOpen] = useState(false);
  const color = PROJECT_COLORS[req.projectType] ?? '#818CF8';
  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-200" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors" onClick={() => setOpen(v => !v)}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0" style={{ background: color + '18', color }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="text-left">
            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{req.name}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{req.company ? req.company + ' · ' : ''}{req.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Tag label={req.projectType} color={color} />
          <span className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>{formatDate(req.createdAt)}</span>
          <svg className={'w-4 h-4 transition-transform ' + (open ? 'rotate-180' : '')} style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t flex flex-col gap-5" style={{ borderColor: 'var(--border)' }}>
          <div className="pt-5 grid sm:grid-cols-2 gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</p><div className="flex items-center flex-wrap gap-1"><span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{req.email}</span><CopyBtn text={req.email} /></div></div>
            {req.company && <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Entreprise</p><p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{req.company}</p></div>}
            <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Type de projet</p><Tag label={req.projectType} color={color} /></div>
            {req.budget && <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Budget</p><p className="text-sm font-bold text-gold">{req.budget}</p></div>}
            {req.timeline && <div><p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Delai</p><p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{req.timeline}</p></div>}
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}><p className="font-semibold uppercase tracking-widest mb-1">Date</p><p>{formatDate(req.createdAt)}</p></div>
          </div>
          <div><p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Description</p><p className="text-sm leading-relaxed p-4 rounded-xl" style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>{req.description}</p></div>
          <a href={'mailto:' + req.email + '?subject=HeyHappy — Demande de projet&body=Bonjour ' + req.name + ',%0A%0A'} className="bubble-btn bubble-btn-gold px-5 py-2.5 text-sm w-fit">Repondre par email</a>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5 flex items-center gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '15', border: '1px solid ' + color + '30' }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
        <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border p-16 text-center" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <svg className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--border)' }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
      <p style={{ color: 'var(--text-muted)' }}>{text}</p>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<AdminData | null>(null);
  const [tab, setTab] = useState<'join' | 'hire'>('join');
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async (pwd: string) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/requests', { headers: { 'x-admin-key': pwd } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Erreur inconnue');
      setData(json as AdminData);
    } catch (e) { setError(e instanceof Error ? e.message : 'Erreur'); }
    finally { setLoading(false); }
  }, []);

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); fetchData(password); };

  const filtered = {
    join: (data?.joinRequests ?? []).filter(r => (r.name + r.email + r.role).toLowerCase().includes(search.toLowerCase())),
    hire: (data?.hireRequests ?? []).filter(r => (r.name + r.email + r.projectType + (r.company ?? '')).toLowerCase().includes(search.toLowerCase())),
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative w-16 h-16 rounded-3xl flex items-center justify-center" style={{ background: 'rgba(129,140,248,0.1)', border: '2px solid rgba(129,140,248,0.25)', boxShadow: '0 0 40px rgba(129,140,248,0.2)' }}>
              <Image src="/assets/heyhappy.png" alt="HeyHappy" fill className="object-contain p-3" style={{ mixBlendMode: 'screen' }} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>Hey<span className="text-primary">Happy</span> Admin</h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Espace prive — acces reserve</p>
            </div>
          </div>
          <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Mot de passe</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" required autoFocus
                  className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:border-primary"
                  style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
              </div>
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}
              <button type="submit" disabled={loading} className="bubble-btn bubble-btn-primary w-full py-3 text-sm mt-1">
                {loading ? 'Connexion...' : 'Acceder au dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const thisMonth = [...data.joinRequests, ...data.hireRequests].filter(r => r.createdAt && new Date(r.createdAt).getMonth() === new Date().getMonth()).length;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <nav className="sticky top-0 z-10 border-b h-16 px-6 flex items-center justify-between" style={{ background: 'var(--surface)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden shrink-0" style={{ border: '1px solid rgba(129,140,248,0.3)' }}>
            <Image src="/assets/heyhappy.png" alt="HeyHappy" fill className="object-contain p-1" style={{ mixBlendMode: 'screen' }} />
          </div>
          <span className="font-extrabold" style={{ color: 'var(--text)' }}>Hey<span className="text-primary">Happy</span></span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(129,140,248,0.12)', color: '#818CF8' }}>Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
              className="pl-9 pr-3 py-1.5 rounded-xl text-sm transition-colors focus:border-primary"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', width: 200 }} />
          </div>
          <button onClick={() => fetchData(password)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:border-primary hover:text-primary" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
            Actualiser
          </button>
          <button onClick={() => { setData(null); setPassword(''); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:border-red-400 hover:text-red-400" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>
            Deconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Candidatures" value={data.joinRequests.length} color="#818CF8" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>} />
          <StatCard label="Demandes projet" value={data.hireRequests.length} color="#F59E0B" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>} />
          <StatCard label="Total recus" value={data.joinRequests.length + data.hireRequests.length} color="#10B981" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" /></svg>} />
          <StatCard label="Ce mois" value={thisMonth} color="#A78BFA" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>} />
        </div>

        <div>
          <div className="flex gap-2 mb-5 p-1 rounded-2xl w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {([{ key: 'join', label: 'Join Us', count: filtered.join.length, color: '#818CF8' }, { key: 'hire', label: 'Hire Us', count: filtered.hire.length, color: '#F59E0B' }] as const).map(t => {
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: active ? t.color + '18' : 'transparent', color: active ? t.color : 'var(--text-muted)', border: '1px solid ' + (active ? t.color + '40' : 'transparent') }}>
                  {t.label}
                  <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: active ? t.color + '25' : 'var(--bg)', color: active ? t.color : 'var(--text-muted)' }}>{t.count}</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            {tab === 'join' && (filtered.join.length === 0 ? <EmptyState text="Aucune candidature pour l'instant." /> : filtered.join.map((req, i) => <JoinCard key={req.id} req={req} index={i} />))}
            {tab === 'hire' && (filtered.hire.length === 0 ? <EmptyState text="Aucune demande de projet pour l'instant." /> : filtered.hire.map((req, i) => <HireCard key={req.id} req={req} index={i} />))}
          </div>
        </div>
      </div>
    </div>
  );
}
