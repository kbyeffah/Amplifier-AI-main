'use server';

import { client } from '@/lib/prisma';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { onGetAllAccountDomains } from '../settings';
interface RegistrationResult {
  status: number;
  user?: {
    fullname: string;
    id: string;
    type: string;
  };
}

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
): Promise<RegistrationResult> => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    return { status: 200, user: registered }; // Always return on success
  } catch (error) {
    return { status: 400 }; // Always return on error
  }
};
export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirectToSignIn();
    return { status: 401, message: 'User not authenticated' }; // Fallback return (though redirect should stop execution)
  }

  try {
    const authenticated = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (authenticated) {
      const domains = await onGetAllAccountDomains();
      return { status: 200, user: authenticated, domain: domains?.domains || [] };
    } else {
      // User exists in Clerk but not in the database
      return { status: 404, message: 'User not found in database' };
    }
  } catch (error) {
    console.error('onLoginUser: Error:', error);
    return { status: 500, message: 'Internal server error' };
  }
};