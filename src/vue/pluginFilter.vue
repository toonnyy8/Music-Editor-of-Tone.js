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
                <h1 align="center">Filter</h1>
                <div id="Filter"></div>
              </div>
              <div class="demo-card__secondary mdc-typography mdc-typography--body2">
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div align="center" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <div class="mdc-select mdc-select--outlined" id="Type">
                        <i class="mdc-select__dropdown-icon"></i>
                        <select class="mdc-select__native-control">
                          <option value="lowpass">lowpass</option>
                          <option value="highpass">highpass</option>
                          <option value="bandpass">bandpass</option>
                          <option value="lowshelf">lowshelf</option>
                          <option value="highshelf">highshelf</option>
                          <option value="peaking">peaking</option>
                          <option value="notch">notch</option>
                          <option value="allpass">allpass</option>
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
                            >Type</label>
                          </div>
                          <div class="mdc-notched-outline__trailing"></div>
                        </div>
                      </div>

                      <h3>
                        Frequency :
                        <input
                          id="FrequencyInput"
                          type="number"
                          v-bind:value="frequency.value"
                          style="border: 0 none; outline:none; font-family: Roboto,sans-serif; font-size: 1.17em;color: #56b983; font-weight: bold;width:100px"
                          min="10"
                          max="22050"
                          step="1"
                        >
                      </h3>
                      <div
                        id="Frequency"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="10"
                        aria-valuemax="22050"
                        aria-valuenow="440"
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

                      <h3>Rolloff : {{(2**rolloff.value)*(-12)}}</h3>
                      <div
                        id="Rolloff"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0"
                        aria-valuemax="3"
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

                      <h3>
                        Q :
                        <input
                          id="QInput"
                          type="number"
                          v-bind:value="Math.round(Q.value*10)/10"
                          style="border: 0 none; outline:none; font-family: Roboto,sans-serif; font-size: 1.17em;color: #56b983; font-weight: bold;width:100px"
                          min="0"
                          max="10"
                          step="0.1"
                        >
                      </h3>
                      <div
                        id="Q"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0"
                        aria-valuemax="10"
                        aria-valuenow="6"
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

                      <h3>
                        Gain :
                        <input
                          id="GainInput"
                          type="number"
                          v-bind:value="Math.round(gain.value*10)/10"
                          style="border: 0 none; outline:none; font-family: Roboto,sans-serif; font-size: 1.17em;color: #56b983; font-weight: bold;width:100px"
                          min="-20"
                          max="3"
                          step="0.1"
                        >
                      </h3>
                      <div
                        id="Gain"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="-20"
                        aria-valuemax="3"
                        aria-valuenow="0"
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
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
    </div>
  </div>
</template>
<script defer>
import * as Tone from "tone";
import { MDCSelect } from "@material/select";
import { MDCSlider } from "@material/slider";

