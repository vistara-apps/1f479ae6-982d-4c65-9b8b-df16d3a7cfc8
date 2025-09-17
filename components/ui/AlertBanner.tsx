'use client';

import { cn } from '@/lib/utils';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  variant?: 'default' | 'warning' | 'danger' | 'success';
  title: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function AlertBanner({
  variant = 'default',
  title,
  message,
  dismissible = false,
  onDismiss,
  className = '',
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const baseStyles = 'rounded-lg p-4 border flex items-start gap-3 animate-slide-up';
  
  const variants = {
    default: 'bg-surface border-gray-700 text-text-primary',
    warning: 'bg-warning/10 border-warning/20 text-warning',
    danger: 'bg-danger/10 border-danger/20 text-danger',
    success: 'bg-success/10 border-success/20 text-success',
  };

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      {getIcon()}
      <div className="flex-1 space-y-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
