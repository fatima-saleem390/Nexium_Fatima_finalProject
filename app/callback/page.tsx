// app/callback/page.tsx

'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    const handleMagicLink = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      if (error) {
        console.error('Error exchanging code:', error)
      } else {
        router.push('/')
      }
    }

    handleMagicLink()
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>Logging you in...</p>
    </main>
  )
}
