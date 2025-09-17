import { NextRequest, NextResponse } from 'next/server';

// Mock payment status tracking
// In a real implementation, this would query blockchain or payment processor APIs
export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
) {
  try {
    const { hash } = params;

    if (!hash || !hash.startsWith('0x') || hash.length !== 66) {
      return NextResponse.json(
        { error: 'Invalid transaction hash' },
        { status: 400 }
      );
    }

    // Simulate checking transaction status
    // In a real implementation, this would:
    // 1. Query the blockchain for transaction status
    // 2. Check payment processor webhooks
    // 3. Return actual transaction data from database

    // Simulate different statuses based on hash
    const hashNum = parseInt(hash.slice(-4), 16);
    
    let status: 'pending' | 'confirmed' | 'failed';
    let confirmations = 0;
    
    if (hashNum % 100 < 10) {
      // 10% chance of failure
      status = 'failed';
    } else if (hashNum % 100 < 30) {
      // 20% chance still pending
      status = 'pending';
      confirmations = Math.floor(hashNum % 12); // 0-11 confirmations
    } else {
      // 70% chance confirmed
      status = 'confirmed';
      confirmations = 12 + (hashNum % 50); // 12+ confirmations
    }

    const response = {
      transactionHash: hash,
      status,
      confirmations,
      requiredConfirmations: 12,
      amount: '10.00', // Mock amount
      recipient: '0x742d35Cc6634C0532925a3b8D4C9db96590c6C8B', // Mock recipient
      timestamp: new Date(Date.now() - (hashNum % 300000)).toISOString(), // Mock timestamp
      blockNumber: status === 'confirmed' ? 12345678 + (hashNum % 1000) : null,
      gasUsed: status === 'confirmed' ? '21000' : null,
      gasFee: status === 'confirmed' ? '0.001234' : null,
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}