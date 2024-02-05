import './globals.css'
import 'ui/dist/style.css'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400', '300', '200'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'DM/Notes',
  description: 'Created by DM Family',
}

type LayoutProps = {
    children: JSX.Element
}

export default function RootLayout({ children }: LayoutProps) {
    return (
      <html lang="en" className={`${first_font.className} ${first_font.variable}`}>
        <body className='relative min-h-screen dark'>
          { children }
        </body>
      </html>
    )
}