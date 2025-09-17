// App Configuration
export const APP_CONFIG = {
  name: 'GHO Guardian',
  tagline: 'Navigate Aave GHO with confidence',
  version: '1.0.0',
  supportEmail: 'support@ghoguardian.com',
  websiteUrl: 'https://ghoguardian.com',
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic liquidation alerts',
      'Limited simulations (5/month)',
      'Basic position monitoring',
      'Community support',
    ],
    limits: {
      simulations: 5,
      alerts: 10,
      positions: 3,
    },
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 5,
    features: [
      'Advanced analytics',
      'Unlimited simulations',
      'Priority alerts',
      'Advanced risk metrics',
      'Email support',
    ],
    limits: {
      simulations: -1, // unlimited
      alerts: -1,
      positions: -1,
    },
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 15,
    features: [
      'Direct support',
      'Exclusive insights',
      'Referral bonuses',
      'Custom alerts',
      'API access',
      'White-label options',
    ],
    limits: {
      simulations: -1,
      alerts: -1,
      positions: -1,
    },
  },
} as const;

// Supported Assets on Avalanche
export const SUPPORTED_ASSETS = {
  AVAX: {
    symbol: 'AVAX',
    name: 'Avalanche',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoUrl: '/assets/avax.png',
    coingeckoId: 'avalanche-2',
  },
  WAVAX: {
    symbol: 'WAVAX',
    name: 'Wrapped AVAX',
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    decimals: 18,
    logoUrl: '/assets/wavax.png',
    coingeckoId: 'wrapped-avax',
  },
  WETH: {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    decimals: 18,
    logoUrl: '/assets/weth.png',
    coingeckoId: 'weth',
  },
  WBTC: {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    decimals: 8,
    logoUrl: '/assets/wbtc.png',
    coingeckoId: 'wrapped-bitcoin',
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    decimals: 6,
    logoUrl: '/assets/usdc.png',
    coingeckoId: 'usd-coin',
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    decimals: 6,
    logoUrl: '/assets/usdt.png',
    coingeckoId: 'tether',
  },
  GHO: {
    symbol: 'GHO',
    name: 'GHO Stablecoin',
    address: '0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f', // Placeholder address
    decimals: 18,
    logoUrl: '/assets/gho.png',
    coingeckoId: 'gho',
  },
} as const;

// Risk Thresholds
export const RISK_THRESHOLDS = {
  HEALTH_FACTOR: {
    CRITICAL: 1.1,
    HIGH: 1.5,
    MEDIUM: 2.0,
    LOW: 3.0,
  },
  LTV: {
    CRITICAL: 85,
    HIGH: 75,
    MEDIUM: 65,
    LOW: 50,
  },
} as const;

// Alert Types and Priorities
export const ALERT_TYPES = {
  LIQUIDATION_RISK: {
    type: 'liquidation_risk',
    priority: 'critical',
    title: 'Liquidation Risk',
    icon: '⚠️',
  },
  POSITION_UPDATE: {
    type: 'position_update',
    priority: 'medium',
    title: 'Position Update',
    icon: '📊',
  },
  REWARD_AVAILABLE: {
    type: 'reward_available',
    priority: 'low',
    title: 'Rewards Available',
    icon: '🎁',
  },
  MARKET_CHANGE: {
    type: 'market_change',
    priority: 'medium',
    title: 'Market Update',
    icon: '📈',
  },
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  BORROW: 'borrow',
  REPAY: 'repay',
  SPEND: 'spend',
  CLAIM_REWARDS: 'claim_rewards',
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  AVALANCHE: {
    chainId: 43114,
    name: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  BASE: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
} as const;

// Aave Protocol Addresses (Avalanche)
export const AAVE_ADDRESSES = {
  POOL: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
  POOL_DATA_PROVIDER: '0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654',
  PRICE_ORACLE: '0xEBd36016B3eD09D4693Ed4251c67Bd858c3c7C9C',
  REWARDS_CONTROLLER: '0x929EC64c34a17401F460460D4B9390518E5B473e',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: {
    FAST: 150,
    BASE: 250,
    SLOW: 400,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
  MAX_CONTAINER_WIDTH: '1200px',
  SIDEBAR_WIDTH: '280px',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  POSITIONS: '/api/positions',
  TRANSACTIONS: '/api/transactions',
  ALERTS: '/api/alerts',
  REWARDS: '/api/rewards',
  SIMULATION: '/api/simulation',
  MARKET_DATA: '/api/market-data',
  USER_PROFILE: '/api/user',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_AMOUNT: 'Please enter a valid amount',
  POSITION_NOT_FOUND: 'Position not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_SUBMITTED: 'Transaction submitted successfully',
  POSITION_UPDATED: 'Position updated successfully',
  ALERT_DISMISSED: 'Alert dismissed',
  REWARDS_CLAIMED: 'Rewards claimed successfully',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  SIMULATION_MODE: true,
  REFERRAL_PROGRAM: true,
  PUSH_NOTIFICATIONS: true,
  ADVANCED_ANALYTICS: true,
  GHO_SPENDING: true,
  LIQUIDATION_PROTECTION: true,
} as const;

// Default Values
export const DEFAULTS = {
  SIMULATION_TIMEFRAME: 30, // days
  ALERT_CHECK_INTERVAL: 60000, // 1 minute
  PRICE_UPDATE_INTERVAL: 30000, // 30 seconds
  MAX_POSITIONS: 10,
  MAX_ALERTS: 50,
  PAGINATION_LIMIT: 20,
} as const;
