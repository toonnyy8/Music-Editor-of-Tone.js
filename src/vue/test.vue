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
                <br>
                <div align="center" id="Envelope"></div>
              </div>
              <div class="demo-card__secondary mdc-typography mdc-typography--body2">
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
                      <br>
                      <div class="mdc-select mdc-select--outlined" id="AttackCurve">
                        <i class="mdc-select__dropdown-icon"></i>
                        <select class="mdc-select__native-control" v-model="AttackCurve">
                          <option>linear</option>
                          <option>exponential</option>
                          <option>bounce</option>
                          <option>ripple</option>
                          <option>step</option>
                          <option>cosine</option>
                          <option>sine</option>
                        </select>
                        <div
                          class="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched"
                        >
                          <div class="mdc-notched-outline__leading"></div>
                          <div class="mdc-notched-outline__notch" style="width: 32.75px;">
                            <label
                              for="outlined"
                              class="mdc-floating-label mdc-floating-label--float-above"
                              style
                            >Curve</label>
                          </div>
                          <div class="mdc-notched-outline__trailing"></div>
                        </div>
                      </div>
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <h3>Attack</h3>
                      <div
                        id="Attack"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0.01"
                        aria-valuemax="2"
                        aria-valuenow="0.01"
                        aria-label="Select Value"
                      >
                        <div class="mdc-slider__track-container">
                          <div class="mdc-slider__track"></div>
                        </div>
                        <div class="mdc-slider__thumb-container">
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
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
                      <br>
                      <div class="mdc-select mdc-select--outlined" id="DecayCurve">
                        <i class="mdc-select__dropdown-icon"></i>
                        <select class="mdc-select__native-control" v-model="DecayCurve">
                          <option>linear</option>
                          <option>exponential</option>
                        </select>
                        <div
                          class="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched"
                        >
                          <div class="mdc-notched-outline__leading"></div>
                          <div class="mdc-notched-outline__notch" style="width: 32.75px;">
                            <label
                              for="outlined"
                              class="mdc-floating-label mdc-floating-label--float-above"
                              style
                            >Curve</label>
                          </div>
                          <div class="mdc-notched-outline__trailing"></div>
                        </div>
                      </div>
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <h3>Decay</h3>
                      <div
                        id="Decay"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0.01"
                        aria-valuemax="2"
                        aria-valuenow="0.01"
                        aria-label="Select Value"
                      >
                        <div class="mdc-slider__track-container">
                          <div class="mdc-slider__track"></div>
                        </div>
                        <div class="mdc-slider__thumb-container">
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
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <h3>Sustain</h3>
                      <div
                        id="Sustain"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0.01"
                        aria-valuemax="1"
                        aria-valuenow="1"
                        aria-label="Select Value"
                      >
                        <div class="mdc-slider__track-container">
                          <div class="mdc-slider__track"></div>
                        </div>
                        <div class="mdc-slider__thumb-container">
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
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner" id="ReleaseCurve">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
                      <br>
                      <div class="mdc-select mdc-select--outlined">
                        <i class="mdc-select__dropdown-icon"></i>
                        <select class="mdc-select__native-control" v-model="ReleaseCurve">
                          <option>linear</option>
                          <option>exponential</option>
                          <option>bounce</option>
                          <option>ripple</option>
                          <option>step</option>
                          <option>cosine</option>
                          <option>sine</option>
                        </select>
                        <div
                          class="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched"
                        >
                          <div class="mdc-notched-outline__leading"></div>
                          <div class="mdc-notched-outline__notch" style="width: 32.75px;">
                            <label
                              for="outlined"
                              class="mdc-floating-label mdc-floating-label--float-above"
                              style
                            >Curve</label>
                          </div>
                          <div class="mdc-notched-outline__trailing"></div>
                        </div>
                      </div>
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <h3>Release</h3>
                      <div
                        id="Release"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0.01"
                        aria-valuemax="4"
                        aria-valuenow="4"
                        aria-label="Select Value"
                      >
                        <div class="mdc-slider__track-container">
                          <div class="mdc-slider__track"></div>
                        </div>
                        <div class="mdc-slider__thumb-container">
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
import { MDCSlider } from "@material/slider";
import { MDCSelect } from "@material/select";

