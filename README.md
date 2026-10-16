# web-macOS (Tahoe) · 网页版 macOS

> ⚠️ **Unofficial fan project. Not affiliated with, endorsed by, or sponsored by Apple Inc.** All icons are hand-drawn inline SVG; no Apple assets are used. "macOS", "Tahoe", "Finder", "Safari" etc. are trademarks of Apple Inc.
>
> ⚠️ **非官方粉丝项目，与 Apple Inc. 无任何关联。** 所有图标均为手绘内联 SVG，未使用任何 Apple 资源。

## English

A macOS 26 "Tahoe"-style desktop that runs entirely in the browser (Vite + React + TypeScript, no backend).

**Features**
- Liquid-Glass translucent menu bar & Dock (backdrop blur), Apple menu, per-app menus, clock, battery / Wi-Fi / Control Center icons
- Dock with magnification on hover, bounce-on-open, running indicators
- Draggable, resizable, focus-stacked windows; traffic-light close / minimize (genie-like shrink to Dock) / zoom
- Desktop with gradient wallpapers and right-click menu
- Spotlight (`Ctrl/⌘ + Space`, app search + inline calculator), Launchpad, Control Center, notification toasts
- Light / dark mode (Control Center, Settings, View menu)
- Apps: Finder (sidebar + fake file tree), Safari (iframe browser + start page), Notes (saved in localStorage), Calculator, Terminal (fake shell), System Settings (wallpaper, appearance), Photos & Music (placeholders), Trash

**Run**
```bash
npm install
npm run dev      # development
npm run build    # production build -> dist/
npm run preview
```

**Deploy:** push to `main`; `.github/workflows/deploy.yml` builds and publishes to GitHub Pages (enable Settings → Pages → Source: GitHub Actions).

**Limitations:** Safari can't load sites that forbid framing; Photos/Music are placeholders; Terminal is a tiny fake shell.

## 中文

纯前端（Vite + React + TypeScript，无后端）实现的 macOS 26 Tahoe 风格网页桌面。

**功能**
- 液态玻璃（毛玻璃）半透明菜单栏与 Dock；苹果菜单、各应用菜单、时钟、电池 / Wi-Fi / 控制中心图标
- Dock 悬停放大、打开应用弹跳、运行指示点
- 可拖动、可缩放、可层叠聚焦的窗口；红黄绿按钮（关闭 / 最小化到 Dock 动画 / 缩放）
- 渐变壁纸桌面与右键菜单
- 聚焦搜索（`Ctrl/⌘ + 空格`，含简易计算）、启动台、控制中心、通知弹窗
- 浅色 / 深色模式切换
- 应用：访达（侧边栏 + 模拟文件树）、Safari（iframe 地址栏 + 起始页）、备忘录（localStorage 保存）、计算器、终端（模拟 shell）、系统设置（壁纸、外观）、照片与音乐（占位）、废纸篓

**运行**
```bash
npm install
npm run dev
npm run build
```

**部署：** 推送到 `main` 后由 GitHub Actions 自动构建并发布到 GitHub Pages（需在仓库 Settings → Pages 中选择 GitHub Actions）。

## License
MIT — see [LICENSE](LICENSE).
