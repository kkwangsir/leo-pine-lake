#!/usr/bin/env node

/**
 * book-template build script
 * Reads book.json → generates single scrollable HTML → outputs to docs/
 * Layout: Cover → Vocabulary → Story pages → Questions → Answer Key
 *
 * Usage: node build.js [path-to-book-dir]
 * Default: current directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bookDir = process.argv[2] || '.';
const distDir = path.resolve(bookDir, 'docs');
const imagesDir = path.resolve(bookDir, 'images');
const distImages = path.resolve(distDir, 'images');

// ── Read book.json ──
const book = JSON.parse(fs.readFileSync(path.resolve(bookDir, 'book.json'), 'utf-8'));

// ── Helpers ──
function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/\"/g,'&quot;').replace(/'/g,'&#39;');
}

function toHtml(p) {
  return p.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
}

// ── CSS ──
const css = `
@page{size:Letter;margin:0}

*{margin:0;padding:0;box-sizing:border-box;print-color-adjust:exact;-webkit-print-color-adjust:exact}

:root{--cream:#f5ebd7;--brown:#322318;--gold:#c8a050;--green:#55824b;--pw:215.9mm;--ph:279.4mm}

/* Story page base */
.sp{width:var(--pw);height:var(--ph);position:relative;overflow:hidden;background:white;margin:12px auto}
.sp img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}

/* Bottom overlay layout */
.sp .bar{position:absolute;bottom:0;left:0;right:0;height:107mm;background:rgba(50,35,24,0.9);z-index:1}
.sp .box{position:absolute;bottom:8mm;left:8mm;right:8mm;background:rgba(245,235,215,0.95);padding:14px 18px;z-index:3}
.sp .box p{font:bold 15pt Georgia,serif;line-height:1.7;color:var(--brown)}
.sp .gline{position:absolute;bottom:68mm;left:16mm;right:16mm;height:.8mm;background:var(--gold);z-index:3}
.sp .num{position:absolute;bottom:12mm;right:12mm;color:rgba(255,255,255,0.5);font:bold 9pt Arial,sans-serif;z-index:4}

