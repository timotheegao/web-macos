import { useState } from 'react'
import { ACCENTS, useOS, WALLPAPERS } from '../os'
import Wallpaper from '../Wallpaper'
import { Glyph } from '../icons'
const ITEMS: [string, string, (s?: number) => JSX.Element][] = [
  ['Wi-Fi', '#0a84ff', Glyph.wifi], ['Bluetooth', '#0a84ff', Glyph.bt], ['Notifications', '#ff453a', Glyph.clock], ['Sound', '#ff375f', Glyph.volume], ['Focus', '#5e5ce6', Glyph.moon],
  ['-', '', Glyph.wifi],
  ['General', '#8e8e93', Glyph.control], ['Appearance', '#1c1c1e', Glyph.sun], ['Wallpaper', '#32ade6', Glyph.pic], ['Desktop & Dock', '#1c1c1e', Glyph.desktop], ['Displays', '#0a84ff', Glyph.sun]]
export default function Settings() {
  const { theme, setTheme, wallpaper, setWallpaper, accent, setAccent } = useOS()
  const [page, setPage] = useState('Appearance'); const [q, setQ] = useState('')
  const wp = WALLPAPERS.find(w => w.id === wallpaper)!
  return <div className="split settings">
    <div className="sidebar float">
      <div className="sb-space" data-drag />
      <div className="searchpill full">{Glyph.search(12)}<input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} /></div>
      <div className="profile"><div className="avatar">G</div><div><b>Guest</b><small>Apple Account</small></div></div>
      {ITEMS.filter(([n]) => n === '-' || n.toLowerCase().includes(q.toLowerCase())).map(([n, c, g], i) => n === '-' ? <hr key={i} /> :
        <div key={n} className={'side-item' + (n === page ? ' on' : '')} onClick={() => setPage(n)}><span className="sico" style={{ background: c }}>{g(13)}</span>{n}</div>)}
    </div>
    <div className="main spmain">
      <div className="toolbar" data-drag><div className="tb-nav" data-nodrag><button className="tbtn" disabled>{Glyph.chevL(15)}</button><button className="tbtn" disabled>{Glyph.chevR(15)}</button></div><b className="tb-t">{page}</b></div>
      <div className="content pad">
        {page === 'Appearance' && <>
          <div className="card"><div className="row"><span>Appearance</span><div className="appear">{(['light', 'dark'] as const).map(t => <div key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)}><div className={'thumb ' + t}><i /><i /></div>{t === 'light' ? 'Light' : 'Dark'}</div>)}</div></div>
            <div className="row"><span>Accent color</span><div className="accents">{ACCENTS.map(a => <i key={a} className={a === accent ? 'on' : ''} style={{ background: a }} onClick={() => setAccent(a)} />)}</div></div></div></>}
        {page === 'Wallpaper' && <>
          <div className="card wpcard"><div className="wpprev"><Wallpaper wp={wp} dark={theme === 'dark'} /></div><div className="wpname"><b>{wp.name}</b><small>Dynamic Desktop</small></div></div>
          <div className="wps">{WALLPAPERS.map(w => <div key={w.id} className={wallpaper === w.id ? 'on' : ''} onClick={() => setWallpaper(w.id)}><div className="wpt"><Wallpaper wp={w} dark={theme === 'dark'} /></div>{w.name}</div>)}</div></>}
        {page !== 'Appearance' && page !== 'Wallpaper' && <div className="card"><div className="row"><span>{page}</span><small className="mut">Not available in this demo</small></div></div>}
      </div>
    </div>
  </div>
}
