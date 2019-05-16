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
              <div class="demo-card__secondary mdc-typography">
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
                        id="Page"
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
                    >Page : {{page.value}}</div>
                  </div>
                </div>
                <div align="center" id="MusicalNotation"></div>
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <h3>Duration : {{duration.value}}</h3>

                      <div
                        id="Duration"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="1"
                        aria-valuemax="8192"
                        aria-valuenow="1"
                        data-step="1"
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
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
                  </div>
                </div>
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
      musicalNotation: new Array(80),
      switchControl: null,
      page: { value: 5 },
      duration: { value: 1 }
    };
  },
  mounted() {
    this.switchControl = new MDCSwitch(document.querySelector(".mdc-switch"));
    this.page = new MDCSlider(document.querySelector("#Page"));
    this.duration = new MDCSlider(document.querySelector("#Duration"));

    this.page.disabled = true;

    this.switchControl.listen("change", () => {
      this.page.disabled = !this.switchControl.checked;
    });
    this.page.listen("MDCSlider:change", () => {
      this.musicalNotation.length = this.page.value * 16;
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

      this.canvas.onmousemove = event => {
        this.drawScale();
        this.draxSelectionBox(event);
      };

      this.drawScale();
    }
  },
  methods: {
    drawScale() {
      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1920, 540);

      ctx.fillStyle = "rgb(200,200,200)";
      ctx.fillRect(0, 0, 90, 540);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "40px Source Code Pro";

      ctx.fillStyle = "rgb(50,50,50)";

      for (let i = 0; i < 11; i++) {
        ctx.fillText("C#2", 45, ((540 - 17.5) / 11) * i + 35);
      }

      ctx.fillStyle = "rgb(200,75,75)";

      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 11; j++) {
          if (true) {
            ctx.fillRect(103.75 + i * 113.75, 17.5 + j * 47.5, 100, 30);
          }
        }
      }

      ctx.fillStyle = "rgb(255,255,255)";
      ctx.font = "30px Source Code Pro";

      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 11; j++) {
          if (true) {
            ctx.fillText("9999", 153.75 + i * 113.75, 32.5 + j * 47.5);
          }
        }
      }
    },
    draxSelectionBox(event) {
      let ctx = this.canvas.getContext("2d");

      let x = event.offsetX;
      let y = event.offsetY;

      let offsetWidth = this.canvas.offsetWidth;
      let offsetHeight = this.canvas.offsetHeight;

      let temp = 90 * (offsetWidth / 1920);

      let i =
        (x - temp) / (offsetWidth - temp) > 0
          ? Math.floor((16 * (x - temp)) / (offsetWidth - temp))
          : -1;

      let j = Math.floor((11 * y) / offsetHeight);

      if (i >= 0) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgb(150,150,255)";
        ctx.strokeRect(103.75 + i * 113.75, 17.5 + j * 47.5, 100, 30);
      }

      //console.log(i, j);
    }
  }
};
</script>

