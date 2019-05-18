<template>
  <div>
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
          <envelope :setSynth="setSynth" v-show="moreMethods==0"></envelope>
          <oscillator :setSynth="setSynth" v-show="moreMethods==1"></oscillator>
          <musicalNotation
            :testSynth="testSynth"
            :playMusic="playMusic"
            :stopMusic="stopMusic"
            v-show="moreMethods==2"
          ></musicalNotation>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>
      </div>
    </div>
    <div class="fixed" align="center">
      <transition name="slide-fade">
        <div v-if="more">
          <button
            class="mdc-fab"
            v-on:click="moreMethods=0;$children[0].initView()"
            v-bind:disabled="moreMethods==0"
            v-bind:style="moreMethods==0?'background-color:#5543a9;':'background-color:#7765f7;'"
            style="width:70px;height:70px;"
          >Envelope</button>
          <br>
          <br>
          <button
            class="mdc-fab"
            v-on:click="moreMethods=1"
            v-bind:disabled="moreMethods==1"
            v-bind:style="moreMethods==1?'background-color:#5543a9;':'background-color:#7765f7;'"
            style="width:70px;height:70px;"
          >Oscillator</button>
          <br>
          <br>
          <button
            class="mdc-fab"
            v-on:click="moreMethods=2;$children[2].initView()"
            v-bind:disabled="moreMethods==2"
            v-bind:style="moreMethods==2?'background-color:#5543a9;':'background-color:#7765f7;'"
            style="width:70px;height:70px;"
          >Musical Notation</button>
          <br>
          <br>
        </div>
      </transition>
      <button
        class="mdc-fab"
        v-on:click="more=!more"
        style="width:100px;height:100px;font-size:large;"
      >More</button>
    </div>
  </div>
</template>

<script>
import envelope from "./pluginBase/envelope.vue";
import oscillator from "./pluginBase/oscillator.vue";
import musicalNotation from "./pluginBase/musicalNotation.vue";

import Mousetrap from "mousetrap";
import "mousetrap/plugins/bind-dictionary/mousetrap-bind-dictionary.min.js";
import * as Tone from "tone";

let frequency = 4;
let pow = new Tone.Pow(10);
let synth = new Tone.PolySynth(6, Tone.Synth, {
  volume: 6,
  envelope: {
    attack: 0.05,
    decay: 0.01,
    sustain: 0,
    release: 10,
    releaseCurve: "exponential"
  },
  oscillator: {
    type: "custom",
    partials: [0, 2, 4, 6, 8]
  }
})
  .connect(pow)
  .toMaster();
console.log("12345", synth.get());

export default {
  components: {
    envelope: envelope,
    oscillator: oscillator,
    musicalNotation: musicalNotation
  },
  data() {
    return {
      channel: new BroadcastChannel(window.name),
      more: false,
      moreMethods: 0
    };
  },
  mounted() {
    this.$children[0].initView();

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

    Mousetrap.bind({
      "1": function() {
        frequency = 1;
      },
      "2": function() {
        frequency = 2;
      },
      "3": function() {
        frequency = 3;
      },
      "4": function() {
        frequency = 4;
      },
      "5": function() {
        frequency = 5;
      },
      "6": function() {
        frequency = 6;
      },
      "7": function() {
        frequency = 7;
      },
      "8": function() {
        frequency = 8;
      }
    });
    Mousetrap.bind({
      a: () => {
        synth.triggerAttackRelease(
          ["C" + frequency],
          this.$children[0].envelopeLong()
        );
      },
      s: () => {
        synth.triggerAttackRelease(
          ["D" + frequency],
          this.$children[0].envelopeLong()
        );
      },
      d: () => {
        synth.triggerAttackRelease(
          ["E" + frequency],
          this.$children[0].envelopeLong()
        );
      },
      f: () => {
        synth.triggerAttackRelease(
          ["F" + frequency],
          this.$children[0].envelopeLong()
        );
      },
      g: () => {
        synth.triggerAttackRelease(
          ["G" + frequency],
          this.$children[0].envelopeLong()
        );
      },
      h: () => {
        synth.triggerAttackRelease(
          ["A" + frequency],
          this.$children[0].envelopeLong()
        );
      },
      j: () => {
        synth.triggerAttackRelease(
          ["B" + frequency],
          this.$children[0].envelopeLong()
        );
      }
    });
  },
  updated() {},
  methods: {
    setSynth(synthObj) {
      synth.set({
        volume: 6,
        envelope: synthObj.envelope || synth.get().envelope,
        oscillator: synthObj.oscillator || synth.get().oscillator
      });
      //console.log(synth.get());
    },
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
          console.log(event.data.envelope);
          break;
        }
        default:
          break;
      }
    },
    testSynth(pitch, duration, BPM) {
      console.log(pitch, duration);
      synth.triggerAttackRelease(
        [pitch],
        duration * this.$children[0].envelopeLong()
      );
    },
    playMusic(musicalNotation, BPM) {
      let musicalAlphabet = [
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
      ];
      let i = 0;

      let timeoutID;

      let envelopeLong = this.$children[0].envelopeLong();

      let tick = () => {
        if (i >= musicalNotation.length - 1) {
          this.$children[2].callStopMusic();
          console.log("end");
        }
        for (let j = 0; j < 120; j++) {
          if (musicalNotation[i][j]) {
            synth.triggerAttackRelease(
              [`${musicalAlphabet[j % 12]}${Math.floor(j / 12)}`],
              musicalNotation[i][j] * envelopeLong
            );
          }
        }
        this.$children[2].setNowPlayTime(i);
        i += 1;
      };

      timeoutID = setInterval(tick, 1000 * (60 / BPM));
      tick();
      return timeoutID;
    },
    stopMusic(tID) {
      window.clearInterval(tID);
    }
  }
};
</script>

<style lang="css">
div {
  color: #56b983;
}
.fixed {
  position: fixed;
  bottom: 70px;
  right: 70px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(150px);
  opacity: 0;
}
</style>