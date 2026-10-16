import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AppId, Icon, AppleLogo, WifiIcon, SearchIcon, BatteryIcon, ControlIcon, SunIcon, MoonIcon, VolumeIcon, BluetoothIcon, AirdropIcon } from './icons'
import { OS, WALLPAPERS, type Theme } from './os'
import Finder from './apps/Finder'
import Safari from './apps/Safari'
import Notes from './apps/Notes'
import Calculator from './apps/Calculator'
import Terminal from './apps/Terminal'
import Settings from './apps/Settings'
import { Photos, Music, Trash } from './apps/Placeholders'

interface AppDef { id: AppId; name: string; w: number; h: number; body: () => ReactNode; menus: string[]; bg?: string }
const APPS: Record<string, AppDef> = {
  finder: { id: 'finder', name: 'Finder', w: 720, h: 460, body: () => <Finder />, menus: ['File', 'Edit', 'View', 'Go', 'Window', 'Help'] },
  safari: { id: 'safari', name: 'Safari', w: 860, h: 560, body: () => <Safari />, menus: ['File', 'Edit', 'View', 'History', 'Bookmarks', 'Window', 'Help'] },
  notes: { id: 'notes', name: 'Notes', w: 700, h: 460, body: () => <Notes />, menus: ['File', 'Edit', 'Format', 'View', 'Window', 'Help'] },
  calculator: { id: 'calculator', name: 'Calculator', w: 250, h: 380, body: () => <Calculator />, menus: ['File', 'Edit', 'View', 'Window', 'Help'] },
  terminal: { id: 'terminal', name: 'Terminal', w: 640, h: 400, body: () => <Terminal />, menus: ['Shell', 'Edit', 'View', 'Window', 'Help'] },
  settings: { id: 'settings', name: 'System Settings', w: 700, h: 480, body: () => <Settings />, menus: ['Edit', 'View', 'Window', 'Help'] },
  photos: { id: 'photos', name: 'Photos', w: 720, h: 480, body: () => <Photos />, menus: ['File', 'Edit', 'View', 'Window', 'Help'] },
  music: { id: 'music', name: 'Music', w: 620, h: 420, body: () => <Music />, menus: ['File', 'Edit', 'Song', 'View', 'Window', 'Help'] },
  trash: { id: 'trash', name: 'Trash', w: 560, h: 380, body: () => <Trash />, menus: ['File', 'Edit', 'View', 'Window', 'Help'] },
}
const DOCK: AppId[] = ['finder', 'launchpad', 'safari', 'notes', 'calculator', 'terminal', 'photos', 'music', 'settings']
const LAUNCH: AppId[] = ['finder', 'safari', 'notes', 'calculator', 'terminal', 'settings', 'photos', 'music']
const label = (id: AppId) => id === 'launchpad' ? 'Launchpad' : APPS[id].name

