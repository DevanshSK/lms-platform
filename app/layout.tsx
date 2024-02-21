import './globals.css'
import { Inter } from 'next/font/google'
import CustomProvider from '@/redux/provider'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { ConfettiProvider } from '@/components/provider/confetti-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Add Learning',
  description: 'The perfect destination for learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <Head>
        <title>Add Learning</title>
      </Head>
      <body className={inter.className}>
        <CustomProvider>
          {children}
          <ConfettiProvider />
          <Toaster position='bottom-right' />
        </CustomProvider>
      </body>
    </html>
  )
}
