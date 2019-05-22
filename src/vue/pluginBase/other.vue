<template>
  <div class="mdc-card demo-card">
    <div
      class="mdc-card__primary-action demo-card__primary-action mdc-ripple-upgraded"
      tabindex="0"
      style="--mdc-ripple-fg-size:210px; --mdc-ripple-fg-scale:2.33984; --mdc-ripple-fg-translate-start:38.8px, 171.637px; --mdc-ripple-fg-translate-end:70px, 60.2375px;"
    >
      <div class="demo-card__primary">
        <h1 align="center">Other</h1>
      </div>
      <div class="demo-card__secondary mdc-typography mdc-typography--body2">
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
            <div align="center" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
              <h3>
                Volume :
                <input
                  id="VolumeInput"
                  type="number"
                  v-bind:value="Math.round(volume.value*10)/10"
                  style="border: 0 none; outline:none; font-family: Roboto,sans-serif; font-size: 1.17em;color: #56b983; font-weight: bold;width:100px"
                  min="-100"
                  max="100"
                  step="0.1"
                >
              </h3>
              <div
                id="Volume"
                class="mdc-slider"
                tabindex="0"
                role="slider"
                aria-valuemin="-100"
                aria-valuemax="100"
                aria-valuenow="10"
                data-step="0.1"
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
              <h3>Polyphony : {{polyphony.value}}</h3>
              <div
                id="Polyphony"
                class="mdc-slider"
                tabindex="0"
                role="slider"
                aria-valuemin="1"
                aria-valuemax="6"
                aria-valuenow="4"
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
</template>

<script>
import { MDCSlider } from "@material/slider";

export default {
  props: ["setSynth", "setSynthPolyphony"],
  data() {
    return {
      channel: new BroadcastChannel(window.name),
      volume: { value: 10 },
      polyphony: { value: 4 }
    };
  },
  mounted() {
    this.channel.onmessage = this.channelOnmessage;

    this.volume = new MDCSlider(document.querySelector("#Volume"));
    this.polyphony = new MDCSlider(document.querySelector("#Polyphony"));

    this.volume.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        volume: this.volume.value
      });
      this.setSynth({ volume: this.volume.value });
    });
    this.polyphony.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        polyphony: this.polyphony.value
      });
      this.setSynthPolyphony(this.polyphony.value);
    });

    document.querySelector("#VolumeInput").addEventListener("input", () => {
      this.volume.value =
        Math.round(document.querySelector("#VolumeInput").value * 10) / 10;
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        volume: this.volume.value
      });
    });
    document.querySelector("#VolumeInput").addEventListener("change", () => {
      document.querySelector("#VolumeInput").value =
        Math.round(document.querySelector("#VolumeInput").value * 10) / 10;
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        volume: this.volume.value
      });
    });
  },
  methods: {
    channelOnmessage(event) {
      switch (event.data.instruction) {
        case "Init Data": {
          this.volume.value = event.data.volume;
          this.polyphony.value = event.data.polyphony;

          this.setSynth({ volume: this.volume.value });
          this.setSynthPolyphony(this.polyphony.value);

          this.channel.postMessage({
            instruction: "Set Plugin Data",
            volume: this.volume.value,
            polyphony: this.polyphony.value
          });
          break;
        }
        default:
          break;
      }
    },
    initView() {
      setTimeout(() => {
        this.volume = new MDCSlider(document.querySelector("#Volume"));
        this.polyphony = new MDCSlider(document.querySelector("#Polyphony"));
      }, 100);
    }
  }
};
</script>
