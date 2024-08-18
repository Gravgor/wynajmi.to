import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import Providers from "@/components/providers/SessionProvider";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";


const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Wynajmi.to",
    description: "Wynajmij mieszkanie bez zbędnych formalności",
  };

export default async function PropertiesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getSession();
    return (
      <html lang="en">
        <body className={montserrat.className}>
          <Providers session={session}>
            {children}
          </Providers>
          <Footer className="relative bottom-0"/>
          </body>
      </html>
    );
  }

