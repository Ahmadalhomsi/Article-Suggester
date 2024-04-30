import Image from "next/image";
import { auth, currentUser } from '@clerk/nextjs/server';



import React from 'react'

export default async function HOME() {

  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return <div>You are not logged in</div>;
  }


  return (
    <div>HOME</div>
  )
}
