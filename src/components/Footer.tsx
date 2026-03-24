import { siteContent } from '@/lib/content'

const { contact } = siteContent

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#publications' },
  { label: 'PRAXIS', href: '#praxis' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer>
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-terra-500/40 via-gold-400/20 to-transparent" />

      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 py-16 md:py-20">
        {/* Top row: nav + social links */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body-sm text-ink-400 hover:text-terra-500 transition-colors duration-300 light:text-ink-500"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {contact.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-ink-400 hover:text-terra-500 transition-colors duration-300 light:text-ink-500"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: copyright + back to top */}
        <div className="mt-12 pt-8 border-t border-ink-800/40 light:border-cream-300/40 flex items-center justify-between">
          <p className="text-caption text-ink-600 light:text-ink-400">
            &copy; {new Date().getFullYear()} Emmanuel Nene Odjidja
          </p>
          <a
            href="#"
            className="text-caption text-ink-500 hover:text-terra-500 transition-colors duration-300 light:text-ink-400"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
