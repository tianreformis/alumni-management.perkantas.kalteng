import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Sidebar } from './components/Sidebar'
import MobileNavbar from './components/MobileNavbar'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Perkantas Palangkaraya',
  description: 'Created with v0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex h-screen bg-gray-100">

          <Sidebar />

          <div className="flex-1 flex flex-col overflow-hidden">
            <MobileNavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}