interface Win { id: AppId; x: number; y: number; w: number; h: number; z: number; min: boolean; max: boolean; closing?: boolean }
interface Toast { id: number; title: string; body: string }

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('wp') || 'tahoe')
  const [wins, setWins] = useState<Win[]>([])
  const [bouncing, setBouncing] = useState<AppId | null>(null)
  const [menu, setMenu] = useState<string | null>(null)
  const [spot, setSpot] = useState(false), [launch, setLaunch] = useState(false), [cc, setCc] = useState(false)
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [trash, setTrash] = useState<string[]>([])
  const [now, setNow] = useState(new Date())
  const z = useRef(10)

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => localStorage.setItem('wp', wallpaper), [wallpaper])
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])

  const notify = useCallback((title: string, body: string) => {
    const id = Date.now() + Math.random(); setToasts(t => [...t, { id, title, body }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4500)
  }, [])
  useEffect(() => { const t = setTimeout(() => notify('Welcome to web-macOS', 'Press Ctrl/⌘ + Space for Spotlight'), 1200); return () => clearTimeout(t) }, [notify])

  const open = useCallback((id: AppId) => {
    if (id === 'launchpad') { setLaunch(l => !l); return }
    setLaunch(false); setSpot(false)
    setWins(ws => {
      const ex = ws.find(w => w.id === id)
      if (ex) return ws.map(w => w.id === id ? { ...w, min: false, z: ++z.current } : w)
      const def = APPS[id], n = ws.length
      setBouncing(id); setTimeout(() => setBouncing(null), 1300)
      return [...ws, { id, w: def.w, h: def.h, x: 120 + n * 32, y: 60 + n * 28, z: ++z.current, min: false, max: false }]
    })
  }, [])
  const focus = (id: AppId) => setWins(ws => ws.map(w => w.id === id ? { ...w, z: ++z.current } : w))
  const patch = (id: AppId, p: Partial<Win>) => setWins(ws => ws.map(w => w.id === id ? { ...w, ...p } : w))
  const close = (id: AppId) => { patch(id, { closing: true }); setTimeout(() => setWins(ws => ws.filter(w => w.id !== id)), 180) }
  const visible = wins.filter(w => !w.min && !w.closing)
  const top = visible.sort((a, b) => b.z - a.z)[0]
  const active = top ? APPS[top.id] : APPS.finder

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') { e.preventDefault(); setSpot(s => !s); setLaunch(false) }
      if (e.key === 'Escape') { setSpot(false); setLaunch(false); setCc(false); setMenu(null); setCtx(null) }
    }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])

  const wp = WALLPAPERS.find(w => w.id === wallpaper) || WALLPAPERS[0]
  const closeAll = () => { setMenu(null); setCtx(null); setCc(false) }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const clock = `${days[now.getDay()]} ${mons[now.getMonth()]} ${now.getDate()}  ${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`

  const appleItems: [string, (() => void)?][] = [['About This Mac', () => notify('web-macOS Tahoe', 'An unofficial fan project, not affiliated with Apple.')], ['-'], ['System Settings…', () => open('settings')], ['App Store…'], ['-'],
    ['Force Quit…', () => top && close(top.id)], ['-'], ['Sleep', () => document.body.classList.add('sleep')], ['Restart…', () => location.reload()], ['Shut Down…', () => document.body.classList.add('sleep')]]
  const appMenu: [string, (() => void)?][] = [[`About ${active.name}`], ['-'], ['Settings…', () => open('settings')], ['-'], [`Hide ${active.name}`, () => top && patch(top.id, { min: true })], [`Quit ${active.name}`, () => top && close(top.id)]]
  const menuItems = (m: string): [string, (() => void)?][] => m === 'apple' ? appleItems : m === 'app' ? appMenu :
    m === 'Window' ? [['Minimize', () => top && patch(top.id, { min: true })], ['Zoom', () => top && patch(top.id, { max: !top.max })], ['-'], ...wins.map(w => [APPS[w.id].name, () => patch(w.id, { min: false, z: ++z.current })] as [string, () => void])] :
    m === 'File' ? [['New Window', () => open(active.id)], ['Close Window', () => top && close(top.id)]] :
    m === 'View' ? [['Toggle Dark Mode', () => setTheme(theme === 'dark' ? 'light' : 'dark')], ['Enter Full Screen', () => top && patch(top.id, { max: !top.max })]] :
    [['Not available in demo']]

  return <OS.Provider value={{ theme, setTheme, wallpaper, setWallpaper, open, notify, trash, setTrash }}>
    <div className="desktop" style={{ background: theme === 'dark' ? wp.dark : wp.light }}
      onContextMenu={e => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); setMenu(null) }}
      onMouseDown={() => { closeAll() }}>

      {/* menu bar */}
      <div className="menubar glass" onMouseDown={e => e.stopPropagation()}>
        <div className="mb-left">
          <MB id="apple" menu={menu} setMenu={setMenu} items={menuItems('apple')} close={closeAll}><AppleLogo size={15} /></MB>
          <MB id="app" menu={menu} setMenu={setMenu} items={menuItems('app')} close={closeAll} bold>{active.name}</MB>
          {active.menus.map(m => <MB key={m} id={m} menu={menu} setMenu={setMenu} items={menuItems(m)} close={closeAll}>{m}</MB>)}
        </div>
        <div className="mb-right">
          <span className="mbi"><BatteryIcon /></span><span className="mbi"><WifiIcon /></span>
          <span className="mbi" onClick={() => { setSpot(true); setLaunch(false) }}><SearchIcon /></span>
          <span className="mbi" onMouseDown={e => { e.stopPropagation(); setCc(!cc); setMenu(null) }}><ControlIcon /></span>
          <span className="mbi clock">{clock}</span>
        </div>
      </div>

      {/* desktop icon */}
      <div className="dicon" onDoubleClick={() => open('finder')}><div className="hd" /><span>Macintosh HD</span></div>

      {/* windows */}
      {wins.map(w => <WindowView key={w.id} w={w} def={APPS[w.id]} focused={top?.id === w.id}
        onFocus={() => focus(w.id)} patch={p => patch(w.id, p)} close={() => close(w.id)} />)}

      {/* dock */}
      <Dock wins={wins} bouncing={bouncing} open={open} trashFull={trash.length > 0} />

      {/* control center */}
      {cc && <div className="cc glass" onMouseDown={e => e.stopPropagation()}>
        <div className="cc-grid">
          <div className="cc-tile big"><div className="cc-btn on"><WifiIcon /></div><div><b>Wi-Fi</b><small>Home Network</small></div>
            <div className="cc-btn on"><BluetoothIcon /></div><div><b>Bluetooth</b><small>On</small></div>
            <div className="cc-btn"><AirdropIcon /></div><div><b>AirDrop</b><small>Contacts Only</small></div></div>
          <div className="cc-tile" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><div className={'cc-btn on'}>{theme === 'dark' ? <MoonIcon /> : <SunIcon />}</div><b>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</b></div>
          <div className="cc-tile" onClick={() => notify('Focus', 'Do Not Disturb is a demo toggle')}><div className="cc-btn"><MoonIcon /></div><b>Focus</b></div>
        </div>
        <div className="cc-slider"><b>Display</b><div><SunIcon /><input type="range" defaultValue={80} onChange={e => document.documentElement.style.setProperty('--bright', String(0.5 + +e.target.value / 200))} /></div></div>
        <div className="cc-slider"><b>Sound</b><div><VolumeIcon /><input type="range" defaultValue={60} /></div></div>
      </div>}

      {/* desktop context menu */}
      {ctx && <div className="menu glass ctx" style={{ left: ctx.x, top: ctx.y }} onMouseDown={e => e.stopPropagation()}>
        {([['New Folder', () => notify('Finder', 'New folder created')], ['Get Info'], ['-'], ['Change Wallpaper…', () => open('settings')], ['Toggle Dark Mode', () => setTheme(theme === 'dark' ? 'light' : 'dark')], ['-'], ['Open Terminal', () => open('terminal')]] as [string, (() => void)?][]).map(([l, f], i) => l === '-' ? <hr key={i} /> :
          <div key={l} className="mi" onClick={() => { f?.(); setCtx(null) }}>{l}</div>)}</div>}

      {/* launchpad */}
      {launch && <Launchpad onClose={() => setLaunch(false)} open={open} />}
      {spot && <Spotlight onClose={() => setSpot(false)} open={open} />}

      <div className="toasts">{toasts.map(t => <div className="toast glass" key={t.id}><div className="ti"><Icon app="finder" /></div><div><b>{t.title}</b><p>{t.body}</p></div></div>)}</div>
    </div>
    <div className="sleepcover" onClick={() => document.body.classList.remove('sleep')}>Click to wake</div>
  </OS.Provider>
}

