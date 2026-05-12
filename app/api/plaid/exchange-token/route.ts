import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { saveAccessToken } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { publicToken, userId } = await request.json();
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    await saveAccessToken(userId, response.data.access_token);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[exchange-token]', error);
    return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
  }
}
