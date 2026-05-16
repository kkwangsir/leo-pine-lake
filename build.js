#!/usr/bin/env node

/**
 * book-template build script
 * Reads book.json → generates static HTML → outputs to dist/
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
          .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function toHtml(p) {
  return p.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
}

function shell(title, body, extraCss = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#666;padding:12px;font-family:Georgia,'Times New Roman',serif}
${css}
${extraCss}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

// ── CSS ──
const css = `
:root{--cream:#f5ebd7;--brown:#322318;--gold:#c8a050;--green:#55824b;--pw:215.9mm;--ph:279.4mm}

/* Story page base */
.sp{width:var(--pw);height:var(--ph);position:relative;overflow:hidden;background:white;margin:0 auto}
.sp img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}

/* Bottom overlay layout */
.sp .bar{position:absolute;bottom:0;left:0;right:0;height:107mm;background:rgba(50,35,24,0.9);z-index:1}
.sp .box{position:absolute;bottom:8mm;left:8mm;right:8mm;background:rgba(245,235,215,0.95);padding:14px 18px;z-index:3}
.sp .box p{font:bold 15pt Georgia,serif;line-height:1.7;color:var(--brown)}
.sp .gline{position:absolute;bottom:68mm;left:16mm;right:16mm;height:.8mm;background:var(--gold);z-index:3}
.sp .num{position:absolute;bottom:59mm;left:50%;transform:translateX(-50%);width:14mm;height:14mm;border-radius:50%;background:var(--green);color:#fff;font:bold 11pt Arial,sans-serif;display:flex;align-items:center;justify-content:center;z-index:4;box-shadow:0 1px 4px rgba(0,0,0,.3)}

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

/* Nav bar */
.nav{width:var(--pw);display:flex;justify-content:space-between;padding:12px 20px;background:var(--brown);border-radius:0 0 4px 4px;margin:0 auto 24px}
.nav a{color:var(--cream);text-decoration:none;font:bold 12pt Arial,sans-serif}
.nav a:hover{color:var(--gold)}

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

/* Read page (scrollable) */
.read-page{width:var(--pw);height:var(--ph);position:relative;overflow:hidden;background:white;margin:16px auto}
.read-page img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}

/* TOC */
.toc{width:var(--pw);background:white;padding:30px;margin:0 auto 12px}
.toc h2{color:var(--brown);margin-bottom:16px;font-size:18pt}
.toc ul{list-style:none}
.toc li{margin-bottom:6px}
.toc a{color:var(--green);text-decoration:none;font-size:12pt;display:block;padding:4px 8px;border-radius:3px}
.toc a:hover{background:var(--cream)}
.toc .sg{font-weight:bold;color:var(--brown);margin:12px 0 6px;font-size:13pt}

@media print{body{background:white;padding:0}.sp,.cv,.sec,.lr,.fb{box-shadow:none;margin:0;page-break-after:always}.nav,.toc{display:none}}
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

function renderNav(prev, next) {
  return `<div class="nav">
  <a href="${prev}">⟨ Prev</a>
  <a href="contents.html">Cover</a>
  <a href="${next}">Next ⟩</a>
</div>`;
}

function renderToc(book) {
  const links = book.pages.map((p, i) =>
    `<li><a href="page-${String(i+1).padStart(2,'0')}.html">Page ${i+1} &mdash; ${esc(p.title)}</a></li>`
  ).join('\n    ');

  let studyLinks = '';
  if (book.vocabulary) {
    studyLinks += `<p class="sg">📝 Study</p><ul>
      <li><a href="vocab.html">Vocabulary List</a></li>
      <li><a href="questions.html">Questions 1 &ndash; 5</a></li>
      <li><a href="questions-2.html">Questions 6 &ndash; 10</a></li>
      <li><a href="answers.html">Answer Key</a></li>
    </ul>`;
  }

  return `<div class="cv">
  <div class="tb"></div>
  <div class="cc">
    <h1>${esc(book.title)}</h1>
    <div class="dv"></div>
    <p class="st">${book.subtitle}</p>
    <p class="au">${esc(book.author || '')}</p>
  </div>
  <div class="bb"></div>
</div>
<div class="toc">
  <h2>Contents</h2>
  <p class="sg">📖 Story</p>
  <ul>${links}</ul>
  ${studyLinks}
</div>
<div class="nav" style="justify-content:center">
  <a href="page-01.html">Start Reading →</a>
</div>`;
}

