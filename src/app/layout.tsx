// import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio Starter',
  description: 'Next.js + Tailwind starter with Container/Section primitives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
