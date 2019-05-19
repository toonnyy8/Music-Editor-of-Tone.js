<template>
  <div>
    <div id="Waveform"></div>
    <div v-if="isCompiled">
      <button class="mdc-fab" v-on:click="playMusic()" v-show="!isPlaying">Play</button>
      <button class="mdc-fab" v-on:click="stopMusic()" v-show="isPlaying">Stop</button>
    </div>
  </div>
</template>

<script>
import * as Tone from "tone";
import Recorder from "../lib/recorder";

export default {
  data() {
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
      synths: [],
      analysers: [],
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
      endTime: 0
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
              this.synths.push(
                new Tone.PolySynth(event.data.data.data.polyphony, Tone.Synth, {
                  volume: event.data.data.data.volume,
                  envelope: event.data.data.data.envelope,
                  oscillator: event.data.data.data.oscillator
                }).toMaster()
              );
              this.analysers.push(
                this.synths[this.synths.length - 1].context.createAnalyser()
              );
              this.synths[this.synths.length - 1].connect(
                this.analysers[this.analysers.length - 1]
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

                        return () => {
                          console.log(synthNum);
                          return setTimeout(() => {
                            this.synths[synthNum].triggerAttackRelease(
                              [pitch],
                              duration * LPD
                            );
                          }, 1000 * ((60 / BPM) * time + lag));
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

          this.musicPlayFuncs.push(() => {
            return setTimeout(() => {
              this.isPlaying = false;
              console.log("play end");
            }, this.endTime + 100);
          });
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

      let recorder = new Recorder(this.analysers[0]);
      recorder.record();

      let renderFrame = () => {
        let frequencyDatas = [
          new Uint8Array(this.analysers[0].frequencyBinCount)
        ];
        for (let i = 0; i < this.analysers.length; i++) {
          frequencyDatas.push(
            new Uint8Array(this.analysers[i].frequencyBinCount)
          );
        }

        if (this.isPlaying == true || this.musicEnd == false) {
          requestAnimationFrame(renderFrame);
          this.musicEnd = false;

          let ctx = this.canvas.getContext("2d");

          ctx.fillStyle = "rgb(179, 179, 179,0.5)";
          ctx.fillRect(0, 0, 1920, 1080);

          for (let i = 0; i < this.analysers.length; i++) {
            this.analysers[i].getByteFrequencyData(frequencyDatas[i + 1]);
            for (let j = 0; j < frequencyDatas[0].length; j++) {
              frequencyDatas[0][j] += frequencyDatas[i + 1][j];
            }
          }

          for (let j = 0; j < frequencyDatas[0].length; j++) {
            this.musicEnd += frequencyDatas[0][j];

            ctx.fillStyle = `rgb(${255 * (j / 1024)}, 255, ${255 *
              (1 - j / 1024)})`;
            ctx.fillRect(
              (1920 / 1024) * j,
              1080,
              1920 / 1024,
              -1080 * (frequencyDatas[0][j] / 256)
            );
          }

          this.musicEnd = !this.musicEnd;
        } else {
          recorder.stop();
          /*let createDownloadLink = () => {
            recorder.exportWAV(function(blob) {
              var url = URL.createObjectURL(blob);
              var li = document.createElement("li");
              var au = document.createElement("audio");
              var hf = document.createElement("a");

              au.controls = true;
              au.src = url;
              hf.href = url;
              hf.download = new Date().toISOString() + ".wav";
              hf.innerHTML = hf.download;
              li.appendChild(au);
              li.appendChild(hf);
              document.body.appendChild(li);
            });
          };
          createDownloadLink();*/
          recorder.clear();
        }
      };
      requestAnimationFrame(renderFrame);

      for (let i = 0; i < this.musicPlayFuncs.length; i++) {
        this.musicPlayTimeID[i] = this.musicPlayFuncs[i]();
      }
    },
    stopMusic() {
      this.isPlaying = false;
      for (let i = 0; i < this.musicPlayFuncs.length; i++) {
        window.clearInterval(this.musicPlayTimeID[i]);
      }
    }
  }
};
</script>
