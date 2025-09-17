// User and Authentication Types
export interface User {
  userId: string;
  walletAddress: string;
  subscriptionTier: 'free' | 'pro' | 'premium';
  referralCode: string;
  createdAt: Date;
}

// Position and DeFi Types
export interface Position {
  positionId: string;
  userId: string;
  collateralAsset: string;
  borrowedAsset: string;
  collateralAmount: number;
  borrowedAmount: number;
  ltv: number;
  healthFactor: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  transactionHash: string;
  userId: string;
  type: 'borrow' | 'repay' | 'deposit' | 'withdraw' | 'spend';
  asset: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface Alert {
  alertId: string;
  userId: string;
  type: 'liquidation_risk' | 'position_update' | 'reward_available' | 'market_change';
  message: string;
  status: 'unread' | 'read' | 'dismissed';
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Asset and Market Types
export interface Asset {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoUrl: string;
  price: number;
  apy: number;
  ltv: number;
  liquidationThreshold: number;
}

export interface MarketData {
  totalSupply: number;
  totalBorrow: number;
  availableLiquidity: number;
  utilizationRate: number;
  supplyApy: number;
  borrowApy: number;
}

// Simulation Types
export interface SimulationParams {
  collateralAsset: string;
  collateralAmount: number;
  borrowAsset: string;
  borrowAmount: number;
  timeframe: number; // in days
}

export interface SimulationResult {
  projectedLtv: number;
  projectedHealthFactor: number;
  liquidationPrice: number;
  interestCost: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

// Reward and Referral Types
export interface Reward {
  rewardId: string;
  userId: string;
  type: 'referral' | 'usage' | 'loyalty' | 'gho_spending';
  amount: number;
  asset: string;
  status: 'pending' | 'claimable' | 'claimed';
  createdAt: Date;
  claimedAt?: Date;
}

export interface ReferralData {
  referralCode: string;
  referredUsers: number;
  totalRewards: number;
  pendingRewards: number;
  conversionRate: number;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  variant?: 'default' | 'highlight' | 'warning' | 'danger';
  className?: string;
  children: React.ReactNode;
}

export interface StatDisplayProps {
  label: string;
  value: string | number;
  change?: number;
  format?: 'currency' | 'percentage' | 'number';
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Wallet and Web3 Types
export interface WalletState {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  balance?: string;
  isConnecting: boolean;
  error?: string;
}

export interface ContractCall {
  address: string;
  abi: any[];
  functionName: string;
  args?: any[];
  value?: bigint;
}

// Notification Types
export interface NotificationSettings {
  liquidationAlerts: boolean;
  positionUpdates: boolean;
  rewardNotifications: boolean;
  marketUpdates: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
}

// Theme and UI Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface UIState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  notifications: Alert[];
  loading: boolean;
  error?: string;
}
