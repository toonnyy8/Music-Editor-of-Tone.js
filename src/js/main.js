import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from "vue"

import main from "../vue/main.vue"
import pluginFilter from "../vue/pluginFilter.vue"
import pluginBase from "../vue/pluginBase.vue"
import pluginPluginLag from "../vue/pluginPluginLag.vue"
import pluginBlockLag from "../vue/pluginBlockLag.vue"
import compileMusic from "../vue/compileMusic.vue"


if (window.name.split(":")[0] == "SetPlugin") {
    console.log(window.name.split(":")[2])

    switch (window.name.split(":")[2]) {
        case "filter": {
            new Vue(pluginFilter).$mount('#main')
            break;
        }
        case "base": {
            new Vue(pluginBase).$mount('#main')
            break;
        }
        case "P lag": {
            new Vue(pluginPluginLag).$mount('#main')
            break;
        }
        case "B lag": {
            new Vue(pluginBlockLag).$mount('#main')
            break;
        }
        default:
            break;
    }
} else if (window.name == "CompileMusic") {
    new Vue(compileMusic).$mount('#main')
} else {
    new Vue(main).$mount('#main')
}