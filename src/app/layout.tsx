"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from "../authConfig";
import { PublicClientApplication } from '@azure/msal-browser';

const inter = Inter({ subsets: ['latin'] })


const msalInstance = new PublicClientApplication(msalConfig);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MsalProvider instance={msalInstance}>{children}</MsalProvider></body>
    </html>
  )
}
