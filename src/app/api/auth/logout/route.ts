import { logoutAdmin } from '@/lib/auth';

export async function POST() {
  try {
    await logoutAdmin();
    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/auth/logout POST]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
