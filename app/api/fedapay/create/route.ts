import { NextRequest, NextResponse } from 'next/server';

const FEDAPAY_API = 'https://api.fedapay.com/v1';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hey-happy-studio.vercel.app';

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
        customer: { email: 'don@heyhappy.studio' },
      }),
    });

    if (!txRes.ok) {
      const err = await txRes.json().catch(() => ({}));
      console.error('FedaPay create transaction error:', JSON.stringify(err));
      // Extract specific error message if possible
      const detail = err.message || err.error || JSON.stringify(err);
      return NextResponse.json(
        { error: `FedaPay (Tx): ${detail}` },
        { status: 502 }
      );
    }

    const txData = await txRes.json();
    // FedaPay API v1 wraps response in { v1: { transaction: { id, ... } } }
    // Or sometimes just { transaction: { id } } or { id }
    const txId: number | undefined =
      txData?.v1?.transaction?.id ??
      txData?.transaction?.id ??
      txData?.id;

    if (!txId) {
      console.error('FedaPay: unexpected response structure', JSON.stringify(txData));
      const responsePreview = JSON.stringify(txData).slice(0, 100);
      return NextResponse.json(
        { error: `Réponse FedaPay inattendue (ID manquant). Reçu: ${responsePreview}` },
        { status: 502 }
      );
    }

    // 2. Generate checkout token — response includes { token, url }
    const tokenRes = await fetch(`${FEDAPAY_API}/transactions/${txId}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.json().catch(() => ({}));
      console.error('FedaPay get token error:', JSON.stringify(err));
      const detail = err.message || err.error || JSON.stringify(err);
      return NextResponse.json(
        { error: `FedaPay (Token): ${detail}` },
        { status: 502 }
      );
    }

    const tokenData = await tokenRes.json();
    // tokenData.url is the direct checkout URL from FedaPay
    // tokenData.token is the token (fallback for URL construction)
    const checkoutUrl: string | undefined =
      tokenData.url ??
      (tokenData?.v1?.token?.url) ??
      (tokenData.token ? `https://checkout.fedapay.com/${tokenData.token}` : undefined);

    if (!checkoutUrl) {
      console.error('FedaPay: no checkout URL in token response', JSON.stringify(tokenData));
      return NextResponse.json({ error: 'URL checkout FedaPay manquante' }, { status: 502 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error('FedaPay API route error:', err);
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 });
  }
}
