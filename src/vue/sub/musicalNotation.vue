<template>
  <div>
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
              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">Page : {{page.value}}</div>
            </div>
          </div>
          <div class="mdc-layout-grid">
            <div class="mdc-layout-grid__inner">
              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                <h3>BPM : {{(beatsPerMinute.value+beatsPerMinute100.value)>0?(beatsPerMinute.value+beatsPerMinute100.value):1}}</h3>
                <div
                  id="BPM"
                  class="mdc-slider"
                  tabindex="0"
                  role="slider"
                  aria-valuemin="0"
                  aria-valuemax="99"
                  aria-valuenow="60"
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
                  id="BPM100"
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
              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
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
                <button class="mdc-button" v-on:click="clearPage();drawScale()">Clear This Page</button>
              </div>
              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                <h3>Duration : {{duration.value+duration100.value>0?duration.value+duration100.value:1}}</h3>
                <div
                  id="Duration"
                  class="mdc-slider"
                  tabindex="0"
                  role="slider"
                  aria-valuemin="0"
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
</template>

<script>
import { MDCSwitch } from "@material/switch";
import { MDCSlider } from "@material/slider";

export default {
  props: ["testSynth"],
  data() {
    let musicalNotation = new Array(80);
    for (let i = 0; i < musicalNotation.length; i++) {
      musicalNotation[i] = new Uint16Array(new ArrayBuffer(120 * 2));
    }
    return {
      channel: new BroadcastChannel(window.name),
      canvas: document.createElement("canvas"),
      musicalNotation: musicalNotation,
      packLock: { checked: false },
      page: { value: 5 },
      duration: { value: 1 },
      duration100: { value: 1 },
      nowPage: { value: 1 },
      lastDrawPitch: { i: null, j: null },
      mouseDown: false,
      octave: { value: 1 },
      checkDuration: { i: null, j: null },
      beatsPerMinute: { value: 1 },
      beatsPerMinute100: { value: 0 }
    };
  },
  mounted() {
    this.channel.onmessage = this.channelOnmessage;

    this.packLock = new MDCSwitch(document.querySelector("#PackLock"));
    this.page = new MDCSlider(document.querySelector("#Page"));
    this.duration = new MDCSlider(document.querySelector("#Duration"));
    this.duration100 = new MDCSlider(document.querySelector("#Duration100"));
    this.nowPage = new MDCSlider(document.querySelector("#NowPage"));
    this.octave = new MDCSlider(document.querySelector("#Octave"));
    this.beatsPerMinute = new MDCSlider(document.querySelector("#BPM"));
    this.beatsPerMinute100 = new MDCSlider(document.querySelector("#BPM100"));

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
        this.drawScale();
      }
      this.nowPage.max = this.page.value;
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        musicalNotation: this.musicalNotation
      });
    });

    this.nowPage.listen("MDCSlider:input", () => {
      this.drawScale();
    });
    this.octave.listen("MDCSlider:input", () => {
      this.drawScale();
    });

    this.beatsPerMinute.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        beatsPerMinute:
          this.beatsPerMinute.value + this.beatsPerMinute100.value > 0
            ? this.beatsPerMinute.value + this.beatsPerMinute100.value
            : 1
      });
    });

    this.beatsPerMinute100.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        beatsPerMinute:
          this.beatsPerMinute.value + this.beatsPerMinute100.value > 0
            ? this.beatsPerMinute.value + this.beatsPerMinute100.value
            : 1
      });
    });

    if (this.canvas.getContext) {
      this.canvas.width = 1920;
      this.canvas.height = 590;
      this.canvas.style = "width:100%";
      document.querySelector("#MusicalNotation").appendChild(this.canvas);

      this.canvas.onmousedown = event => {
        if (event.button == 0) {
          this.mouseDown = true;
          this.callTestSynth(event);
          this.setPitch(event);
          this.drawScale();
          this.drawSelectionBox(event);
          this.channel.postMessage({
            instruction: "Set Plugin Data",
            musicalNotation: this.musicalNotation
          });
        } else if (event.button == 2) {
          this.setCheckDuration(event);
          this.drawScale();
          this.drawSelectionBox(event);
        }
      };

      this.canvas.onmousemove = event => {
        if (this.mouseDown) {
          this.callTestSynth(event);
          this.setPitch(event);
        }
        this.drawScale();
        this.drawSelectionBox(event);
      };

      this.canvas.onmouseup = event => {
        this.mouseDown = false;
        this.lastDrawPitch.i = null;
        this.lastDrawPitch.j = null;
        this.channel.postMessage({
          instruction: "Set Plugin Data",
          musicalNotation: this.musicalNotation
        });
        //console.log(this.musicalNotation[0]);
      };

      this.canvas.oncontextmenu = event => {
        return false;
      };

      this.canvas.addEventListener(
        "touchstart",
        event => {
          let tempEvent = {
            offsetX:
              event.touches[0].pageX -
              (this.canvas.getBoundingClientRect().left -
                this.canvas.scrollLeft),
            offsetY:
              event.touches[0].pageY -
              (this.canvas.parentElement.parentElement.parentElement.offsetTop +
                this.canvas.offsetTop)
          };
          setTimeout(() => {
            if (this.mouseDown == 1) {
              this.mouseDown = 2;

              this.callTestSynth(tempEvent);
              this.setPitch(tempEvent);
              this.drawScale();
              this.drawSelectionBox(tempEvent);
              this.channel.postMessage({
                instruction: "Set Plugin Data",
                musicalNotation: this.musicalNotation
              });
            } else {
              this.setCheckDuration(tempEvent);
              this.drawScale();
              this.drawSelectionBox(tempEvent);
            }
          }, 200);
          this.mouseDown = 1;
          event.preventDefault();
        },
        false
      );
      this.canvas.addEventListener(
        "touchmove",
        event => {
          let tempEvent = {
            offsetX:
              event.touches[0].pageX -
              (this.canvas.getBoundingClientRect().left -
                this.canvas.scrollLeft),
            offsetY:
              event.touches[0].pageY -
              (this.canvas.parentElement.parentElement.parentElement.offsetTop +
                this.canvas.offsetTop)
          };
          if (this.mouseDown == 2) {
            this.callTestSynth(tempEvent);
            this.setPitch(tempEvent);
          }
          this.drawScale();
          this.drawSelectionBox(tempEvent);
        },
        false
      );
      this.canvas.addEventListener(
        "touchend",
        event => {
          this.mouseDown = false;
          this.lastDrawPitch.i = null;
          this.lastDrawPitch.j = null;
          this.channel.postMessage({
            instruction: "Set Plugin Data",
            musicalNotation: this.musicalNotation
          });
        },
        false
      );

      this.drawScale();
    }
  },
  methods: {
    channelOnmessage(event) {
      switch (event.data.instruction) {
        case "Init Data": {
          console.log(event.data);
          this.musicalNotation = event.data.musicalNotation;
          this.beatsPerMinute.value = event.data.beatsPerMinute % 100;
          this.beatsPerMinute100.value =
            event.data.beatsPerMinute - (event.data.beatsPerMinute % 100);

          this.page.value = Math.floor(this.musicalNotation.length / 16);
          this.nowPage.max = this.page.value;

          this.drawScale();

          break;
        }
        default:
          break;
      }
    },
    initView() {
      setTimeout(() => {
        this.packLock = new MDCSwitch(document.querySelector("#PackLock"));
        this.page = new MDCSlider(document.querySelector("#Page"));
        this.duration = new MDCSlider(document.querySelector("#Duration"));
        this.duration100 = new MDCSlider(
          document.querySelector("#Duration100")
        );
        this.nowPage = new MDCSlider(document.querySelector("#NowPage"));
        this.octave = new MDCSlider(document.querySelector("#Octave"));
        this.beatsPerMinute = new MDCSlider(document.querySelector("#BPM"));
        this.beatsPerMinute100 = new MDCSlider(
          document.querySelector("#BPM100")
        );
      }, 100);
    },
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

      if (this.checkDuration.i != null && this.checkDuration.j != null) {
        if (this.musicalNotation[this.checkDuration.i][this.checkDuration.j]) {
          ctx.lineWidth = 20;
          ctx.strokeStyle = "rgb(150,255,150,0.3)";
          ctx.strokeRect(
            108.75 +
              (this.checkDuration.i - (this.nowPage.value - 1) * 16) * 113.75,
            17.5 +
              (11 - (this.checkDuration.j - this.octave.value * 12)) * 47.5,
            90 +
              (this.musicalNotation[this.checkDuration.i][
                this.checkDuration.j
              ] -
                1) *
                113.75,
            30
          );
        }
      }

      ctx.fillStyle = "rgb(200,200,200)";
      ctx.fillRect(0, 0, 95, 590);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "40px Source Code Pro";

      ctx.fillStyle = "rgb(50,50,50)";

      for (let j = 0; j < 12; j++) {
        ctx.fillText(
          `${musicalAlphabet[j]}${this.octave.value}`,
          47.5,
          ((590 - 17.5) / 12) * (11 - j) + 35
        );
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

      if (j >= 0 && j < 12) {
        ctx.fillStyle = "rgb(255,255,255,0.1)";
        ctx.fillRect(0, 17.5 + j * 47.5, 1920, 30);
        if (i >= 0 && i < 16) {
          ctx.lineWidth = 5;
          ctx.strokeStyle = "rgb(150,150,255)";
          ctx.strokeRect(103.75 + i * 113.75, 17.5 + j * 47.5, 100, 30);
        }
      }
    },
    setPitch(event) {
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
            ] =
              this.duration.value + this.duration100.value > 0
                ? this.duration.value + this.duration100.value
                : 1;
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
    setCheckDuration(event) {
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
      if (i >= 0 && i < 16 && j >= 0 && j < 12) {
        this.checkDuration.i = (this.nowPage.value - 1) * 16 + i;
        this.checkDuration.j = this.octave.value * 12 + j;
      } else {
        this.checkDuration.i = null;
        this.checkDuration.j = null;
      }
    },
    callTestSynth(event) {
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

      let x = event.offsetX;
      let y = event.offsetY;

      let offsetWidth = this.canvas.offsetWidth;
      let offsetHeight = this.canvas.offsetHeight;

      let j = 11 - Math.floor((12 * y) / offsetHeight);
      if (this.lastDrawPitch.j != j) {
        if (x > 0 && x < 95 * (offsetWidth / 1920)) {
          if (j >= 0 && j <= 11) {
            this.testSynth(
              `${musicalAlphabet[j]}${this.octave.value}`,
              this.duration.value + this.duration100.value > 0
                ? this.duration.value + this.duration100.value
                : 1,
              this.beatsPerMinute.value + this.beatsPerMinute100.value > 0
                ? this.beatsPerMinute.value + this.beatsPerMinute100.value
                : 1
            );
          }
        }
      }
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

