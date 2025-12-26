'use client';

import { useState, useEffect, useCallback } from 'react';
import { syncQueue, type SyncQueueStatus } from '@/lib/syncQueue';
import { useAuth } from '@/components/AuthProvider';

interface SyncStatusProps {
  /** Show compact version (just icon) */
  compact?: boolean;
  /** Custom class name */
  className?: string;
}

type SyncState = 'synced' | 'syncing' | 'pending' | 'offline' | 'error';

/**
 * Visual indicator for cloud sync status
 */
export function SyncStatus({ compact = false, className = '' }: SyncStatusProps) {
  const { isAuthenticated, isFirebaseConfigured } = useAuth();
  const [status, setStatus] = useState<SyncQueueStatus | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  // Subscribe to sync queue status changes
  useEffect(() => {
    const unsubscribe = syncQueue.subscribe(setStatus);
    return unsubscribe;
  }, []);

  // Determine sync state
  const getSyncState = useCallback((): SyncState => {
    if (!status) return 'synced';
    if (!status.isOnline) return 'offline';
    if (status.isProcessing) return 'syncing';
    if (status.failedOperations > 0) return 'error';
    if (status.queueLength > 0) return 'pending';
    return 'synced';
  }, [status]);

  const syncState = getSyncState();

  // Handle manual retry
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await syncQueue.forceSync();
    } finally {
      setIsRetrying(false);
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp: number | null): string => {
    if (!timestamp) return 'never';

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Don't show if not authenticated or Firebase not configured
  if (!isFirebaseConfigured || !isAuthenticated) {
    return null;
  }

  // Icon and color based on state
  const stateConfig: Record<SyncState, { icon: string; color: string; label: string; bg: string }> = {
    synced: {
      icon: '✓',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      label: 'Synced',
    },
    syncing: {
      icon: '↻',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      label: 'Syncing...',
    },
    pending: {
      icon: '◐',
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      label: `${status?.queueLength || 0} pending`,
    },
    offline: {
      icon: '⊘',
      color: 'text-gray-500 dark:text-gray-400',
      bg: 'bg-gray-100 dark:bg-gray-800',
      label: 'Offline',
    },
    error: {
      icon: '!',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      label: `${status?.failedOperations || 0} failed`,
    },
  };

  const config = stateConfig[syncState];

  // Compact version - just an icon
  if (compact) {
    return (
      <div
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${config.bg} ${config.color} ${className}`}
        title={config.label}
      >
        <span className={syncState === 'syncing' ? 'animate-spin' : ''}>
          {config.icon}
        </span>
      </div>
    );
  }

  // Full version with details
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} ${className}`}>
      {/* Icon */}
      <span className={`${config.color} ${syncState === 'syncing' ? 'animate-spin' : ''}`}>
        {config.icon}
      </span>

      {/* Label */}
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>

      {/* Last sync time (if synced) */}
      {syncState === 'synced' && status?.lastSuccessfulSync && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatTimeAgo(status.lastSuccessfulSync)}
        </span>
      )}

      {/* Retry button (if error) */}
      {syncState === 'error' && !isRetrying && (
        <button
          onClick={handleRetry}
          className="ml-1 text-xs text-red-600 dark:text-red-400 hover:underline"
        >
          Retry
        </button>
      )}

      {/* Queue count (if pending) */}
      {syncState === 'pending' && status && status.queueLength > 1 && (
        <span className="text-xs text-yellow-600 dark:text-yellow-400">
          ({status.queueLength} items)
        </span>
      )}
    </div>
  );
}

/**
 * Hook to get sync status programmatically
 */
export function useSyncStatus() {
  const [status, setStatus] = useState<SyncQueueStatus | null>(null);

  useEffect(() => {
    const unsubscribe = syncQueue.subscribe(setStatus);
    return unsubscribe;
  }, []);

  const getSyncState = useCallback((): SyncState => {
    if (!status) return 'synced';
    if (!status.isOnline) return 'offline';
    if (status.isProcessing) return 'syncing';
    if (status.failedOperations > 0) return 'error';
    if (status.queueLength > 0) return 'pending';
    return 'synced';
  }, [status]);

  return {
    status,
    state: getSyncState(),
    isOnline: status?.isOnline ?? true,
    isSyncing: status?.isProcessing ?? false,
    hasPending: (status?.queueLength ?? 0) > 0,
    hasErrors: (status?.failedOperations ?? 0) > 0,
    forceSync: () => syncQueue.forceSync(),
    clearQueue: () => syncQueue.clearQueue(),
  };
}

/**
 * Floating sync indicator for mobile/compact views
 */
export function FloatingSyncStatus() {
  const { isAuthenticated, isFirebaseConfigured } = useAuth();
  const { state, hasPending, hasErrors } = useSyncStatus();

  // Only show when there's something to indicate
  if (!isFirebaseConfigured || !isAuthenticated) return null;
  if (state === 'synced' && !hasPending && !hasErrors) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <SyncStatus compact />
    </div>
  );
}
