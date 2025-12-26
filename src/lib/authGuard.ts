'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import type { UserRole } from '@/lib/firebase';

interface AuthGuardOptions {
  /** Require authentication to access the page */
  requireAuth?: boolean;
  /** Require specific role to access the page */
  requiredRole?: UserRole;
  /** Redirect path for unauthenticated users (default: '/login') */
  redirectTo?: string;
  /** Redirect path for authenticated users on auth pages (default: '/') */
  authenticatedRedirect?: string;
  /** Prevent authenticated users from accessing (for login/signup pages) */
  guestOnly?: boolean;
}

interface AuthGuardResult {
  /** Whether the page is loading/checking auth */
  isLoading: boolean;
  /** Whether the user is authorized to view this page */
  isAuthorized: boolean;
  /** Whether Firebase is configured */
  isFirebaseConfigured: boolean;
  /** Current user data */
  user: ReturnType<typeof useAuth>['user'];
  appUser: ReturnType<typeof useAuth>['appUser'];
}

/**
 * Hook to guard routes based on authentication state.
 *
 * @example
 * ```tsx
 * function ProtectedPage() {
 *   const { isLoading, isAuthorized } = useAuthGuard({ requireAuth: true });
 *
 *   if (isLoading) return <LoadingSpinner />;
 *   if (!isAuthorized) return null; // Will redirect
 *
 *   return <div>Protected content</div>;
 * }
 * ```
 */
export function useAuthGuard(options: AuthGuardOptions = {}): AuthGuardResult {
  const {
    requireAuth = false,
    requiredRole,
    redirectTo = '/login',
    authenticatedRedirect = '/',
    guestOnly = false,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const { user, appUser, isLoading, isAuthenticated, isFirebaseConfigured } = useAuth();

  // Determine authorization status
  const isAuthorized = useCallback(() => {
    // Firebase not configured - allow access (offline mode)
    if (!isFirebaseConfigured) return true;

    // Still loading
    if (isLoading) return true;

    // Guest only pages (login/signup)
    if (guestOnly) {
      return !isAuthenticated;
    }

    // Require authentication
    if (requireAuth && !isAuthenticated) {
      return false;
    }

    // Require specific role
    if (requiredRole && appUser?.role !== requiredRole) {
      return false;
    }

    return true;
  }, [isFirebaseConfigured, isLoading, guestOnly, isAuthenticated, requireAuth, requiredRole, appUser]);

  // Handle redirects
  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    // Firebase not configured - skip all redirects
    if (!isFirebaseConfigured) return;

    // Guest only page but user is authenticated
    if (guestOnly && isAuthenticated) {
      router.replace(authenticatedRedirect);
      return;
    }

    // Requires auth but not authenticated
    if (requireAuth && !isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // Requires specific role but doesn't have it
    if (requiredRole && appUser && appUser.role !== requiredRole) {
      router.replace('/unauthorized');
      return;
    }
  }, [
    isLoading,
    isFirebaseConfigured,
    guestOnly,
    isAuthenticated,
    requireAuth,
    requiredRole,
    appUser,
    router,
    pathname,
    redirectTo,
    authenticatedRedirect,
  ]);

  return {
    isLoading,
    isAuthorized: isAuthorized(),
    isFirebaseConfigured,
    user,
    appUser,
  };
}

/**
 * Hook for pages that require teacher role.
 */
export function useTeacherGuard() {
  return useAuthGuard({
    requireAuth: true,
    requiredRole: 'teacher',
    redirectTo: '/login',
  });
}

/**
 * Hook for pages that require student role.
 */
export function useStudentGuard() {
  return useAuthGuard({
    requireAuth: true,
    requiredRole: 'student',
    redirectTo: '/login',
  });
}

/**
 * Hook for login/signup pages (redirects authenticated users away).
 */
export function useGuestGuard() {
  return useAuthGuard({
    guestOnly: true,
    authenticatedRedirect: '/',
  });
}

/**
 * Hook for any protected page (requires authentication, any role).
 */
export function useProtectedRoute() {
  return useAuthGuard({
    requireAuth: true,
    redirectTo: '/login',
  });
}
