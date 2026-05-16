interface NavItem {
  label: string
  href: string
}

interface NavProps {
  items?: NavItem[]
  current?: string
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: 'Index',        href: '#top' },
  { label: 'Research',     href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Writing',      href: '#writing' },
  { label: 'PRAXIS',       href: '#praxis' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Contact',      href: '#contact' },
]

export function Nav({ items = DEFAULT_ITEMS, current = 'Index' }: NavProps) {
  return (
    <nav className="nav" aria-label="Primary">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={item.label === current ? 'current' : undefined}
          aria-current={item.label === current ? 'page' : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
