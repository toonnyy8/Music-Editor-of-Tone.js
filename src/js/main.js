import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from "vue"

import main from "../vue/main.vue"
import sub from "../vue/temp.vue"


console.log(window.name)
if (window.name.split(":")[0] == "SetPlugin") {
    new Vue(sub).$mount('#main')
    window.document.title = window.name

    let channel = new BroadcastChannel(window.name)
    let globalChannel = new BroadcastChannel("globalChannel")

    function channelOnmessage(event) {
        if (event.data.instruction == "Close Window") {
            window.onunload = null
            window.close()
        } else if (event.data.instruction == "Rename Window") {
            window.name = event.data.title
            window.document.title = event.data.title
            channel.close()
            channel = new BroadcastChannel(window.name)
            channel.onmessage = channelOnmessage
            console.log(channel.name)
        } else if (event.data.instruction == "Reopen Window") {
            window.onunload = null
        }
    }
    channel.onmessage = channelOnmessage
    /*window.onbeforeunload = function (e) {
        return "leave"
    }*/
    window.onload = function (e) {
        globalChannel.postMessage({
            instruction: "Sub Window Creat",
            title: window.name
        })
    }
    window.onunload = function (e) {
        channel.postMessage({
            instruction: "Sub Window Close",
            title: window.name
        })
        //window.close()
    }
} else {
    new Vue(main).$mount('#main')
}
/*window.onmessage = function (event) {
    console.log(event.data)
    if (event.data.instruction == "You are sub") {
        document.title = event.data.title
        isSub = true

    }
}
*/