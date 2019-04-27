<template>
  <div>
    <div id="Envelope"></div>
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
</template>

<script>
import { MDCSlider } from "@material/slider";

export default {
  data() {
    return {
      canvas: document.createElement("canvas"),
      Attack: null,
      Decay: null,
      Sustain: null,
      Release: null
    };
  },
  mounted() {
    this.Attack = new MDCSlider(document.querySelector("#Attack"));
    this.Decay = new MDCSlider(document.querySelector("#Decay"));
    this.Sustain = new MDCSlider(document.querySelector("#Sustain"));
    this.Release = new MDCSlider(document.querySelector("#Release"));

    if (this.canvas.getContext) {
      this.canvas.width = 1044;
      this.canvas.height = 120;
      document.querySelector("#Envelope").appendChild(this.canvas);

      this.drawEnvelope();

      this.Attack.listen("MDCSlider:input", this.drawEnvelope);
      this.Decay.listen("MDCSlider:input", this.drawEnvelope);
      this.Sustain.listen("MDCSlider:input", this.drawEnvelope);
      this.Release.listen("MDCSlider:input", this.drawEnvelope);
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

      ctx.lineWidth = 1.5;
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
      if (false) {
        //linear
        return x / attack;
      } else if (false) {
        //cos
        return Math.cos((x * Math.PI) / (attack * 2) - Math.PI * 0.5);
      } else if (false) {
        //sin
        return (Math.sin((x * Math.PI) / attack - Math.PI * 0.5) + 1) / 2;
      } else if (false) {
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
      } else if (false) {
        //exponential
        return 1 - Math.E ** ((-8 * x) / attack);
      } else if (false) {
        //ripple
        let f =
          x / attack +
          (Math.sin((x * Math.PI * 14) / attack + Math.PI * 0.5) - 1) / 12;
        return f > 0 ? f : 0;
      } else if (true) {
        //bounce
        let f =
          1 -
          Math.abs(
            Math.cos((x * Math.PI * 8.5 * x * x) / (attack * attack * attack))
          ) *
            (1 - x / attack);
        return f > 0 ? f : 0;
      }
    },
    decayFunc(x, decay, sustain) {
      if (false) {
        //linear
        return (x * (sustain - 1)) / decay + 1;
      } else if (true) {
        //exponential
        return Math.exp((-x * 10) / decay) * (1 - sustain) + sustain;
      }
    },
    releaseFunc(x, sustain, release) {
      if (false) {
        //linear
        return (x * -sustain) / release + sustain;
      } else if (false) {
        //cos
        return Math.cos((x * Math.PI) / (release * 2)) * sustain;
      } else if (false) {
        //sin
        return (
          ((Math.sin((x * Math.PI) / release + Math.PI * 0.5) + 1) * sustain) /
          2
        );
      } else if (false) {
        //exponential
        return Math.exp((-x * 10) / release) * sustain;
      } else if (false) {
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
      } else if (false) {
        //ripple
        let f =
          1 -
          x / release +
          (Math.sin((x * Math.PI * 14) / release + Math.PI * 0.5) - 1) / 12;
        f *= sustain;
        return f > 0 ? f : 0;
      } else if (true) {
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
    }
  }
};
</script>