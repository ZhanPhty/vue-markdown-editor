<template>
  <div class="vmd-toolbar-hover">
    <span class="vmd-toolbar-icon" :class="icons.name" v-html="icons.icon" />
    <div class="vmd-toolbar-hover--mark" v-if="isDrop">
      <span>{{ titleData }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IToolbar } from '../models/Toolbar'

@Component
export default class ToolbarIcon extends Vue {
  // icon数据
  @Prop({ required: true }) private icons!: IToolbar
  @Prop({ default: true }) isDrop!: boolean

  get titleData() {
    const { title, alias, keyCode, isCtrl, isShift, isAlt } = { ...this.icons }

    if (keyCode && keyCode !== '') {
      return (
        `${alias || title}（${isCtrl ? (this.isMac ? '⌘' : 'Ctrl') : ''}` +
        `${isCtrl && !this.isMac ? '+' : ''}` +
        `${isShift ? (this.isMac ? '⇧' : 'Shift') : ''}` +
        `${isShift && !this.isMac ? '+' : ''}` +
        `${isAlt ? (this.isMac ? '⌥' : 'Alt') : ''}` +
        `${isAlt && !this.isMac ? '+' : ''}` +
        `${keyCode}）`
      )
    } else {
      return alias || title
    }
  }

  isMac: boolean =
    navigator.platform === 'Mac68K' ||
    navigator.platform === 'MacPPC' ||
    navigator.platform === 'Macintosh' ||
    navigator.platform === 'MacIntel'
}
</script>

<style lang="less">
.vmd-toolbar-hover {
  position: relative;
  display: block;

  &--mark {
    display: none;
    position: absolute;
    white-space: nowrap;
    font-size: 10px;
    line-height: 1;
    text-align: left;
    background-color: #fff;
    padding: 3px 4px;
    box-shadow: 0 1px 6px rgba(10, 10, 10, 0.2);
    border-radius: 2px;
    z-index: 9;
    color: #666;
    left: 0;
    opacity: 0.8;
  }

  &:hover {
    .vmd-toolbar-hover--mark {
      display: block;

      &:hover {
        display: none;
      }
    }
  }
}

.vmd-toolbar-icon {
  height: 15px;
  display: inline-block;
  line-height: 1;
  margin-top: -2px;
  vertical-align: middle;
  user-select: none;

  svg {
    height: 100%;

    path {
      fill: #888;
    }
  }
}
</style>
