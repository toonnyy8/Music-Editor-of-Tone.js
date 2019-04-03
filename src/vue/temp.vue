<template>
  <div>
    <div class="mdc-card" tabindex="-1">
      <ul class="mdc-list" role="menu" aria-hidden="true">
        <div>
          <li
            v-for="item in items"
            :key="item.id"
            class="mdc-list-item mdc-ripple-upgraded"
            role="menuitem"
            tabindex="-1"
            v-on:click="DeletePlugin(item.id)"
          >{{ item.message }}</li>
        </div>
        <li class="mdc-list-divider" role="separator"></li>
        <li
          class="mdc-list-item mdc-ripple-upgraded"
          role="menuitem"
          tabindex="-1"
          v-on:click="AddPlugin()"
        >Add Plugin</li>
        <li
          class="mdc-list-item mdc-ripple-upgraded"
          role="menuitem"
          tabindex="-1"
          v-on:click="DeleteBlock()"
        >Delete Block</li>
      </ul>
    </div>

    <div class="mdc-card my-card">
      <div class="mdc-card__primary-action demo-card__primary-action" tabindex="0">
        <div class="mdc-select demo-width-class">
          <input type="hidden" name="enhanced-select">
          <i class="mdc-select__dropdown-icon"></i>
          <div class="mdc-select__selected-text">Vegetables</div>
          <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
            <ul class="mdc-list">
              <li class="mdc-list-item mdc-list-item--selected" data-value aria-selected="true"></li>
              <li class="mdc-list-item" data-value="grains">Change Plugin</li>
              <li class="mdc-list-item" data-value="vegetables">Delete Plugin</li>
            </ul>
          </div>
          <span class="mdc-floating-label mdc-floating-label--float-above">Pick a Food Group</span>
          <div class="mdc-line-ripple"></div>
        </div>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <button class="mdc-button mdc-card__action mdc-card__action--button">Add Plugin</button>
          <button class="mdc-button mdc-card__action mdc-card__action--button">Delete Block</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script defer>
import * as material from "../lib/@material/material-components-web.min.js";

export default {
  data() {
    return {
      parentMessage: "Parent",
      items: [{ message: 1 }]
    };
  },
  mounted() {
    let tempQuerySelector = this.$el.querySelectorAll(".mdc-select");
    let select;
    for (let value of tempQuerySelector) {
      select = new material.select.MDCSelect(value);
      select.listen("MDCSelect:change");
    }
    select = null;
  },
  methods: {
    AddPlugin: function() {
      console.log("AddPlugin");
      this.items.unshift({ message: this.items.length + 1 });
    },
    DeletePlugin: function(index) {
      console.log("DeletePlugin");
      this.items.splice(index, 1);
    },
    DeleteBlock: function() {
      console.log("DeleteBlock");
    }
  }
};
</script>
<style>
.my-card {
  width: 250px;
}
</style>
