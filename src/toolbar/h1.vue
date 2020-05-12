<template>
  <div class="vmd-toolbar-item" @click="bindClick">
    <toolbar-icon :icons="iconItem" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ToolbarIcon from '../components/ToolbarIcon.vue'
import { toolbarItem } from '../mixins/toolbar'

@Component({
  components: { ToolbarIcon },
  mixins: [toolbarItem]
})
export default class Strikethrough extends Vue {
  iconItem = {
    name: 'h1',
    title: '一级标题',
    prefix: '# ',
    subfix: '',
    keyCode: '1',
    isCtrl: true,
    isShift: false,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" data-icon="h1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-h1 fa-w-18"><path fill="currentColor" d="M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v21.88A13.06 13.06 0 0 0 205.06 144H232v88H88v-88h26.94A13.06 13.06 0 0 0 128 130.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v18.94A13.06 13.06 0 0 0 13.06 144H40v224H13.06A13.06 13.06 0 0 0 0 381.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-21.88A13.06 13.06 0 0 0 114.94 368H88v-88h144v88h-26.94A13.06 13.06 0 0 0 192 381.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-18.94A13.06 13.06 0 0 0 306.94 368H280V144h26.94A13.06 13.06 0 0 0 320 130.94V112a16 16 0 0 0-16-16zm256 272h-56V120a24 24 0 0 0-24-24h-24a24 24 0 0 0-21.44 13.26l-24 48A24 24 0 0 0 432 192h24v176h-56a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z"></path></svg>'
  }
}
</script>
