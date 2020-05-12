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
export default class Italic extends Vue {
  iconItem = {
    name: 'italic',
    title: '斜体',
    prefix: '*',
    subfix: '*',
    keyCode: 'I',
    isCtrl: true,
    isShift: false,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="italic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-italic fa-w-10 fa-3x"><path fill="currentColor" d="M320 48v16a16 16 0 0 1-16 16h-67l-88 352h59a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h67l88-352h-59a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"></path></svg>'
  }
}
</script>
