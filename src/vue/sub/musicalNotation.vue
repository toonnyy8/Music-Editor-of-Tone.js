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
                      <label for="basic-switch">Lock :</label>
                      <div id="PackLock" class="mdc-switch">
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
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                      <h3>Octave : {{octave.value}}</h3>
                      <div
                        id="Octave"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0"
                        aria-valuemax="9"
                        aria-valuenow="3"
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
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                      <h3>Now Page : {{nowPage.value}}</h3>

                      <div
                        id="NowPage"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="1"
                        aria-valuemax="5"
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
                  </div>
                </div>
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div align="center" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                      <br>
                      <br>
                      <button
                        class="mdc-button"
                        v-on:click="clearPage();drawScale()"
                      >Clear This Page</button>
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <h3>Duration : {{duration.value+duration100.value}}</h3>
                      <div
                        id="Duration"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="1"
                        aria-valuemax="99"
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
                      <div
                        id="Duration100"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0"
                        aria-valuemax="9900"
                        aria-valuenow="0"
                        data-step="100"
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
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1"></div>
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
      packLock: { checked: false },
      page: { value: 5 },
      duration: { value: 1 },
      duration100: { value: 1 },
      nowPage: { value: 1 },
      lastDrawPitch: { i: null, j: null },
      mouseDown: false,
      octave: { value: 1 }
    };
  },
  mounted() {
    this.packLock = new MDCSwitch(document.querySelector("#PackLock"));
    this.page = new MDCSlider(document.querySelector("#Page"));
    this.duration = new MDCSlider(document.querySelector("#Duration"));
    this.duration100 = new MDCSlider(document.querySelector("#Duration100"));
    this.nowPage = new MDCSlider(document.querySelector("#NowPage"));
    this.octave = new MDCSlider(document.querySelector("#Octave"));

    this.page.disabled = true;

    this.packLock.listen("change", () => {
      this.page.disabled = !this.packLock.checked;
    });
    this.page.listen("MDCSlider:change", () => {
      let oldLength = this.musicalNotation.length;
      this.musicalNotation.length = this.page.value * 16;
      for (let i = oldLength; i < this.musicalNotation.length; i++) {
        this.musicalNotation[i] = new Uint16Array(new ArrayBuffer(120 * 2));
      }

      if (this.nowPage.value > this.page.value) {
        this.nowPage.value = this.page.value;
      }
      this.nowPage.max = this.page.value;
    });

    this.nowPage.listen("MDCSlider:input", () => {
      this.drawScale();
    });
    this.octave.listen("MDCSlider:input", () => {
      this.drawScale();
    });

    for (let i = 0; i < this.musicalNotation.length; i++) {
      this.musicalNotation[i] = new Uint16Array(new ArrayBuffer(120 * 2));
    }

    if (this.canvas.getContext) {
      this.canvas.width = 1920;
      this.canvas.height = 590;
      this.canvas.style = "width:100%";
      document.querySelector("#MusicalNotation").appendChild(this.canvas);

      this.canvas.onmousedown = event => {
        this.mouseDown = true;
        this.setPitch(event);
        this.drawScale();
      };

      this.canvas.onmousemove = event => {
        if (this.mouseDown) {
          this.setPitch(event);
        }
        this.drawScale();
        this.drawSelectionBox(event);
      };

      this.canvas.onmouseup = event => {
        this.mouseDown = false;
        this.lastDrawPitch.i = null;
        this.lastDrawPitch.j = null;

        //console.log(this.musicalNotation[0]);
      };

      this.canvas.addEventListener(
        "touchstart",
        event => {
          this.mouseDown = true;
          event.preventDefault();

          this.setPitch({
            offsetX:
              event.touches[0].pageX -
              (this.canvas.getBoundingClientRect().left -
                this.canvas.scrollLeft),
            offsetY:
              event.touches[0].pageY -
              (this.canvas.parentElement.parentElement.parentElement.offsetTop +
                this.canvas.offsetTop)
          });
          this.drawScale();
        },
        false
      );
      this.canvas.addEventListener(
        "touchmove",
        event => {
          if (this.mouseDown) {
            this.setPitch({
              offsetX:
                event.touches[0].pageX -
                (this.canvas.getBoundingClientRect().left -
                  this.canvas.scrollLeft),
              offsetY:
                event.touches[0].pageY -
                (this.canvas.parentElement.parentElement.parentElement
                  .offsetTop +
                  this.canvas.offsetTop)
            });
          }
          this.drawScale();
          this.drawSelectionBox({
            offsetX:
              event.touches[0].pageX -
              (this.canvas.getBoundingClientRect().left -
                this.canvas.scrollLeft),
            offsetY:
              event.touches[0].pageY -
              (this.canvas.parentElement.parentElement.parentElement.offsetTop +
                this.canvas.offsetTop)
          });
        },
        false
      );
      this.canvas.addEventListener(
        "touchend",
        event => {
          this.mouseDown = false;
          this.lastDrawPitch.i = null;
          this.lastDrawPitch.j = null;
        },
        false
      );

      this.drawScale();
    }
  },
  methods: {
    drawScale() {
      let musicalAlphabet = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
      ];
      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1920, 590);

      ctx.fillStyle = "rgb(200,200,200)";
      ctx.fillRect(0, 0, 90, 590);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "40px Source Code Pro";

      ctx.fillStyle = "rgb(50,50,50)";

      for (let j = 0; j < 12; j++) {
        ctx.fillText(
          `${musicalAlphabet[j]}${this.octave.value}`,
          45,
          ((590 - 17.5) / 12) * (11 - j) + 35
        );
      }

      ctx.fillStyle = "rgb(200,75,75)";

      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 12; j++) {
          if (
            this.musicalNotation[(this.nowPage.value - 1) * 16 + i][
              this.octave.value * 12 + j
            ]
          ) {
            ctx.fillRect(103.75 + i * 113.75, 17.5 + (11 - j) * 47.5, 100, 30);
          }
        }
      }

      ctx.fillStyle = "rgb(255,255,255)";
      ctx.font = "30px Source Code Pro";

      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 12; j++) {
          if (
            this.musicalNotation[(this.nowPage.value - 1) * 16 + i][
              this.octave.value * 12 + j
            ]
          ) {
            ctx.fillText(
              `${
                this.musicalNotation[(this.nowPage.value - 1) * 16 + i][
                  this.octave.value * 12 + j
                ]
              }`,
              153.75 + i * 113.75,
              34 + (11 - j) * 47.5
            );
          }
        }
      }
    },
    drawSelectionBox(event) {
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

      let j = Math.floor((12 * y) / offsetHeight);

      if (i >= 0 && i < 16 && j >= 0 && j < 12) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgb(150,150,255)";
        ctx.strokeRect(103.75 + i * 113.75, 17.5 + j * 47.5, 100, 30);
      }
    },
    setPitch(event) {
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

      let j = 11 - Math.floor((12 * y) / offsetHeight);
      if (this.lastDrawPitch.i != i || this.lastDrawPitch.j != j) {
        if (i >= 0 && i < 16 && j >= 0 && j < 12) {
          if (
            !this.musicalNotation[(this.nowPage.value - 1) * 16 + i][
              this.octave.value * 12 + j
            ]
          ) {
            this.musicalNotation[(this.nowPage.value - 1) * 16 + i][
              this.octave.value * 12 + j
            ] = this.duration.value + this.duration100.value;
          } else {
            this.musicalNotation[(this.nowPage.value - 1) * 16 + i][
              this.octave.value * 12 + j
            ] = 0;
          }
        }
      }
      this.lastDrawPitch.i = i;
      this.lastDrawPitch.j = j;
    },
    clearPage() {
      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 120; j++) {
          this.musicalNotation[(this.nowPage.value - 1) * 16 + i][j] = 0;
        }
      }
    }
  }
};
</script>

