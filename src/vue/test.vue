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
    <h3>Decay</h3>
    <div
      id="Decay"
      class="mdc-slider"
      tabindex="0"
      role="slider"
      aria-valuemin="0.01"
      aria-valuemax="2"
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
    <h3>Sustain</h3>
    <div
      id="Sustain"
      class="mdc-slider"
      tabindex="0"
      role="slider"
      aria-valuemin="0.01"
      aria-valuemax="1"
      aria-valuenow="0.5"
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
      aria-valuenow="2"
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
      return Math.cos((x * Math.PI) / (attack * 2) - Math.PI * 0.5);
    },
    decayFunc(x, decay, sustain) {
      return (x * (sustain - 1)) / decay + 1;
    },
    releaseFunc(x, sustain, release) {
      if (true) {
        return (x * -sustain) / release + sustain;
      } else if (false) {
        return Math.cos((x * Math.PI) / (release * 2)) * sustain;
      }
    }
  }
};
</script>