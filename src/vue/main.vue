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
          <block
            :block="block"
            :DeleteBlock="DeleteBlock"
            :LookPlugin="LookPlugin"
            :BindPluginChannel="BindPluginChannel"
          ></block>
        </th>
      </tr>
    </table>
  </div>
</template>
<script defer>
import { MDCDialog } from "@material/dialog";
import block from "../vue/block.vue";

let vm;
export default (vm = {
  components: {
    block: block
  },
  data: {
    blocks: [],
    /*
     *[
     * {id:0,plugins:{id:0,dom:}}
     * ]
     *
     */
    pluginDialog: { dialog: null, title: null }
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
    AddBlock: function() {
      this.blocks.push({
        id: this.blocks.length,
        plugins: []
      });

      console.log("AddBlock");
    },
    DeleteBlock: function(blockIndex) {
      console.log("DeleteBlock");
      for (let i = 0; i < this.blocks[blockIndex].plugins.length; i++) {
        if (this.blocks[blockIndex].plugins[i].pluginChannel != null) {
          this.blocks[blockIndex].plugins[i].pluginChannel.postMessage({
            instruction: "Close Window"
          });
          this.blocks[blockIndex].plugins[i].pluginChannel.close();
          this.blocks[blockIndex].plugins[i].pluginChannel = null;
        }
      }
      this.blocks.splice(blockIndex, 1);
      for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].id = i;
        for (let j = 0; j < this.blocks[i].plugins.length; j++) {
          this.blocks[i].plugins[j].id = j;
          if (this.blocks[i].plugins[j].pluginChannel != null) {
            let windowTitle = "SetPlugin:" + i + "-" + j;
            this.blocks[i].plugins[j].pluginChannel.postMessage({
              instruction: "Rename Window",
              title: windowTitle
            });
            this.blocks[i].plugins[j].pluginChannel.close();
            this.blocks[i].plugins[j].pluginChannel = new BroadcastChannel(
              windowTitle
            );
            this.BindPluginChannel(this.blocks[i].plugins[j]);
          }
        }
      }
    },
    LookPlugin: function(title) {
      this.pluginDialog.title = title;
      this.pluginDialog.dialog.open();
    },
    BindPluginChannel: function(plugin) {
      plugin.pluginChannel.onmessage = function(event) {
        if (event.data.instruction == "Sub Window Close") {
          plugin.pluginChannel.close();
          plugin.pluginChannel = null;
          console.log("close", plugin);
        }
      };
    }
  }
});

if (window.name.split(":")[0] != "SetPlugin") {
  let globalChannel = new BroadcastChannel("globalChannel");
  globalChannel.onmessage = function(event) {
    if (event.data.instruction == "Sub Window Creat") {
      let index = event.data.title.split(":")[1].split("-");

      if (
        vm.data.blocks[index[0]].plugins[index[1]] != null &&
        vm.data.blocks[index[0]].plugins[index[1]].pluginChannel == null
      ) {
        vm.data.blocks[index[0]].plugins[
          index[1]
        ].pluginChannel = new BroadcastChannel(event.data.title);
      }
    }
  };
  window.onunload = function() {
    for (let i = 0; i < vm.data.blocks.length; i++) {
      for (let j = 0; j < vm.data.blocks[i].plugins.length; j++) {
        if (vm.data.blocks[i].plugins[j].pluginChannel != null) {
          vm.data.blocks[i].plugins[j].pluginChannel.postMessage({
            instruction: "Close Window"
          });
          vm.data.blocks[i].plugins[j].pluginChannel.close();
          vm.data.blocks[i].plugins[j].pluginChannel = null;
        }
      }
    }
  };
}
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
