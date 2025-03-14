import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { model, inputs } = await req.json()

  const apiToken = process.env.HUGGING_FACE_API_TOKEN
  if (!apiToken) {
    console.error("Hugging Face API token is not set in environment variables")
    return NextResponse.json({ error: "Hugging Face API token is not set" }, { status: 500 })
  }

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ inputs }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Hugging Face API Error:", response.status, errorBody)
      return NextResponse.json(
        { error: `Hugging Face API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error calling Hugging Face API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

