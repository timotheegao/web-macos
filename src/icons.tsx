import type { ReactNode } from 'react'
export type AppId = 'finder'|'safari'|'notes'|'calculator'|'terminal'|'settings'|'photos'|'music'|'trash'|'launchpad'

const Sq = ({ id, c1, c2, children }: { id: string; c1: string; c2: string; children?: ReactNode }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c1}/><stop offset="1" stopColor={c2}/></linearGradient>
      <linearGradient id={id+'g'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45"/><stop offset=".5" stopColor="#fff" stopOpacity="0"/></linearGradient>
    </defs>
    <rect x="3" y="3" width="94" height="94" rx="22" fill={`url(#${id})`}/>
    <rect x="3" y="3" width="94" height="94" rx="22" fill={`url(#${id}g)`}/>
    <rect x="3.5" y="3.5" width="93" height="93" rx="21.5" fill="none" stroke="#000" strokeOpacity=".15"/>
    {children}
  </svg>
)

export const Icon = ({ app }: { app: AppId }) => {
  switch (app) {
    case 'finder': return <Sq id="fi" c1="#6cc6ff" c2="#1677e8">
      <path d="M50 3h25a22 22 0 0 1 22 22v50a22 22 0 0 1-22 22H50z" fill="#f4f7fb"/>
      <path d="M50 3H25A22 22 0 0 0 3 25v50a22 22 0 0 0 22 22h25z" fill="#2f8cf5" opacity=".0"/>
      <path d="M50 3v94" stroke="#0b4fb3" strokeWidth="2" opacity=".5"/>
      <g stroke="#10263f" strokeWidth="4" strokeLinecap="round" fill="none"><path d="M33 34v10M67 34v10"/><path d="M30 64q20 16 40 0"/><path d="M50 40v18q0 4-5 4"/></g></Sq>
    case 'safari': return <Sq id="sa" c1="#58d3ff" c2="#0a6fe0">
      <circle cx="50" cy="50" r="36" fill="#fff" opacity=".95"/><circle cx="50" cy="50" r="32" fill="#1b8ff0" opacity=".15"/>
      {Array.from({length:24}).map((_,i)=><line key={i} x1="50" y1="17" x2="50" y2={i%6===0?24:20} stroke="#7c8794" strokeWidth="1.5" transform={`rotate(${i*15} 50 50)`}/>)}
      <path d="M50 50 L66 34 L58 58Z" fill="#ff3b30"/><path d="M50 50 L34 66 L42 42Z" fill="#e8ecf2"/></Sq>
    case 'notes': return <Sq id="no" c1="#fff6a8" c2="#ffd23a">
      <rect x="3" y="3" width="94" height="26" rx="22" fill="#ffe14d"/><rect x="3" y="18" width="94" height="11" fill="#ffe14d"/>
      <g stroke="#b9b27a" strokeWidth="1.5"><path d="M14 46h72M14 62h72M14 78h72"/></g></Sq>
    case 'calculator': return <Sq id="ca" c1="#4a4a4e" c2="#1c1c1e">
      <rect x="16" y="14" width="68" height="22" rx="5" fill="#2a2a2c"/><text x="80" y="32" fontSize="18" textAnchor="end" fill="#fff" fontFamily="-apple-system,sans-serif">0</text>
      {[0,1,2,3].flatMap(r=>[0,1,2,3].map(c=><rect key={r+'-'+c} x={16+c*17.5} y={42+r*13.5} width="15" height="11" rx="4" fill={c===3?'#ff9f0a':r===0?'#a5a5a5':'#636366'}/>))}</Sq>
    case 'terminal': return <Sq id="te" c1="#3a3a3c" c2="#000">
      <rect x="8" y="8" width="84" height="84" rx="16" fill="#0b0b0c" stroke="#8e8e93" strokeWidth="1.5"/>
      <path d="M22 34l14 10-14 10" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M44 58h22" stroke="#fff" strokeWidth="5" strokeLinecap="round"/></Sq>
    case 'settings': return <Sq id="se" c1="#c9ccd2" c2="#7d818a">
      <circle cx="50" cy="50" r="30" fill="#6b6f78"/>
      {Array.from({length:12}).map((_,i)=><rect key={i} x="45" y="12" width="10" height="14" rx="3" fill="#6b6f78" transform={`rotate(${i*30} 50 50)`}/>)}
      <circle cx="50" cy="50" r="24" fill="#a7abb3"/><circle cx="50" cy="50" r="12" fill="#6b6f78"/></Sq>
    case 'photos': return <Sq id="ph" c1="#ffffff" c2="#eef0f4">
      {[['#ff9500',0],['#ffcc00',45],['#34c759',90],['#00c7be',135],['#0a84ff',180],['#5e5ce6',225],['#bf5af2',270],['#ff2d55',315]].map(([c,r])=>
        <ellipse key={String(r)} cx="50" cy="29" rx="12" ry="19" fill={c as string} opacity=".8" style={{mixBlendMode:'multiply'}} transform={`rotate(${r} 50 50)`}/>)}</Sq>
    case 'music': return <Sq id="mu" c1="#ff6b81" c2="#fa233b">
      <path d="M40 66V30l28-6v36" stroke="#fff" strokeWidth="5" fill="none" strokeLinejoin="round"/><ellipse cx="34" cy="68" rx="9" ry="7" fill="#fff"/><ellipse cx="62" cy="62" rx="9" ry="7" fill="#fff"/></Sq>
    case 'trash': return <svg viewBox="0 0 100 100" width="100%" height="100%"><defs><linearGradient id="tr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9edf3" stopOpacity=".9"/><stop offset="1" stopColor="#aab2bf" stopOpacity=".9"/></linearGradient></defs>
      <path d="M22 24h56l-5 66a6 6 0 0 1-6 5H33a6 6 0 0 1-6-5z" fill="url(#tr)" stroke="#fff" strokeOpacity=".7"/>
      <rect x="18" y="14" width="64" height="9" rx="4.5" fill="#c9d0da"/>
      <g stroke="#8a93a1" strokeWidth="2.5" strokeLinecap="round"><path d="M38 34l2 50M50 34v50M62 34l-2 50"/></g></svg>
    case 'launchpad': return <Sq id="la" c1="#e9ecf2" c2="#9aa3b2">
      {[0,1,2].flatMap(r=>[0,1,2].map(c=><rect key={r+'-'+c} x={19+c*22} y={19+r*22} width="16" height="16" rx="4" fill={['#ff453a','#ff9f0a','#ffd60a','#30d158','#64d2ff','#0a84ff','#bf5af2','#ff375f','#8e8e93'][r*3+c]}/>))}</Sq>
  }
}

