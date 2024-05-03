import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {


    try {
        const  data  = await req.json();
        const userId = data.userId;
        const name = data.name
        const address = data.address

        console.log(userId);
        
        await clerkClient.users.updateUserMetadata(userId, {
            unsafeMetadata: {
                "Name": name,
                "Address": address
            }
        });
        

        return NextResponse.json("User Metadata Updated");

    } catch (error) {
        return NextResponse.json("Errorista + " + error);
    }


}