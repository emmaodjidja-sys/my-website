interface NameplateProps {
  brand?: string
  issue?: string
  left?: string
}

export function Nameplate({
  brand = 'Emmanuel Nene Odjidja',
  issue,
  left,
}: NameplateProps) {
  return (
    <header className="nameplate">
      <div className="np-left">{left ?? ''}</div>
      <div className="brand">{brand}</div>
      <div className="np-right">{issue ?? ''}</div>
    </header>
  )
}
