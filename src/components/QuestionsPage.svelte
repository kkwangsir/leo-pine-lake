<script>
  export let questions, title;
</script>

<div class="page">
  <div class="header">
    <h2>{title}</h2>
    <div class="line"></div>
  </div>
  <p class="info">Read each question and choose the best answer.</p>

  {#each questions as q}
  <div class="q">
    <p class="qtext"><strong>{q.n}.</strong> {q.q}</p>
    <div class="opts">
      {#each q.opts as opt}
      <p>{opt}</p>
      {/each}
    </div>
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
  .info { font-size: 11pt; font-style: italic; color: #666; margin: 8mm 10mm; }
  .q { margin: 0 10mm 5mm; }
  .qtext { font-size: 12pt; font-weight: bold; color: #322318; margin-bottom: 3mm; }
  .opts { margin-left: 8px; }
  .opts p { font-size: 10.5pt; color: #322318; line-height: 1.6; }
</style>
