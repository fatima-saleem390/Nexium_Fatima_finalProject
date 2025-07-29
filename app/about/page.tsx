export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 border-t-8 border-blue-800 mb-8">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center">
          About Our Platform
        </h1>
        <p className="text-gray-700 leading-relaxed text-center mb-6">
          Welcome! Our mission is to empower job seekers with AI-powered tools
          to craft better resumes, apply smarter, and manage their applications securely.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-700">
            <h2 className="text-xl font-bold text-blue-800 mb-2">AI Resume Tailoring</h2>
            <p className="text-gray-700">
              Instantly tailor your resume for any job description using our smart AI.
              Get personalized suggestions to highlight your strengths and land interviews faster.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-700">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Secure Login</h2>
            <p className="text-gray-700">
              We provide secure, passwordless login with magic links via email.
              Your personal information stays safe with top-notch authentication.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-700">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Personal Dashboard</h2>
            <p className="text-gray-700">
              Save and manage your resumes, track applications, and bookmark opportunities.
              Your personalized dashboard keeps everything organized in one place.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
