import { useRef, type ReactNode } from 'react'
export function Slider({ value, onChange, icon }: { value: number; onChange: (v: number) => void; icon: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const set = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); onChange(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))) }
  return <div className="cslider" ref={ref} onPointerDown={e => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); ref.current!.setPointerCapture(e.pointerId); set(e) }} onPointerMove={e => e.buttons === 1 && set(e)}>
    <div className="cfill" style={{ width: `calc(${value}% * .85 + 28px)` }} /><span className="cicon">{icon}</span></div>
}
export const Seg = ({ items, value, onChange }: { items: ReactNode[]; value: number; onChange: (i: number) => void }) =>
  <div className="seg" data-nodrag>{items.map((x, i) => <button key={i} className={i === value ? 'on' : ''} onClick={() => onChange(i)}>{x}</button>)}</div>
