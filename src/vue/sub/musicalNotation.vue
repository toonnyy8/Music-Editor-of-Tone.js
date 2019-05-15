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
              </div>
              <div class="demo-card__secondary mdc-typography mdc-typography--body2">
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
                      <div class="mdc-switch">
                        <div class="mdc-switch__track"></div>
                        <div class="mdc-switch__thumb-underlay">
                          <div class="mdc-switch__thumb">
                            <input
                              type="checkbox"
                              id="basic-switch"
                              class="mdc-switch__native-control"
                              role="switch"
                            >
                          </div>
                        </div>
                      </div>
                      <label for="basic-switch">_Lock/Unlock</label>
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <div
                        id="aaa"
                        class="mdc-slider mdc-slider--discrete"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="1"
                        aria-valuemax="999"
                        aria-valuenow="5"
                        aria-label="Select Value"
                      >
                        <div class="mdc-slider__track-container">
                          <div class="mdc-slider__track"></div>
                        </div>
                        <div class="mdc-slider__thumb-container">
                          <div class="mdc-slider__pin">
                            <span class="mdc-slider__pin-value-marker"></span>
                          </div>
                          <svg class="mdc-slider__thumb" width="21" height="21">
                            <circle cx="10.5" cy="10.5" r="7.875"></circle>
                          </svg>
                          <div class="mdc-slider__focus-ring"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"
                    >Page : {{slider.value}}</div>
                  </div>
                </div>
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
import { MDCSwitch } from "@material/switch";
import { MDCSlider } from "@material/slider";

export default {
  data() {
    return {
      channel: new BroadcastChannel(window.name),
      canvas: document.createElement("canvas"),
      notationLong: 80,
      musicalNotation: new Array(80),
      switchControl: null,
      slider: { value: 5 }
    };
  },
  mounted() {
    this.switchControl = new MDCSwitch(document.querySelector(".mdc-switch"));
    this.slider = new MDCSlider(document.querySelector("#aaa"));

    this.slider.disabled = true;

    this.switchControl.listen("change", () => {
      this.slider.disabled = !this.switchControl.checked;
    });
    this.slider.listen("MDCSlider:change", () => {
      this.notationLong = this.slider.value * 16;
      this.musicalNotation.length = this.notationLong;
    });

    this.musicalNotation[0] = new Uint16Array(new ArrayBuffer(88 * 2));
    for (let i = 0; i < this.musicalNotation.length; i++) {
      this.musicalNotation[i] = new Uint16Array(new ArrayBuffer(88 * 2));
    }
    console.log(this.musicalNotation);

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
      ctx.fillRect(0, 0, 1920, 540);

      ctx.fillStyle = "rgb(200,200,200)";
      ctx.fillRect(0, 0, 95, 540);
      ctx.font = "30pt Source Code Pro";

      ctx.fillStyle = "rgb(50,50,50)";

      ctx.fillText("C#1", 10, 45);
      ctx.fillText("C2", 10, 105);
      ctx.fillText("C2", 10, 165);
      ctx.fillText("C2", 10, 225);
      ctx.fillText("C2", 10, 285);
      ctx.fillText("C2", 10, 345);
      ctx.fillText("C2", 10, 405);
      ctx.fillText("C2", 10, 465);
      ctx.fillText("C2", 10, 525);

      let lingrad = ctx.createLinearGradient(0, 0, 0, 150);
      lingrad.addColorStop(0, "#ff5555");
      lingrad.addColorStop(1, "#884b4b");
      ctx.fillStyle = lingrad;

      ctx.save();
      ctx.rotate(-Math.PI / 2);
      ctx.translate(-100, 120);
      ctx.fillRect(0, 0, 30, 150);
      ctx.restore();

      //ctx.rotate(-Math.PI / 2);
    }
  }
};
</script>

