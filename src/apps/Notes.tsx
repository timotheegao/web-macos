import { useEffect, useState } from 'react'
type N = { id: number; text: string }
export default function Notes() {
  const [notes, setNotes] = useState<N[]>(() => { try { return JSON.parse(localStorage.getItem('notes') || '') } catch { return [{ id: 1, text: 'Welcome to Notes\nStart typing…' }] } })
  const [cur, setCur] = useState(notes[0]?.id ?? 0)
  useEffect(() => localStorage.setItem('notes', JSON.stringify(notes)), [notes])
  const n = notes.find(x => x.id === cur)
  return <div className="notes">
    <div className="nlist"><button onClick={() => { const id = Date.now(); setNotes([{ id, text: 'New Note' }, ...notes]); setCur(id) }}>＋ New Note</button>
      {notes.map(x => <div key={x.id} className={'nrow' + (x.id === cur ? ' on' : '')} onClick={() => setCur(x.id)}><b>{x.text.split('\n')[0] || 'New Note'}</b><small>{x.text.split('\n')[1] || 'No additional text'}</small></div>)}</div>
    {n ? <textarea value={n.text} onChange={e => setNotes(notes.map(x => x.id === cur ? { ...x, text: e.target.value } : x))} /> : <div className="empty">No note</div>}
  </div>
}
