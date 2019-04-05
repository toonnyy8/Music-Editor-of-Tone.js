<template>
  <div id="main">
    <div
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
            {{pluginDialog.title}}
            <!--
            -->
          </h2>
          <div class="mdc-dialog__content" id="my-dialog-content">Dialog body text goes here.</div>
          <footer class="mdc-dialog__actions">
            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
              <span class="mdc-button__label">No</span>
            </button>
            <button
              type="button"
              class="mdc-button mdc-dialog__button"
              data-mdc-dialog-action="yes"
            >
              <span class="mdc-button__label">Yes</span>
            </button>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>
    <button class="mdc-fab" v-on:click="AddBlock()">Add Block</button>
    <table>
      <tr>
        <th v-for="block in blocks" :key="block.id" valign="top">
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
                <div class="mdc-card__actions">
                  <button
                    class="mdc-fab mdc-fab--mini mdc-ripple-upgraded"
                    v-on:click="SetPlugin(block.id,plugin)"
                  >
                    <i class="material-icons">all_out</i>
                  </button>
                  <div>
                    <button
                      class="mdc-button mdc-button-dark"
                      style="width: 150%"
                      v-on:click="LookPlugin(plugin.title)"
                    >{{plugin.title}}</button>
                  </div>

                  <div class="mdc-card__action-icons">
                    <button
                      class="mdc-icon-button material-icons"
                      v-on:click="DeletePlugin(block.plugins,plugin.id)"
                    >highlight_off</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </table>
  </div>
</template>
<script defer>
import { MDCDialog } from "@material/dialog";
import select from "../vue/select.vue";

window.onmessage = function(event) {
  console.log(event.data);
  if (event.data.instruction == "Sub Window Close") {
    let index = event.data.title.split(":")[1].split("-");
    vm.data.blocks[index[0]].plugins[index[1]].setPluginWindow = null;
    console.log(vm.data);
  }
};
let vm;
export default (vm = {
  components: {
    plugin: "<div>"
    //select: select
  },
  data: {
    parentMessage: "Parent",
    blocks: [],
    pluginDialog: { dialog: null, title: null }
    /*
     *[
     * {id:0,plugins:{id:0,dom:}}
     * ]
     *
     */
  },
  mounted() {
    this.pluginDialog.dialog = new MDCDialog(
      document.querySelector(".mdc-dialog")
    );

    /*let tempQuerySelector = this.$el.querySelectorAll(".mdc-select");
    let select = new material.select.MDCSelect(
      tempQuerySelector[tempQuerySelector.length - 1]
    );
    select.listen("MDCSelect:change", () => {
      console.log("HI");
    });
    console.log(select);*/
  },
  updated() {},
  methods: {
    AddPlugin: function(blockIndex, plugins) {
      console.log("AddPlugin");
      console.log(plugins);
      plugins.push({
        id: plugins.length,
        title: "C1",
        setPluginWindow: null
      });
    },
    DeletePlugin: function(plugins, pluginIndex) {
      console.log(pluginIndex);
      console.log("DeletePlugin");
      //if (plugins[pluginIndex].setPluginWindow != null)
      plugins.splice(pluginIndex, 1);
      for (let i = 0; i < plugins.length; i++) {
        plugins[i].id = i;
      }
    },
    AddBlock: function() {
      this.blocks.push({
        id: this.blocks.length,
        plugins: []
      });

      console.log("AddBlock");
    },
    DeleteBlock: function(blockIndex) {
      console.log("DeleteBlock");
      this.blocks.splice(blockIndex, 1);
      for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].id = i;
      }
    },
    LookPlugin: function(title) {
      this.pluginDialog.title = title;
      this.pluginDialog.dialog.open();
    },

    SetPlugin: function(blockIndex, plugin) {
      if (plugin.setPluginWindow != null) {
        plugin.setPluginWindow.close();
        plugin.setPluginWindow = null;
      }
      let windowTitle = "SetPlugin:" + blockIndex + "-" + plugin.id;
      plugin.setPluginWindow = window.open("./index.html", windowTitle);

      /*plugin.setPluginWindow.onload = () => {
          plugin.setPluginWindow.postMessage({
            instruction: "You are sub",
            title: windowTitle
          });
        };*/
    }
  }
});
</script>
<style>
:root {
  --mdc-theme-mytheme: #5a2765;
}
.my-card {
  width: 200px;
}
.mdc-button:not(:disabled).mdc-button-dark {
  color: var(--mdc-theme-mytheme);
}
</style>
