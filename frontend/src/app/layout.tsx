import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";
import './Calendar.css';

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: ['400'] });


export const metadata: Metadata = {
  title: "Wynajmi.to",
  description: "Wynajmij mieszkanie bez zbędnych formalności",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        {children}
        </body>
    </html>
  );
}
