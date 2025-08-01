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
    const handleMagicLink = async () => {
      console.log('🚀 Checking URL for magic link...')
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.substring(1)
        console.log('🔍 Found hash:', hash)
        const params = new URLSearchParams(hash)
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        console.log('👉 Extracted access_token:', access_token)
        console.log('👉 Extracted refresh_token:', refresh_token)

        if (access_token && refresh_token) {
          console.log('✅ Found tokens, calling setSession...')
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          })

          console.log('👉 setSession data:', data)
          if (error) {
            console.error('❌ setSession error:', error)
          } else {
            console.log('✅ Session set! Redirecting to /')
            router.push('/')
          }
        } else {
          console.log('❌ Tokens not found in hash')
        }
      }
    }

    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      console.log('🔎 Current session:', session)
      if (error) console.error('❌ Error getting session:', error)

      if (session) {
        console.log('✅ Session found, redirecting to /')
        router.push('/')
      } else {
        console.log('❌ No session found')
      }
    }

    handleMagicLink().then(checkSession)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`🌀 Auth event: ${event}`)
      if (session) {
        console.log('✅ Session in onAuthStateChange — redirecting')
        router.push('/')
      } else {
        console.log('❌ No session in onAuthStateChange')
      }
    })

    return () => {
      subscription.unsubscribe()
      console.log('🔌 Unsubscribed onAuthStateChange')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('📧 Sending magic link to:', email)

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      console.error('❌ Magic link error:', error)
      setMessage('❌ Something went wrong, please try again.')
    } else {
      console.log('✅ Magic link sent!')
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
