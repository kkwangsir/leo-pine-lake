<script>
  export let img, text, pageNum;
</script>

<div class="page">
  <div class="img-side">
    <img src="images/{img}" alt="">
  </div>
  <div class="text-side">
    <div class="page-circle">{pageNum}</div>
    <p>{@html text}</p>
  </div>
</div>

<style>
  .page {
    width: 215.9mm; height: 279.4mm;
    display: flex;
    background: #f5ebd7;
    margin: 0 auto;
    overflow: hidden;
  }
  .img-side {
    flex: 6;
    overflow: hidden;
  }
  .img-side img {
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .text-side {
    flex: 4;
    padding: 30px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .text-side :global(p) {
    font: bold 13pt Georgia, serif;
    line-height: 1.8;
    color: #322318;
  }
  .page-circle {
    position: absolute;
    top: 20px; left: 50%;
    transform: translateX(-50%);
    width: 10mm; height: 10mm;
    border-radius: 50%;
    background: #55824b;
    color: white;
    font: bold 10pt Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }
</style>
