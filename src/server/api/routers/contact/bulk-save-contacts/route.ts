import { db, contacts, formatContacts } from '@/lib/database/contacts';
import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { decode } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

export const dynamic = 'force-dynamic';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const sessionRes = await auth(req, res);

  console.log(`is sessionRes a response object?: ${sessionRes instanceof Response}`);

  return Response.json({
    message: 'Congrats do you want a cookie?',
    isLoggedIn: sessionRes ? true : false,
  });
};

  // if (contacts.length === 0) {
  //   // do something because DB will fail
  //   return new Response(
  //     JSON.stringify({ error: 'requiredField is missing' }),
  //     {
  //       status: 400, // Bad Request
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // }


export async function POST(request: NextApiRequest, response: NextApiResponse) {

  // const body = await request.json();
  const sessionRes = await auth(request, response);
  console.log('sessionRes');
  console.log(sessionRes);
  const grin = await new Response(sessionRes).text();
  console.log('grin');
  console.log(grin);


  console.log('thing got hit!!!');
  console.log(`${request.body.length} contacts`);
  console.log(`${request.body.contacts?.length} contacts`);
  // console.log(request.body);
  const text = await new Response(request.body).text();
  const data = JSON.parse(text);
  console.log(`${data.contacts?.length} contacts`);
  if (!data.contacts?.length) {
    return new Response(`No contacts in body`, { status: 400 });
  }

  console.log(`saving ${data.contacts.length} contacts`);
  // return Response.json({
  //   insertedCount: data.contacts.length,
  // });  

  const sanitizedContacts = formatContacts(data.contacts);

  try {
    const result = await db.insert(contacts).values(sanitizedContacts);
    console.log(`saved ${result.rowCount} contacts`);
    return Response.json({
      insertedCount: result.rowCount,
    });  
  } catch (error: any) {
    console.error('error', error);
    return new Response(`Error inserting contacts ${error.message}`, { status: 400 });
  }

}
