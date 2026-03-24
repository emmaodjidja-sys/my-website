import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.emmanuelneneodjidja.org'),
  title: {
    default: 'Emmanuel Nene Odjidja — M&E Specialist · Researcher · Epidemiologist',
    template: '%s | Emmanuel Nene Odjidja',
  },
  description:
    'Better Evidence for Bettering Lives. M&E Specialist, Researcher, and Epidemiologist with 12+ years of experience across global health and international development.',
  keywords: [
    'Emmanuel Odjidja', 'M&E Specialist', 'Epidemiologist', 'Global Health',
    'Impact Evaluation', 'Public Health Researcher', 'Programme Evaluation',
  ],
  authors: [{ name: 'Emmanuel Nene Odjidja' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.emmanuelneneodjidja.org',
    siteName: 'Emmanuel Nene Odjidja',
    title: 'Emmanuel Nene Odjidja — M&E Specialist · Researcher · Epidemiologist',
    description: 'Better Evidence for Bettering Lives. 12+ years in global health, 29 publications, across 6+ countries.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Emmanuel Nene Odjidja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emmanuel Nene Odjidja',
    description: 'Better Evidence for Bettering Lives.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('theme');
              if (t === 'light') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-screen grain-overlay">
        {children}
      </body>
    </html>
  )
}
