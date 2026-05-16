import { siteContent } from '@/lib/content'

export function EditorsNote() {
  const note = siteContent.editorsNote
  return (
    <section className="note" aria-label="Editor's note">
      <div className="note-label">
        Note
        <span className="sub">{note.date}</span>
      </div>
      <div className="body">
        {note.body.map((p, i) => (
          <p key={i} className={p.italic ? 'italic' : undefined}>{p.text}</p>
        ))}
        <p className="sig">{note.signature}</p>
      </div>
      <aside className="aside">
        <div className="h">Currently &middot; {note.date}</div>
        {note.currently.map((c, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: c.html }} />
        ))}
      </aside>
    </section>
  )
}
