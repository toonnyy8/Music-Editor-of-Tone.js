<template>
  <div class="mdc-card my-card">
    <div class="mdc-card__actions">
      <div class="mdc-card__action-buttons">
        <button
          class="mdc-button mdc-card__action mdc-card__action--button"
          v-on:click="AddPlugin(block.id,block.plugins)"
        >Add Plugin</button>
        <button
          class="mdc-button mdc-card__action mdc-card__action--button"
          v-on:click="DeleteBlock(block.id)"
        >Delete Block</button>
      </div>
    </div>
    <div>
      <div v-for="plugin in block.plugins" :key="plugin.id">
        <hr>
        <plugin
          :plugin="plugin"
          :DeletePlugin="BuildDeletePlugin(block.id,block.plugins)"
          :LookPlugin="LookPlugin"
          :SetPlugin="BuildSetPlugin(block.id)"
          :BindPluginChannel="BindPluginChannel"
        ></plugin>
      </div>
    </div>
  </div>
</template>
<script>
import { MDCDialog } from "@material/dialog";
import plugin from "../vue/plugin.vue";

let vm;
export default (vm = {
  props: ["block", "DeleteBlock", "LookPlugin", "BindPluginChannel"],
  components: {
    plugin: plugin
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    AddPlugin: function(blockIndex, plugins) {
      console.log("AddPlugin");
      console.log(plugins);
      plugins.push({
        id: plugins.length,
        title: "C1",
        pluginChannel: null
      });
    },
    BuildDeletePlugin: function(blockIndex, plugins) {
      return pluginIndex => {
        console.log(pluginIndex);
        console.log("DeletePlugin");
        if (plugins[pluginIndex].pluginChannel != null) {
          plugins[pluginIndex].pluginChannel.postMessage({
            instruction: "Close Window"
          });
          plugins[pluginIndex].pluginChannel.close();
          plugins[pluginIndex].pluginChannel = null;
        }
        plugins.splice(pluginIndex, 1);
        for (let i = 0; i < plugins.length; i++) {
          plugins[i].id = i;
          if (plugins[i].pluginChannel != null) {
            let windowTitle = "SetPlugin:" + blockIndex + "-" + i;
            plugins[i].pluginChannel.postMessage({
              instruction: "Rename Window",
              title: windowTitle
            });
            plugins[i].pluginChannel.close();
            plugins[i].pluginChannel = new BroadcastChannel(windowTitle);
            this.BindPluginChannel(plugins[i]);
          }
        }
      };
    },
    BuildSetPlugin: function(blockIndex) {
      return plugin => {
        let windowTitle = "SetPlugin:" + blockIndex + "-" + plugin.id;
        if (plugin.pluginChannel != null) {
          plugin.pluginChannel.postMessage({
            instruction: "Reopen Window"
          });
        } else {
          plugin.pluginChannel = new BroadcastChannel(windowTitle);
          this.BindPluginChannel(plugin);
        }
        window.open("./index.html", windowTitle);
      };
    }
  }
});
</script>
