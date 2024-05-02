// frontend/app/api/getTheAuth/route.ts

import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export function GET(req: NextApiRequest): any {
  // Your logic to get the auth information
  const  data  = getAuth(req);
  const userId = data.userId;


  if (!userId) {
    return NextResponse.json("something");
  }

  return NextResponse.json({userId});
}
