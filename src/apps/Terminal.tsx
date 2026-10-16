import { useEffect, useRef, useState } from 'react'
const FILES = ['Desktop', 'Documents', 'Downloads', 'Pictures', 'README.md']
export default function Terminal() {
  const [lines, setLines] = useState<string[]>(['Last login: ' + new Date().toString().slice(0, 24) + ' on ttys000'])
  const [v, setV] = useState(''); const end = useRef<HTMLDivElement>(null); const inp = useRef<HTMLInputElement>(null)
  useEffect(() => { end.current?.scrollIntoView() }, [lines])
  const run = (c: string): string[] => {
    const [cmd, ...a] = c.trim().split(/\s+/)
    switch (cmd) {
      case '': return []
      case 'help': return ['Available: help ls pwd whoami date echo uname cat clear neofetch uptime']
      case 'ls': return [FILES.join('   ')]
      case 'pwd': return ['/Users/guest']
      case 'whoami': return ['guest']
      case 'date': return [new Date().toString()]
      case 'echo': return [a.join(' ')]
      case 'uptime': return ['up 3 days, 4:12, 1 user']
      case 'uname': return ['Darwin']
      case 'cat': return a[0] === 'README.md' ? ['web-macOS — an unofficial fan project.'] : [`cat: ${a[0] ?? ''}: No such file or directory`]
      case 'neofetch': return ['guest@web-macos', '---------------', 'OS: macOS Tahoe 26.0 (web)', 'Shell: zsh 5.9 (fake)', 'UI: Liquid Glass']
      default: return [`zsh: command not found: ${cmd}`]
    }
  }
  const submit = () => { if (v.trim() === 'clear') setLines([]); else setLines([...lines, 'guest@web-macos ~ % ' + v, ...run(v)]); setV('') }
  return <div className="term" onClick={() => inp.current?.focus()}>
    {lines.map((l, i) => <div key={i}>{l}</div>)}
    <div className="tline"><span>guest@web-macos ~ %&nbsp;</span><span className="tin"><input ref={inp} autoFocus value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} spellCheck={false} />
      <span className="cur" style={{ left: `${v.length}ch` }} /></span></div><div ref={end} /></div>
}
