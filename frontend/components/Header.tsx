"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Home,Shield,UserCircle } from "lucide-react"; 
import Link from "next/link";

//import { Button } from "@/components/ui/button";


export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  const isdetailsUpdatePage = pathname === "/detailsUpdate";
  const isAdminPage = pathname === "/admin";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">

        <Link href="/">
          <Button size="sm" variant="ghost">
            <Home className="h-4 w-4 mr-2" />
            Ana Menü
          </Button>
        </Link>


        <UserButton
          afterSignOutUrl="/"
        />

        {isdetailsUpdatePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </Link>
        ) : (
          <Link href="/detailsUpdate">
            <Button size="sm" variant="ghost">
              Profil güncelle
            </Button>
          </Link>
        )}

      </div>
    </>
  )
}