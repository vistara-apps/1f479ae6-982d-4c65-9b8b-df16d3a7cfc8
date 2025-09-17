'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-danger/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-heading2 text-text-primary">Something went wrong!</h2>
          <p className="text-text-secondary">
            We encountered an unexpected error. Please try again.
          </p>
        </div>
        
        <button
          onClick={reset}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
