// app/layout.tsx
import './globals.css'
import LayoutWrapper from './components/LayoutWrapper'

export const metadata = {
  title: 'Grand Project',
  description: 'My awesome Next.js app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
