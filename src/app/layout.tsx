import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./components/Provider";
import Head from 'next/head';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TestiFolio",
  description: "Effortlessly gather testimonials from your customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/static/logo.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-custom`}
      >
        <Providers>
          {/* <Navbar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
