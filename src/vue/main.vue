<template>
  <div>
    <h1>{{ msg }} {{love}}</h1>
    <button v-on:click="countLove()" class="mdc-fab" aria-label="Love">
      <span class="mdc-fab__icon material-icons">Love</span>
    </button>
    <button v-on:click="countHate()" class="mdc-fab" aria-label="Hate">
      <span class="mdc-fab__icon material-icons">Hate</span>
    </button>
  </div>
</template>

<script>
import * as Tone from "tone";
var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
//set the attributes using the set interface
synth.set("detune", -1200);
//play a chord

export default {
  data: {
    msg: "How Much You Love MET? ",
    love: 0
  },
  methods: {
    countLove: function() {
      this.love += 1;
      let frequency = Math.floor(this.love / 10) + 1;
      console.log(frequency);
      synth.triggerAttackRelease(
        ["C" + frequency, "E" + frequency, "A" + frequency],
        0.02
      );
    },
    countHate: function() {
      this.love -= 1;
      let frequency = Math.floor(this.love / 10) + 1;
      synth.triggerAttackRelease(
        ["C" + frequency, "E" + frequency, "A" + frequency],
        0.02
      );
    }
  }
};
</script>

<style lang="css">
div {
  color: #56b983;
}
</style>