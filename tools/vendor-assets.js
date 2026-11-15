// Tải font (Google Fonts, woff2) và Lucide về assets/vendor/ để trang không phụ thuộc mạng và không nhấp nháy khi đổi font.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', 'assets', 'vendor') + path.sep;
fs.mkdirSync(root + 'fonts', { recursive: true });

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

(async () => {
  const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();
  const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
  let out = '/* Font tự lưu (Google Fonts, giấy phép SIL OFL 1.1): Be Vietnam Pro, Chakra Petch, IBM Plex Sans, IBM Plex Mono.\n   Chỉ giữ tập ký tự latin, latin-ext và vietnamese. Sinh bởi script tải font; không sửa tay. */\n';
  let n = 0, bytes = 0;
  for (const [, subset, block] of blocks) {
    if (!['latin', 'latin-ext', 'vietnamese'].includes(subset)) continue;
    const family = block.match(/font-family:\s*'([^']+)'/)[1];
    const weight = block.match(/font-weight:\s*(\d+)/)[1];
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const range = block.match(/unicode-range:\s*([^;]+);/);
    const file = `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}-${subset}.woff2`;
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
    fs.writeFileSync(root + 'fonts/' + file, buf);
    bytes += buf.length; n++;
    out += `@font-face { font-family: '${family}'; font-style: normal; font-weight: ${weight}; font-display: swap; src: url('fonts/${file}') format('woff2');${range ? ' unicode-range: ' + range[1] + ';' : ''} }\n`;
  }
  fs.writeFileSync(root + 'fonts.css', out);
  console.log('font:', n, 'tệp,', Math.round(bytes / 1024), 'KB');

  const lucide = await (await fetch('https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js')).text();
  fs.writeFileSync(root + 'lucide.min.js', lucide);
  console.log('lucide:', Math.round(lucide.length / 1024), 'KB');

  fs.writeFileSync(root + 'LICENSES.md', `# Tài nguyên bên thứ ba (tự lưu trong repo)

| Tài nguyên | Phiên bản | Giấy phép | Nguồn |
|---|---|---|---|
| Be Vietnam Pro | Google Fonts | SIL OFL 1.1 | https://fonts.google.com/specimen/Be+Vietnam+Pro |
| Chakra Petch | Google Fonts | SIL OFL 1.1 | https://fonts.google.com/specimen/Chakra+Petch |
| IBM Plex Sans, IBM Plex Mono | Google Fonts | SIL OFL 1.1 | https://github.com/IBM/plex |
| Lucide (lucide.min.js) | 0.460.0 | ISC | https://lucide.dev |

Tự lưu để trang chạy được khi không có mạng và không bị nhấp nháy do đổi font hoặc chờ icon. Muốn cập nhật: chạy lại \`tools/vendor-assets.js\`.
`);
})().catch((e) => { console.error('LỖI', e.message); process.exit(1); });
