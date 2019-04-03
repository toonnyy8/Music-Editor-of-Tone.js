<template>
  <div>
    <h1>{{ msg }} {{love}}</h1>
    <button v-on:click="countLove()" class="mdc-fab" aria-label="Love">
      <span class="mdc-fab__icon material-icons">Love</span>
    </button>
    <button v-on:click="countHate()" class="mdc-fab" aria-label="Hate">
      <span class="mdc-fab__icon material-icons">Hate</span>
    </button>
    <test></test>
  </div>
</template>

<script>
import Vue from "vue";
import test from "../vue/test.vue";

import Mousetrap from "mousetrap";
import "mousetrap/plugins/bind-dictionary/mousetrap-bind-dictionary.min.js";
import * as Tone from "tone";

let frequency = 4;
var pow = new Tone.Pow(2);
var synth = new Tone.PolySynth(6, Tone.Synth, {
  volume: 6,
  oscillator: {
    partials: [0, 2, 4, 6, 8]
  },
  envelope: {
    attack: 0.05,
    decay: 0.01,
    sustain: 0,
    release: 10,
    releaseCurve: "exponential"
  }
})
  .connect(pow)
  .toMaster();

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

export default {
  components: { test: test },
  data: {
    msg: "How Much You Love MET? ",
    love: 0
  },
  methods: {
    countLove: function() {
      this.love += 1;
      let frequency = Math.floor(this.love / 10) + 1;
      console.log(frequency);
      /*synth.triggerAttackRelease(
        ["C" + frequency, "E" + frequency, "A" + frequency],
        0.02
      );*/
    },
    countHate: function() {
      this.love -= 1;
      let frequency = Math.floor(this.love / 10) + 1;
      /*synth.triggerAttackRelease(
        ["C" + frequency, "E" + frequency, "A" + frequency],
        0.02
      );*/
    }
  }
};
</script>

<style lang="css">
div {
  color: #56b983;
}
</style>