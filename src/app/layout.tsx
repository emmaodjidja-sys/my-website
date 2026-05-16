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
    default: 'Emmanuel Nene Odjidja, M&E Specialist · Researcher · Epidemiologist',
    template: '%s | Emmanuel Nene Odjidja',
  },
  description:
    'Emmanuel Nene Odjidja, M&E Specialist building credible evaluation systems in fragile and conflict-affected settings across the Sahel, South Asia, and West Africa. 29 publications. 12 years of field experience.',
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
    title: 'Emmanuel Nene Odjidja, M&E Specialist · Researcher · Epidemiologist',
    description: 'Building credible evaluation systems in fragile and conflict-affected settings. 29 publications. 12 years across the Sahel, South Asia, and West Africa.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Emmanuel Nene Odjidja, M&E Specialist, Researcher, Epidemiologist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emmanuel Nene Odjidja, M&E Specialist',
    description: 'I build evaluation systems in places where they’re hardest to build. 29 publications. 12 years across the Sahel, South Asia, and West Africa.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.emmanuelneneodjidja.org',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emmanuel Nene Odjidja',
  givenName: 'Emmanuel',
  familyName: 'Odjidja',
  jobTitle: 'Monitoring and Evaluation Specialist',
  description:
    'M&E Specialist, Researcher, and Epidemiologist. Designs and implements evaluation systems for programmes in fragile and conflict-affected settings across the Sahel, East Africa, and South Asia.',
  image: 'https://www.emmanuelneneodjidja.org/profile.JPG',
  url: 'https://www.emmanuelneneodjidja.org',
  sameAs: [
    'https://www.linkedin.com/in/emmanuel-odjidja/',
    'https://scholar.google.co.uk/citations?user=jIiNtLYAAAAJ&hl=en',
    'https://github.com/emmaodjidja-sys',
    'https://www.researchgate.net/profile/Emmanuel_Odjidja',
  ],
  affiliation: {
    '@type': 'Organization',
    name: 'Global Community Engagement and Resilience Fund (GCERF)',
    url: 'https://www.gcerf.org',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Queen Margaret University',
    url: 'https://www.qmu.ac.uk',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'MSc Global Health (Distinction)',
    },
  ],
  knowsAbout: [
    'Impact Evaluation',
    'Monitoring and Evaluation',
    'Causal Inference',
    'Difference-in-Differences',
    'Propensity Score Matching',
    'Epidemiology',
    'Global Health',
    'Programme Evaluation in Fragile Settings',
    'Preventing Violent Extremism',
  ],
  knowsLanguage: ['en', 'fr'],
  workExample: [
    {
      '@type': 'ScholarlyArticle',
      headline:
        'The effect of health financing reforms on incidence and management of childhood infections in Ghana: A matching DiD impact evaluation',
      datePublished: '2022',
      publisher: { '@type': 'Organization', name: 'BMC Public Health' },
      url: 'https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-022-13934-y',
    },
    {
      '@type': 'ScholarlyArticle',
      headline:
        'Tuberculosis mortality and drug resistance among patients under TB treatment before and during COVID-19 in Burundi',
      datePublished: '2025',
      publisher: { '@type': 'Organization', name: 'BMC Infectious Diseases' },
      url: 'https://bmcinfectdis.biomedcentral.com/articles/10.1186/s12879-025-11093-0',
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-dvh grain-overlay">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[10000] focus-visible:bg-terra-500 focus-visible:text-cream-50 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
