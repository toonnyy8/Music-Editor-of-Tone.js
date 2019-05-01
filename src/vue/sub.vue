<template>
  <div>
    <envelope :setSynth="setSynth"></envelope>
    <oscillator :setSynth="setSynth"></oscillator>
  </div>
</template>

<script>
import envelope from "./sub/envelope.vue";
import oscillator from "./sub/oscillator.vue";

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
  components: { envelope: envelope, oscillator: oscillator },
  data() {
    return {
      channel: new BroadcastChannel(window.name)
    };
  },
  mounted() {
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
      a: function() {
        synth.triggerAttackRelease(["C" + frequency], 0.02);
      },
      s: function() {
        synth.triggerAttackRelease(["D" + frequency], 0.02);
      },
      d: function() {
        synth.triggerAttackRelease(["E" + frequency], 0.02);
      },
      f: function() {
        synth.triggerAttackRelease(["F" + frequency], 0.02);
      },
      g: function() {
        synth.triggerAttackRelease(["G" + frequency], 0.02);
      },
      h: function() {
        synth.triggerAttackRelease(["A" + frequency], 0.02);
      },
      j: function() {
        synth.triggerAttackRelease(["B" + frequency], 0.02);
      }
    });
  },
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
    }
  }
};
</script>

<style lang="css">
div {
  color: #56b983;
}
</style>