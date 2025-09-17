# GHO Guardian - Base Mini App

Navigate Aave GHO with confidence: Borrow smarter, stay safe, and earn more.

## Overview

GHO Guardian is an AI-powered DeFi assistant for Aave users on Avalanche, built as a Base Mini App. It simplifies GHO borrowing, collateral management, liquidation alerts, and reward claiming through an intuitive mobile-first interface.

## Features

### Core Features
- **Guided Borrowing & Collateralization**: Intuitive interface for selecting collateral and understanding LTV ratios
- **Proactive Liquidation Alerts**: Real-time monitoring with push notifications
- **Streamlined GHO Spending**: Integrated merchant payments and reward claiming
- **Simulation Mode**: Test scenarios before committing to transactions
- **Educational UI**: Contextual tooltips and DeFi education
- **Referral Program**: Incentivize ecosystem growth

### Subscription Tiers
- **Free**: Basic alerts, limited simulations (5/month)
- **Pro ($5/mo)**: Advanced analytics, unlimited simulations, priority alerts
- **Premium ($15/mo)**: Direct support, exclusive insights, referral bonuses

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit) + Avalanche (for Aave)
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OnchainKit API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gho-guardian
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OnchainKit API key:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Data Model
- **User**: Wallet address, subscription tier, referral code
- **Position**: Collateral/borrow amounts, LTV, health factor
- **Transaction**: Deposit, withdraw, borrow, repay, spend actions
- **Alert**: Liquidation risks, position updates, rewards

### Key Components
- **AppShell**: Main layout with sidebar navigation
- **WalletConnection**: Base Mini App wallet integration
- **DashboardOverview**: Position stats and recent activity
- **QuickActions**: GHO spending and core features
- **UI Components**: Button, Card, StatDisplay, AlertBanner

### Design System
- **Colors**: Dark theme with blue primary, teal accent
- **Typography**: Inter font with semantic sizing
- **Components**: Modular, reusable UI components
- **Motion**: Smooth transitions and micro-interactions

## Base Mini App Integration

This app is built specifically for the Base ecosystem:

- **MiniKitProvider**: Handles wallet connections and Base network
- **OnchainKit**: Identity and wallet components
- **Mobile-First**: Optimized for in-app experience
- **Frame Integration**: Works within Farcaster frames

## Development

### File Structure
```
app/                 # Next.js App Router pages
├── layout.tsx       # Root layout with providers
├── page.tsx         # Home page
├── providers.tsx    # MiniKit + OnchainKit setup
└── globals.css      # Tailwind + custom styles

components/          # Reusable components
├── ui/              # Base UI components
├── layout/          # Layout components
└── features/        # Feature-specific components

lib/                 # Utilities and types
├── types.ts         # TypeScript definitions
├── utils.ts         # Helper functions
└── constants.ts     # App constants
```

### Key Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Deployment

The app is designed to be deployed as a Base Mini App:

1. Build the application:
```bash
npm run build
```

2. Deploy to your hosting platform
3. Configure the Mini App manifest
4. Submit for Base App integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@ghoguardian.com or join our Discord community.
