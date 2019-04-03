import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import Vue from 'vue'

import main from '../vue/temp.vue'

new Vue(main).$mount('#main')