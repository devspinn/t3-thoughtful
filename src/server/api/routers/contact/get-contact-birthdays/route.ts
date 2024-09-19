import { db, contacts, formatContacts } from '@/lib/database/contacts';
import { inArray } from 'drizzle-orm';

export const dynamic = 'force-dynamic';


export async function POST(request: Request) {
  console.log(`get-contact-birthdays POST`);
  const body = await request.json();
  if (!body.contacts) {
    return new Response('Missing "contacts" in body of request', { status: 400 });
  }

  const formattedContacts = formatContacts(body.contacts);
  const phoneNumbersWithMissingBirthday = formattedContacts
    .map((contact) => contact.birthdayMonth ? null : contact.phoneNumber)
    .filter((phoneNumber) => phoneNumber !== null);
  console.log('phoneNumbersWithMissingBirthday', phoneNumbersWithMissingBirthday);
  // const matchingContacts = await collection.find({
  //   phoneNumber: { $in: phoneNumbersWithMissingBirthday }
  // }).toArray();

  const matchingContacts = await db.select()
    .from(contacts)
    .where(inArray(contacts.phoneNumber, ['+18605736027', '+18603383116']));  


  console.log('matchingContacts', matchingContacts);
  return Response.json(matchingContacts);




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
