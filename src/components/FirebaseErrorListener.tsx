'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * A client component that listens for Firestore permission errors
 * and throws them to be caught by the Next.js development error overlay.
 */
export function FirebaseErrorListener() {
  const auth = useAuth(); // Get the auth instance to enrich the error context.

  useEffect(() => {
    const handleError = (permissionError: FirestorePermissionError) => {
      // Enhance the error context with current user authentication details.
      const enhancedContext = {
        ...permissionError.context,
        auth: auth.currentUser
          ? {
              uid: auth.currentUser.uid,
              token: {
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                email_verified: auth.currentUser.emailVerified,
                phone_number: auth.currentUser.phoneNumber,
              },
            }
          : null,
      };

      // Re-create the error with the enhanced context to throw it.
      const errorToThrow = new FirestorePermissionError(enhancedContext);
      
      // We throw the error here so that the Next.js development overlay can
      // catch it and display it. This provides a rich, interactive debugging
      // experience for security rule violations.
      throw errorToThrow;
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [auth]); // Rerun if the auth instance changes.

  return null; // This component does not render anything.
}
