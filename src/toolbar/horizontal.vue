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
export default class Horizontal extends Vue {
  iconItem = {
    name: 'horizontal',
    title: '',
    alias: '分割线',
    prefix: '---\n',
    subfix: '',
    keyCode: 'H',
    isCtrl: true,
    isShift: true,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="horizontal-rule" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-horizontal-rule fa-w-20"><path fill="currentColor" d="M640 247.5v17a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-17a16 16 0 0 1 16-16h608a16 16 0 0 1 16 16z" class=""></path></svg>'
  }
}
</script>
