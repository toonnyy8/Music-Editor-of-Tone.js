import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from "vue"

import main from "../vue/main.vue"
import pluginBase from "../vue/pluginBase.vue"


if (window.name.split(":")[0] == "SetPlugin") {
    console.log(window.name.split(":")[2])

    switch (window.name.split(":")[2]) {
        case "base": {
            new Vue(pluginBase).$mount('#main')
            break;
        }

        default:
            break;
    }
} else {
    new Vue(main).$mount('#main')
}