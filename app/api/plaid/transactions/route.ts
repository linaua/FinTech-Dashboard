import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { getAccessToken, saveTransactions, getCachedTransactions } from '@/lib/db';
import { Transaction } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId') || 'demo-user';

    // Спробуємо кеш
    const cached = await getCachedTransactions(userId);
    if (cached) return NextResponse.json({ transactions: cached, cached: true });

    const accessToken = await getAccessToken(userId);
    if (!accessToken)
      return NextResponse.json({ error: 'Not connected' }, { status: 401 });

    const now   = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 90); // останні 90 днів

    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date:   start.toISOString().split('T')[0],
      end_date:     now.toISOString().split('T')[0],
    });

    const transactions: Transaction[] = response.data.transactions.map((t) => ({
      transaction_id: t.transaction_id,
      account_id:     t.account_id,
      amount:         t.amount,
      date:           t.date,
      name:           t.name,
      category:       t.category || null,
      merchant_name:  t.merchant_name || null,
      pending:        t.pending,
    }));

    await saveTransactions(userId, transactions);
    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('[transactions GET]', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
