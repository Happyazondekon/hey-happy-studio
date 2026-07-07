import { NextRequest, NextResponse } from 'next/server';

interface FirestoreDoc {
  id: string;
  createdAt: string | null;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  // Validate admin key
  const adminKey = req.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_PASSWORD;

  if (!expectedKey || !adminKey || adminKey !== expectedKey) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { adminDb } = await import('@/lib/firebase-admin');

    const [joinSnap, hireSnap] = await Promise.all([
      adminDb.collection('join_requests').orderBy('createdAt', 'desc').limit(200).get(),
      adminDb.collection('hire_requests').orderBy('createdAt', 'desc').limit(200).get(),
    ]);

    const toDoc = (doc: FirebaseFirestore.QueryDocumentSnapshot): FirestoreDoc => ({
      id: doc.id,
      ...doc.data(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (doc.data().createdAt as any)?.toDate?.()?.toISOString() ?? null,
    });

    return NextResponse.json({
      joinRequests: joinSnap.docs.map(toDoc),
      hireRequests: hireSnap.docs.map(toDoc),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur';
    console.error('Admin requests error:', err);
    // Return helpful message if Firebase Admin is not configured
    if (message.includes('FIREBASE_SERVICE_ACCOUNT_KEY')) {
      return NextResponse.json(
        { error: 'Firebase Admin SDK non configuré. Ajoutez FIREBASE_SERVICE_ACCOUNT_KEY dans les variables d\'env.' },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
