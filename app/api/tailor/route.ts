import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json()

    console.log('🟢 Received in API:', { resumeText, jobDescription })

    if (!resumeText || !jobDescription) {
      console.error('🔴 Missing input!')
      return NextResponse.json(
        { error: 'Missing resumeText or jobDescription' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      throw new Error('N8N_WEBHOOK_URL not set in env')
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    })

    const data = await response.json()
    console.log('🟢 Response from n8n:', data)

    return NextResponse.json(data)
  } catch (err) {
    console.error('🔴 Error in API:', err)
    return NextResponse.json(
      { error: 'Internal Server Error', details: err },
      { status: 500 }
    )
  }
}
