import { siteContent } from '@/lib/content'

export function Experience() {
  return (
    <section id="experience" className="experience" aria-label="Experience">
      <div className="exp-heading">
        <h2>Experience</h2>
        <div className="lede">
          Twelve years across fragile and conflict-affected settings: pastoralist communities in South Sudan, district health systems in Burundi and Ghana, and multi-country evaluation portfolios at GCERF.
        </div>
        <div />
      </div>
      <ul>
        {siteContent.experience.map((e) => (
          <li key={e.role + e.period}>
            <span className="y">{e.period}</span>
            <span className="role">{e.role}</span>
            <span className="org">{e.location ? `${e.org}. ${e.location}` : e.org}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
