// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const getUserAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)

        // ✅ Fetch profile from DB
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Profile fetch error:', error)
        } else {
          setProfile(profileData)
        }
      }
    }

    getUserAndProfile()
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50">
      <div className="max-w-md w-full p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user ? (
          <>
            <p className="mb-2">✅ Authenticated as: {user.email}</p>
            {profile ? (
              <p className="mb-4">Profile ID: {profile.id}</p>
            ) : (
              <p className="mb-4">Loading profile...</p>
            )}
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/login')
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <p>Loading session...</p>
        )}
      </div>
    </main>
  )
}
