import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { topic, genre, mood } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Prompt Engineering untuk format Suno
    const systemPrompt = `You are a professional songwriter assistant for Suno AI. 
    Create lyrics based on the user's topic. 
    Structure the song clearly with tags like [Verse 1], [Chorus], [Verse 2], [Bridge], [Outro]. 
    Include style cues in brackets if necessary (e.g., [Upbeat instrumental]).
    Keep the lyrics engaging and rhythmic.`;

    const userPrompt = `Topic: ${topic}
    Genre: ${genre || 'Pop'}
    Mood: ${mood || 'Neutral'}
    
    Write the lyrics now:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Bisa diganti gpt-4 untuk hasil lebih bagus
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    const lyrics = completion.choices[0].message.content;

    return NextResponse.json({ lyrics });

  } catch (error) {
    console.error('Error generating lyrics:', error);
    return NextResponse.json(
      { error: "Failed to generate lyrics. Check API Key." }, 
      { status: 500 }
    );
  }
}
