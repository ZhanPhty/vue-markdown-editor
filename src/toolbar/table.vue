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
export default class Quote extends Vue {
  iconItem = {
    name: 'table',
    title: '',
    alias: '表格',
    prefix: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n',
    subfix: '',
    keyCode: 'Q',
    isCtrl: true,
    isShift: false,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-table fa-w-16 fa-3x"><path fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM160 448H48c-8.837 0-16-7.163-16-16v-80h128v96zm0-128H32v-96h128v96zm0-128H32V96h128v96zm160 256H192v-96h128v96zm0-128H192v-96h128v96zm0-128H192V96h128v96zm160 160v80c0 8.837-7.163 16-16 16H352v-96h128zm0-32H352v-96h128v96zm0-128H352V96h128v96z"></path></svg>'
  }
}
</script>
