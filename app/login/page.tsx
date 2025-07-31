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
    const handleSession = async () => {
      // ✅ If URL has a magic link hash, exchange it for a session
      if (window.location.hash) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (error) {
          console.error('Error exchanging code:', error.message)
        }
      }

      // ✅ Now check if we have an active session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push('/') // redirect to home/page.tsx if already signed in
      }
    }

    handleSession()

    // ✅ Listen for auth state changes (important for magic link)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/') // redirect if newly signed in
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
    })

    if (error) {
      console.error('Login error:', error.message)
      setMessage('❌ Something went wrong, please try again.')
    } else {
      setMessage('✅ Check your email for the magic link!')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border-t-8 border-blue-800">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
          Login
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email to receive a magic link.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg shadow transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-sm font-medium text-blue-800">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}
