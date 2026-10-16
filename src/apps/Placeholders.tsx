import { FileIcon, FolderIcon, Glyph } from '../icons'
import { useOS } from '../os'
export function Photos() {
  const hues = [10, 40, 120, 200, 260, 320, 80, 170, 230, 350, 20, 290, 150, 60, 210, 330, 100, 280]
  return <div className="split"><div className="sidebar float"><div className="sb-space" data-drag /><h6>Library</h6>
    {['Library', 'Favorites', 'Recents'].map((x, i) => <div key={x} className={'side-item' + (i === 0 ? ' on' : '')}><span className="sg">{Glyph.pic(15)}</span>{x}</div>)}<h6>Albums</h6><div className="side-item"><span className="sg">{Glyph.folder(15)}</span>My Album</div></div>
    <div className="main"><div className="toolbar" data-drag><b className="tb-t">Library</b></div>
      <div className="content photos">{hues.map(h => <div key={h} style={{ background: `radial-gradient(circle at 30% 25%,hsl(${(h + 40) % 360} 90% 82%),transparent 55%),linear-gradient(135deg,hsl(${h} 75% 62%),hsl(${(h + 70) % 360} 65% 42%))` }} />)}</div></div></div>
}
export function Music() {
  return <div className="split"><div className="sidebar float"><div className="sb-space" data-drag /><h6>Library</h6>{['Listen Now', 'Browse', 'Radio'].map((x, i) => <div key={x} className={'side-item' + (i === 0 ? ' on' : '')}>{x}</div>)}</div>
    <div className="main"><div className="toolbar" data-drag><div className="tb-space grow" /><div className="nowp"><div className="art" /><div><b>Not Playing</b><small>Music</small></div></div><div className="tb-space grow" /></div>
      <div className="content music"><div className="disc" /><h3>Listen Now</h3><p>Music is a placeholder — no audio in this demo.</p><div className="mbar">{Glyph.back(22)}{Glyph.play(26)}{Glyph.fwd(22)}</div></div></div></div>
}
export function Trash() {
  const { trash, setTrash } = useOS()
  return <div className="main full"><div className="toolbar" data-drag><div className="tb-space" /><b className="tb-t">Trash</b><div className="tb-right"><button className="pbtn" onClick={() => setTrash([])} data-nodrag disabled={!trash.length}>Empty</button></div></div>
    <div className="content"><div className="grid">{trash.map((n, i) => <div className="fitem" key={i}><div className="fic">{n.includes('.') ? <FileIcon size={62} ext={n.split('.').pop()} /> : <FolderIcon size={62} />}</div><span>{n}</span></div>)}</div>
      {!trash.length && <div className="empty">Trash is empty</div>}</div></div>
}
