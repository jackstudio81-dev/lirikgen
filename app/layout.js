import './globals.css'

export const metadata = {
  title: 'Suno Lyric Generator',
  description: 'Generate structured lyrics for Suno AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-suno text-white">
        {children}
      </body>
    </html>
  )
}
