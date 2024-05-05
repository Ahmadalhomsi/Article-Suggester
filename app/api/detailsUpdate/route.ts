import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {


    // name: userData.name,
    // gender: userData.gender,
    // birthDate: userData.birthDate,
    // fieldsOfInterest: userData.fieldsOfInteres

    try {
        const  data  = await req.json();
        const userId = data.userId;


        const name = data.name
        const gender = data.gender
        const birthDate = data.birthDate
        const fieldsOfInterest = data.fieldsOfInterest

        console.log(userId);
        
        await clerkClient.users.updateUserMetadata(userId, {
            unsafeMetadata: {
                "Name": name,
                "Gender": gender,
                "BirthDate": birthDate,
                "FieldsOfInterest": fieldsOfInterest
            }
        });
        

        return NextResponse.json("User Metadata Updated");

    } catch (error) {
        return NextResponse.json("Errorista + " + error);
    }


}