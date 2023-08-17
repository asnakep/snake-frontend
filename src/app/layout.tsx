import './globals.css'
import { Inter } from 'next/font/google'
import WalletProvider from '@/components/WalletProvider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WalletProvider>
      {children}
      </WalletProvider>
      </body>
    </html>
  )
}
