import axios from 'x402-axios';
import { WalletClient } from 'viem';
import { base } from 'wagmi/chains';

// USDC contract address on Base
export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export interface PaymentRequest {
  amount: string; // Amount in USDC (human readable, e.g., "10.50")
  recipient: string; // Recipient address
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  transactionHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  amount: string;
  recipient: string;
  timestamp: Date;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: any;
}

export class PaymentService {
  private walletClient: WalletClient | null = null;

  constructor(walletClient?: WalletClient) {
    this.walletClient = walletClient || null;
  }

  setWalletClient(walletClient: WalletClient) {
    this.walletClient = walletClient;
  }

  async initializePayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!this.walletClient) {
      throw new PaymentError('WALLET_NOT_CONNECTED', 'Wallet client not available');
    }

    try {
      // Configure x402-axios with wallet client
      const x402Client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_URL || '/api/payments',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Add x402 interceptor for payment protocol
      x402Client.interceptors.request.use(async (config) => {
        if (this.walletClient) {
          // Add wallet signature for authentication
          const message = `Payment request: ${JSON.stringify(request)}`;
          const signature = await this.walletClient.signMessage({
            message,
            account: this.walletClient.account!,
          });
          
          config.headers['X-Wallet-Address'] = this.walletClient.account?.address;
          config.headers['X-Wallet-Signature'] = signature;
          config.headers['X-Chain-Id'] = base.id.toString();
        }
        return config;
      });

      // Make payment request
      const response = await x402Client.post('/initiate', {
        ...request,
        chainId: base.id,
        tokenAddress: USDC_ADDRESS,
        walletAddress: this.walletClient.account?.address,
      });

      return {
        transactionHash: response.data.transactionHash,
        status: 'pending',
        amount: request.amount,
        recipient: request.recipient,
        timestamp: new Date(),
      };
    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      
      if (error.response?.status === 402) {
        // x402 Payment Required
        throw new PaymentError(
          'PAYMENT_REQUIRED',
          'Payment required to access this resource',
          error.response.data
        );
      }

      if (error.code === 'USER_REJECTED_REQUEST') {
        throw new PaymentError(
          'USER_REJECTED',
          'User rejected the payment request'
        );
      }

      if (error.message?.includes('insufficient funds')) {
        throw new PaymentError(
          'INSUFFICIENT_FUNDS',
          'Insufficient balance to complete payment'
        );
      }

      throw new PaymentError(
        'PAYMENT_FAILED',
        error.message || 'Payment initialization failed',
        error
      );
    }
  }

  async checkPaymentStatus(transactionHash: string): Promise<PaymentResponse> {
    try {
      const x402Client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_URL || '/api/payments',
      });

      const response = await x402Client.get(`/status/${transactionHash}`);
      
      return {
        transactionHash,
        status: response.data.status,
        amount: response.data.amount,
        recipient: response.data.recipient,
        timestamp: new Date(response.data.timestamp),
      };
    } catch (error: any) {
      console.error('Payment status check failed:', error);
      throw new PaymentError(
        'STATUS_CHECK_FAILED',
        'Failed to check payment status',
        error
      );
    }
  }

  async getUSDCBalance(address: string): Promise<string> {
    if (!this.walletClient) {
      throw new PaymentError('WALLET_NOT_CONNECTED', 'Wallet client not available');
    }

    try {
      // Read USDC balance
      const balance = await this.walletClient.readContract({
        address: USDC_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'balanceOf',
            type: 'function',
            inputs: [{ name: 'account', type: 'address' }],
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
          },
          {
            name: 'decimals',
            type: 'function',
            inputs: [],
            outputs: [{ name: '', type: 'uint8' }],
            stateMutability: 'view',
          },
        ],
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      });

      // Convert from wei to human readable (USDC has 6 decimals)
      const balanceInUSDC = Number(balance) / Math.pow(10, 6);
      return balanceInUSDC.toFixed(2);
    } catch (error: any) {
      console.error('Failed to get USDC balance:', error);
      return '0.00';
    }
  }

  async estimateGasFee(request: PaymentRequest): Promise<string> {
    if (!this.walletClient) {
      throw new PaymentError('WALLET_NOT_CONNECTED', 'Wallet client not available');
    }

    try {
      // Estimate gas for USDC transfer
      const gasEstimate = await this.walletClient.estimateGas({
        to: USDC_ADDRESS as `0x${string}`,
        data: '0xa9059cbb', // transfer function selector
        account: this.walletClient.account!,
      });

      // Get current gas price
      const gasPrice = await this.walletClient.getGasPrice();
      
      // Calculate total fee in ETH
      const totalFee = Number(gasEstimate * gasPrice) / Math.pow(10, 18);
      
      return totalFee.toFixed(6);
    } catch (error: any) {
      console.error('Gas estimation failed:', error);
      return '0.001'; // Fallback estimate
    }
  }
}

export class PaymentError extends Error {
  code: string;
  details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'PaymentError';
    this.code = code;
    this.details = details;
  }
}