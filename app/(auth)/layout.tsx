import type { Metadata } from "next";
import bg from '@/public/images/authbg.png'
import Image from "next/image";
import logo from '@/public/images/logo-white.svg'
import { Arimo } from "next/font/google";

const arimo = Arimo({subsets: ['latin']})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`min-h-screen flex justify-center py-6 ${arimo.className}`} style={{
        backgroundImage:
                `linear-gradient(
                    rgba(11,11,11, 0.5),
                    rgba(11,11,11, 0.5)), 
                    url(${bg.src})`
      }}>
        <div className="flex flex-col items-center space-y-8">
            <div className="logo-div">
                <Image src='/images/logo-white.png' alt="Cargo-run Logo" width={400} height={200} />
            </div>
            {children}
        </div>
    </main>
  );
}
