// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])
// // Protected Routes:

// //     You've defined that any routes matching /dashboard(.*) or /forum(.*) are protected using createRouteMatcher. This means any path that begins with /dashboard or /forum will be protected.

// // Middleware:

// //     The clerkMiddleware checks if the request is to a protected route (using isProtectedRoute(req)).
// //     If the request is for a protected route, the auth().protect() function will be called. This function is responsible for ensuring that the 
// // visitor is authenticated. If the visitor is not authenticated, they will be redirected to the login page automatically.
// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect()
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/anyone-can-visit-this-route']);

export default clerkMiddleware((auth, request) => {
    const { userId } = auth(); 
  
    if (!isPublicRoute(request) && !userId) {
      return auth().redirectToSignIn({ returnBackUrl: request.url });
    }
  
    return NextResponse.next();
  });

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