export const AppleLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.75 0-1.85-.83-3.05-.8-1.55.02-3 .92-3.8 2.3-1.65 2.85-.42 7.05 1.15 9.35.8 1.1 1.7 2.35 2.9 2.3 1.15-.05 1.6-.75 3-.75s1.8.75 3.05.72c1.25-.02 2.05-1.15 2.8-2.27.9-1.3 1.25-2.55 1.27-2.62-.03-.02-2.43-.93-2.45-3.7zM14.1 5.9c.65-.8 1.1-1.9.97-3-.95.04-2.1.63-2.78 1.43-.6.7-1.13 1.83-1 2.9 1.07.08 2.15-.55 2.8-1.33z"/></svg>
)

const S = (p: { children: ReactNode; size?: number }) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p.children}</svg>
export const WifiIcon = () => <S size={15}><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></S>
export const SearchIcon = () => <S size={14}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></S>
export const BatteryIcon = ({ pct = 82 }: { pct?: number }) => <svg width="26" height="14" viewBox="0 0 26 14"><rect x=".5" y=".5" width="22" height="13" rx="3.5" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width={19*pct/100} height="10" rx="2" fill="currentColor"/><path d="M24 4.5v5" stroke="currentColor" opacity=".5" strokeWidth="1.6" strokeLinecap="round"/></svg>
export const ControlIcon = () => <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="1" width="14" height="5" rx="2.5"/><circle cx="4" cy="3.5" r="1.4" fill="currentColor"/><rect x="1" y="8" width="14" height="5" rx="2.5"/><circle cx="12" cy="10.5" r="1.4" fill="currentColor"/></svg>
export const SunIcon = () => <S><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></S>
export const MoonIcon = () => <S><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></S>
export const VolumeIcon = () => <S><path d="M11 5L6 9H2v6h4l5 4zM16 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></S>
export const BluetoothIcon = () => <S><path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/></S>
export const AirdropIcon = () => <S><circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"/></S>
export const FolderIcon = ({ size = 56 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 64 64"><defs><linearGradient id="fo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd0ff"/><stop offset="1" stopColor="#2f93f0"/></linearGradient></defs><path d="M6 14a4 4 0 0 1 4-4h14l6 6h24a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#5db8f7"/><rect x="6" y="22" width="52" height="34" rx="4" fill="url(#fo)"/></svg>
export const FileIcon = ({ size = 56 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 64 64"><path d="M14 6h25l13 13v37a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="#f5f6f8" stroke="#c4c8d0"/><path d="M39 6v13h13" fill="#dfe2e8" stroke="#c4c8d0"/><g stroke="#b3b8c2" strokeWidth="2"><path d="M19 30h26M19 37h26M19 44h18"/></g></svg>
