import { useState } from 'react'
const FAV = [['Wikipedia','https://en.wikipedia.org/wiki/Special:Random','#e8e8ea'],['OpenStreetMap','https://www.openstreetmap.org/export/embed.html','#7ec87e'],['Example','https://example.com','#8ab4f8'],['GitHub','https://github.com','#24292f']]
export default function Safari() {
  const [url, setUrl] = useState(''), [input, setInput] = useState('')
  const [hist, setHist] = useState<string[]>([]), [idx, setIdx] = useState(-1)
  const nav = (raw: string) => {
    let u = raw.trim(); if (!u) return
    if (!/^https?:\/\//.test(u)) u = /\.\w{2,}/.test(u) && !u.includes(' ') ? 'https://' + u : 'https://www.bing.com/search?q=' + encodeURIComponent(u)
    const h = [...hist.slice(0, idx + 1), u]; setHist(h); setIdx(h.length - 1); setUrl(u); setInput(u)
  }
  const to = (i: number) => { if (i < 0) { setIdx(-1); setUrl(''); setInput(''); return } if (i >= hist.length) return; setIdx(i); setUrl(hist[i]); setInput(hist[i]) }
  return <div className="safari">
    <div className="stool">
      <button disabled={idx < 0} onClick={() => to(idx - 1)}>‹</button><button disabled={idx >= hist.length - 1} onClick={() => to(idx + 1)}>›</button>
      <form onSubmit={e => { e.preventDefault(); nav(input) }}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Search or enter website name" /></form>
      <button onClick={() => url && setUrl(url + '')}>⟳</button>
    </div>
    {url ? <><iframe src={url} title="web" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
      <div className="snote">Some sites refuse to be embedded in frames (X-Frame-Options).</div></> :
      <div className="start"><h2>Favorites</h2><div className="favs">{FAV.map(([n, u, c]) => <div key={n} onClick={() => nav(u)}><span style={{ background: c }}>{n[0]}</span>{n}</div>)}</div></div>}
  </div>
}
