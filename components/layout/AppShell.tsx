'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Shield, Bell, User, Settings, Home, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);

  // Close sidebar when clicking outside or on navigation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, current: true },
    { name: 'Positions', href: '/positions', icon: Shield, current: false },
    { name: 'Alerts', href: '/alerts', icon: AlertCircle, current: false, badge: hasUnreadAlerts },
    { name: 'Settings', href: '/settings', icon: Settings, current: false },
  ];

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-gray-700 transform transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-heading2 text-text-primary font-bold">GHO Guardian</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-bg rounded transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative touch-manipulation',
                item.current
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg active:scale-95'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <div className="w-2 h-2 bg-danger rounded-full animate-pulse" />
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-bg/80 backdrop-blur-sm border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-surface rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-text-primary" />
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                className="relative p-2 hover:bg-surface rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5 text-text-secondary hover:text-text-primary transition-colors duration-200" />
                {hasUnreadAlerts && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse" />
                )}
              </button>
              <button 
                className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 touch-manipulation"
                aria-label="User profile"
              />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
