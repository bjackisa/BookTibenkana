import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book Tibenkana - Professional Business Advisory',
  description: 'Book appointments with Denis Tibenkana for business advisory, product development, and entrepreneurship services',
  icons: {
    icon: 'https://tibenkana.org/storage/denis-logo-2.png',
    shortcut: 'https://tibenkana.org/storage/denis-logo-2.png',
    apple: 'https://tibenkana.org/storage/denis-logo-2.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}