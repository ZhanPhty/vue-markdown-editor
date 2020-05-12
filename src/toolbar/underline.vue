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
export default class Underline extends Vue {
  iconItem = {
    name: 'underline',
    title: '下划线',
    prefix: '++',
    subfix: '++',
    keyCode: 'U',
    isCtrl: true,
    isShift: false,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="underline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-underline fa-w-14"><path fill="currentColor" d="M32 48h32v208c0 88.22 71.78 160 160 160s160-71.78 160-160V48h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H288a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h32v208a96 96 0 0 1-192 0V48h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H32a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16zm400 416H16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z"></path></svg>'
  }
}
</script>
