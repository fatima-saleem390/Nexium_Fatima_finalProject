// app/app/components/Header.tsx

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ResumeTailor</h1>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-blue-300">Home</Link>
          <Link href="/about" className="hover:text-blue-300">About</Link>
          <Link href="/contact" className="hover:text-blue-300">Contact</Link>
          <Link href="/features" className="hover:text-blue-300">Features</Link>
        </nav>
      </div>
    </header>
  )
}
