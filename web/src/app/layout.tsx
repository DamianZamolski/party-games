import type { Metadata } from 'next';
import '@picocss/pico/css/pico.classless.green.min.css';
import './main.css';

export const metadata: Metadata = {
  title: 'Party Games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
