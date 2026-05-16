interface ColophonProps {
  year?: number
  name?: string
}

export function Colophon({
  year = new Date().getFullYear(),
  name = 'Emmanuel Nene Odjidja',
}: ColophonProps) {
  return (
    <footer className="colophon">
      <div className="cf-left">
        Set in Helvetica. No webfonts loaded. &copy; {year} {name}.
      </div>
      <div className="cf-right">
        <a href="#top">Top &uarr;</a>
        <a href="/writing">Writing</a>
        <a href="/publications">Publications</a>
      </div>
    </footer>
  )
}
