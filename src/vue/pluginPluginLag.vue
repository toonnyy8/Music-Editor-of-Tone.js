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
                <h1 align="center">Next Plugin Lag</h1>
              </div>
              <div class="demo-card__secondary mdc-typography mdc-typography--body2">
                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div align="center" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
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
                      <h3>Delayed Beats : {{(delayedBeats.value+delayedBeats100.value)>0?(delayedBeats.value+delayedBeats100.value):1}}</h3>
                      <div
                        id="DelayedBeats"
                        class="mdc-slider"
                        tabindex="0"
                        role="slider"
                        aria-valuemin="0"
                        aria-valuemax="99"
                        aria-valuenow="16"
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
                        id="DelayedBeats100"
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
import { MDCSlider } from "@material/slider";

export default {
  data() {
    return {
      channel: new BroadcastChannel(window.name),
      lagTime: { value: 0 },
      beatsPerMinute: { value: 60 },
      beatsPerMinute100: { value: 0 },
      delayedBeats: { value: 16 },
      delayedBeats100: { value: 0 }
    };
  },
  mounted() {
    this.beatsPerMinute = new MDCSlider(document.querySelector("#BPM"));
    this.beatsPerMinute100 = new MDCSlider(document.querySelector("#BPM100"));
    this.delayedBeats = new MDCSlider(document.querySelector("#DelayedBeats"));
    this.delayedBeats100 = new MDCSlider(
      document.querySelector("#DelayedBeats100")
    );

    setTimeout(() => {
      this.beatsPerMinute = new MDCSlider(document.querySelector("#BPM"));
      this.beatsPerMinute100 = new MDCSlider(document.querySelector("#BPM100"));
      this.delayedBeats = new MDCSlider(
        document.querySelector("#DelayedBeats")
      );
      this.delayedBeats100 = new MDCSlider(
        document.querySelector("#DelayedBeats100")
      );
    }, 100);

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
    this.delayedBeats.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        delayedBeats:
          this.delayedBeats.value + this.delayedBeats100.value > 0
            ? this.delayedBeats.value + this.delayedBeats100.value
            : 1
      });
    });
    this.delayedBeats100.listen("MDCSlider:change", () => {
      this.channel.postMessage({
        instruction: "Set Plugin Data",
        delayedBeats:
          this.delayedBeats.value + this.delayedBeats100.value > 0
            ? this.delayedBeats.value + this.delayedBeats100.value
            : 1
      });
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
          this.beatsPerMinute.value = event.data.beatsPerMinute % 100;
          this.beatsPerMinute100.value =
            event.data.beatsPerMinute - (event.data.beatsPerMinute % 100);

          this.delayedBeats.value = event.data.delayedBeats % 100;
          this.delayedBeats100.value =
            event.data.delayedBeats - (event.data.delayedBeats % 100);
          break;
        }
        default:
          break;
      }
    }
  }
};
</script>

