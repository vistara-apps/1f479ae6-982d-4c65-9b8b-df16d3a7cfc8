'use client';

export function Providers({ children }: { children: React.ReactNode }) {
  // For demo purposes, we'll just pass through the children
  // In a real implementation, this would include MiniKitProvider and OnchainKitProvider
  return <>{children}</>;
}
