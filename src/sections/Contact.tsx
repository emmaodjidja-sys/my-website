import { siteContent } from '@/lib/content'

export function Contact() {
  const { email, socials } = siteContent.contact
  return (
    <section id="contact" className="contact" aria-label="Contact">
      <h2>Contact</h2>
      <div>
        <p>
          For research collaborations, evaluation design, editorial enquiries, or to submit to the JMDE case-based section, write to{' '}
          <a className="email" href={`mailto:${email}`}>{email}</a>.
        </p>
        <div className="links">
          {socials.map((s, i) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.platform}{i < socials.length - 1 ? '' : ''}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
