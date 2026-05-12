'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface PlaidLinkProps {
  userId: string;
  onSuccess: () => void;
}

export default function PlaidLinkButton({ userId, onSuccess }: PlaidLinkProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/plaid/create-link-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then((r) => r.json())
      .then((data) => setLinkToken(data.link_token))
      .catch(console.error);
  }, [userId]);

  const onPlaidSuccess = useCallback(
    async (publicToken: string) => {
      await fetch('/api/plaid/exchange-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicToken, userId }),
      });
      onSuccess();
    },
    [userId, onSuccess]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: onPlaidSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready || !linkToken}
      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                 text-white font-semibold px-6 py-3 rounded-xl transition">
      Connect Bank Account
    </button>
  );
}
