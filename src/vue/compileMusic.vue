<template>
  <div>
    <div v-if="isCompiled">
      <button class="mdc-fab" v-on:click="playMusic()" v-show="!isPlaying">Play</button>
      <button class="mdc-fab" v-on:click="stopMusic()" v-show="isPlaying">Stop</button>
    </div>
  </div>
</template>

<script>
import * as Tone from "tone";

export default {
  data() {
    return {
      compileMusicChannel: new BroadcastChannel("compileMusicChannel"),
      pluginLagTime: 0,
      blockLagTime: 0,
      isCompiled: false,
      musicPlayFuncs: [],
      musicPlayTimeID: [],
      isPlaying: false,
      synths: [],
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
              for (
                let i = 0;
                i < event.data.data.data.musicalNotation.length;
                i++
              ) {
                for (
                  let j = 0;
                  j < event.data.data.data.musicalNotation[i].length;
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