export default {
  data() {
    return {
      canvas: document.createElement("canvas"),
      Attack: null,
      AttackCurve: "linear",
      Decay: null,
      DecayCurve: "linear",
      Sustain: null,
      Release: null,
      ReleaseCurve: "linear"
    };
  },
  mounted() {
    this.Attack = new MDCSlider(document.querySelector("#Attack"));
    this.Decay = new MDCSlider(document.querySelector("#Decay"));
    this.Sustain = new MDCSlider(document.querySelector("#Sustain"));
    this.Release = new MDCSlider(document.querySelector("#Release"));

    const select = new MDCSelect(document.querySelector(".mdc-select"));

    if (this.canvas.getContext) {
      this.canvas.width = 1044;
      this.canvas.height = 120;
      this.canvas.style = "width:100%";
      document.querySelector("#Envelope").appendChild(this.canvas);

      this.drawEnvelope();

      this.Attack.listen("MDCSlider:input", this.drawEnvelope);
      this.Decay.listen("MDCSlider:input", this.drawEnvelope);
      this.Sustain.listen("MDCSlider:input", this.drawEnvelope);
      this.Release.listen("MDCSlider:input", this.drawEnvelope);

      new MDCSelect(document.querySelector("#AttackCurve")).listen(
        "MDCSelect:change",
        this.drawEnvelope
      );
      new MDCSelect(document.querySelector("#DecayCurve")).listen(
        "MDCSelect:change",
        this.drawEnvelope
      );
      new MDCSelect(document.querySelector("#ReleaseCurve")).listen(
        "MDCSelect:change",
        this.drawEnvelope
      );
    } else {
      // canvas-unsupported code here
    }
  },
  updated() {
    console.log("hi");
  },
  methods: {
    drawEnvelope() {
      let attack =
        this.Attack.value /
        (this.Attack.value + this.Decay.value + this.Release.value);
      let decay =
        this.Decay.value /
        (this.Attack.value + this.Decay.value + this.Release.value);
      let sustain = this.Sustain.value;
      let release =
        this.Release.value /
        (this.Attack.value + this.Decay.value + this.Release.value);

      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1044, 120);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255,255,200)";
      ctx.beginPath();
      ctx.moveTo(22, 110 - Math.cos(-Math.PI * 0.5) * 100);

      for (let i = 1; i <= 2000; i++) {
        if (i / 2000 <= attack) {
          ctx.lineTo(
            (1000 * i) / 2000 + 22,
            110 - this.attackFunc(i / 2000, attack) * 100
          );
        } else if (i / 2000 <= attack + decay) {
          ctx.lineTo(
            (1000 * i) / 2000 + 22,
            110 - this.decayFunc(i / 2000 - attack, decay, sustain) * 100
          );
        } else if (i / 2000 <= attack + decay + release) {
          ctx.lineTo(
            (1000 * i) / 2000 + 22,
            110 -
              this.releaseFunc(i / 2000 - (attack + decay), sustain, release) *
                100
          );
        }
      }
      ctx.stroke();
    },
    attackFunc(x, attack) {
      switch (this.AttackCurve) {
        case "linear": {
          //linear
          return x / attack;
        }
        case "exponential": {
          //exponential
          return 1 - Math.E ** ((-8 * x) / attack);
        }
        case "bounce": {
          //bounce
          let f =
            1 -
            Math.abs(
              Math.cos((x * Math.PI * 8.5 * x * x) / (attack * attack * attack))
            ) *
              (1 - x / attack);
          return f > 0 ? f : 0;
        }
        case "ripple": {
          //ripple
          let f =
            x / attack +
            (Math.sin((x * Math.PI * 14) / attack + Math.PI * 0.5) - 1) / 12;
          return f > 0 ? f : 0;
        }
        case "step": {
          //step
          if (x <= attack / 5) {
            if (x <= attack / 50) {
              return (x / (attack / 50)) * 0.2;
            } else {
              return 0.2;
            }
          } else if (x <= (attack * 2) / 5) {
            if (x <= (attack * 11) / 50) {
              return ((x - attack / 5) / (attack / 50)) * 0.2 + 0.2;
            } else {
              return 0.4;
            }
          } else if (x <= (attack * 3) / 5) {
            if (x <= (attack * 21) / 50) {
              return ((x - (attack * 2) / 5) / (attack / 50)) * 0.2 + 0.4;
            } else {
              return 0.6;
            }
          } else if (x <= (attack * 4) / 5) {
            if (x <= (attack * 31) / 50) {
              return ((x - (attack * 3) / 5) / (attack / 50)) * 0.2 + 0.6;
            } else {
              return 0.8;
            }
          } else if (x <= (attack * 5) / 5) {
            if (x <= (attack * 41) / 50) {
              return ((x - (attack * 4) / 5) / (attack / 50)) * 0.2 + 0.8;
            } else {
              return 1;
            }
          }
        }
        case "cosine": {
          //cosine
          return Math.cos((x * Math.PI) / (attack * 2) - Math.PI * 0.5);
        }
        case "sine": {
          //sine
          return (Math.sin((x * Math.PI) / attack - Math.PI * 0.5) + 1) / 2;
        }
        default:
          break;
      }
    },
    decayFunc(x, decay, sustain) {
      switch (this.DecayCurve) {
        case "linear": {
          //linear
          return (x * (sustain - 1)) / decay + 1;
        }
        case "exponential": {
          //exponential
          return Math.exp((-x * 10) / decay) * (1 - sustain) + sustain;
        }
        default:
          break;
      }
    },
    releaseFunc(x, sustain, release) {
      switch (this.ReleaseCurve) {
        case "linear": {
          //linear
          return (x * -sustain) / release + sustain;
        }
        case "exponential": {
          //exponential
          return Math.exp((-x * 10) / release) * sustain;
        }
        case "bounce": {
          //bounce
          let f =
            Math.abs(
              Math.cos(
                (x * Math.PI * 8.5 * x * x) / (release * release * release)
              )
            ) *
            (1 - x / release);
          f *= sustain;
          return f > 0 ? f : 0;
        }
        case "ripple": {
          //ripple
          let f =
            1 -
            x / release +
            (Math.sin((x * Math.PI * 14) / release + Math.PI * 0.5) - 1) / 12;
          f *= sustain;
          return f > 0 ? f : 0;
        }
        case "step": {
          //step
          let f;
          if (x <= release / 5) {
            if (x <= release / 50) {
              f = 1 - (x / (release / 50)) * 0.2;
            } else {
              f = 0.8;
            }
          } else if (x <= (release * 2) / 5) {
            if (x <= (release * 11) / 50) {
              f = 1 - (((x - release / 5) / (release / 50)) * 0.2 + 0.2);
            } else {
              f = 0.6;
            }
          } else if (x <= (release * 3) / 5) {
            if (x <= (release * 21) / 50) {
              f = 1 - (((x - (release * 2) / 5) / (release / 50)) * 0.2 + 0.4);
            } else {
              f = 0.4;
            }
          } else if (x <= (release * 4) / 5) {
            if (x <= (release * 31) / 50) {
              f = 1 - (((x - (release * 3) / 5) / (release / 50)) * 0.2 + 0.6);
            } else {
              f = 0.2;
            }
          } else if (x <= (release * 5) / 5) {
            if (x <= (release * 41) / 50) {
              f = 1 - (((x - (release * 4) / 5) / (release / 50)) * 0.2 + 0.8);
            } else {
              f = 0;
            }
          }
          return f * sustain;
        }
        case "cosine": {
          //cos
          return Math.cos((x * Math.PI) / (release * 2)) * sustain;
        }
        case "sine": {
          //sin
          return (
            ((Math.sin((x * Math.PI) / release + Math.PI * 0.5) + 1) *
              sustain) /
            2
          );
        }
        default:
          break;
      }
    }
  }
};
</script>