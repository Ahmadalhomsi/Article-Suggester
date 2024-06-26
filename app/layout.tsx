import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { NavbarRoutes } from "@/components/Header";
import toast, { Toaster } from 'react-hot-toast';




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Toaster />
          <NavbarRoutes>
          </NavbarRoutes>
          <ClerkLoaded>
            <main>
              {children}
            </main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider >
  )

}
