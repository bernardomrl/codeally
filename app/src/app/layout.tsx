'use client';
import '@/styles/globals.css';

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
  document.body.setAttribute('data-theme', theme as string);
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
