"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';



export default function HOME() {

  const [userId, setUserId] = useState<string | null>(null);
  // const { userId } = auth();
  // //const user = await currentUser();
  // //console.log("XXXXXX: " + user);

  // console.log("AAAAAA: " + userId);

  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getTheAuth'); // Replace 'your-api-route' with the actual route
        setUserId(response.data.userId);
      } catch (error) {
        console.log('XError:', error);
        // Handle error
      }
    };

    fetchData();
  }, []);




  if (userId === null) {
    return <div>Loading...</div>;
  }

  else
  {
    router.push("/searchPage");
    return (
    <div>
      <p>User ID: {userId}</p>
    </div>
  );
  }
  
}
