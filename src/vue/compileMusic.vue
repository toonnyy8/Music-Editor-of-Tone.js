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
      isPlaying: false
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
          console.log("end");
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
