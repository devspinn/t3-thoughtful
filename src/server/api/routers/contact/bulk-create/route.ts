import { db, contacts, formatContacts } from '@/lib/database/contacts';
import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { runMigrations } from '@/lib/migrate';


export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  console.log('session', session);
  // runMigrations().then((result) => {
  //   console.log('Migrations completed!', result);
  // })
  // .catch((error) => {
  //     console.error('Error running migrations', error);
  // });

  if (!session) {
    return new Response(`Logged out`, { status: 400 });
  }

  return Response.json({
    message: 'Congrats do you want a cookie?',
  });
};



export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const session = await auth();

  // Check if there's a session

  console.log('session?R?R?R?R?', session);

  if (!session) {
    return new Response(`Logged out`, { status: 400 });
  }


  const body = request.body;
  console.log('body bulk-create');
  console.log(body);
  const text = await new Response(request.body).text();
  const data = JSON.parse(text);

  const text2 = await new Response(request.body).json();
  console.log('text2', text2);

  if (data.contacts.length === 0) {
    return Response.json({
      insertedCount: 0,
    });  
  }
  const sanitizedContacts = formatContacts(data.contacts);

  try {
    const result = await db.insert(contacts).values(sanitizedContacts);
    return Response.json({
      insertedCount: result.rowCount,
    });  
  } catch (error: any) {
    console.error('error', error);
    return new Response(`Error inserting contacts ${error.message}`, { status: 400 });
  }

  // const existingContacts = await collection.find({
  //   phoneNumber: {
  //     $in: inputPhoneNumbers,
  //   },
  // }, {
  //   projection: {
  //     phoneNumber: 1,
  //   },
  // }).toArray();
  // const existingPhoneNumbers = new Set(existingContacts.map(contact => contact.phoneNumber));
  // const newContacts = sanitizedContacts.filter((contact) => !existingPhoneNumbers.has(contact.phoneNumber));
  // if (newContacts.length > 0) {
  //   const result = await collection.insertMany(newContacts as OptionalId<UnformattedContact & { _id?: ObjectId | undefined }>[]);
  //   return { insertedCount: result.insertedCount };
  // }
  // return { insertedCount: 0 };

  // const grin = await db.insert(contacts).values([
  //   {
  //     phoneNumber: '+18605736027',
  //     birthdayDay: 3,
  //     birthdayMonth: 5,
  //   },
  //   {
  //     phoneNumber: '+18603383116',
  //     birthdayDay: 1,
  //     birthdayMonth: 9,
  //   },

  // ]);
  // console.log('grin', grin);
  // return grin;
}
