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
                <h1 align="center">Oscillator</h1>
                <div align="center" id="Oscillator"></div>
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

export default {
  props: ["setSynth"],
  data() {
    let partials = [32];
    partials.length = 32;
    partials[0] = 1;
    for (let i = 1; i < partials.length; i++) {
      partials[i] = 0;
    }
    return {
      channel: new BroadcastChannel(window.name),
      canvas: document.createElement("canvas"),
      Partials: partials,
      mouseDown: false
    };
  },
  mounted() {
    this.channel.onmessage = this.channelOnmessage;

    if (this.canvas.getContext) {
      this.canvas.width = 1044;
      this.canvas.height = 260;
      this.canvas.style = "width:100%";
      document.querySelector("#Oscillator").appendChild(this.canvas);

      let setPartials = event => {
        let x = event.offsetX;
        let y = event.offsetY;

        let offsetWidth = this.canvas.offsetWidth;
        let offsetHeight = this.canvas.offsetHeight;

        let cellWidth = 1000 / 1044 / 32;

        x /= offsetWidth;
        x -= 22 / 1044;

        this.Partials[
          x < 0 ? 0 : x > 1000 / 1044 ? 31 : Math.floor(x / cellWidth)
        ] =
          1 - y / offsetHeight <= 3 / 26
            ? 0
            : 1 - y / offsetHeight >= 23 / 26
            ? 1
            : (1 - y / offsetHeight - 3 / 26) / (20 / 26);

        this.drawOscillator();
      };
      this.drawOscillator();
      this.canvas.onmousedown = event => {
        this.mouseDown = true;

        setPartials(event);

        this.setSynth({
          oscillator: {
            type: "custom",
            partials: this.Partials
          }
        });
        this.channel.postMessage({
          instruction: "Set Plugin Data",
          oscillator: {
            type: "custom",
            partials: this.Partials
          }
        });
      };
      this.canvas.onmouseup = event => {
        this.mouseDown = false;
        this.setSynth({
          oscillator: {
            type: "custom",
            partials: this.Partials
          }
        });
        this.channel.postMessage({
          instruction: "Set Plugin Data",
          oscillator: {
            type: "custom",
            partials: this.Partials
          }
        });
      };
      this.canvas.onmousemove = event => {
        if (this.mouseDown) {
          setPartials(event);
        }
      };

      this.canvas.addEventListener(
        "touchstart",
        event => {
          this.mouseDown = true;
          event.preventDefault();

          setPartials({
            offsetX:
              event.touches[0].pageX -
              (this.canvas.getBoundingClientRect().left -
                this.canvas.scrollLeft),
            offsetY:
              this.canvas.offsetHeight -
              Math.abs(event.touches[0].pageY - document.body.scrollHeight)
          });

          this.setSynth({
            oscillator: {
              type: "custom",
              partials: this.Partials
            }
          });
          this.channel.postMessage({
            instruction: "Set Plugin Data",
            oscillator: {
              type: "custom",
              partials: this.Partials
            }
          });
        },
        false
      );
      this.canvas.addEventListener(
        "touchend",
        event => {
          this.mouseDown = false;
          this.setSynth({
            oscillator: {
              type: "custom",
              partials: this.Partials
            }
          });
          this.channel.postMessage({
            instruction: "Set Plugin Data",
            oscillator: {
              type: "custom",
              partials: this.Partials
            }
          });
        },
        false
      );
      this.canvas.addEventListener(
        "touchmove",
        event => {
          if (this.mouseDown) {
            setPartials({
              offsetX:
                event.touches[0].pageX -
                (this.canvas.getBoundingClientRect().left -
                  this.canvas.scrollLeft),
              offsetY:
                this.canvas.offsetHeight -
                Math.abs(event.touches[0].pageY - document.body.scrollHeight)
            });
          }
        },
        false
      );
    }
  },
  methods: {
    channelOnmessage(event) {
      switch (event.data.instruction) {
        case "Init Data": {
          this.Partials = event.data.oscillator.partials;
          this.drawOscillator();
          this.setSynth({
            oscillator: {
              type: "custom",
              partials: this.Partials
            }
          });
          this.channel.postMessage({
            instruction: "Set Plugin Data",
            oscillator: {
              type: "custom",
              partials: this.Partials
            }
          });
          break;
        }
        default:
          break;
      }
    },
    drawOscillator() {
      let ctx = this.canvas.getContext("2d");
      ctx.fillStyle = "rgb(75,75,75)";
      ctx.fillRect(0, 0, 1044, 260);
      //drawPartials
      ctx.fillStyle = "rgb(220,220,220)";
      for (let i = 0; i < 32; i++) {
        ctx.fillRect(
          22 + (i * 1000) / 32,
          30 + 200 * (1 - this.Partials[i]),
          Math.ceil(1000 / 32),
          200 * this.Partials[i]
        );
      }

      //drawOscillator
      let max = 0;
      let temp = [2000];
      for (let i = 1; i <= 2000; i++) {
        temp[i - 1] = this.generatePartials(i / 2000);
        max = max > temp[i - 1] ? max : temp[i - 1];
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255,100,100)";

      ctx.beginPath();
      ctx.moveTo(22, 130 - Math.cos(-Math.PI * 0.5) * 100);

      for (let i = 1; i <= 2000; i++) {
        ctx.lineTo((1000 * i) / 2000 + 22, 130 - (temp[i - 1] / max) * 100);
      }
      ctx.stroke();
      temp = null;
    },
    generatePartials(x) {
      let f = 0;
      for (let i = 0; i < this.Partials.length; i++) {
        f += Math.sin(x * Math.PI * 2 * (i + 1)) * this.Partials[i];
      }
      return f;
    }
  }
};
</script>
