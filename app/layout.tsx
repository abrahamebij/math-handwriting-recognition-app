"use client";
// import type { Metadata } from "next";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <SessionProvider>
        <body className={`bg-gray-200 text-gray-700`}>
          {/* The toast notification */}
          <Toaster position="top-right" richColors />
          {/* The loading bar */}
          <NextTopLoader easing="ease" color="#E85C0D" height={4} />
          {/* Navigation */}
          {/* <Navbar /> */}
          {/* Content */}
          {children}
          {/* Footer */}
          {/* <Footer /> */}
        </body>
      </SessionProvider>
    </html>
  );
}
