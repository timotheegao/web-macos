import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AppId, Icon, AppleLogo, Glyph, DriveIcon } from './icons'
import { OS, WALLPAPERS, type Theme } from './os'
import Wallpaper from './Wallpaper'
import { Slider } from './ui'
import Finder from './apps/Finder'
import Safari from './apps/Safari'
import Notes from './apps/Notes'
import Calculator from './apps/Calculator'
import Terminal from './apps/Terminal'
import Settings from './apps/Settings'
import { Photos, Music, Trash } from './apps/Placeholders'

interface AppDef { id: AppId; name: string; w: number; h: number; body: () => ReactNode; menus: string[]; kind: 'toolbar' | 'title' | 'plain'; radius: number; lx: number; ly: number }
const std = ['File', 'Edit', 'View', 'Window', 'Help']
const APPS: Record<string, AppDef> = {
  finder: { id: 'finder', name: 'Finder', w: 820, h: 520, body: () => <Finder />, menus: ['File', 'Edit', 'View', 'Go', 'Window', 'Help'], kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
  safari: { id: 'safari', name: 'Safari', w: 960, h: 620, body: () => <Safari />, menus: ['File', 'Edit', 'View', 'History', 'Bookmarks', 'Window', 'Help'], kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
  notes: { id: 'notes', name: 'Notes', w: 860, h: 540, body: () => <Notes />, menus: ['File', 'Edit', 'Format', 'View', 'Window', 'Help'], kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
  calculator: { id: 'calculator', name: 'Calculator', w: 236, h: 346, body: () => <Calculator />, menus: ['File', 'Edit', 'View', 'Window', 'Help'], kind: 'plain', radius: 16, lx: 14, ly: 14 },
  terminal: { id: 'terminal', name: 'Terminal', w: 680, h: 420, body: () => <Terminal />, menus: ['Shell', 'Edit', 'View', 'Window', 'Help'], kind: 'title', radius: 14, lx: 13, ly: 8 },
  settings: { id: 'settings', name: 'System Settings', w: 800, h: 560, body: () => <Settings />, menus: ['Edit', 'View', 'Window', 'Help'], kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
  photos: { id: 'photos', name: 'Photos', w: 840, h: 540, body: () => <Photos />, menus: std, kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
  music: { id: 'music', name: 'Music', w: 840, h: 540, body: () => <Music />, menus: ['File', 'Edit', 'Song', 'View', 'Window', 'Help'], kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
  trash: { id: 'trash', name: 'Trash', w: 620, h: 420, body: () => <Trash />, menus: std, kind: 'toolbar', radius: 22, lx: 20, ly: 20 },
}
const DOCK: AppId[] = ['finder', 'launchpad', 'safari', 'messages', 'mail', 'maps', 'photos', 'calendar', 'notes', 'music', 'calculator', 'terminal', 'settings']
const REAL = new Set(Object.keys(APPS).concat('launchpad'))
const LAUNCH: AppId[] = ['finder', 'safari', 'messages', 'mail', 'maps', 'photos', 'calendar', 'reminders', 'notes', 'music', 'appstore', 'weather', 'calculator', 'terminal', 'settings']
const NAMES: Record<string, string> = { launchpad: 'Launchpad', messages: 'Messages', mail: 'Mail', maps: 'Maps', calendar: 'Calendar', reminders: 'Reminders', appstore: 'App Store', weather: 'Weather' }
const label = (id: AppId) => NAMES[id] || APPS[id].name

interface Win { id: AppId; x: number; y: number; w: number; h: number; z: number; min: boolean; max: boolean; closing?: boolean; ox?: number; oy?: number }
interface Toast { id: number; title: string; body: string; app: AppId }
type MI = [string, (() => void)?, string?, boolean?]

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('wp') || 'tahoe')
  const [accent, setAccent] = useState(() => localStorage.getItem('accent') || '#0a84ff')
  const [wins, setWins] = useState<Win[]>([])
  const [bouncing, setBouncing] = useState<AppId | null>(null)
  const [menu, setMenu] = useState<string | null>(null)
  const [spot, setSpot] = useState(false), [launch, setLaunch] = useState(false), [cc, setCc] = useState(false)
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [trash, setTrash] = useState<string[]>([])
  const [now, setNow] = useState(new Date())
  const [bright, setBright] = useState(100), [vol, setVol] = useState(60)
  const [hd, setHd] = useState(false)
  const z = useRef(10)

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('wp', wallpaper) }, [wallpaper])
  useEffect(() => { document.documentElement.style.setProperty('--sel', accent); localStorage.setItem('accent', accent) }, [accent])
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])

  const notify = useCallback((title: string, body: string, app: AppId = 'finder') => {
    const id = Date.now() + Math.random(); setToasts(t => [...t, { id, title, body, app }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000)
  }, [])
  useEffect(() => { const t = setTimeout(() => notify('Welcome to web-macOS', 'Press Ctrl/⌘ + Space for Spotlight. Unofficial fan project.'), 1000); return () => clearTimeout(t) }, [notify])

  const open = useCallback((id: AppId) => {
    if (id === 'launchpad') { setLaunch(l => !l); setSpot(false); return }
    if (!APPS[id]) { setLaunch(false); setSpot(false); notify(NAMES[id] || id, `${NAMES[id] || id} isn’t available in this demo.`, id); return }
    setLaunch(false); setSpot(false)
    setWins(ws => {
      const ex = ws.find(w => w.id === id)
      if (ex) return ws.map(w => w.id === id ? { ...w, min: false, z: ++z.current } : w)
      const def = APPS[id], n = ws.length
      setTimeout(() => { setBouncing(id); setTimeout(() => setBouncing(null), 1600) }, 0)
      return [...ws, { id, w: def.w, h: def.h, x: Math.max(20, (innerWidth - def.w) / 2 - 80 + n * 34), y: 54 + n * 30, z: ++z.current, min: false, max: false }]
    })
  }, [notify])
  const focus = (id: AppId) => setWins(ws => ws.map(w => w.id === id ? { ...w, z: ++z.current } : w))
  const patch = (id: AppId, p: Partial<Win>) => setWins(ws => ws.map(w => w.id === id ? { ...w, ...p } : w))
  const close = (id: AppId) => { patch(id, { closing: true }); setTimeout(() => setWins(ws => ws.filter(w => w.id !== id)), 220) }
  const minimize = (id: AppId) => {
    const w = wins.find(x => x.id === id); if (!w) return
    const t = document.querySelector(`[data-dock="${id}"]`)?.getBoundingClientRect()
    const gx = w.max ? 0 : w.x, gy = w.max ? 24 : w.y
    patch(id, { min: true, ox: (t ? t.left + t.width / 2 : innerWidth / 2) - gx, oy: (t ? t.top + t.height / 2 : innerHeight) - gy })
  }
  const visible = wins.filter(w => !w.min && !w.closing)
  const top = [...visible].sort((a, b) => b.z - a.z)[0]
  const active = top ? APPS[top.id] : APPS.finder

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') { e.preventDefault(); setSpot(s => !s); setLaunch(false) }
      if (e.key === 'Escape') { setSpot(false); setLaunch(false); setCc(false); setMenu(null); setCtx(null) }
    }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])

  const wp = WALLPAPERS.find(w => w.id === wallpaper) || WALLPAPERS[0]
  const closeAll = () => { setMenu(null); setCtx(null); setCc(false); setHd(false) }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const clock = `${days[now.getDay()]} ${mons[now.getMonth()]} ${now.getDate()}\u2002${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const sleep = () => document.body.classList.add('sleep')
  const na = () => notify('web-macOS', 'This menu item is not available in the demo.')

  const menuItems = (m: string): MI[] => {
    switch (m) {
      case 'apple': return [['About This Mac', () => notify('web-macOS Tahoe', 'An unofficial fan project, not affiliated with Apple.')], ['-'], ['System Settings…', () => open('settings')], ['App Store…', () => open('appstore')], ['-'], ['Recent Items', na], ['-'], ['Force Quit…', () => top && close(top.id), '⌥⌘⎋'], ['-'], ['Sleep', sleep], ['Restart…', () => location.reload()], ['Shut Down…', sleep], ['-'], ['Lock Screen', sleep, '⌃⌘Q'], ['Log Out Guest…', sleep, '⇧⌘Q']]
      case 'app': return [[`About ${active.name}`, na], ['-'], ['Settings…', () => open('settings'), '⌘,'], ['-'], ['Services', na], ['-'], [`Hide ${active.name}`, () => top && minimize(top.id), '⌘H'], ['Hide Others', na, '⌥⌘H'], ['-'], [`Quit ${active.name}`, () => top && close(top.id), '⌘Q']]
      case 'Window': return [['Minimize', () => top && minimize(top.id), '⌘M'], ['Zoom', () => top && patch(top.id, { max: !top.max })], ['-'], ...wins.map(w => [APPS[w.id].name, () => patch(w.id, { min: false, z: ++z.current })] as MI), ...(wins.length ? [['-'] as MI] : []), ['Bring All to Front', () => wins.forEach(w => patch(w.id, { min: false }))]]
      case 'File': return [['New Window', () => open(active.id), '⌘N'], ['New Tab', na, '⌘T'], ['-'], ['Close Window', () => top && close(top.id), '⌘W'], ['-'], ['Print…', na, '⌘P']]
      case 'Edit': return [['Undo', na, '⌘Z'], ['Redo', na, '⇧⌘Z'], ['-'], ['Cut', na, '⌘X'], ['Copy', na, '⌘C'], ['Paste', na, '⌘V'], ['Select All', na, '⌘A']]
      case 'View': return [[theme === 'dark' ? 'Use Light Appearance' : 'Use Dark Appearance', toggleTheme], ['-'], ['Enter Full Screen', () => top && patch(top.id, { max: !top.max }), '⌃⌘F']]
      case 'Go': return [['Back', na, '⌘['], ['Forward', na, '⌘]'], ['-'], ['Applications', () => open('finder'), '⇧⌘A'], ['Documents', () => open('finder'), '⇧⌘O'], ['Downloads', () => open('finder'), '⌥⌘L']]
      default: return [['Not available in this demo', undefined, undefined, true]]
    }
  }

  return <OS.Provider value={{ theme, setTheme, wallpaper, setWallpaper, accent, setAccent, open, notify, trash, setTrash }}>
    <div className="desktop" onContextMenu={e => { e.preventDefault(); setCtx({ x: Math.min(e.clientX, innerWidth - 240), y: Math.min(e.clientY, innerHeight - 280) }); setMenu(null); setCc(false) }} onMouseDown={closeAll}>
      <div className="wallpaper"><Wallpaper wp={wp} dark={theme === 'dark'} /></div>

      <div className="menubar" onMouseDown={e => e.stopPropagation()}>
        <div className="mb-left">
          <MB id="apple" menu={menu} setMenu={setMenu} items={menuItems('apple')} close={closeAll} logo><AppleLogo size={15} /></MB>
          <MB id="app" menu={menu} setMenu={setMenu} items={menuItems('app')} close={closeAll} bold>{active.name}</MB>
          {active.menus.map(m => <MB key={m} id={m} menu={menu} setMenu={setMenu} items={menuItems(m)} close={closeAll}>{m}</MB>)}
        </div>
        <div className="mb-right">
          <span className="mbi">{Glyph.battery(82)}</span><span className="mbi">{Glyph.wifi(15)}</span>
          <span className="mbi" onMouseDown={e => { e.stopPropagation(); setSpot(true); setLaunch(false); closeAll() }}>{Glyph.search(14)}</span>
          <span className={'mbi' + (cc ? ' on' : '')} onMouseDown={e => { e.stopPropagation(); setCc(!cc); setMenu(null); setCtx(null) }}>{Glyph.control()}</span>
          <span className="mbi clock">{clock}</span>
        </div>
      </div>

      <div className={'dicon' + (hd ? ' sel' : '')} onMouseDown={e => { e.stopPropagation(); closeAll(); setHd(true) }} onDoubleClick={() => open('finder')}><DriveIcon size={58} /><span>Macintosh HD</span></div>

      {wins.map(w => <WindowView key={w.id} w={w} def={APPS[w.id]} focused={top?.id === w.id}
        onFocus={() => focus(w.id)} patch={p => patch(w.id, p)} close={() => close(w.id)} minimize={() => minimize(w.id)} />)}

      <Dock wins={wins} bouncing={bouncing} open={open} trashFull={trash.length > 0} />

      {cc && <div className="cc glass" onMouseDown={e => e.stopPropagation()}>
        <div className="cc-row">
          <div className="cc-tile conn">
            <div className="cc-line"><div className="cc-btn on">{Glyph.wifi(16)}</div><div><b>Wi-Fi</b><small>Home Network</small></div></div>
            <div className="cc-line"><div className="cc-btn on">{Glyph.bt(16)}</div><div><b>Bluetooth</b><small>On</small></div></div>
            <div className="cc-line"><div className="cc-btn on">{Glyph.airdrop(16)}</div><div><b>AirDrop</b><small>Contacts Only</small></div></div></div>
          <div className="cc-col">
            <div className="cc-tile cc-focus" onClick={() => notify('Focus', 'Do Not Disturb is a demo toggle.')}><div className="cc-btn">{Glyph.moon(16)}</div><b>Focus</b></div>
            <div className="cc-two"><div className="cc-tile sm" onClick={toggleTheme}><div className={'cc-btn' + (theme === 'dark' ? ' on' : '')}>{theme === 'dark' ? Glyph.moon(16) : Glyph.sun(16)}</div><small>{theme === 'dark' ? 'Dark' : 'Light'}</small></div>
              <div className="cc-tile sm" onClick={na}><div className="cc-btn">{Glyph.desktop(16)}</div><small>Mirror</small></div></div></div></div>
        <div className="cc-tile wide"><b>Display</b><Slider value={bright} onChange={setBright} icon={Glyph.sun(15)} /></div>
        <div className="cc-tile wide"><b>Sound</b><Slider value={vol} onChange={setVol} icon={Glyph.volume(15)} /></div>
        <div className="cc-tile np"><div className="art" /><div><b>Not Playing</b><small>Music</small></div><span>{Glyph.play(18)}</span></div>
      </div>}

      {ctx && <div className="menu glass ctx" style={{ left: ctx.x, top: ctx.y }} onMouseDown={e => e.stopPropagation()}>
        <Items items={[['New Folder', () => notify('Finder', 'New folder created.')], ['-'], ['Get Info', na, '⌘I'], ['Change Desktop Background…', () => open('settings')], ['-'], ['Use Stacks', na, '^⌘0'], ['Sort By', na], ['Show View Options', na, '⌘J'], ['-'], [theme === 'dark' ? 'Use Light Appearance' : 'Use Dark Appearance', toggleTheme], ['Open Terminal', () => open('terminal')]]} close={closeAll} /></div>}

      {launch && <Launchpad wp={wp} dark={theme === 'dark'} onClose={() => setLaunch(false)} open={open} />}
      {spot && <Spotlight onClose={() => setSpot(false)} open={open} />}

      <div className="toasts">{toasts.map(t => <div className="toast glass" key={t.id}><div className="ti"><Icon app={t.app} /></div><div className="tt"><b>{t.title}</b><p>{t.body}</p></div><span className="tn">now</span></div>)}</div>
      <div className="dim" style={{ opacity: (100 - bright) / 160 }} />
    </div>
    <div className="sleepcover" onClick={() => document.body.classList.remove('sleep')}><AppleLogo size={42} /><p>Click to wake</p></div>
  </OS.Provider>
}

function Items({ items, close }: { items: MI[]; close: () => void }) {
  return <>{items.map(([l, f, k, dis], i) => l === '-' ? <hr key={i} /> :
    <div key={i} className={'mi' + (dis ? ' dis' : '')} onClick={() => { if (dis) return; close(); f?.() }}><span>{l}</span>{k && <em>{k}</em>}</div>)}</>
}
function MB({ id, menu, setMenu, items, close, children, bold, logo }: { id: string; menu: string | null; setMenu: (m: string | null) => void; items: MI[]; close: () => void; children: ReactNode; bold?: boolean; logo?: boolean }) {
  return <div className={'mb' + (bold ? ' bold' : '') + (logo ? ' logo' : '') + (menu === id ? ' on' : '')} onMouseDown={e => { e.stopPropagation(); setMenu(menu === id ? null : id) }} onMouseEnter={() => menu && setMenu(id)}>
    {children}
    {menu === id && <div className="menu glass" onMouseDown={e => e.stopPropagation()}><Items items={items} close={close} /></div>}
  </div>
}

function Dock({ wins, bouncing, open, trashFull }: { wins: Win[]; bouncing: AppId | null; open: (a: AppId) => void; trashFull: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const centers = useRef<number[]>([])
  const [mx, setMx] = useState<number | null>(null)
  const items: AppId[] = [...DOCK, 'trash']
  const BASE = 54, MAX = 96
  const measure = () => { centers.current = Array.from(ref.current!.querySelectorAll<HTMLElement>('.dk')).map(el => { const r = el.getBoundingClientRect(); return r.left + r.width / 2 }) }
  const size = (i: number) => {
    if (mx === null || !centers.current[i]) return BASE
    const d = Math.abs(mx - centers.current[i]); const R = 120
    return d > R ? BASE : BASE + (MAX - BASE) * (Math.cos((d / R) * Math.PI) + 1) / 2
  }
  return <div className="dockwrap"><div className="dock glass" ref={ref} onMouseEnter={() => measure()} onMouseMove={e => { if (!centers.current.length) measure(); setMx(e.clientX) }} onMouseLeave={() => setMx(null)}>
    {items.map((id, i) => {
      const s = size(i), w = wins.find(x => x.id === id), run = !!w
      return <div className="dkw" key={id}>
        {id === 'trash' && <div className="dsep" />}
        <div className={'dk' + (bouncing === id ? ' bounce' : '')} data-dock={id} style={{ width: s, height: s }} onClick={() => open(id)} onMouseDown={e => e.stopPropagation()}>
          <span className="tip">{label(id)}</span>
          <div className="dki" style={{ opacity: id === 'trash' && !trashFull ? 0.92 : 1 }}><Icon app={id} /></div>
          {run && <i className="dot" />}
        </div></div>
    })}</div></div>
}

const Light = ({ k }: { k: 'r' | 'y' | 'g' }) => <svg width="8" height="8" viewBox="0 0 8 8" className="gl" fill="none" stroke="rgba(0,0,0,.62)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
  {k === 'r' && <path d="M1.600 1.600l4.800 4.800M6.400 1.600L1.600 6.400" />}{k === 'y' && <path d="M1.200 4h5.600" />}
  {k === 'g' && <path d="M2 2h3.200L2 5.200zM6 6H2.800L6 2.800z" fill="rgba(0,0,0,.62)" strokeWidth=".4" />}</svg>

function WindowView({ w, def, focused, onFocus, patch, close, minimize }: { w: Win; def: AppDef; focused: boolean; onFocus: () => void; patch: (p: Partial<Win>) => void; close: () => void; minimize: () => void }) {
  const drag = (e: React.PointerEvent, mode: string) => {
    if (w.max && mode === 'move') return
    e.preventDefault(); e.stopPropagation(); onFocus()
    const sx = e.clientX, sy = e.clientY, o = { ...w }
    const mv = (ev: PointerEvent) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy
      if (mode === 'move') return patch({ x: o.x + dx, y: Math.max(24, o.y + dy) })
      const p: Partial<Win> = {}
      if (mode.includes('e')) p.w = Math.max(220, o.w + dx)
      if (mode.includes('s')) p.h = Math.max(160, o.h + dy)
      if (mode.includes('w')) { p.w = Math.max(220, o.w - dx); p.x = o.x + (o.w - p.w) }
      if (mode.includes('n')) { p.h = Math.max(160, o.h - dy); p.y = Math.max(24, o.y + (o.h - p.h)) }
      patch(p)
    }
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up) }
    addEventListener('pointermove', mv); addEventListener('pointerup', up)
  }
  const onDown = (e: React.PointerEvent) => {
    onFocus(); const t = e.target as HTMLElement
    if (t.closest('[data-drag]') && !t.closest('button,input,textarea,select,a,[data-nodrag],.lights')) drag(e, 'move')
  }
  let style: React.CSSProperties = w.max ? { left: 0, top: 24, width: '100%', height: 'calc(100% - 24px)', zIndex: w.z } : { left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z }
  style = { ...style, ['--r' as string]: (w.max ? 0 : def.radius) + 'px' }
  if (w.min) style = { ...style, transformOrigin: `${w.ox ?? w.w / 2}px ${w.oy ?? w.h}px`, transform: 'scale(.04,.02) translateY(30px)', opacity: 0, pointerEvents: 'none' }
  return <div className={`win k-${def.kind} id-${w.id}` + (focused ? ' focus' : '') + (w.closing ? ' closing' : '') + (w.min ? ' mini' : '') + (w.max ? ' max' : '')} style={style} onPointerDown={onDown} onContextMenu={e => e.stopPropagation()}
    onDoubleClick={e => { if ((e.target as HTMLElement).closest('[data-drag]') && !(e.target as HTMLElement).closest('button,input,textarea,[data-nodrag]')) patch({ max: !w.max }) }}>
    {def.kind === 'title' && <div className="titlebar" data-drag><span>guest — -zsh — 80×24</span></div>}
    <div className="wbody">{def.body()}</div>
    <div className="lights" style={{ left: def.lx, top: def.ly }}>
      <button className="l r" onClick={close} aria-label="Close"><Light k="r" /></button>
      <button className="l y" onClick={minimize} aria-label="Minimize"><Light k="y" /></button>
      <button className="l g" onClick={() => patch({ max: !w.max })} aria-label="Zoom"><Light k="g" /></button></div>
    {!w.max && ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(m => <div key={m} className={'rz rz-' + m} onPointerDown={e => drag(e, m)} />)}
  </div>
}

function Launchpad({ wp, dark, onClose, open }: { wp: typeof WALLPAPERS[0]; dark: boolean; onClose: () => void; open: (a: AppId) => void }) {
  const [q, setQ] = useState('')
  return <div className="launchpad" onMouseDown={e => { e.stopPropagation(); onClose() }}>
    <div className="lbg"><Wallpaper wp={wp} dark={dark} /></div>
    <div className="lsearch" onMouseDown={e => e.stopPropagation()}>{Glyph.search(13)}<input autoFocus placeholder="Search" value={q} onChange={e => setQ(e.target.value)} /></div>
    <div className="lgrid">{LAUNCH.filter(a => label(a).toLowerCase().includes(q.toLowerCase())).map(a =>
      <div key={a} className="lapp" onMouseDown={e => e.stopPropagation()} onClick={() => open(a)}><div><Icon app={a} /></div><span>{label(a)}</span></div>)}</div>
    <div className="ldots"><i className="on" /><i /></div></div>
}

function Spotlight({ onClose, open }: { onClose: () => void; open: (a: AppId) => void }) {
  const [q, setQ] = useState(''), [sel, setSel] = useState(0)
  const all: AppId[] = [...LAUNCH, 'trash']
  const res = all.filter(a => q && label(a).toLowerCase().includes(q.toLowerCase()))
  let calc: string | null = null
  if (/^[\d\s+\-*/().%]+$/.test(q) && /\d/.test(q) && /[+\-*/%]/.test(q)) { try { calc = String(+Number(Function(`"use strict";return (${q})`)()).toPrecision(12)) } catch { /* */ } }
  const go = (a: AppId) => { open(a); onClose() }
  return <div className="spotwrap" onMouseDown={e => { e.stopPropagation(); onClose() }}>
    <div className="spot glass" onMouseDown={e => e.stopPropagation()}>
      <div className="sin">{Glyph.search(22)}<input autoFocus placeholder="Spotlight Search" value={q} onChange={e => { setQ(e.target.value); setSel(0) }}
        onKeyDown={e => { if (e.key === 'ArrowDown') setSel(Math.min(sel + 1, res.length - 1)); if (e.key === 'ArrowUp') setSel(Math.max(sel - 1, 0)); if (e.key === 'Enter' && res[sel]) go(res[sel]) }} /></div>
      {(res.length > 0 || calc) && <div className="sres">
        {calc && <><h6>Calculator</h6><div className="sr calcr"><span className="big">{calc}</span><small>{q} =</small></div></>}
        {res.length > 0 && <h6>{calc ? 'Applications' : 'Top Hit'}</h6>}
        {res.map((a, i) => <div key={a} className={'sr' + (i === sel ? ' on' : '')} onMouseEnter={() => setSel(i)} onClick={() => go(a)}><div className="si"><Icon app={a} /></div>{label(a)}<small>Application</small></div>)}</div>}
    </div></div>
}
