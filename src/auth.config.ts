import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // console.log('isLoggedIn', isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // console.log('isOnDashboard', isOnDashboard);

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect unauthenticated user to login
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl as unknown as string));
      }
      return true;
    },
  },
  providers: [],
  debug: true,
} satisfies NextAuthConfig;
