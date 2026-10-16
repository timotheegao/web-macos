import { useEffect, useState } from 'react'
import { Glyph } from '../icons'
type N = { id: number; text: string; t: number }
const fmt = (t: number) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
export default function Notes() {
  const [notes, setNotes] = useState<N[]>(() => { try { const v = JSON.parse(localStorage.getItem('notes2') || ''); if (v.length) return v } catch { /* */ } return [{ id: 1, t: Date.now(), text: 'Welcome to Notes\nStart typing — everything is saved locally in your browser.' }, { id: 2, t: Date.now() - 864e5, text: 'Shopping list\nMilk, eggs, coffee' }] })
  const [cur, setCur] = useState(notes[0]?.id ?? 0), [q, setQ] = useState('')
  useEffect(() => { localStorage.setItem('notes2', JSON.stringify(notes)) }, [notes])
  const n = notes.find(x => x.id === cur)
  const add = () => { const id = Date.now(); setNotes([{ id, t: id, text: '' }, ...notes]); setCur(id) }
  const del = () => { const r = notes.filter(x => x.id !== cur); setNotes(r); setCur(r[0]?.id ?? 0) }
  return <div className="split notes">
    <div className="sidebar float nlist">
      <div className="sb-space" data-drag />
      <div className="searchpill full">{Glyph.search(12)}<input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} /></div>
      <h6>Today</h6>
      {notes.filter(x => x.text.toLowerCase().includes(q.toLowerCase())).map(x => <div key={x.id} className={'nrow' + (x.id === cur ? ' on' : '')} onClick={() => setCur(x.id)}>
        <b>{x.text.split('\n')[0] || 'New Note'}</b><small><i>{fmt(x.t)}</i> {x.text.split('\n')[1] || 'No additional text'}</small></div>)}
    </div>
    <div className="main">
      <div className="toolbar" data-drag><div className="tb-space grow" data-drag /><div className="tb-right"><button className="tbtn" onClick={del} data-nodrag>{Glyph.trash()}</button><button className="tbtn" onClick={add} data-nodrag>{Glyph.compose()}</button><button className="tbtn" data-nodrag>{Glyph.check()}</button></div></div>
      {n ? <div className="editor"><div className="ndate">{new Date(n.t).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</div>
        <textarea autoFocus value={n.text} placeholder="New Note" onChange={e => setNotes(notes.map(x => x.id === cur ? { ...x, text: e.target.value } : x))} /></div> : <div className="empty">No Note Selected</div>}
    </div>
  </div>
}
