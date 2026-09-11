# 张宏志 HZ · 个人作品集（最新版）

React + Vite 暗色作品集，包含 20 个案例（12 个私宅、8 个工装）。
已包含全部本轮修改：简历版式、清晰头像、效果图轮播、缩小的案例标题；优山美地保留16张，宝钞胡同11张，杭州咖啡店独立9张。已移除设计能力页和简介数据条。

## 查看网站

安装 Node.js 20.19+ 或 22.12+ 后，Windows 双击 `Open-Portfolio.cmd`。
打开 http://127.0.0.1:4180/ 。保持启动窗口运行，关闭窗口即停止预览。
其他系统在当前目录执行 `node preview.cjs`。预览使用已构建文件，不需要安装项目依赖。
不要直接双击 HTML；React 网站需要通过上述本地服务查看。

## 修改源码

`npm install` 后执行 `npm run dev`。
`src/main.jsx` 为页面，`src/style.css` 为样式，`src/projects.json` 为项目分组与图集，`public/assets` 为图片。
完成修改后运行 `npm run build`，再启动预览。Google 字体加载需要网络，离线时使用系统无衬线字体。
