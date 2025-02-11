"use client";
import { Quicksand } from "next/font/google";
import "./styles/globals.css";

const font = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} mx-auto max-w-screen-xl py-12 px-4 lg:p-12`}
      >
        {children}
      </body>
    </html>
  );
}
