<script>
  export let img;
</script>

<div class="page">
  <img src="images/{img}" alt="">
</div>

<style>
  .page {
    width: 215.9mm; height: 279.4mm;
    margin: 0 auto;
    overflow: hidden;
    background: white;
  }
  img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
