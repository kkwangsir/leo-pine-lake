<script>
  export let img, text, pageNum;
</script>

<div class="page">
  <img src="images/{img}" alt="">
  <div class="dark-bar"></div>
  <div class="cream-box">
    <p>{@html text}</p>
  </div>
  <div class="gold-line"></div>
  <div class="page-circle">{pageNum}</div>
</div>

<style>
  .page {
    width: 215.9mm; height: 279.4mm;
    position: relative; overflow: hidden;
    background: white; margin: 0 auto;
  }
  img {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .dark-bar {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 107mm;
    background: rgba(50, 35, 24, 0.9);
    z-index: 1;
  }
  .cream-box {
    position: absolute;
    bottom: 8mm; left: 8mm; right: 8mm;
    background: rgba(245, 235, 215, 0.95);
    padding: 14px 18px;
    z-index: 3;
  }
  .cream-box :global(p) {
    font: bold 15pt Georgia, serif;
    line-height: 1.7;
    color: #322318;
  }
  .gold-line {
    position: absolute;
    bottom: 68mm; left: 16mm; right: 16mm;
    height: 0.8mm;
    background: #c8a050;
    z-index: 3;
  }
  .page-circle {
    position: absolute;
    bottom: 59mm; left: 50%;
    transform: translateX(-50%);
    width: 14mm; height: 14mm;
    border-radius: 50%;
    background: #55824b;
    color: white;
    font: bold 11pt Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }
</style>
