# web-macOS (Tahoe) · 网页版 macOS

> ⚠️ **Unofficial fan project. Not affiliated with, endorsed by, or sponsored by Apple Inc.** App icons are GPL-3.0 SVGs from vinceliuice's MacTahoe/WhiteSur icon themes (Weather is hand-drawn); no Apple assets are used. "macOS", "Tahoe", "Finder", "Safari" etc. are trademarks of Apple Inc.
>
> ⚠️ **非官方粉丝项目，与 Apple Inc. 无任何关联。** 应用图标来自 vinceliuice 的 MacTahoe / WhiteSur 图标主题（GPL-3.0；天气为手绘），未使用任何 Apple 资源。

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

## Credits and License

- This project is licensed under **GPL-3.0** (see `LICENSE`).
- `public/icons-gpl/` contains SVG icons from [MacTahoe-icon-theme](https://github.com/vinceliuice/MacTahoe-icon-theme) and [WhiteSur-icon-theme](https://github.com/vinceliuice/WhiteSur-icon-theme) by Vince Liuice, **GPL-3.0** (see `public/icons-gpl/COPYING` and `README_ICONS.md`).
- Unofficial, non-commercial fan project; not affiliated with, endorsed by, or sponsored by Apple Inc. Apple, macOS, Finder, Safari etc. are trademarks of Apple Inc.

## 致谢与许可

- 本项目采用 **GPL-3.0** 许可证（见 `LICENSE`）。
- `public/icons-gpl/` 目录中的 SVG 图标来自 vinceliuice 的 [MacTahoe-icon-theme](https://github.com/vinceliuice/MacTahoe-icon-theme) 与 [WhiteSur-icon-theme](https://github.com/vinceliuice/WhiteSur-icon-theme)，许可证为 **GPL-3.0**（见 `public/icons-gpl/COPYING` 与 `README_ICONS.md`）。
- 非官方、非商业的粉丝项目，与 Apple Inc. 无关联，未获其认可或赞助。Apple、macOS、Finder、Safari 等为 Apple Inc. 的商标。
