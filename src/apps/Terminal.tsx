import { useEffect, useRef, useState } from 'react'
const FS: Record<string, string[]> = { '~': ['Desktop', 'Documents', 'Downloads', 'Pictures', 'README.md'] }
export default function Terminal() {
  const [lines, setLines] = useState<string[]>(['Last login: ' + new Date().toString().slice(0, 24) + ' on ttys000', 'Type "help" for commands.'])
  const [v, setV] = useState(''); const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView() }, [lines])
  const run = (c: string): string[] => {
    const [cmd, ...a] = c.trim().split(/\s+/)
    switch (cmd) {
      case '': return []
      case 'help': return ['help ls pwd whoami date echo uname cat clear neofetch']
      case 'ls': return [FS['~'].join('  ')]
      case 'pwd': return ['/Users/guest']
      case 'whoami': return ['guest']
      case 'date': return [new Date().toString()]
      case 'echo': return [a.join(' ')]
      case 'uname': return ['Darwin web-macos 26.0 Tahoe']
      case 'cat': return a[0] === 'README.md' ? ['web-macOS — an unofficial fan project.'] : [`cat: ${a[0] ?? ''}: No such file or directory`]
      case 'neofetch': return ['guest@web-macos', '---------------', 'OS: macOS Tahoe (web)', 'Shell: zsh (fake)', 'UI: Liquid Glass']
      default: return [`zsh: command not found: ${cmd}`]
    }
  }
  const submit = () => { if (v.trim() === 'clear') setLines([]); else setLines([...lines, 'guest@web-macos ~ % ' + v, ...run(v)]); setV('') }
  return <div className="term" onClick={() => (document.querySelector('.term input') as HTMLInputElement)?.focus()}>
    {lines.map((l, i) => <div key={i}>{l}</div>)}
    <div className="tline">guest@web-macos ~ %&nbsp;<input autoFocus value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} spellCheck={false} /></div><div ref={end} /></div>
}
