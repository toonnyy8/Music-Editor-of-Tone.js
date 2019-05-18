<template>
  <div>
    <!--select plugin type-->
    <div
      v-bind:id="'SelectPluginTypeDialog_'+block.id"
      class="mdc-dialog"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="my-dialog-title"
      aria-describedby="my-dialog-content"
    >
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
          <h2 class="mdc-dialog__title" id="my-dialog-title">
            <!--
            -->
            Select Plugin Type
            <!--
            -->
          </h2>
          <div class="mdc-dialog__content" id="my-dialog-content">
            <button
              class="mdc-fab"
              v-on:click="addPlugin('base')"
              style="width:70px;height:70px;"
              v-show="block.plugins[block.plugins.length-1]?block.plugins[block.plugins.length-1].pluginType!='B lag':true"
            >base</button>
            <button
              class="mdc-fab"
              v-on:click="addPlugin('filter')"
              style="width:70px;height:70px;"
              v-show="block.plugins[block.plugins.length-1]?block.plugins[block.plugins.length-1].pluginType!='B lag':true"
            >filter</button>
            <button
              class="mdc-fab"
              v-on:click="addPlugin('P lag')"
              style="width:70px;height:70px;"
              v-show="block.plugins[block.plugins.length-1]?block.plugins[block.plugins.length-1].pluginType!='B lag':true"
            >plugin lag</button>
            <button
              class="mdc-fab"
              v-on:click="addPlugin('B lag')"
              style="width:70px;height:70px;"
            >block lag</button>
          </div>
          <footer class="mdc-dialog__actions">
            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
              <span class="mdc-button__label">close</span>
            </button>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>
    <div class="mdc-card my-card">
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <button
            class="mdc-button mdc-card__action mdc-card__action--button"
            v-on:click="selectPluginType()"
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
  </div>
</template>
<script>
import { MDCDialog } from "@material/dialog";
import plugin from "./plugin.vue";

export default {
  props: ["block", "DeleteBlock", "LookPlugin", "BindPluginChannel"],
  components: {
    plugin: plugin
  },
  data() {
    return { selectPluginTypeDialog: { dialog: null, title: null } };
  },
  mounted() {
    this.selectPluginTypeDialog.dialog = new MDCDialog(
      document.querySelector(`#SelectPluginTypeDialog_${this.block.id}`)
    );
  },
  methods: {
    selectPluginType: function() {
      this.selectPluginTypeDialog.dialog.open();
    },
    addPlugin(pluginType) {
      console.log("AddPlugin");
      console.log(this.block.plugins);

      switch (pluginType) {
        case "base": {
          let partials = [32];
          partials.length = 32;
          partials[0] = 1;
          for (let i = 1; i < partials.length; i++) {
            partials[i] = 0;
          }

          let musicalNotation = new Array(80);
          for (let i = 0; i < musicalNotation.length; i++) {
            musicalNotation[i] = new Uint16Array(new ArrayBuffer(120 * 2));
          }

          this.block.plugins.push({
            id: this.block.plugins.length,
            pluginType: "base",
            pluginChannel: null,
            data: {
              oscillator: {
                type: "custom",
                partials: partials
              },
              envelope: {
                attack: 0.05,
                attackCurve: "linear",
                decay: 0.2,
                decayCurve: "linear",
                sustain: 0.2,
                release: 1.5,
                releaseCurve: "linear"
              },
              beatsPerMinute: 60,
              musicalNotation: musicalNotation
            }
          });
          break;
        }
        case "filter": {
          this.block.plugins.push({
            id: this.block.plugins.length,
            pluginType: "filter",
            pluginChannel: null,
            data: {}
          });
          break;
        }
        case "P lag": {
          this.block.plugins.push({
            id: this.block.plugins.length,
            pluginType: "P lag",
            pluginChannel: null,
            data: { beatsPerMinute: 60, delayedBeats: 16 }
          });
          break;
        }
        case "B lag": {
          this.block.plugins.push({
            id: this.block.plugins.length,
            pluginType: "B lag",
            pluginChannel: null,
            data: { beatsPerMinute: 60, delayedBeats: 16 }
          });
          break;
        }
        default:
          break;
      }

      this.selectPluginTypeDialog.dialog.close();
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
            let windowTitle = `SetPlugin:${blockIndex}-${i}:${
              plugins[i].pluginType
            }`;
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
        let windowTitle = `SetPlugin:${blockIndex}-${plugin.id}:${
          plugin.pluginType
        }`;
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
};
</script>
