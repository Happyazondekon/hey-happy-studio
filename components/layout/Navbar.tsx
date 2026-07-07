'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

// Nav link with bubble hover effect
function NavLink({ href, label, scrolled, onClick }: { href: string; label: string; scrolled: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
      style={{
        color: scrolled
          ? (hovered ? '#818CF8' : 'var(--text-muted)')
          : 'rgba(255,255,255,' + (hovered ? '1' : '0.85') + ')',
        background: hovered
          ? (scrolled ? 'rgba(129,140,248,0.12)' : 'rgba(255,255,255,0.13)')
          : 'transparent',
        boxShadow: hovered && !scrolled ? '0 2px 0 rgba(255,255,255,0.18)' : 'none',
      }}
    >
      {label}
    </a>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    router.push(`/${next}`);
  };

  // Colors adapt: white over video, themed when scrolled
  const iconColor = scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.85)';
  const logoColor = scrolled ? 'var(--text)' : '#ffffff';

  const navLinks = [
    { href: '#games', label: t('games') },
    { href: '#about', label: t('about') },
    { href: '#reviews', label: t('reviews') },
    { href: '#join', label: t('joinUs') },
    { href: '#hire', label: t('hireUs') },
    { href: '#support', label: t('support') },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--surface)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="relative w-9 h-9">
              <Image
                src="/assets/heyhappy.png"
                alt="HeyHappy"
                fill
                className="object-contain"
                style={{ mixBlendMode: scrolled && mounted && theme !== 'dark' ? 'multiply' : 'screen' }}
                priority
              />
            </div>
            <span className="font-extrabold text-lg transition-colors duration-300" style={{ color: logoColor }}>
              HeyHappy
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl transition-all hover:bg-white/10"
                style={{ color: iconColor }}
                aria-label="Changer de theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                  </svg>
                )}
              </button>
            )}

            {/* Lang toggle */}
            <button
              onClick={switchLocale}
              className="px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all hover:border-primary hover:text-primary"
              style={{
                borderColor: scrolled ? 'var(--border)' : 'rgba(255,255,255,0.45)',
                color: iconColor,
              }}
              aria-label="Changer de langue"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* CTA */}
            <a
              href="#support"
              className="hidden sm:flex bubble-btn bubble-btn-primary px-4 py-2 text-sm"
            >
              {t('supportBtn')}
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: iconColor }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-6 pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border)' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold transition-colors active:bg-primary/10"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="#support"
                onClick={() => setMenuOpen(false)}
                className="bubble-btn bubble-btn-primary w-full py-3.5 text-center text-sm font-bold block"
              >
                {t('supportBtn')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