function MB({ id, menu, setMenu, items, close, children, bold }: { id: string; menu: string | null; setMenu: (m: string | null) => void; items: [string, (() => void)?][]; close: () => void; children: ReactNode; bold?: boolean }) {
  return <div className={'mb' + (bold ? ' bold' : '') + (menu === id ? ' on' : '')} onMouseDown={e => { e.stopPropagation(); setMenu(menu === id ? null : id) }} onMouseEnter={() => menu && setMenu(id)}>
    {children}
    {menu === id && <div className="menu glass" onMouseDown={e => e.stopPropagation()}>{items.map(([l, f], i) => l === '-' ? <hr key={i} /> :
      <div key={i} className="mi" onClick={() => { close(); f?.() }}>{l}</div>)}</div>}
  </div>
}

function Dock({ wins, bouncing, open, trashFull }: { wins: Win[]; bouncing: AppId | null; open: (a: AppId) => void; trashFull: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mx, setMx] = useState<number | null>(null)
  const items: AppId[] = [...DOCK, 'trash']
  const scale = (i: number) => {
    if (mx === null || !ref.current) return 1
    const el = ref.current.querySelectorAll<HTMLElement>('.dk')[i]; if (!el) return 1
    const r = el.getBoundingClientRect(); const d = Math.abs(mx - (r.left + r.width / 2) + (mx > 0 ? 0 : 0))
    return 1 + 0.85 * Math.exp(-(d * d) / (2 * 55 * 55))
  }
  return <div className="dockwrap"><div className="dock glass" ref={ref} onMouseMove={e => setMx(e.clientX)} onMouseLeave={() => setMx(null)}>
    {items.map((id, i) => {
      const s = scale(i), w = wins.find(x => x.id === id)
      return <div key={id}>
        {id === 'trash' && <div className="dsep" />}
        <div className={'dk' + (bouncing === id ? ' bounce' : '')} data-dock={id} style={{ width: 52 * s, height: 52 * s }} onClick={() => open(id)}>
          <span className="tip">{label(id)}</span>
          <div style={{ opacity: id === 'trash' && trashFull ? 1 : 1 }}><Icon app={id} /></div>
          {w && <i className="dot" />}
        </div></div>
    })}</div></div>
}