export default {
  data() {
    return {
      channel: new BroadcastChannel(window.name),
      canvas: document.createElement("canvas"),
      filter: new Tone.Filter({
        type: "lowpass",
        frequency: 440,
        rolloff: -24,
        Q: 6,
        gain: 0
      }),
      type: { value: "lowpass" },
      frequency: { value: 60 },
      rolloff: { value: 0 },
      Q: { value: 6 },
      gain: { value: 0 }
    };
  },
  mounted() {
    if (this.canvas.getContext) {
      this.canvas.width = 1044;
      this.canvas.height = 260;
      this.canvas.style = "width:100%";
      document.querySelector("#Filter").appendChild(this.canvas);

      this.drawFilter();
    }
    this.type = new MDCSelect(document.querySelector("#Type"));
    this.frequency = new MDCSlider(document.querySelector("#Frequency"));
    this.rolloff = new MDCSlider(document.querySelector("#Rolloff"));
    this.Q = new MDCSlider(document.querySelector("#Q"));
    this.gain = new MDCSlider(document.querySelector("#Gain"));

    setTimeout(() => {
      this.frequency = new MDCSlider(document.querySelector("#Frequency"));
      this.rolloff = new MDCSlider(document.querySelector("#Rolloff"));
      this.Q = new MDCSlider(document.querySelector("#Q"));
      this.gain = new MDCSlider(document.querySelector("#Gain"));
    }, 100);

    document.querySelector("#FrequencyInput").addEventListener("input", () => {
      this.frequency.value = document.querySelector("#FrequencyInput").value;

      this.channel.postMessage({
        instruction: "Set Plugin Data",
        frequency: this.frequency.value
      });
      this.setFilter();
      this.drawFilter();
    });
    document.querySelector("#FrequencyInput").addEventListener("change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        frequency: this.frequency.value
      });
      this.setFilter();
      this.drawFilter();
    });

    document.querySelector("#QInput").addEventListener("input", () => {
      this.Q.value =
        Math.round(document.querySelector("#QInput").value * 10) / 10;

      this.channel.postMessage({
        instruction: "Set Plugin Data",
        Q: this.Q.value
      });
      this.setFilter();
      this.drawFilter();
    });
    document.querySelector("#QInput").addEventListener("change", () => {
      document.querySelector("#QInput").value =
        Math.round(document.querySelector("#QInput").value * 10) / 10;

      this.channel.postMessage({
        instruction: "Set Plugin Data",
        Q: this.Q.value
      });
      this.setFilter();
      this.drawFilter();
    });

    document.querySelector("#GainInput").addEventListener("input", () => {
      this.gain.value =
        Math.round(document.querySelector("#GainInput").value * 10) / 10;

      this.channel.postMessage({
        instruction: "Set Plugin Data",
        gain: this.gain.value
      });
      this.setFilter();
      this.drawFilter();
    });
    document.querySelector("#GainInput").addEventListener("change", () => {
      document.querySelector("#GainInput").value =
        Math.round(document.querySelector("#GainInput").value * 10) / 10;

      this.channel.postMessage({
        instruction: "Set Plugin Data",
        gain: this.gain.value
      });
      this.setFilter();
      this.drawFilter();
    });

    this.type.listen("MDCSelect:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        type: this.type.value
      });
      this.setFilter();
      this.drawFilter();
    });
    this.frequency.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        frequency: this.frequency.value
      });
    });
    this.rolloff.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        rolloff: 2 ** this.rolloff.value * -12
      });
    });
    this.Q.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        Q: this.Q.value
      });
    });
    this.gain.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        gain: this.gain.value
      });
    });

    this.frequency.listen("MDCSlider:input", () => {
      this.setFilter();

      this.drawFilter();
    });
    this.rolloff.listen("MDCSlider:input", () => {
      this.setFilter();

      this.drawFilter();
    });
    this.Q.listen("MDCSlider:input", () => {
      this.setFilter();

      this.drawFilter();
    });
    this.gain.listen("MDCSlider:input", () => {
      this.setFilter();

      this.drawFilter();
    });

    let globalChannel = new BroadcastChannel("globalChannel");
    window.document.title = window.name;

    window.onload = e => {
      globalChannel.postMessage({
        instruction: "Sub Window Creat",
        title: window.name
      });
    };

    this.channel.onmessage = this.channelOnmessage;
    /*window.onbeforeunload = function (e) {
        return "leave"
    }*/

    window.onunload = e => {
      this.channel.postMessage({
        instruction: "Sub Window Close",
        title: window.name
      });
      //window.close()
    };
  },
  methods: {
    channelOnmessage(event) {
      switch (event.data.instruction) {
        case "Close Window": {
          window.onunload = null;
          window.close();
          break;
        }
        case "Rename Window": {
          window.name = event.data.title;
          window.document.title = event.data.title;
          this.channel.close();
          this.channel = new BroadcastChannel(window.name);
          this.channel.onmessage = this.channelOnmessage;
          console.log(this.channel.name);
          break;
        }
        case "Reopen Window": {
          window.onunload = null;
          break;
        }
        case "Init Data": {
          this.type.value = event.data.type;
          this.frequency.value = event.data.frequency;
          this.Q.value = event.data.Q;
          this.gain.value = event.data.gain;
          this.rolloff.value = Math.log2(event.data.rolloff / -12);

          this.setFilter();
          this.drawFilter();

          break;
        }
        default:
          break;
      }
    },
    async setFilter() {
      this.filter = new Tone.Filter({
        type: this.type.value,
        frequency: this.frequency.value,
        rolloff: 2 ** this.rolloff.value * -12,
        Q: this.Q.value,
        gain: this.gain.value
      });
    },
    drawFilter() {
      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1044, 260);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255,100,100)";

      let filterline = this.filter.getFrequencyResponse(2048);

      ctx.beginPath();

      for (let i = 1; i <= 2048; i++) {
        ctx.lineTo(
          (1000 * i) / 2048 + 22,
          230 - Math.pow(filterline[i - 1], 1 / 8) * 100
        );
      }
      ctx.stroke();
    }
  }
};
</script>