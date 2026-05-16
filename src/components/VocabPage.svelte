<script>
  export let words;
</script>

<div class="page">
  <div class="header">
    <h2>Vocabulary List</h2>
    <div class="line"></div>
  </div>
  <table>
    <tr><th>Word</th><th>Pronunciation</th><th>Type</th><th>中文</th><th>Definition</th></tr>
    {#each words as w}
    <tr>
      <td>{w.word}</td>
      <td>{w.pron}</td>
      <td>{w.type}</td>
      <td>{w.zh}</td>
      <td>{w.en}</td>
    </tr>
    {/each}
  </table>
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
  table {
    width: 190mm; margin: 10mm auto;
    border-collapse: collapse; font-size: 10pt;
    font-family: Arial, sans-serif;
  }
  th {
    background: #55824b; color: white;
    padding: 8px 10px; text-align: left;
  }
  td {
    padding: 8px 10px;
    border-bottom: 1px solid #ddd;
    color: #322318;
  }
  tr:nth-child(even) td { background: rgba(255,255,255,0.5); }
</style>
