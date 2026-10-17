import { useId, type ReactNode } from 'react'
export type AppId = 'finder'|'safari'|'notes'|'calculator'|'terminal'|'settings'|'photos'|'music'|'trash'|'launchpad'
  | 'calendar'|'mail'|'messages'|'maps'|'appstore'|'reminders'|'weather'

// continuous-corner squircle (superellipse, n=5 approximates Apple's smooth corners)
const sqPath = (r: number, n = 5, cx = 50, cy = 50) => {
  const pts: string[] = []
  for (let i = 0; i < 160; i++) {
    const t = (i / 160) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t)
    const x = cx + r * Math.sign(c) * Math.pow(Math.abs(c), 2 / n), y = cy + r * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join('') + 'Z'
}
const SQ = sqPath(46)
const SQ_IN = sqPath(45.2)

export const Sq = ({ c1, c2, children, gloss = false, dark = .16 }: { c1: string; c2: string; children?: ReactNode; gloss?: boolean; dark?: number }) => {
  const id = useId().replace(/:/g, '')
  return <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={id + 'f'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
      <linearGradient id={id + 'b'} x1="0" y1="0" x2="0" y2="1"><stop offset=".62" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity={dark} /></linearGradient>
      <linearGradient id={id + 'g'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <linearGradient id={id + 'h'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset=".35" stopColor="#fff" stopOpacity=".08" /><stop offset=".7" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".12" /></linearGradient>
      <clipPath id={id + 'c'}><path d={SQ} /></clipPath>
      <filter id={id + 's'} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2.2" stdDeviation="2.2" floodColor="#000" floodOpacity=".32" /></filter>
    </defs>
    <path d={SQ} fill="#000" filter={`url(#${id}s)`} />
    <path d={SQ} fill={`url(#${id}f)`} />
    <g clipPath={`url(#${id}c)`}>{children}
      {gloss && <path d="M0 0H100V38Q50 50 0 38Z" fill={`url(#${id}g)`} />}
      <rect width="100" height="100" fill={`url(#${id}b)`} /></g>
    <path d={SQ_IN} fill="none" stroke={`url(#${id}h)`} strokeWidth="1.1" />
    <path d={SQ} fill="none" stroke="#000" strokeOpacity=".22" strokeWidth=".7" />
  </svg>
}

const gear = (() => {
  // 12-tooth gear with rounded trapezoid teeth
  const N = 12, p: string[] = []
  const pt = (r: number, a: number) => `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`
  for (let i = 0; i < N; i++) {
    const a = (i / N) * 2 * Math.PI - Math.PI / 2, w = Math.PI / N
    p.push(`${i ? 'L' : 'M'}${pt(29, a - w * .95)}L${pt(37, a - w * .5)}L${pt(37, a + w * .5)}L${pt(29, a + w * .95)}`)
  }
  return p.join('') + 'Z'
})()

const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const F = '-apple-system,"SF Pro Display",Helvetica,Arial,sans-serif'

export const Icon = ({ app }: { app: AppId }) => {
  const id = useId().replace(/:/g, '')
  switch (app) {
    case 'finder': return <Sq c1="#74d3ff" c2="#2f8cf2" dark={.1}>
      <defs>
        <linearGradient id={id + 'L'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a6e6ff" /><stop offset="1" stopColor="#4fb4fb" /></linearGradient>
        <linearGradient id={id + 'R'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f9bfb" /><stop offset="1" stopColor="#1255d6" /></linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id}L)`} />
      <path d="M53 0H100V100H47C55 80 56 62 52 46C50 34 51 14 53 0Z" fill={`url(#${id}R)`} />
      <path d="M53 0C51 14 50 34 52 46C56 62 55 80 47 100" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.3" />
      <g fill="#0b1c3a"><ellipse cx="33" cy="37" rx="3.6" ry="7.6" /><ellipse cx="67" cy="37" rx="3.6" ry="7.6" /></g>
      <path d="M52 40C51 50 52 56 56 60" stroke="#0b1c3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M22 61C37 84 65 84 79 61" stroke="#0b1c3a" strokeWidth="3.6" fill="none" strokeLinecap="round" /></Sq>
    case 'safari': return <Sq c1="#7ee2ff" c2="#1673ea" dark={.12}>
      <defs><radialGradient id={id + 'r'} cx=".5" cy=".35" r=".75"><stop offset="0" stopColor="#4cc3ff" /><stop offset="1" stopColor="#0a63e0" /></radialGradient></defs>
      <circle cx="50" cy="50" r="38.5" fill="#000" opacity=".12" /><circle cx="50" cy="50" r="37" fill="#fff" fillOpacity=".95" /><circle cx="50" cy="50" r="35" fill={`url(#${id}r)`} />
      {Array.from({ length: 72 }).map((_, i) => <line key={i} x1="50" y1="17.5" x2="50" y2={i % 6 === 0 ? 23 : 20} stroke="#fff" strokeOpacity={i % 6 === 0 ? 1 : .7} strokeWidth={i % 6 === 0 ? 1.3 : .6} transform={`rotate(${i * 5} 50 50)`} />)}
      <g transform="rotate(45 50 50)"><path d="M50 20L56 50H44Z" fill="#ff3b30" /><path d="M50 80L44 50H56Z" fill="#f4f6f9" />
        <path d="M50 22L50 50H42.5Z" fill="#000" opacity=".12" /><path d="M50 78L50 50H57.5Z" fill="#000" opacity=".1" /></g>
      <circle cx="50" cy="50" r="2.6" fill="#fff" stroke="#0a63e0" strokeOpacity=".4" strokeWidth=".6" /></Sq>
    case 'notes': return <Sq c1="#fffef6" c2="#f6f1d9" dark={.06}>
      <rect width="100" height="25" fill="#ffd62e" /><rect width="100" height="27" fill="#fff" opacity=".18" />
      <rect y="27" width="100" height="1" fill="#b98f00" opacity=".35" />
      <g stroke="#e0d9b8" strokeWidth="1.1"><path d="M0 44H100M0 57H100M0 70H100M0 83H100" /></g>
      <path d="M12 0V100" stroke="#f1b1ab" strokeWidth="0" />
      <g stroke="#9c9577" strokeWidth="2.2" strokeLinecap="round" opacity=".8"><path d="M15 38h42M15 51h58M15 64h34" /></g></Sq>
    case 'calculator': return <Sq c1="#4a4a4e" c2="#1b1b1d" dark={.25}>
      <rect x="14" y="13" width="72" height="22" rx="5" fill="#0d0d0e" /><text x="80" y="31" fontSize="17" textAnchor="end" fill="#fff" fontFamily={F} fontWeight="300">0</text>
      {[0, 1, 2, 3].flatMap(r => [0, 1, 2, 3].map(c => <rect key={r + '-' + c} x={14 + c * 18.5} y={40 + r * 12.8} width="16.5" height="11" rx="5.5" fill={c === 3 ? '#ff9f0a' : r === 0 ? '#a5a5a9' : '#5d5d61'} />))}
      <path d="M14 13h72" stroke="#fff" strokeOpacity=".08" /></Sq>
    case 'terminal': return <Sq c1="#3d3d41" c2="#0a0a0b" dark={.3}>
      <rect x="8" y="12" width="84" height="76" rx="10" fill="#101012" stroke="#a5a5aa" strokeOpacity=".7" strokeWidth="1.4" />
      <path d="M8 22a10 10 0 0 1 10-10h64a10 10 0 0 1 10 10v1H8z" fill="#3a3a3f" />
      <path d="M22 41l14 10-14 10" stroke="#fff" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M43 64h24" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" /></Sq>
    case 'settings': return <Sq c1="#d8dbe1" c2="#8b909a" dark={.18}>
      <defs>
        <linearGradient id={id + 'm'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fafbfc" /><stop offset=".5" stopColor="#b3b8c2" /><stop offset="1" stopColor="#6f7580" /></linearGradient>
        <linearGradient id={id + 'n'} x1="1" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#e9ebef" /><stop offset="1" stopColor="#6a6f7a" /></linearGradient>
      </defs>
      <path d={gear} fill={`url(#${id}m)`} stroke="#3c404a" strokeOpacity=".5" strokeWidth=".7" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="30" fill={`url(#${id}m)`} /><circle cx="50" cy="50" r="30" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth=".8" />
      <circle cx="50" cy="50" r="14" fill={`url(#${id}n)`} stroke="#444851" strokeOpacity=".6" strokeWidth="1" /><circle cx="50" cy="50" r="8.5" fill="#868b95" stroke="#fff" strokeOpacity=".5" strokeWidth=".7" /></Sq>
    case 'photos': return <Sq c1="#ffffff" c2="#eef0f4" dark={.06}>
      {[['#f9a825', 0], ['#ffd400', 45], ['#7ed321', 90], ['#00c7a6', 135], ['#2f8ef7', 180], ['#7b5cf0', 225], ['#d14fd8', 270], ['#ff4a5e', 315]].map(([c, r]) =>
        <ellipse key={String(r)} cx="50" cy="32" rx="14" ry="20" fill={c as string} opacity=".85" style={{ mixBlendMode: 'multiply' }} transform={`rotate(${r} 50 50)`} />)}</Sq>
    case 'music': return <Sq c1="#ff6b7e" c2="#f3112f" dark={.22}>
      <path d="M0 0H100V45Q50 58 0 45Z" fill="#fff" opacity=".08" />
      <path d="M39 70V30l33-8v40" stroke="#fff" strokeWidth="5.5" fill="none" strokeLinejoin="round" />
      <path d="M39 30l33-8v11l-33 8z" fill="#fff" />
      <ellipse cx="31" cy="71" rx="10" ry="8" fill="#fff" transform="rotate(-18 31 71)" /><ellipse cx="64" cy="63" rx="10" ry="8" fill="#fff" transform="rotate(-18 64 63)" /></Sq>
    case 'launchpad': return <Sq c1="#eef0f4" c2="#a2aabb" dark={.18}>
      {[0, 1, 2].flatMap(r => [0, 1, 2].map(c => <rect key={r + '-' + c} x={19 + c * 22} y={19 + r * 22} width="18" height="18" rx="5" fill={['#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#64d2ff', '#0a84ff', '#bf5af2', '#ff375f', '#8e8e93'][r * 3 + c]} />))}</Sq>
    case 'calendar': return <Sq c1="#ffffff" c2="#f4f4f6" dark={.05}>
      <text x="50" y="25" fontSize="12.5" textAnchor="middle" fill="#ff3b30" fontWeight="600" fontFamily={F} letterSpacing=".6">{DAYS[new Date().getDay()]}</text>
      <text x="50" y="78" fontSize="52" textAnchor="middle" fill="#1d1d1f" fontWeight="400" fontFamily={F}>{new Date().getDate()}</text></Sq>
    case 'mail': return <Sq c1="#6ccbff" c2="#1769e6" dark={.2}>
      <rect x="16" y="27" width="68" height="47" rx="7" fill="#fff" />
      <path d="M17 33l33 25 33-25" stroke="#2f8cf0" strokeWidth="3.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M17 73l23-22M83 73L60 51" stroke="#9ccdf8" strokeWidth="1.6" fill="none" strokeLinecap="round" /></Sq>
    case 'messages': return <Sq c1="#70f28a" c2="#12b432" dark={.2}>
      <path d="M50 17C28 17 11 31 11 48c0 9 5 17 13 22-1 6-4 11-9 15 9-1 17-5 23-9 4 1 8 2 12 2 22 0 39-14 39-30S72 17 50 17Z" fill="#fff" /></Sq>
    case 'maps': return <Sq c1="#c7ecab" c2="#86d072" dark={.12}>
      <path d="M0 62C25 58 50 76 100 54V100H0Z" fill="#8fd0f3" />
      <path d="M-5 30L105 8" stroke="#fff" strokeWidth="9" /><path d="M32 -5L52 105" stroke="#fff" strokeWidth="6" />
      <path d="M-5 74L105 40" stroke="#ffd45c" strokeWidth="7" /><path d="M70 -5L80 105" stroke="#fff" strokeWidth="3.5" />
      <path d="M50 18c-9 0-15 6-15 14 0 10 15 26 15 26s15-16 15-26c0-8-6-14-15-14Z" fill="#ff453a" /><circle cx="50" cy="32" r="5.5" fill="#fff" /></Sq>
    case 'appstore': return <Sq c1="#55d6ff" c2="#1769f0" dark={.2}>
      <g stroke="#fff" strokeWidth="6.5" strokeLinecap="round"><path d="M50 21L31 71M50 21l19 50M24 57h52" transform="translate(0 0)" /></g>
      <path d="M31 71l-6 9M69 71l6 9" stroke="#fff" strokeWidth="6.5" strokeLinecap="round" opacity="0" /></Sq>
    case 'reminders': return <Sq c1="#ffffff" c2="#f3f3f6" dark={.05}>{[0, 1, 2].map(i => <g key={i}><circle cx="26" cy={30 + i * 21} r="6" fill="none" stroke={['#ff453a', '#ff9f0a', '#0a84ff'][i]} strokeWidth="2.2" /><path d={`M40 ${30 + i * 21}h40`} stroke="#d9d9dd" strokeWidth="2" strokeLinecap="round" />{i < 3 && i > 0 && <path d={`M14 ${19.5 + i * 21}h74`} stroke="#e6e6ea" strokeWidth=".8" />}</g>)}</Sq>
    case 'weather': return <Sq c1="#4fb0ff" c2="#1d5fd2" dark={.2}><circle cx="38" cy="38" r="15" fill="#ffd60a" /><g fill="#fff"><ellipse cx="55" cy="65" rx="22" ry="12" /><circle cx="44" cy="58" r="12" /><circle cx="63" cy="56" r="10" /></g></Sq>
    case 'trash': return <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}><defs>
      <linearGradient id={id + 'a'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b9c0cc" /><stop offset=".3" stopColor="#f4f6fa" /><stop offset=".7" stopColor="#dfe3ea" /><stop offset="1" stopColor="#aeb5c1" /></linearGradient>
      <linearGradient id={id + 'b'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#a4acba" stopOpacity=".6" /></linearGradient>
      <filter id={id + 's'} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity=".3" /></filter></defs>
      <g filter={`url(#${id}s)`}>
      <path d="M23 24h54l-4.5 66a7 7 0 0 1-7 6.500H34.500a7 7 0 0 1-7-6.500z" fill={`url(#${id}b)`} stroke="#fff" strokeOpacity=".85" strokeWidth="1.2" />
      <path d="M23 24h54l-4.500 66a7 7 0 0 1-7 6.500H34.500a7 7 0 0 1-7-6.500z" fill="none" stroke="#5f6877" strokeOpacity=".4" /></g>
      <g stroke="#7d8696" strokeOpacity=".65" strokeWidth="1.3">{[0,1,2,3,4].map(i => <path key={i} d={`M${33 + i * 8.5} 31L${34 + i * 8} 88`} />)}{[0,1,2,3,4,5].map(i => <path key={'h'+i} d={`M29 ${38 + i * 9}H71`} />)}</g>
      <rect x="17" y="13" width="66" height="11" rx="5.500" fill={`url(#${id}a)`} stroke="#6f7888" strokeOpacity=".55" /></svg>
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
