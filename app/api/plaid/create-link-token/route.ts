import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { Products, CountryCode } from 'plaid';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    const response = await plaidClient.linkTokenCreate({
      user:         { client_user_id: userId },
      client_name:  'FinTrack Dashboard',
      products:     [Products.Transactions],
      country_codes: [CountryCode.Us],
      language:     'en',
    });
    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('[create-link-token]', error);
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
  }
}
