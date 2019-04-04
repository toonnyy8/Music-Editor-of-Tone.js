<template>
  <div>
    <i class="material-icons">highlight_off</i>
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
              <div
                v-for="plugin in block.plugins"
                :key="plugin.id"
                class="mdc-card__primary-action demo-card__primary-action"
                tabindex="0"
              >
                <div class="mdc-select demo-width-class">
                  <input type="hidden" name="enhanced-select">
                  <i class="mdc-select__dropdown-icon"></i>
                  <div class="mdc-select__selected-text">Vegetables</div>
                  <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
                    <ul class="mdc-list">
                      <li class="mdc-list-item mdc-list-item--selected" data-value></li>
                      <li
                        class="mdc-list-item"
                        data-value="grains"
                        aria-selected="true"
                      >Change Plugin</li>
                      <li
                        class="mdc-list-item"
                        data-value="vegetables"
                        v-on:click="DeletePlugin(block.plugins,plugin.id)"
                      >Delete Plugin</li>
                    </ul>
                  </div>
                  <span class="mdc-floating-label mdc-floating-label--float-above">Pick a Food Group</span>
                  <div class="mdc-line-ripple"></div>
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
  //components: { select: select },
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
        dom: null
      });
      this.$nextTick(function() {
        let tempQuerySelector = this.$el
          .querySelectorAll("th")
          [blockIndex].querySelectorAll(".mdc-select");

        let select = new material.select.MDCSelect(
          tempQuerySelector[tempQuerySelector.length - 1]
        );
        plugins[tempQuerySelector.length - 1].dom = select;
        console.log(select);
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
.my-card {
  width: 200px;
}
</style>
