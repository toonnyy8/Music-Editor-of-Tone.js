import "@babel/polyfill"

import * as Tone from "tone"

Tone.start()
//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
requestAnimationFrame(function loop() {
    synth.triggerAttackRelease("C3", "16n")
    requestAnimationFrame(loop)
})
