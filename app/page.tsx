"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';



export default function HOME() {

  // const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  const data = useUser();
  const isSignedIn = data.isSignedIn
   
   console.log("ID: " + data.user?.id);
   


  if (!isSignedIn) {
    return <div>You are not signed in</div>;
  }

  else
  {
    router.push("/searchPage");
    return (
    <div>
      <p>Logged In, Id: {}</p>
    </div>
  );
  }
  
}
