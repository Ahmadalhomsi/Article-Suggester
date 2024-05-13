"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Home, Shield, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

//import { Button } from "@/components/ui/button";
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'



export const NavbarRoutes = () => {
  // const { userId } = useAuth();
  const pathname = usePathname();


  const isdetailsUpdatePage = pathname === "/detailsUpdate";
  

  return (
    <>

      <div className="flex gap-x-2 ml-auto">


        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
          />
        </SignedIn>


        <Link href="/">
          <Button size="sm" variant="ghost">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>






        {isdetailsUpdatePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
            <Link href={`/detailsUpdate`}>
            <Button size="sm" variant="ghost">
              Details Update
            </Button>
          </Link>
        )}

      </div>
    </>
  )
}