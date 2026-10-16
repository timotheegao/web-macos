import { useState } from 'react'
import { Glyph } from '../icons'
const FAV: [string, string, string][] = [['Wikipedia', 'https://en.wikipedia.org/wiki/Special:Random', 'linear-gradient(#fff,#e4e6ea)'], ['Example', 'https://example.com', 'linear-gradient(#8ab4f8,#4a82e8)'], ['GitHub', 'https://github.com', 'linear-gradient(#3a3f47,#171a1f)'], ['Bing', 'https://www.bing.com', 'linear-gradient(#2ab7ca,#0a6d9a)'], ['OSM', 'https://www.openstreetmap.org/export/embed.html', 'linear-gradient(#a8e08a,#5aa860)'], ['MDN', 'https://developer.mozilla.org', 'linear-gradient(#444,#111)']]
const FC: Record<string, string> = { Wikipedia: '#222', Example: '#fff', GitHub: '#fff', Bing: '#fff', OSM: '#fff', MDN: '#fff' }
export default function Safari() {
  const [url, setUrl] = useState(''), [input, setInput] = useState('')
  const [hist, setHist] = useState<string[]>([]), [idx, setIdx] = useState(-1)
  const nav = (raw: string) => {
    let u = raw.trim(); if (!u) return
    if (!/^https?:\/\//.test(u)) u = /\.\w{2,}/.test(u) && !u.includes(' ') ? 'https://' + u : 'https://www.bing.com/search?q=' + encodeURIComponent(u)
    const h = [...hist.slice(0, idx + 1), u]; setHist(h); setIdx(h.length - 1); setUrl(u); setInput(u)
  }
  const to = (i: number) => { if (i < 0) { setIdx(-1); setUrl(''); setInput(''); return } if (i >= hist.length) return; setIdx(i); setUrl(hist[i]); setInput(hist[i]) }
  const host = (() => { try { return new URL(url).host } catch { return '' } })()
  return <div className="safari">
    <div className="toolbar" data-drag>
      <div className="tb-space" /><button className="tbtn" data-nodrag>{Glyph.sidebar(18)}</button>
      <div className="tb-nav" data-nodrag><button className="tbtn" disabled={idx < 0} onClick={() => to(idx - 1)}>{Glyph.chevL(15)}</button><button className="tbtn" disabled={idx >= hist.length - 1} onClick={() => to(idx + 1)}>{Glyph.chevR(15)}</button></div>
      <form className="addr" data-nodrag onSubmit={e => { e.preventDefault(); nav(input) }}>
        {url && <span className="lk">{Glyph.lock(11)}</span>}
        <input value={input === url && host ? host : input} onFocus={e => { setInput(url); e.target.select() }} onBlur={() => setInput(url)} onChange={e => setInput(e.target.value)} placeholder="Search or enter website name" />
        {url && <span className="lk r" onClick={() => setUrl(url + '')}>{Glyph.reload(13)}</span>}</form>
      <button className="tbtn" data-nodrag>{Glyph.share(16)}</button><button className="tbtn" data-nodrag>{Glyph.plus(16)}</button><button className="tbtn" data-nodrag>{Glyph.tabs(16)}</button>
    </div>
    {url ? <iframe src={url} title="web" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" /> :
      <div className="start"><h5>Favorites</h5><div className="favs">{FAV.map(([n, u, bg]) => <div key={n} onClick={() => nav(u)}><span style={{ background: bg, color: FC[n] }}>{n[0]}</span>{n}</div>)}</div>
        <h5>Privacy Report</h5><div className="priv">{Glyph.lock(16)} Safari hasn’t encountered any trackers in the last seven days.</div></div>}
  </div>
}
