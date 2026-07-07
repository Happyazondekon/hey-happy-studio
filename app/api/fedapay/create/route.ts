import { NextRequest, NextResponse } from 'next/server';

const FEDAPAY_API = 'https://api.fedapay.com/v1';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);

    // Server-side validation
    if (!amount || amount < 1000 || amount > 10_000_000) {
      return NextResponse.json(
        { error: 'Montant invalide (minimum 1 000 FCFA)' },
        { status: 400 }
      );
    }

    const secretKey = process.env.FEDAPAY_SECRET_KEY;
    if (!secretKey) {
      console.error('FEDAPAY_SECRET_KEY not set');
      return NextResponse.json({ error: 'Configuration manquante' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heyhappy.vercel.app';

    // 1. Create transaction
    const txRes = await fetch(`${FEDAPAY_API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        description: 'Soutien HeyHappy Studio',
        amount,
        currency: { iso: 'XOF' },
        callback_url: `${siteUrl}/`,
      }),
    });

    if (!txRes.ok) {
      const err = await txRes.json().catch(() => ({}));
      console.error('FedaPay create transaction error:', err);
      return NextResponse.json({ error: 'Erreur FedaPay (transaction)' }, { status: 502 });
    }

    const txData = await txRes.json();
    const txId: number | undefined = txData.v1?.transaction?.id;

    if (!txId) {
      console.error('FedaPay: no transaction id in response', txData);
      return NextResponse.json({ error: 'Réponse FedaPay invalide' }, { status: 502 });
    }

    // 2. Get checkout token
    const tokenRes = await fetch(`${FEDAPAY_API}/transactions/${txId}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.json().catch(() => ({}));
      console.error('FedaPay get token error:', err);
      return NextResponse.json({ error: 'Erreur FedaPay (token)' }, { status: 502 });
    }

    const tokenData = await tokenRes.json();
    const token: string | undefined = tokenData.token;

    if (!token) {
      return NextResponse.json({ error: 'Token FedaPay manquant' }, { status: 502 });
    }

    return NextResponse.json({ url: `https://checkout.fedapay.com/${token}` });
  } catch (err) {
    console.error('FedaPay API route error:', err);
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 });
  }
}
