<template>
  <div>
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
</template>
<script>
export default {};
</script>
