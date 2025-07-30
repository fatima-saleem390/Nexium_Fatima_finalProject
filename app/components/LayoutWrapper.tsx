// app/components/LayoutWrapper.tsx

'use client'

import { usePathname } from 'next/navigation'
import Header from './header'
import Footer from './footer'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showLayout = pathname !== '/login'

  return (
    <>
      {showLayout && <Header />}
      <main className="p-4">{children}</main>
      {showLayout && <Footer />}
    </>
  )
}
