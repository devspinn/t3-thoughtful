import { db, contacts } from 'lib/database/contacts';

export async function GET() {
  // await db.insert(contacts).values([
  //   {
  //     name: 'Devon',
  //     phoneNumber: '+18605736027',
  //     birthdayDay: 3,
  //     birthdayMonth: 5,    
  //   },
  // ]);
  return Response.json({
    message: 'Done!'
  });

}
