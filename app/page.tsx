'use client'

import { useState } from 'react'

export default function NewResume() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
      })

      const data = await res.json()
      setResult(data.tailoredResume)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border-t-8 border-blue-900">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
          Tailor Your Resume
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Generate a customized resume for your dream job.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Resume
            </label>
            <textarea
              placeholder="Paste your resume text..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={4} // reduced height
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm resize-none"
              required
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={3} // reduced height
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-900 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg shadow transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Generating...' : 'Tailor Resume'}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center gap-2 mt-6 text-blue-900">
            <svg
              className="animate-spin h-5 w-5 text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="font-semibold animate-pulse">
              Generating your tailored resume...
            </span>
          </div>
        )}

        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2 text-blue-900">
              Your Tailored Resume
            </h2>
            <pre className="whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
              {result}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}
