import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-fedapay-signature') ?? '';
    const webhookSecret = process.env.FEDAPAY_WEBHOOK_SECRET;

    // Verify HMAC signature when webhook secret is configured
    if (webhookSecret && webhookSecret.trim() !== '') {
      const expected = `sha256=${crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')}`;

      if (expected !== signature) {
        console.warn('FedaPay webhook: invalid signature');
        return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
      }
    }

    const event = JSON.parse(body) as {
      name: string;
      entity?: {
        id?: number;
        amount?: number;
        status?: string;
        currency?: { iso?: string };
        customer?: { email?: string };
      };
    };

    // Only record approved transactions
    if (event.name !== 'transaction.approved') {
      return NextResponse.json({ received: true });
    }

    const tx = event.entity ?? {};

    // Save to Firestore via Admin SDK (lazy import to avoid cold-start issues)
    try {
      const { adminDb } = await import('@/lib/firebase-admin');
      const { Timestamp } = await import('firebase-admin/firestore');

      await adminDb.collection('donations').add({
        transactionId: tx.id ?? null,
        amount: tx.amount ?? null,
        currency: tx.currency?.iso ?? 'XOF',
        status: tx.status ?? 'approved',
        customerEmail: tx.customer?.email ?? null,
        createdAt: Timestamp.now(),
      });
    } catch (dbErr) {
      console.error('Firestore write error (non-fatal):', dbErr);
      // Don't return error — FedaPay must receive 200 or it will retry
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Erreur webhook' }, { status: 500 });
  }
}
