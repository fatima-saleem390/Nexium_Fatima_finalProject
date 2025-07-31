'use client'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border-t-8 border-blue-800">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
          Features
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          What makes our platform user-friendly.
        </p>

        <div className="flex flex-col gap-4 text-gray-800">
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-blue-900 mb-1">
              Seamless Sign-In
            </h2>
            <p className="text-sm">
              Sign in securely with a magic link sent to your email — no passwords to remember.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
  <h2 className="text-xl font-bold text-blue-900 mb-1">
     Instant Access to Exclusive Content
  </h2>
  <p className="text-sm">
    Unlock members-only content and resources right after you sign in — no barriers.
  </p>
</div>


          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-blue-900 mb-1">
              Secure & Private
            </h2>
            <p className="text-sm">
              Your data stays private with secure authentication and protected pages.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
