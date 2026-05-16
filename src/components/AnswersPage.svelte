<script>
  export let answers;
</script>

<div class="page">
  <div class="header">
    <h2>Answer Key</h2>
    <div class="line"></div>
  </div>

  {#each answers as a}
  <div class="ans">
    <p><span class="letter">{a.n}. {a.ans}</span> — {a.text}</p>
    <p class="exp">{a.exp}</p>
  </div>
  {/each}
</div>

<style>
  .page {
    width: 215.9mm; min-height: 279.4mm;
    background: #f5ebd7; padding: 20px 0 30px;
    margin: 0 auto;
  }
  .header { text-align: center; padding: 10px 20px; }
  h2 { color: #322318; font-size: 20pt; margin-bottom: 8px; }
  .line { width: 80px; height: 2px; background: #c8a050; margin: 0 auto; }
  .ans {
    margin: 0 10mm 4mm; padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
  }
  .letter { color: #55824b; font-weight: bold; font-size: 12pt; }
  .ans p { font-size: 11pt; color: #322318; line-height: 1.4; }
  .exp {
    font-size: 10pt; font-style: italic; color: #666;
    margin-top: 3px; margin-left: 6px;
  }
</style>
