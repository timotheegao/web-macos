import { useId } from 'react'
import type { WP } from './os'
export default function Wallpaper({ wp, dark }: { wp: WP; dark: boolean }) {
  const id = useId().replace(/:/g, '')
  return <svg className="wp-svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
    <defs>
      <linearGradient id={id + 's'} x1="0" y1="0" x2="0.15" y2="1">{wp.sky.map((c, i) => <stop key={i} offset={i / 3} stopColor={c} />)}</linearGradient>
      <filter id={id + 'b'} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="90" /></filter>
      <filter id={id + 'b2'} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
      <filter id={id + 'r'} x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="1.5" /></filter>
      <linearGradient id={id + 'r0'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={wp.ridges[0]} stopOpacity=".85" /><stop offset="1" stopColor={wp.ridges[0]} stopOpacity=".2" /></linearGradient>
      <linearGradient id={id + 'r1'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={wp.ridges[1]} stopOpacity=".92" /><stop offset="1" stopColor={wp.ridges[1]} /></linearGradient>
      <linearGradient id={id + 'r2'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={wp.ridges[2]} /><stop offset="1" stopColor={wp.ridges[2]} stopOpacity=".9" /></linearGradient>
      <radialGradient id={id + 'v'} cx=".5" cy=".4" r=".8"><stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".28" /></radialGradient>
      <linearGradient id={id + 'd'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1030" stopOpacity=".78" /><stop offset="1" stopColor="#1a0c36" stopOpacity=".7" /></linearGradient>
    </defs>
    <rect width="1600" height="1000" fill={`url(#${id}s)`} />
    <g filter={`url(#${id}b)`}>{wp.blobs.map(([c, x, y, r], i) => <ellipse key={i} cx={x * 16} cy={y * 10} rx={r * 16} ry={r * 10} fill={c} opacity=".75" />)}</g>
    <circle cx="1180" cy="430" r="120" fill={wp.sun} opacity=".5" filter={`url(#${id}b)`} />
    <g filter={`url(#${id}b2)`} opacity=".55"><path d="M-100 520C300 380 600 640 1000 470S1500 300 1750 380L1750 520C1400 450 1100 650 800 600S250 480-100 640z" fill="#fff" opacity=".32" /><path d="M-100 380C250 260 650 480 1050 330S1450 200 1750 260L1750 330C1400 290 1100 470 800 450S250 340-100 450z" fill="#fff" opacity=".22" /></g>
    <g filter={`url(#${id}r)`}>
      <path d="M0 640C180 560 300 590 470 540S760 470 930 540 1250 610 1600 500V1000H0z" fill={`url(#${id}r0)`} />
      <path d="M0 740C200 690 380 700 560 650S900 640 1100 700 1420 720 1600 650V1000H0z" fill={`url(#${id}r1)`} />
      <path d="M0 860C260 800 420 830 680 790S1060 780 1260 830 1500 850 1600 810V1000H0z" fill={`url(#${id}r2)`} />
    </g>
    <path d="M0 640C180 560 300 590 470 540S760 470 930 540 1250 610 1600 500" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="2" />
    <rect width="1600" height="1000" fill={`url(#${id}v)`} />
    {dark && <rect width="1600" height="1000" fill={`url(#${id}d)`} />}
  </svg>
}
