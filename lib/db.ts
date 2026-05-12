import { kv } from '@vercel/kv';
import { Transaction } from './types';

export async function saveAccessToken(
  userId: string, accessToken: string
): Promise<void> {
  await kv.set(`user:${userId}:access_token`, accessToken);
  await kv.expire(`user:${userId}:access_token`, 60 * 60 * 24 * 30); // 30 днів
}

export async function getAccessToken(userId: string): Promise<string | null> {
  try {
    return await kv.get<string>(`user:${userId}:access_token`);
  } catch { return null; }
}

export async function saveTransactions(
  userId: string, transactions: Transaction[]
): Promise<void> {
  const key = `user:${userId}:transactions`;
  await kv.set(key, JSON.stringify(transactions));
  await kv.expire(key, 60 * 60); // кеш 1 година
}

export async function getCachedTransactions(
  userId: string
): Promise<Transaction[] | null> {
  try {
    const raw = await kv.get<string>(`user:${userId}:transactions`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