function WindowView({ w, def, focused, onFocus, patch, close }: { w: Win; def: AppDef; focused: boolean; onFocus: () => void; patch: (p: Partial<Win>) => void; close: () => void }) {
  const drag = (e: React.PointerEvent, mode: string) => {
    if (w.max && mode === 'move') return
    e.preventDefault(); e.stopPropagation(); onFocus()
    const sx = e.clientX, sy = e.clientY, o = { ...w }
    const mv = (ev: PointerEvent) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy
      if (mode === 'move') return patch({ x: o.x + dx, y: Math.max(28, o.y + dy) })
      const p: Partial<Win> = {}
      if (mode.includes('e')) p.w = Math.max(240, o.w + dx)
      if (mode.includes('s')) p.h = Math.max(160, o.h + dy)
      if (mode.includes('w')) { p.w = Math.max(240, o.w - dx); p.x = o.x + (o.w - p.w) }
      if (mode.includes('n')) { p.h = Math.max(160, o.h - dy); p.y = Math.max(28, o.y + (o.h - p.h)) }
      patch(p)
    }
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up) }
    addEventListener('pointermove', mv); addEventListener('pointerup', up)
  }
  let style: React.CSSProperties = w.max ? { left: 0, top: 28, width: '100%', height: 'calc(100% - 28px)', zIndex: w.z } : { left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z }
  if (w.min) {
    const t = document.querySelector(`[data-dock="${w.id}"]`)?.getBoundingClientRect()
    const cx = (t ? t.left + t.width / 2 : innerWidth / 2), cy = (t ? t.top + t.height / 2 : innerHeight)
    const el = { x: w.max ? innerWidth / 2 : w.x + w.w / 2, y: w.max ? innerHeight / 2 : w.y + w.h / 2 }
    style = { ...style, transform: `translate(${cx - el.x}px,${cy - el.y}px) scale(.08)`, opacity: 0, pointerEvents: 'none' }
  }
  return <div className={'win' + (focused ? ' focus' : '') + (w.closing ? ' closing' : '') + (w.max ? ' max' : '') + (w.id === 'calculator' ? ' dark-ui' : '')} style={style} onPointerDown={onFocus}>
    <div className="titlebar" onPointerDown={e => drag(e, 'move')} onDoubleClick={() => patch({ max: !w.max })}>
      <div className="lights" onPointerDown={e => e.stopPropagation()}>
        <button className="l r" onClick={close} aria-label="Close"><b>✕</b></button>
        <button className="l y" onClick={() => patch({ min: true })} aria-label="Minimize"><b>–</b></button>
        <button className="l g" onClick={() => patch({ max: !w.max })} aria-label="Zoom"><b>⤢</b></button>
      </div><span className="wtitle">{def.name}</span></div>
    <div className="wbody">{def.body()}</div>
    {!w.max && ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(m => <div key={m} className={'rz rz-' + m} onPointerDown={e => drag(e, m)} />)}
  </div>
}

function Launchpad({ onClose, open }: { onClose: () => void; open: (a: AppId) => void }) {
  const [q, setQ] = useState('')
  return <div className="launchpad" onMouseDown={e => { e.stopPropagation(); onClose() }}>
    <div className="lsearch" onMouseDown={e => e.stopPropagation()}><SearchIcon /><input autoFocus placeholder="Search" value={q} onChange={e => setQ(e.target.value)} /></div>
    <div className="lgrid">{LAUNCH.filter(a => label(a).toLowerCase().includes(q.toLowerCase())).map(a =>
      <div key={a} className="lapp" onMouseDown={e => e.stopPropagation()} onClick={() => open(a)}><div><Icon app={a} /></div><span>{label(a)}</span></div>)}</div></div>
}

function Spotlight({ onClose, open }: { onClose: () => void; open: (a: AppId) => void }) {
  const [q, setQ] = useState(''), [sel, setSel] = useState(0)
  const res = LAUNCH.concat('trash').filter(a => q && label(a).toLowerCase().includes(q.toLowerCase()))
  let calc: string | null = null
  if (/^[\d\s+\-*/().%]+$/.test(q) && /\d/.test(q) && /[+\-*/%]/.test(q)) { try { calc = String(Function(`"use strict";return (${q})`)()) } catch { /* ignore */ } }
  return <div className="spotwrap" onMouseDown={e => { e.stopPropagation(); onClose() }}>
    <div className="spot glass" onMouseDown={e => e.stopPropagation()}>
      <div className="sin"><SearchIcon /><input autoFocus placeholder="Spotlight Search" value={q} onChange={e => { setQ(e.target.value); setSel(0) }}
        onKeyDown={e => { if (e.key === 'ArrowDown') setSel(Math.min(sel + 1, res.length - 1)); if (e.key === 'ArrowUp') setSel(Math.max(sel - 1, 0)); if (e.key === 'Enter' && res[sel]) { open(res[sel]); onClose() } }} /></div>
      {(res.length > 0 || calc) && <div className="sres">
        {calc && <div className="sr"><b>= {calc}</b></div>}
        {res.length > 0 && <h6>Applications</h6>}
        {res.map((a, i) => <div key={a} className={'sr' + (i === sel ? ' on' : '')} onClick={() => { open(a); onClose() }}><div className="si"><Icon app={a} /></div>{label(a)}</div>)}</div>}
    </div></div>
}
