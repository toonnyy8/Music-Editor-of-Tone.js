<template>
  <div class="mdc-card__actions">
    <button class="mdc-fab mdc-fab--mini mdc-ripple-upgraded" v-on:click="SetPlugin(plugin)">
      <i class="material-icons">all_out</i>
    </button>
    <div>
      <button
        class="mdc-button mdc-button-dark"
        style="width: 150%"
        v-on:click="LookPlugin(plugin)"
      >{{plugin.pluginType}}</button>
    </div>

    <div class="mdc-card__action-icons">
      <button
        class="mdc-icon-button material-icons"
        v-on:click="DeletePlugin(plugin.id)"
      >highlight_off</button>
    </div>
  </div>
</template>
<script>
import { MDCDialog } from "@material/dialog";

export default {
  props: [
    "plugin",
    "DeletePlugin",
    "SetPlugin",
    "LookPlugin",
    "BindPluginChannel"
  ],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
