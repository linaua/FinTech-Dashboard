📊 FinTrack — Personal Finance Dashboard
A full-stack personal finance dashboard powered by 
Plaid API — the same banking infrastructure used by Venmo, 
Robinhood, and Stripe.

✨ Features
	•	🏦 Real Bank Integration — connects to 12,000+ financial institutions via Plaid
	•	📈 Monthly Spending Chart — visualize spending trends over 90 days
	•	🥧 Category Breakdown — pie chart of spending by category (Food, Transport, etc.)
	•	💳 Transaction History — paginated list of recent transactions with merchant names
	•	📊 Key Metrics — total spent, average monthly, transaction count at a glance
	•	🔒 Secure by Design — access tokens stored server-side, never exposed to client
	•	⚡ Smart Caching — 1-hour Vercel KV cache to minimize API calls

🛠 Tech Stack

layer  |  technology 
Framework - Next.js 14 
Language - TypeScript
Styling - Tailwind CSS v4
Banking API - Plaid
Charts - Recharts 
Database - Vercel KV (Redis) 
Deployment - Vercel

🏗 Architecture

User clicks "Connect Bank"
        │
        ▼
POST /api/plaid/create-link-token
        │  Creates a short-lived link token
        ▼
Plaid Link UI opens (iframe)
        │  User selects bank + enters credentials
        ▼
POST /api/plaid/exchange-token
        │  Exchanges public token → access token
        │  Access token saved to Vercel KV (server-side only)
        ▼
GET /api/plaid/transactions
        │  Checks KV cache first (1hr TTL)
        │  If miss → fetches from Plaid API
        │  Saves to KV cache
        ▼
Dashboard renders with processed data
        │  processTransactions() runs client-side
        │  Aggregates by category + month
        ▼
Charts + Stats displayed

🚀 Getting Started
Prerequisites
	•	Node.js 18+
	•	Plaid account (free)
	•	Vercel account (free)

🧪 Testing with Plaid Sandbox
No real bank account needed. Use these test credentials:

Field  |   Value 
Institution - Any 
Username - user_good
Password - pass_good 
Phone - +1 415 555 0011
OTP code - 123456

Plaid Sandbox generates realistic transaction data automatically.

fintech-dashboard/
├── app/
│   ├── api/
│   │   └── plaid/
│   │       ├── create-link-token/route.ts   # Creates Plaid Link session
│   │       ├── exchange-token/route.ts       # Exchanges public → access token
│   │       └── transactions/route.ts         # Fetches & caches transactions
│   ├── connect/page.tsx                      # Bank connection page
│   ├── dashboard/page.tsx                    # Main dashboard
│   └── page.tsx                              # Landing page
├── components/
│   ├── PlaidLink.tsx                         # Plaid Link button component
│   ├── SpendingChart.tsx                     # Monthly line chart
│   ├── CategoryBreakdown.tsx                 # Category pie chart
│   ├── TransactionList.tsx                   # Transaction table
│   └── StatCard.tsx                          # Metric card
├── lib/
│   ├── plaid.ts                              # Plaid API client
│   ├── db.ts                                 # Vercel KV helpers
│   └── types.ts                              # TypeScript interfaces
└── .env.example

🗺 Roadmap
	•	Budget goals and alerts
	•	Multi-account support
	•	Export transactions to CSV
	•	Dark mode
	•	Mobile app (React Native)

📄 License
MIT License — feel free to use this project as a reference or template.




