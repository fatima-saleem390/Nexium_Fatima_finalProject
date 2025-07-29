// app/app/layout.tsx

import './globals.css';
import Header from './components/header';
import Footer from './components/footer'
;
export const metadata = {
  title: 'Grand Project',
  description: 'My awesome Next.js app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
