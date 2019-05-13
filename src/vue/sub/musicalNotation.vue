<template>
  <div>
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
          <div class="mdc-card demo-card">
            <div
              class="mdc-card__primary-action demo-card__primary-action mdc-ripple-upgraded"
              tabindex="0"
              style="--mdc-ripple-fg-size:210px; --mdc-ripple-fg-scale:2.33984; --mdc-ripple-fg-translate-start:38.8px, 171.637px; --mdc-ripple-fg-translate-end:70px, 60.2375px;"
            >
              <div class="demo-card__primary">
                <h1 align="center">Musical Notation</h1>
                <div align="center" id="MusicalNotation"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channel: new BroadcastChannel(window.name),
      canvas: document.createElement("canvas"),
      scale: {}
    };
  },
  mounted() {
    if (this.canvas.getContext) {
      this.canvas.width = 1920;
      this.canvas.height = 540;
      this.canvas.style = "width:100%";
      document.querySelector("#MusicalNotation").appendChild(this.canvas);

      this.drawScale();
    }
  },
  methods: {
    drawScale() {
      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1920, 1080);

      ctx.fillStyle = "rgb(255,255,255)";
      ctx.font = "40pt Source Code Pro";

      ctx.fillText("C1", 10, 50);
      ctx.fillText("C2", 10, 110);
    }
  }
};
</script>

