import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from 'vue'

import main from '../vue/temp.vue'

let tt = new Vue(main).$mount('#main')

let isSub = false
const channel = new BroadcastChannel('name');

channel.postMessage("Creat Sub")
channel.onmessage = function (event) {
    console.log(event.data)
    if (isSub != true) {
        if (event.data == "Creat Sub") {
            channel.postMessage("You are sub")
        } else if (event.data == "You are sub") {
            isSub = true
            tt.$destroy()
            document.querySelector("#main").remove()
        }
    }
}