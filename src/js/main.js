import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from 'vue'

import main from '../vue/temp.vue'

let tt = new Vue(main).$mount('#main')

let isSub = false

console.log(window.name)
if (window.name != "") {
    tt.$destroy()
    document.querySelector("#main").remove()
    window.document.title = window.name
    /*window.onbeforeunload = function (e) {
        return "leave"
    }*/
    window.onload = function (e) {
        window.opener.postMessage({
            instruction: "Sub Window Creat",
            title: window.name
        })
    }
    window.onunload = function (e) {
        window.opener.postMessage({
            instruction: "Sub Window Close",
            title: window.name
        })
        //window.close()
    }
}
/*window.onmessage = function (event) {
    console.log(event.data)
    if (event.data.instruction == "You are sub") {
        document.title = event.data.title
        isSub = true

    }
}
*/