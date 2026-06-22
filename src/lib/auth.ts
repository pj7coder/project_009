import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'pj_stones_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Fallbacks for username and password
const ADMIN_USER = process.env.ADMIN_USERNAME || 'PJstones';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'PJstones@project-009';

// Get or create a persistent secret key for signing sessions
const SECRET_KEY = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

interface SessionPayload {
  username: string;
  expires: number;
}

/**
 * Creates a signed HMAC token for the session.
 */
function createToken(payload: SessionPayload): string {
  const serialized = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(serialized);
  const signature = hmac.digest('hex');
  return `${Buffer.from(serialized).toString('base64')}.${signature}`;
}

/**
 * Verifies a signed HMAC token.
 */
function verifyToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadBase64, signature] = parts;
    const serialized = Buffer.from(payloadBase64, 'base64').toString('utf8');

    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(serialized);
    const expectedSignature = hmac.digest('hex');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(serialized) as SessionPayload;
    if (Date.now() > payload.expires) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Verifies credentials and sets an HTTP-only session cookie if valid.
 */
export async function loginAdmin(username: string, pass: string): Promise<boolean> {
  if (username !== ADMIN_USER || pass !== ADMIN_PASS) {
    return false;
  }

  const payload: SessionPayload = {
    username,
    expires: Date.now() + SESSION_DURATION,
  };

  const token = createToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return true;
}

/**
 * Checks if the current request is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return false;

  const verified = verifyToken(sessionCookie.value);
  return verified !== null;
}

/**
 * Clears the session cookie.
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
