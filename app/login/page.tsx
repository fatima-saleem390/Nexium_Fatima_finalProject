'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      console.log('✅ [checkSession] Supabase session:', session)
      if (error) console.error('❌ [checkSession] Error:', error)

      if (session) {
        console.log('✅ [checkSession] Session found — redirecting to /')
        router.push('/')
      } else {
        console.log('❌ [checkSession] No session — staying on login')
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`🌀 [onAuthStateChange] Event: ${event}`)
      console.log('🌀 [onAuthStateChange] Session:', session)
      if (session) {
        console.log('✅ [onAuthStateChange] Session found — redirecting to /')
        router.push('/')
      } else {
        console.log('❌ [onAuthStateChange] No session on auth change')
      }
    })

    return () => {
      subscription.unsubscribe()
      console.log('🔌 [onAuthStateChange] Subscription cleaned up')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('📧 [handleLogin] Sending magic link to:', email)

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      console.error('❌ [handleLogin] Error:', error)
      setMessage('❌ Something went wrong, please try again.')
    } else {
      console.log('✅ [handleLogin] Magic link sent!')
      setMessage('✅ Check your email for the magic link!')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border-t-8 border-blue-800">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Login
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to receive a magic link.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-md shadow ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-blue-800 font-medium">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}