function renderReadPage(book) {
  let pages = '';
  book.pages.forEach((p, i) => {
    const n = i + 1;
    const imgHtml = p.layout === 'full-bleed'
      ? `<div class="fb"><img src="images/${p.img}" alt=""></div>`
      : renderStoryPage(p, n);
    pages += imgHtml + '\n';
  });
  return pages;
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

function renderQuestions(book, start, end, title) {
  if (!book.questions) return '';
  const items = book.questions.slice(start - 1, end);
  const qhtml = items.map(q => {
    const opts = q.opts.map(o => `<p>${esc(o)}</p>`).join('\n        ');
    return `<div class="q"><p class="qt"><strong>${q.n}.</strong> ${esc(q.q)}</p>
      <div class="op">${opts}</div></div>`;
  }).join('\n    ');
  return `<div class="sec">
  <div class="hd"><h2>${esc(title)}</h2><div class="ln"></div></div>
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

const totalPages = book.pages.length;

// Redirect index → page 1 (sequential reading, not clickable TOC)
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=page-01.html"><title>${esc(book.title)}</title></head>
<body><p><a href="page-01.html">Start reading →</a></p></body>
</html>`;
fs.writeFileSync(path.join(distDir, 'index.html'), redirectHtml);
console.log(`  ✓ index.html → redirects to page-01.html`);

// Contents page (cover + TOC, accessible from nav)
fs.writeFileSync(path.join(distDir, 'contents.html'), shell(book.title, renderToc(book)));
console.log(`  ✓ contents.html`);

// Individual story pages
book.pages.forEach((p, i) => {
  const n = i + 1;
  const prev = n === 1 ? 'index.html' : `page-${String(n-1).padStart(2,'0')}.html`;
  const next = n === totalPages
    ? (book.vocabulary ? 'vocab.html' : 'index.html')
    : `page-${String(n+1).padStart(2,'0')}.html`;
  const pageHtml = renderStoryPage(p, n) + '\n' + renderNav(prev, next);
  fs.writeFileSync(path.join(distDir, `page-${String(n).padStart(2,'0')}.html`), shell(`${book.title} - Page ${n}`, pageHtml));
});
console.log(`  ✓ ${totalPages} story pages`);

// Read (all pages scrollable)
let readBody = `<div style="text-align:center;margin-bottom:16px"><a href="contents.html" style="color:#f5ebd7;font-size:14pt;font-weight:bold;text-decoration:none">← Back to Contents</a></div>\n`;
readBody += renderReadPage(book);

if (book.vocabulary) {
  readBody += '\n' + renderVocab(book);
}
if (book.questions) {
  readBody += '\n' + renderQuestions(book, 1, 5, 'Reading Comprehension');
  readBody += '\n' + renderQuestions(book, 6, book.questions.length, 'Reading Comprehension (Continued)');
  readBody += '\n' + renderAnswers(book);
}

readBody += `\n<div style="text-align:center;margin:16px 0 40px"><a href="contents.html" style="color:#f5ebd7;font-size:14pt;font-weight:bold;text-decoration:none">← Back to Contents</a></div>`;
fs.writeFileSync(path.join(distDir, 'read.html'), shell(`${book.title} - Full Book`, readBody));
console.log(`  ✓ read.html`);

// Vocab page (standalone)
if (book.vocabulary) {
  const prev = `page-${String(totalPages).padStart(2,'0')}.html`;
  const next = book.questions ? 'questions.html' : 'index.html';
  fs.writeFileSync(path.join(distDir, 'vocab.html'), shell(`${book.title} - Vocabulary`, renderVocab(book) + '\n' + renderNav(prev, next)));
  console.log(`  ✓ vocab.html`);
}

// Questions pages (standalone)
if (book.questions) {
  const qHalf = Math.ceil(book.questions.length / 2);
  const q1 = renderQuestions(book, 1, qHalf, 'Reading Comprehension');
  const q2 = renderQuestions(book, qHalf + 1, book.questions.length, 'Reading Comprehension (Continued)');
  fs.writeFileSync(path.join(distDir, 'questions.html'), shell(`${book.title} - Questions 1-${qHalf}`, q1 + '\n' + renderNav('vocab.html', 'questions-2.html')));
  fs.writeFileSync(path.join(distDir, 'questions-2.html'), shell(`${book.title} - Questions ${qHalf+1}-${book.questions.length}`, q2 + '\n' + renderNav('questions.html', 'answers.html')));
  fs.writeFileSync(path.join(distDir, 'answers.html'), shell(`${book.title} - Answer Key`, renderAnswers(book) + '\n' + renderNav('questions-2.html', 'contents.html')));
  console.log(`  ✓ questions + answers`);
}

console.log(`✅ Build complete → ${distDir}/`);
