import { db, contacts } from '@/lib/database/contacts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const grin = await db.select().from(contacts);
  return Response.json({
    contacts: grin,
  });
}
