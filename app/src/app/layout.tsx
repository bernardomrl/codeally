'use client';
import '@/styles/globals.css';
import { useEffect } from 'react';

const useLocalStorage = (key: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const value = localStorage.getItem(key);
    return value;
  }

  return undefined;
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const theme = useLocalStorage('theme');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme as string);
  }, [theme]);

  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
