<script>
  export let title, subtitle, author;
</script>

<div class="cover">
  <div class="top-bar"></div>
  <div class="content">
    <h1>{title}</h1>
    <div class="divider"></div>
    <p class="subtitle">{@html subtitle}</p>
    <p class="author">{author}</p>
  </div>
  <div class="bottom-bar"></div>
</div>

<style>
  .cover {
    width: 215.9mm; height: 279.4mm;
    background: #f5ebd7;
    position: relative;
    margin: 0 auto;
  }
  .top-bar, .bottom-bar {
    height: 8mm;
    background: #55824b;
  }
  .bottom-bar { position: absolute; bottom: 0; left: 0; right: 0; }
  .content {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: calc(279.4mm - 16mm);
    padding: 60px 30px; text-align: center;
  }
  h1 {
    font: bold 36pt Georgia, serif;
    color: #322318;
    letter-spacing: 2px; margin-bottom: 16px;
  }
  .divider {
    width: 100px; height: 2px;
    background: #c8a050; margin-bottom: 16px;
  }
  .subtitle {
    font: italic 16pt Georgia, serif;
    color: #322318; margin-bottom: 8px;
  }
  .author {
    font: 12pt Georgia, serif;
    color: #888;
  }
</style>
