"use client";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './(components)/header'
import UserProvider from '@/context/user-context';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    document.title = "Job Finder";
  },[])
  
  return (
    <UserProvider>
    <html lang="en">
      <body style={{backgroundColor: "#F2ECBE"}} className={inter.className}>
          <Header/>
          {children}
      </body>
    </html>
    </UserProvider>
  )
}
