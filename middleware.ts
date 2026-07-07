import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude Next.js internals, API routes, admin page, and static files
  matcher: ['/((?!_next|api|admin|.*\..*).*)'],
};
