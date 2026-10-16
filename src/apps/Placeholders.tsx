import { FileIcon, FolderIcon } from '../icons'
import { useOS } from '../os'
export function Photos() {
  const hues = [10, 40, 120, 200, 260, 320, 80, 170, 230, 350, 20, 290]
  return <div className="photos">{hues.map(h => <div key={h} style={{ background: `linear-gradient(135deg,hsl(${h} 80% 70%),hsl(${(h + 60) % 360} 70% 50%))` }} />)}</div>
}
export function Music() {
  return <div className="music"><div className="disc" /><h3>Not Playing</h3><p>Music placeholder — no audio in this demo.</p>
    <div className="mbar"><span>⏮</span><span>▶</span><span>⏭</span></div></div>
}
export function Trash() {
  const { trash, setTrash } = useOS()
  return <div className="finder"><div className="fmain"><div className="ftool"><b>Trash</b><button style={{ marginLeft: 'auto' }} onClick={() => setTrash([])}>Empty</button></div>
    <div className="grid">{trash.map((n, i) => <div className="fitem" key={i}>{n.includes('.') ? <FileIcon /> : <FolderIcon />}<span>{n}</span></div>)}{!trash.length && <i>Trash is empty. Select a Finder item and press Backspace to move it here.</i>}</div></div></div>
}
