<template>
  <div>
    <div id="Waveform"></div>
    <div v-if="isCompiled">
      <button
        class="mdc-fab"
        v-on:click="playMusic()"
        v-show="!isPlaying"
        style="width:75px;height:75px"
      >Play</button>
      <button
        class="mdc-fab"
        v-on:click="stopMusic()"
        v-show="isPlaying"
        style="width:75px;height:75px"
      >Stop</button>
      <button
        class="mdc-fab"
        v-on:click="DownloadWAV()"
        v-show="canDownload"
        style="width:75px;height:75px"
      >Download</button>
      <div align="center" class="fixed">
        <h3
          style="border: 0 none; outline:none; font-family: Roboto,sans-serif; font-size: 1.17em;color: #772255; font-weight: bold;"
        >{{Math.round(progressBar.value*100)/100}}s</h3>
        <div
          id="ProgressBar"
          class="mdc-slider"
          tabindex="0"
          role="slider"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow="0"
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
    </div>
  </div>
</template>

<script>
import * as Tone from "tone";
import Recorder from "../lib/recorder";
import { MDCSlider } from "@material/slider";

export default {
  data() {
    let analyser = new Tone.Analyser().context.createAnalyser();

    return {
      compileMusicChannel: new BroadcastChannel("compileMusicChannel"),
      canvas: document.createElement("canvas"),
      pluginLagTime: 0,
      blockLagTime: 0,
      isCompiled: false,
      musicPlayFuncs: [],
      musicPlayTimeID: [],
      isPlaying: false,
      musicEnd: true,
      canDownload: false,
      synths: [],
      filters: [],
      analyser: analyser,
      musicalAlphabet: [
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
      ],
      endTime: 0,
      downloadLink: document.createElement("a"),
      progressBar: { value: 0 },
      rafID: null,
      recorder: null
    };
  },
  mounted() {
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.canvas.style =
      "width:100%; height:100%; z-index:-1;position : absolute;";
    document.querySelector("#Waveform").appendChild(this.canvas);
    document.body.style =
      "overflow-y: hidden; overflow-x: hidden;background-color: rgb(179, 179, 179);";

    this.compileMusicChannel.postMessage({
      instruction: "next",
      blockNum: 0,
      pluginNum: 0
    });
    this.compileMusicChannel.onmessage = () => {
      switch (event.data.instruction) {
        case "postData": {
          //console.log(event.data);

          if (event.data.pluginNum == 0) {
            this.pluginLagTime = 0;
          }

          switch (event.data.data.pluginType) {
            case "base": {
              console.log(event.data.data.data);

              /**/ const lpf = new Tone.Filter({
                type: "lowpass",
                frequency: 3000
              });
              const hpf = new Tone.Filter({
                type: "highpass",
                frequency: 2500
              });

              //console.log(lpf.getFrequencyResponse(1024));

              this.synths.push(
                new Tone.PolySynth(event.data.data.data.polyphony, Tone.Synth, {
                  volume: event.data.data.data.volume,
                  envelope: event.data.data.data.envelope,
                  oscillator: event.data.data.data.oscillator
                }).chain(...this.filters, this.analyser, Tone.Master) //.chain(...[hpf, lpf], this.analyser, Tone.Master)
              );

              for (
                let i = 0;
                i < event.data.data.data.musicalNotation.length;
                i++
              ) {
                for (
                  let j = 0;
                  j <
                  Object.keys(event.data.data.data.musicalNotation[i]).length;
                  j++
                ) {
                  if (event.data.data.data.musicalNotation[i][j]) {
                    this.musicPlayFuncs.push(
                      ((synthNum, pitch, duration, LPD, BPM, time, lag) => {
                        this.endTime =
                          this.endTime < 1000 * ((60 / BPM) * time + lag)
                            ? 1000 * ((60 / BPM) * time + lag)
                            : this.endTime;

                        return startTime => {
                          startTime = startTime || 0;
                          console.log(synthNum);
                          if ((60 / BPM) * time + lag - startTime >= 0) {
                            return setTimeout(() => {
                              this.synths[synthNum].triggerAttackRelease(
                                [pitch],
                                duration * LPD
                              );
                            }, 1000 * ((60 / BPM) * time + lag - startTime));
                          } else {
                            return setTimeout(() => {});
                          }
                        };
                      })(
                        this.synths.length - 1,
                        `${this.musicalAlphabet[j % 12]}${Math.floor(j / 12)}`,
                        event.data.data.data.musicalNotation[i][j],
                        event.data.data.data.lengthPerDuration,
                        event.data.data.data.beatsPerMinute,
                        i,
                        this.pluginLagTime + this.blockLagTime
                      )
                    );
                  }
                }
              }
              break;
            }
            case "filter": {
              break;
            }
            case "P lag": {
              this.pluginLagTime +=
                (60 / event.data.data.data.beatsPerMinute) *
                event.data.data.data.delayedBeats;
              break;
            }
            case "B lag": {
              this.blockLagTime +=
                (60 / event.data.data.data.beatsPerMinute) *
                event.data.data.data.delayedBeats;
              break;
            }
            default:
              break;
          }

          this.compileMusicChannel.postMessage({
            instruction: "next",
            blockNum: event.data.blockNum,
            pluginNum: event.data.pluginNum + 1
          });

          break;
        }
        case "end": {
          this.isCompiled = true;

          this.musicPlayFuncs.push(startTime => {
            startTime = startTime || 0;
            if (this.endTime + 100 - startTime * 1000 >= 0) {
              return setTimeout(() => {
                this.isPlaying = false;
                console.log("play end");
              }, this.endTime + 100 - startTime * 1000);
            } else {
              return setTimeout(() => {});
            }
          });

          setTimeout(() => {
            this.progressBar = new MDCSlider(
              document.querySelector("#ProgressBar")
            );
            this.progressBar.max = (this.endTime + 100) / 1000;
            this.progressBar.listen("MDCSlider:change", () => {
              //console.log(this.progressBar.value);
              if (this.isPlaying) {
                this.stopMusic();
                this.playMusic();
              }
            });
          }, 100);
          console.log("compile end");
          break;
        }

        default:
          break;
      }
    };
  },
  methods: {
    playMusic() {
      this.isPlaying = true;
      this.canDownload = false;

      cancelAnimationFrame(this.rafID);

      this.recorder = this.recorder || new Recorder(this.analyser);
      this.recorder.record();

      let renderFrame = () => {
        let frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

        if (this.isPlaying == true || this.musicEnd == false) {
          this.rafID = requestAnimationFrame(renderFrame);
          this.musicEnd = false;

          let ctx = this.canvas.getContext("2d");

          ctx.fillStyle = "rgb(179, 179, 179,0.4)";
          ctx.fillRect(0, 0, 1920, 1080);

          this.analyser.getByteFrequencyData(frequencyData);

          for (let j = 0; j < frequencyData.length; j++) {
            this.musicEnd += frequencyData[j];

            ctx.fillStyle = `rgb(${255 * (j / 1024)}, 255, ${255 *
              (1 - j / 1024)})`;
            ctx.fillRect(
              (1920 / 1024) * j,
              1080,
              1920 / 1024,
              -1080 * (frequencyData[j] / 256)
            );
          }

          this.progressBar.value += 1 / 60;
          this.musicEnd = !this.musicEnd;
        } else {
          let ctx = this.canvas.getContext("2d");

          ctx.fillStyle = "rgb(179, 179, 179)";
          ctx.fillRect(0, 0, 1920, 1080);

          this.canDownload = true;

          this.recorder.stop();
          this.recorder.exportWAV(blob => {
            var url = URL.createObjectURL(blob);
            this.downloadLink.href = url;
            this.downloadLink.download = new Date().toISOString() + ".wav";
          });
          this.recorder.clear();

          this.recorder = null;
        }
      };
      this.rafID = requestAnimationFrame(renderFrame);

      for (let i = 0; i < this.musicPlayFuncs.length; i++) {
        this.musicPlayTimeID[i] = this.musicPlayFuncs[i](
          this.progressBar.value
        );
      }
    },
    stopMusic() {
      this.isPlaying = false;
      for (let i = 0; i < this.musicPlayFuncs.length; i++) {
        window.clearInterval(this.musicPlayTimeID[i]);
      }
    },
    DownloadWAV() {
      this.downloadLink.click();
    }
  }
};
</script>

<style>
.fixed {
  position: fixed;
  bottom: 10px;
  right: 5%;
  width: 90%;
}
</style>
