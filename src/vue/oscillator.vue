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
                <h1 align="center">Oscillator</h1>
                <div align="center" id="Oscillator"></div>
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
import { MDCSlider } from "@material/slider";

export default {
  data() {
    let partials = [32];
    partials.length = 32;
    for (let i = 0; i < partials.length; i++) {
      partials[i] = 1;
    }
    return {
      canvas: document.createElement("canvas"),
      Partials: partials
    };
  },
  mounted() {
    if (this.canvas.getContext) {
      this.canvas.width = 1044;
      this.canvas.height = 240;
      this.canvas.style = "width:100%";
      document.querySelector("#Oscillator").appendChild(this.canvas);
      this.drawEnvelope();
    }
  },
  methods: {
    drawEnvelope() {
      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1044, 240);

      let max = 0;
      let temp = [2000];
      for (let i = 1; i <= 2000; i++) {
        temp[i - 1] = this.generatePartials(i / 2000);
        max = max > temp[i - 1] ? max : temp[i - 1];
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255,255,200)";

      ctx.beginPath();
      ctx.moveTo(22, 120 - Math.cos(-Math.PI * 0.5) * 100);

      for (let i = 1; i <= 2000; i++) {
        ctx.lineTo((1000 * i) / 2000 + 22, 120 - (temp[i - 1] / max) * 100);
      }
      ctx.stroke();
      temp = null;
    },
    generatePartials(x) {
      let f = 0;
      for (let i = 0; i < this.Partials.length; i++) {
        f += Math.sin(x * Math.PI * 2 * (i + 1)) * this.Partials[i];
      }
      return f;
    }
  }
};
</script>