/* Left-right layout */
.lr{width:var(--pw);height:var(--ph);display:flex;background:var(--cream);margin:0 auto}
.lr .li{flex:6;overflow:hidden}
.lr .li img{width:100%;height:100%;object-fit:cover}
.lr .ti{flex:4;padding:30px 24px;display:flex;flex-direction:column;justify-content:center;position:relative}
.lr .ti p{font:bold 13pt Georgia,serif;line-height:1.8;color:var(--brown)}
.lr .num{position:absolute;top:20px;left:50%;transform:translateX(-50%);width:10mm;height:10mm;border-radius:50%;background:var(--green);color:#fff;font:bold 10pt Arial,sans-serif;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.3)}

/* Full bleed */
.fb{width:var(--pw);height:var(--ph);margin:0 auto;overflow:hidden;background:white}
.fb img{width:100%;height:100%;object-fit:cover;display:block}

/* Cover */
.cv{width:var(--pw);height:var(--ph);background:var(--cream);position:relative;margin:0 auto}
.cv .tb,.cv .bb{height:8mm;background:var(--green)}
.cv .bb{position:absolute;bottom:0;left:0;right:0}
.cv .cc{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(var(--ph) - 16mm);padding:60px 30px;text-align:center}
.cv h1{font:bold 36pt Georgia,serif;color:var(--brown);letter-spacing:2px;margin-bottom:16px}
.cv .dv{width:100px;height:2px;background:var(--gold);margin-bottom:16px}
.cv .st{font:italic 16pt Georgia,serif;color:var(--brown);margin-bottom:8px}
.cv .au{font:12pt Georgia,serif;color:#888}

/* Content section (vocab, q, answer) */
.sec{width:var(--pw);min-height:var(--ph);background:var(--cream);margin:0 auto;padding:20px 0 30px}
.sec .hd{text-align:center;padding:10px 20px}
.sec h2{color:var(--brown);font-size:20pt;margin-bottom:8px}
.sec .ln{width:80px;height:2px;background:var(--gold);margin:0 auto 16px}
.sec .info{font-size:11pt;font-style:italic;color:#666;margin:8mm 10mm}

/* Vocab table */
.sec table{width:190mm;margin:10mm auto;border-collapse:collapse;font-size:10pt;font-family:Arial,sans-serif}
.sec th{background:var(--green);color:white;padding:8px 10px;text-align:left}
.sec td{padding:8px 10px;border-bottom:1px solid #ddd;color:var(--brown)}
.sec tr:nth-child(even) td{background:rgba(255,255,255,.5)}

/* Questions */
.sec .q{margin:0 10mm 5mm}
.sec .qt{font-size:12pt;font-weight:bold;color:var(--brown);margin-bottom:3mm}
.sec .op{margin-left:8px}
.sec .op p{font-size:10.5pt;color:var(--brown);line-height:1.6}

/* Answers */
.sec .ans{margin:0 10mm 4mm;padding-bottom:8px;border-bottom:1px solid #ddd}
.sec .ans .lt{color:var(--green);font-weight:bold;font-size:12pt}
.sec .ans p{font-size:11pt;color:var(--brown);line-height:1.4}
.sec .ans .ex{font-size:10pt;font-style:italic;color:#666;margin-top:3px;margin-left:6px}

/* Print: exact Letter size, each section gets its own page */
@media print{
  body{background:white;padding:0}
  .sp,.cv,.sec,.lr,.fb{box-shadow:none;margin:0 auto;page-break-after:always}
}
`;

// ── Render functions ──

function renderCover(book) {
  return `<div class="cv">
  <div class="tb"></div>
  <div class="cc">
    <h1>${esc(book.title)}</h1>
    <div class="dv"></div>
    <p class="st">${book.subtitle}</p>
    <p class="au">${esc(book.author || '')}</p>
  </div>
  <div class="bb"></div>
</div>`;
}

function renderStoryPage(page, n) {
  const p = toHtml(page.text);
  switch (page.layout || 'bottom-overlay') {
    case 'bottom-overlay':
      return `<div class="sp">
        <img src="images/${page.img}" alt="">
        <div class="bar"></div>
        <div class="box"><p>${p}</p></div>
        <div class="gline"></div>
        <div class="num">${n}</div>
      </div>`;
    case 'left-right':
      return `<div class="lr">
        <div class="li"><img src="images/${page.img}" alt=""></div>
        <div class="ti">
          <div class="num">${n}</div>
          <p>${p}</p>
        </div>
      </div>`;
    case 'full-bleed':
      return `<div class="fb"><img src="images/${page.img}" alt=""></div>`;
    default:
      return `<div class="sp"><img src="images/${page.img}" alt=""><div class="bar"></div><div class="box"><p>${p}</p></div><div class="gline"></div><div class="num">${n}</div></div>`;
  }
}

function renderVocab(book) {
  if (!book.vocabulary) return '';
  const rows = book.vocabulary.map(w =>
    `<tr><td>${esc(w.word)}</td><td>${esc(w.pron)}</td><td>${esc(w.type)}</td><td>${esc(w.zh)}</td><td>${esc(w.en)}</td></tr>`
  ).join('\n      ');
  return `<div class="sec">
  <div class="hd"><h2>Vocabulary List</h2><div class="ln"></div></div>
  <table><tr><th>Word</th><th>Pronunciation</th><th>Type</th><th>中文</th><th>Definition</th></tr>
    ${rows}
  </table>
</div>`;
}

function renderQuestions(book) {
  if (!book.questions) return '';
  const qhtml = book.questions.map(q => {
    const opts = q.opts.map(o => `<p>${esc(o)}</p>`).join('\n        ');
    return `<div class="q"><p class="qt"><strong>${q.n}.</strong> ${esc(q.q)}</p>
      <div class="op">${opts}</div></div>`;
  }).join('\n    ');
  return `<div class="sec">
  <div class="hd"><h2>Reading Comprehension</h2><div class="ln"></div></div>
  <p class="info">Read each question and choose the best answer.</p>
  ${qhtml}
</div>`;
}

function renderAnswers(book) {
  if (!book.questions) return '';
  const ahtml = book.questions.map(a =>
    `<div class="ans"><p><span class="lt">${a.n}. ${esc(a.ans)}</span> — ${esc(a.text)}</p><p class="ex">${esc(a.exp)}</p></div>`
  ).join('\n    ');
  return `<div class="sec">
  <div class="hd"><h2>Answer Key</h2><div class="ln"></div></div>
  ${ahtml}
</div>`;
}

// ── Main build ──
console.log(`📖 Building: ${book.title}`);

fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(distImages, { recursive: true });

// Copy images
if (fs.existsSync(imagesDir)) {
  fs.cpSync(imagesDir, distImages, { recursive: true });
  console.log(`  ✓ Images copied`);
}

// Assemble full book: Cover → Vocab → Story → Questions → Answers
let body = '';

// 1. Cover
body += renderCover(book) + '\n';

// 2. Vocabulary (right after cover, before story)
body += renderVocab(book) + '\n';

// 3. Story pages
book.pages.forEach((p, i) => {
  const n = i + 1;
  body += renderStoryPage(p, n) + '\n';
});

// 4. Questions
body += renderQuestions(book) + '\n';

// 5. Answer Key
body += renderAnswers(book) + '\n';

// Wrap in HTML shell
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(book.title)}</title>
<style>
body{background:#666;font-family:Georgia,'Times New Roman',serif}
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log(`  ✓ index.html (scrollable: cover → vocab → story → questions → answers)`);
console.log(`✅ Build complete → ${distDir}/`);
