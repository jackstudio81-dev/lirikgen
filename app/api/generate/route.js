
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    // Ambil data dari request body
    const { topic, genre, mood } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Inisialisasi Gemini Client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Gunakan model gemini-1.5-flash (cepat & efisien) atau gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Konstruksi Prompt
    const prompt = `
    Role: You are a professional songwriter assistant designed to write lyrics for Suno AI.
    
    Task: Write lyrics based on the following details:
    - Topic: ${topic}
    - Genre: ${genre || 'Pop'}
    - Mood: ${mood || 'Any'}

    Requirements:
    1. Structure the song strictly with tags commonly used in Suno, such as: [Verse 1], [Chorus], [Verse 2], [Bridge], [Outro].
    2. Add musical style cues in brackets where appropriate (e.g., [Upbeat Synth Solo], [Heavy Bass Drop], [Whisper]).
    3. Ensure the lyrics rhyme and have a good rhythm consistent with the genre "${genre}".
    4. Do not include any conversational text before or after the lyrics. Just the lyrics.
    `;

    // Generate Content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const lyrics = response.text();

    return NextResponse.json({ lyrics });

  } catch (error) {
    console.error('Error generating lyrics with Gemini:', error);
    return NextResponse.json(
      { error: "Failed to generate lyrics. Check your API Key." }, 
      { status: 500 }
    );
  }
}
