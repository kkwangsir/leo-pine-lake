# Leo at Pine Lake

A children's early reader book about a boy named Leo who gets lost while camping at Pine Lake.

**Format:** Early Reader / Bridge Book（文多图少的桥梁书）
**Target Age:** 7-9 (Grade 2-3)
**Style:** Western comic art, full-page illustrations with text overlay

## Structure

```
index.html     ← Cover + table of contents
page-NN.html   ← Each page
css/book.css   ← All styles (edit one file, changes everywhere)
images/        ← GPT Image 2 generated illustrations
```

## How to View

Open `index.html` in any browser. Click page links to read.

## How to Print / Make PDF

```bash
# With Chrome headless
google-chrome --headless --print-to-pdf=leo-pine-lake.pdf index.html

# Or open in Chrome → Ctrl+P → Save as PDF (A4)
```

## Edit

- **Text:** edit `page-NN.html` files
- **Style:** edit `css/book.css`
- **Images:** replace files in `images/`
- **New pages:** copy `page-NN.html`, update text and image ref
