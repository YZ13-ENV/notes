import type { Metadata, Viewport } from 'next'
import { Geologica } from 'next/font/google'
import { WebVitals } from 'ui'
import 'ui/dist/style.css'
import './globals.css'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400', '300', '200'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'Keeper',
  description: 'Created by DM Family',
}
export const viewport: Viewport = {
  themeColor: "#000",
  colorScheme: "dark"
}

type LayoutProps = {
  children: JSX.Element
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${first_font.className} ${first_font.variable}`}>
      <body className='relative min-h-screen dark'>
        <WebVitals appId="darkmaterial-keeper" />
        {children}
      </body>
    </html>
  )
}