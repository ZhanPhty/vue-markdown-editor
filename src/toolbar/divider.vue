<template>
  <div class="vmd-toolbar-item">
    <span class="vmd-toolbar-icon">|</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Divider extends Vue {}
</script>

<style lang="less" scoped>
.vmd-toolbar-item {
  width: 14px;
  cursor: default;

  &:hover {
    background-color: transparent;
  }
}

.vmd-toolbar-icon {
  font-size: 15px;
  color: #eee;
  padding-left: 6px;
  padding-right: 6px;
}
</style>
