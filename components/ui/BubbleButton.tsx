'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BubbleVariant = 'primary' | 'gold' | 'outline';
type BubbleSize = 'sm' | 'md' | 'lg';

interface BubbleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BubbleVariant;
  size?: BubbleSize;
  fullWidth?: boolean;
}

const variantClass: Record<BubbleVariant, string> = {
  primary: 'bubble-btn-primary',
  gold: 'bubble-btn-gold',
  outline: 'bubble-btn-outline',
};

const sizeClass: Record<BubbleSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function BubbleButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  ...props
}: BubbleButtonProps) {
  return (
    <button
      className={cn(
        'bubble-btn',
        variantClass[variant],
        sizeClass[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
