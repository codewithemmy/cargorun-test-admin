
'use client'


import SideNav from "@/components/ui/SideNav";
import NavBar from '@/components/NavBar'
import { Barlow, Inter } from "next/font/google";

const barlow = Barlow({weight:['100', '200', '300', '400', '500'] ,subsets:['latin']})
const inter = Inter({subsets: ['latin']})


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) 



{


  return (
    <html lang="en">
      <body className="flex flex-row pl-[22vw]">
        <SideNav />
        <div className={`${inter.className} w-full bg-gray lg:px-8 px-4 py-4 min-h-screen`}>
            <NavBar />
            {children}
        </div>
      </body>
    </html>
  );
}
