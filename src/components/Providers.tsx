'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { AuthProvider } from '@/components/AuthProvider';
import { FloatingSyncStatus } from '@/components/SyncStatus';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ErrorBoundary>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
          <OfflineIndicator />
          <FloatingSyncStatus />
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
