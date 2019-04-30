import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from "vue"

import main from "../vue/main.vue"
import sub from "../vue/sub.vue"


if (window.name.split(":")[0] == "SetPlugin") {
    new Vue(sub).$mount('#main')
} else {
    new Vue(main).$mount('#main')
}