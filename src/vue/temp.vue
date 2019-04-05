<template>
  <div>
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
                  <button class="mdc-fab mdc-fab--mini mdc-ripple-upgraded">
                    <i class="material-icons">all_out</i>
                  </button>
                  <div>
                    <button class="mdc-button mdc-button-dark" style="width: 150%">{{plugin.title}}</button>
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
import * as material from "../lib/@material/material-components-web.min.js";
import select from "../vue/select.vue";

export default {
  components: {
    plugin: "<div>"
    //select: select
  },
  data() {
    return {
      parentMessage: "Parent",
      items: [],
      blocks: []
      /*
       *[
       * {id:0,plugins:{id:0,dom:}}
       * ]
       *
       */
    };
  },
  mounted() {
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
        title: "C1"
      });
    },
    DeletePlugin: function(plugins, pluginIndex) {
      console.log(pluginIndex);
      console.log("DeletePlugin");
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
    }
  }
};
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
