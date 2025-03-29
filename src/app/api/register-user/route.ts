import { currentUser } from '@clerk/nextjs/server';
import { onCompleteUserRegistration } from '@/actions/auth';

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return new Response('User not authenticated', { status: 401 });
  }

  // Construct fullName from firstName and lastName
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Test User';

  const result = await onCompleteUserRegistration(
    fullName,
    user.id,
    'USER'
  );

  return new Response(JSON.stringify(result), { status: result.status });
}