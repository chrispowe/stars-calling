import { Inter } from 'next/font/google'
import './globals.css';
import './styles/header.module.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'stars calling !',
  description: 'Music Review',
}


export default async function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
