'use client';

import Header from '@/app/components/Header/Header';
import Navbar from '@/app/components/Navbar/Navbar';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const checkIfUserIsLoggedIn = async () => {
    const userSessionString: any = sessionStorage.getItem('user');
    const userSession = JSON.parse(userSessionString);
    console.log(userSession);

    const response = await fetch('/api/checkIfLoggedIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userSession?.user_id,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      router.push('/pages/homepage');
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar/>

        {/* Main content: full width on mobile, adjusts on desktop */}
        <main className="flex-1 p-1 sm:p-6">
          {children}
        </main>
      </div>
      <Navbar />
    </>
  );
}
