'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    topic: '',
    genre: '',
    mood: ''
  });
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateLyrics = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLyrics('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setLyrics(data.lyrics);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    alert('Lyrics copied!');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12">
      <div className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Suno Lyric Gen
          </h1>
          <p className="text-gray-400">Create AI-ready lyrics in seconds</p>
        </div>

        {/* Form Input */}
        <form onSubmit={generateLyrics} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Song Topic / Description</label>
            <textarea
              name="topic"
              required
              placeholder="e.g. A cyberpunk samurai wandering in neon rain..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white outline-none"
              rows="3"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Genre</label>
              <input
                type="text"
                name="genre"
                placeholder="e.g. Synthwave, Metal, Lo-fi"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Mood</label>
              <select
                name="mood"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white outline-none appearance-none"
                onChange={handleChange}
              >
                <option value="">Select Mood</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Epic">Epic</option>
                <option value="Dark">Dark</option>
                <option value="Chill">Chill</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Lyrics ✨'}
          </button>
        </form>

        {/* Output Result */}
        {lyrics && (
          <div className="mt-8 pt-8 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Result</h3>
              <button 
                onClick={copyToClipboard}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white"
              >
                Copy Text
              </button>
            </div>
            <div className="bg-black/40 p-6 rounded-lg border border-gray-800 font-mono text-sm whitespace-pre-wrap leading-relaxed text-gray-200">
              {lyrics}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
