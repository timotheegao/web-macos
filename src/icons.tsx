import { useId, type ReactNode } from 'react'
export type AppId = 'finder'|'safari'|'notes'|'calculator'|'terminal'|'settings'|'photos'|'music'|'trash'|'launchpad'
  | 'calendar'|'mail'|'messages'|'maps'|'appstore'|'reminders'|'weather'

// superellipse (squircle) path, n=5
const SQ = (() => {
  const n = 5, pts: string[] = []
  for (let i = 0; i < 120; i++) {
    const t = (i / 120) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t)
    const x = 50 + 46 * Math.sign(c) * Math.pow(Math.abs(c), 2 / n), y = 50 + 46 * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join('') + 'Z'
})()

export const Sq = ({ c1, c2, children, gloss = true }: { c1: string; c2: string; children?: ReactNode; gloss?: boolean }) => {
  const id = useId().replace(/:/g, '')
  return <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={id + 'f'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
      <linearGradient id={id + 'g'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".42" /><stop offset=".55" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <clipPath id={id + 'c'}><path d={SQ} /></clipPath>
    </defs>
    <path d={SQ} fill={`url(#${id}f)`} />
    <g clipPath={`url(#${id}c)`}>{children}{gloss && <rect x="0" y="0" width="100" height="55" fill={`url(#${id}g)`} />}</g>
    <path d={SQ} fill="none" stroke="#000" strokeOpacity=".18" strokeWidth=".8" />
    <path d={SQ} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth=".8" transform="translate(50 50) scale(.985) translate(-50 -50)" />
  </svg>
}

const gear = (() => {
  const p: string[] = []; const N = 8
  for (let i = 0; i < N; i++) { const a = (i / N) * 2 * Math.PI; const f = (r: number, d: number) => `${(50 + r * Math.cos(a + d)).toFixed(1)} ${(50 + r * Math.sin(a + d)).toFixed(1)}`
    const w = Math.PI / N
    p.push(`${i ? 'L' : 'M'}${f(26, -w * .55)}L${f(33, -w * .38)}L${f(33, w * .38)}L${f(26, w * .55)}`) }
  return p.join('') + 'Z'
})()

export const Icon = ({ app }: { app: AppId }) => {
  switch (app) {
    case 'finder': return <Sq c1="#7fd4ff" c2="#2f8cf0" gloss={false}>
      <rect x="50" y="0" width="50" height="100" fill="#2a74ea" />
      <path d="M50 0h50v100H50z" fill="#e9f3ff" opacity=".0" />
      <rect x="0" y="0" width="100" height="100" fill="#fff" opacity=".08" />
      <path d="M50 4v40" stroke="#bfe3ff" strokeWidth="1.5" opacity=".0" />
      <path d="M0 0h50v100H0z" fill="#8fdcff" opacity=".45" />
      <g stroke="#0b1d3a" strokeWidth="4.2" strokeLinecap="round" fill="none"><path d="M33 31v11M67 31v11" /><path d="M50 38c-1 8 0 14 4 19" strokeWidth="3" opacity=".9" /><path d="M27 63c14 14 32 14 46 0" /></g>
      <path d="M50 4C52 40 52 60 50 96" stroke="#fff" strokeOpacity=".5" strokeWidth="1.2" fill="none" />
      <rect x="0" y="0" width="100" height="52" fill="#fff" opacity=".16" /></Sq>
    case 'safari': return <Sq c1="#6fdcff" c2="#0c6be0">
      <circle cx="50" cy="50" r="38" fill="#fff" /><circle cx="50" cy="50" r="35" fill="#1b8cf5" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#bfe6ff" strokeWidth="1" opacity=".8" />
      {Array.from({ length: 60 }).map((_, i) => <line key={i} x1="50" y1="17" x2="50" y2={i % 5 === 0 ? 22.5 : 19.5} stroke="#fff" strokeWidth={i % 5 === 0 ? 1.4 : .7} transform={`rotate(${i * 6} 50 50)`} />)}
      <path d="M50 50L66.5 30.5 L56.5 56Z" fill="#ff453a" transform="rotate(10 50 50)" /><path d="M50 50L33.5 69.5 L43.5 44Z" fill="#f2f6fb" transform="rotate(10 50 50)" />
      <circle cx="50" cy="50" r="2.4" fill="#fff" /></Sq>
    case 'notes': return <Sq c1="#fffdf2" c2="#f4efd5" gloss={false}>
      <rect x="0" y="0" width="100" height="30" fill="#ffd324" /><rect x="0" y="0" width="100" height="30" fill="#fff" opacity=".2" />
      <rect x="0" y="29" width="100" height="1" fill="#c9a000" opacity=".4" />
      <g stroke="#cfcab0" strokeWidth="1.3"><path d="M14 46h72M14 59h72M14 72h72M14 85h50" /></g>
      <g stroke="#333" strokeWidth="2.4" strokeLinecap="round"><path d="M16 14h38" opacity=".0" /></g></Sq>
    case 'calculator': return <Sq c1="#5c5c60" c2="#1f1f22">
      <rect x="15" y="13" width="70" height="22" rx="3" fill="#2a2a2d" /><text x="80" y="31" fontSize="17" textAnchor="end" fill="#fff" fontFamily="-apple-system,sans-serif" fontWeight="300">0</text>
      {[0, 1, 2, 3].flatMap(r => [0, 1, 2, 3].map(c => <rect key={r + '-' + c} x={15 + c * 17.7} y={40 + r * 12.6} width="16" height="11" rx="2.5" fill={c === 3 ? '#ff9f0a' : r === 0 ? '#9a9a9f' : '#7a7a7f'} />))}</Sq>
    case 'terminal': return <Sq c1="#4a4a4e" c2="#0b0b0c">
      <rect x="9" y="12" width="82" height="76" rx="9" fill="#0b0b0c" stroke="#8e8e93" strokeWidth="1.2" />
      <rect x="9" y="12" width="82" height="11" rx="5" fill="#2f2f33" />
      <path d="M22 41l13 9-13 9" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M42 62h22" stroke="#fff" strokeWidth="5" strokeLinecap="round" /></Sq>
    case 'settings': return <Sq c1="#c9ccd3" c2="#80848d">
      <path d={gear} fill="#5c606a" stroke="#fff" strokeOpacity=".4" strokeWidth=".8" /><circle cx="50" cy="50" r="26" fill="#a9adb6" /><circle cx="50" cy="50" r="22" fill="#7d818b" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="#fff" strokeOpacity=".5" /><circle cx="50" cy="50" r="10" fill="#d5d8de" stroke="#5c606a" strokeWidth="1.5" /></Sq>
    case 'photos': return <Sq c1="#ffffff" c2="#eceef2" gloss={false}>
      {[['#ff9500', 0], ['#ffcc00', 45], ['#7ed957', 90], ['#00c7be', 135], ['#0a84ff', 180], ['#5e5ce6', 225], ['#bf5af2', 270], ['#ff375f', 315]].map(([c, r]) =>
        <ellipse key={String(r)} cx="50" cy="31" rx="12.5" ry="20" fill={c as string} opacity=".85" style={{ mixBlendMode: 'multiply' }} transform={`rotate(${r} 50 50)`} />)}</Sq>
    case 'music': return <Sq c1="#ff7a8a" c2="#f4203a">
      <path d="M40 67V31l30-7v36" stroke="#fff" strokeWidth="5" fill="none" strokeLinejoin="round" /><ellipse cx="33" cy="69" rx="9.5" ry="7.5" fill="#fff" /><ellipse cx="63" cy="62" rx="9.5" ry="7.5" fill="#fff" /></Sq>
    case 'launchpad': return <Sq c1="#e8ebf1" c2="#9aa3b4">
      {[0, 1, 2].flatMap(r => [0, 1, 2].map(c => <rect key={r + '-' + c} x={20 + c * 21} y={20 + r * 21} width="17" height="17" rx="4.5" fill={['#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#64d2ff', '#0a84ff', '#bf5af2', '#ff375f', '#8e8e93'][r * 3 + c]} />))}</Sq>
    case 'calendar': return <Sq c1="#fff" c2="#f1f1f4" gloss={false}>
      <text x="50" y="26" fontSize="13" textAnchor="middle" fill="#ff3b30" fontWeight="600" fontFamily="-apple-system,sans-serif">{['SUN','MON','TUE','WED','THU','FRI','SAT'][new Date().getDay()]}</text>
      <text x="50" y="76" fontSize="48" textAnchor="middle" fill="#1d1d1f" fontWeight="300" fontFamily="-apple-system,sans-serif">{new Date().getDate()}</text></Sq>
    case 'mail': return <Sq c1="#62c6ff" c2="#1d6fe8"><rect x="17" y="27" width="66" height="46" rx="6" fill="#fff" /><path d="M19 31l31 24 31-24" stroke="#4aa3f5" strokeWidth="3.5" fill="none" strokeLinejoin="round" /></Sq>
    case 'messages': return <Sq c1="#6ff08a" c2="#16b83a"><ellipse cx="50" cy="46" rx="33" ry="26" fill="#fff" /><path d="M30 64q-2 10-10 14 12 1 22-7z" fill="#fff" /></Sq>
    case 'maps': return <Sq c1="#bde8a0" c2="#7ccb6a"><path d="M0 70L100 30v70H0z" fill="#9ed4f0" opacity=".9" /><path d="M-5 60L105 20" stroke="#fff" strokeWidth="9" /><path d="M40 -5l25 105" stroke="#ffd25a" strokeWidth="7" /><circle cx="52" cy="44" r="12" fill="#ff453a" stroke="#fff" strokeWidth="3" /></Sq>
    case 'appstore': return <Sq c1="#5fd3ff" c2="#1a73f0"><g stroke="#fff" strokeWidth="6" strokeLinecap="round"><path d="M50 24L32 70M50 24l18 46M26 58h48" /></g></Sq>
    case 'reminders': return <Sq c1="#fff" c2="#f2f2f5" gloss={false}>{[0, 1, 2].map(i => <g key={i}><circle cx="26" cy={30 + i * 20} r="5.5" fill="none" stroke={['#ff453a', '#ff9f0a', '#0a84ff'][i]} strokeWidth="2.2" /><path d={`M40 ${30 + i * 20}h40`} stroke="#d6d6da" strokeWidth="2" /></g>)}</Sq>
    case 'weather': return <Sq c1="#4aa8ff" c2="#1f5fd0"><circle cx="38" cy="38" r="15" fill="#ffd60a" /><g fill="#fff"><ellipse cx="55" cy="65" rx="22" ry="12" /><circle cx="44" cy="58" r="12" /><circle cx="63" cy="56" r="10" /></g></Sq>
    case 'trash': return <svg viewBox="0 0 100 100" width="100%" height="100%"><defs><linearGradient id="tr1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#dfe3ea" /><stop offset=".5" stopColor="#f6f8fb" /><stop offset="1" stopColor="#c4cad4" /></linearGradient>
      <linearGradient id="tr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#9aa3b2" stopOpacity=".55" /></linearGradient></defs>
      <path d="M24 22h52l-4.5 68a7 7 0 0 1-7 6.5H35.500a7 7 0 0 1-7-6.5z" fill="url(#tr2)" stroke="#fff" strokeOpacity=".8" strokeWidth="1.2" />
      <path d="M24 22h52l-4.5 68a7 7 0 0 1-7 6.5H35.500a7 7 0 0 1-7-6.500z" fill="none" stroke="#6c7482" strokeOpacity=".35" />
      <g stroke="#8a93a3" strokeOpacity=".7" strokeWidth="1.4">{[0,1,2,3,4].map(i => <path key={i} d={`M${33 + i * 8.5} 30L${34 + i * 8} 88`} />)}{[0,1,2,3,4,5].map(i => <path key={'h'+i} d={`M30 ${38 + i * 9}H70`} />)}</g>
      <rect x="18" y="12" width="64" height="10" rx="5" fill="url(#tr1)" stroke="#8a93a3" strokeOpacity=".5" /></svg>
  }
}
export const FOLDER_BLUE = ['#7ccbff', '#3d9cf5', '#5db6fa']
export const FolderIcon = ({ size = 56 }: { size?: number }) => { const id = useId().replace(/:/g, '')
  return <svg width={size} height={size} viewBox="0 0 64 64"><defs><linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fd5ff" /><stop offset="1" stopColor="#4aa6f6" /></linearGradient><linearGradient id={id + 'b'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#55b3fb" /><stop offset="1" stopColor="#2f86ee" /></linearGradient></defs>
    <path d="M5 14.500a4.500 4.500 0 0 1 4.500-4.500h13.500l5 5h26a4.500 4.500 0 0 1 4.500 4.500V50a4.500 4.500 0 0 1-4.500 4.500H9.500A4.500 4.500 0 0 1 5 50z" fill={`url(#${id}b)`} />
    <path d="M5 24a4 4 0 0 1 4-4h46a4 4 0 0 1 4 4v26a4.500 4.500 0 0 1-4.500 4.500H9.500A4.500 4.500 0 0 1 5 50z" fill={`url(#${id}a)`} /><path d="M5 24a4 4 0 0 1 4-4h46a4 4 0 0 1 4 4" fill="none" stroke="#fff" strokeOpacity=".5" /></svg> }
export const FileIcon = ({ size = 56, ext = '' }: { size?: number; ext?: string }) => <svg width={size} height={size} viewBox="0 0 64 64"><path d="M14 5h26l12 12v39a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" fill="#fff" stroke="#c9ccd3" /><path d="M40 5v9a3 3 0 0 0 3 3h9" fill="#e5e7ec" stroke="#c9ccd3" />
  {ext && <text x="32" y="46" fontSize="9" textAnchor="middle" fill="#8e8e93" fontWeight="700" fontFamily="-apple-system,sans-serif">{ext.toUpperCase().slice(0, 4)}</text>}</svg>
export const DriveIcon = ({ size = 56 }: { size?: number }) => <svg width={size} height={size * .75} viewBox="0 0 64 48"><defs><linearGradient id="dr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f3f6" /><stop offset="1" stopColor="#a3a8b3" /></linearGradient></defs><rect x="3" y="6" width="58" height="38" rx="7" fill="url(#dr)" stroke="#7d8390" strokeOpacity=".6" /><rect x="3" y="30" width="58" height="14" rx="6" fill="#8a909c" opacity=".35" /><circle cx="52" cy="37" r="2.200" fill="#34c759" /></svg>

export const AppleLogo = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.75 0-1.85-.83-3.05-.8-1.55.02-3 .92-3.8 2.3-1.65 2.85-.42 7.05 1.15 9.35.8 1.1 1.7 2.35 2.9 2.3 1.15-.05 1.6-.75 3-.75s1.8.75 3.05.72c1.25-.02 2.05-1.15 2.8-2.27.9-1.3 1.25-2.55 1.27-2.62-.03-.02-2.43-.93-2.45-3.7zM14.1 5.9c.65-.8 1.1-1.9.97-3-.95.04-2.1.63-2.78 1.43-.6.7-1.13 1.83-1 2.9 1.07.08 2.15-.55 2.8-1.33z" /></svg>)

// SF Symbols-like line glyphs
export const G = ({ children, size = 16, sw = 1.7 }: { children: ReactNode; size?: number; sw?: number }) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
export const Glyph = {
  wifi: (s = 16) => <G size={s}><path d="M2 9a15 15 0 0 1 20 0M5.5 12.500a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="19.500" r=".9" fill="currentColor" /></G>,
  search: (s = 14) => <G size={s} sw={2}><circle cx="10.500" cy="10.500" r="6.500" /><path d="M20 20l-4.800-4.800" /></G>,
  sun: (s = 16) => <G size={s}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400" /></G>,
  moon: (s = 16) => <G size={s}><path d="M21 12.800A9 9 0 1 1 11.200 3a7 7 0 0 0 9.800 9.800z" /></G>,
  volume: (s = 16) => <G size={s}><path d="M11 5L6 9H2v6h4l5 4zM16 8.500a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></G>,
  bt: (s = 16) => <G size={s}><path d="M6.500 6.500l11 11L12 23V1l5.500 5.500-11 11" /></G>,
  airdrop: (s = 16) => <G size={s}><circle cx="12" cy="12" r="2" /><path d="M7.800 7.800a6 6 0 0 0 0 8.400M16.200 7.800a6 6 0 0 1 0 8.400M4.900 4.900a10 10 0 0 0 0 14.200M19.100 4.900a10 10 0 0 1 0 14.200" /></G>,
  chevL: (s = 16) => <G size={s} sw={2.2}><path d="M15 5l-7 7 7 7" /></G>,
  chevR: (s = 16) => <G size={s} sw={2.2}><path d="M9 5l7 7-7 7" /></G>,
  sidebar: (s = 18) => <G size={s}><rect x="3" y="4.500" width="18" height="15" rx="3.500" /><path d="M9.500 4.500v15" /></G>,
  grid: (s = 16) => <G size={s}><rect x="4" y="4" width="6.500" height="6.500" rx="1.500" /><rect x="13.500" y="4" width="6.500" height="6.500" rx="1.500" /><rect x="4" y="13.500" width="6.500" height="6.500" rx="1.500" /><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1.500" /></G>,
  list: (s = 16) => <G size={s}><path d="M4 6.500h16M4 12h16M4 17.500h16" /></G>,
  share: (s = 16) => <G size={s}><path d="M12 15V3M8 7l4-4 4 4M6 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1" /></G>,
  plus: (s = 16) => <G size={s} sw={2}><path d="M12 5v14M5 12h14" /></G>,
  tabs: (s = 16) => <G size={s}><rect x="7" y="3" width="14" height="14" rx="3" /><path d="M3 8v10a3 3 0 0 0 3 3h10" /></G>,
  lock: (s = 12) => <G size={s} sw={2}><rect x="5" y="11" width="14" height="10" rx="2.500" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></G>,
  reload: (s = 14) => <G size={s} sw={2}><path d="M20 12a8 8 0 1 1-2.500-5.800M20 4v5h-5" /></G>,
  compose: (s = 17) => <G size={s}><path d="M12 5H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6M18.500 3.500a2 2 0 0 1 3 3L12 16l-4 1 1-4z" /></G>,
  trash: (s = 17) => <G size={s}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" /></G>,
  check: (s = 17) => <G size={s}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 12l3 3 5-6" /></G>,
  folder: (s = 16) => <G size={s}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></G>,
  clock: (s = 16) => <G size={s}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></G>,
  doc: (s = 16) => <G size={s}><path d="M6 3h8l5 5v13H6zM14 3v5h5" /></G>,
  desktop: (s = 16) => <G size={s}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></G>,
  dl: (s = 16) => <G size={s}><circle cx="12" cy="12" r="9" /><path d="M12 7v8M8.500 11.500L12 15l3.500-3.500" /></G>,
  app: (s = 16) => <G size={s}><path d="M12 3L5 18M12 3l7 15M7 13h10" /></G>,
  pic: (s = 16) => <G size={s}><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.800" /><path d="M21 16l-5-5-8 9" /></G>,
  cloud: (s = 16) => <G size={s}><path d="M7 18a4.500 4.500 0 0 1-.5-9A6 6 0 0 1 18 9.500 4.300 4.300 0 0 1 17.500 18z" /></G>,
  disk: (s = 16) => <G size={s}><rect x="3" y="6" width="18" height="12" rx="3" /><circle cx="17" cy="12" r="1" fill="currentColor" /></G>,
  play: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.500v15a1 1 0 0 0 1.500.9l12-7.500a1 1 0 0 0 0-1.700l-12-7.500A1 1 0 0 0 7 4.500z" /></svg>,
  back: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20 5v14L10 12zM3 5v14h3V5z" /></svg>,
  fwd: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M4 5v14l10-7zM18 5v14h3V5z" /></svg>,
  battery: (pct = 82) => <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.500" fill="none" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width={(19 * pct) / 100} height="9" rx="2" fill="currentColor" /><path d="M24.500 4.500v4" stroke="currentColor" opacity=".5" strokeWidth="1.600" strokeLinecap="round" /></svg>,
  control: () => <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.300"><rect x="1" y=".8" width="14" height="5.200" rx="2.600" /><circle cx="4.200" cy="3.400" r="1.500" fill="currentColor" stroke="none" /><rect x="1" y="8" width="14" height="5.200" rx="2.600" /><circle cx="11.800" cy="10.600" r="1.500" fill="currentColor" stroke="none" /></svg>,
}
