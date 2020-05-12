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
    name: 'h5',
    title: '五级标题',
    prefix: '##### ',
    subfix: '',
    keyCode: '5',
    isCtrl: true,
    isShift: false,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="h5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 65" class="svg-inline--fa fa-h5 fa-w-18"><path d="M74.05,29.24h-7.19V15.86h15.86c1.17,0,2.12-0.95,2.12-2.12v-2.95c0-1.17-0.95-2.12-2.12-2.12H66.86  c-3.97,0-7.19,3.22-7.19,7.19v13.38c0,3.97,3.22,7.19,7.19,7.19h7.19c4.04,0,7.31,3.34,7.19,7.41c-0.12,3.94-3.55,6.97-7.49,6.97  h-6.89v-1.52c0-1.15-0.93-2.08-2.08-2.08h-3.04c-1.15,0-2.08,0.93-2.08,2.08v1.52c0,3.97,3.22,7.19,7.19,7.19h7.19  c7.94,0,14.38-6.44,14.38-14.38S81.99,29.24,74.05,29.24z"/><path d="M49.88,8H36.12C34.4,8,33,9.4,33,11.12v0.76C33,13.6,34.4,15,36.12,15H39v14H17V15h2.88C21.6,15,23,13.6,23,11.88v-0.76  C23,9.4,21.6,8,19.88,8H6.12C4.4,8,3,9.4,3,11.12v0.76C3,13.6,4.4,15,6.12,15H9v36H6.12C4.4,51,3,52.4,3,54.12v0.76  C3,56.6,4.4,58,6.12,58h13.76C21.6,58,23,56.6,23,54.88v-0.76C23,52.4,21.6,51,19.88,51H17V37h22v14h-2.88C34.4,51,33,52.4,33,54.12  v0.76C33,56.6,34.4,58,36.12,58h13.76C51.6,58,53,56.6,53,54.88v-0.76C53,52.4,51.6,51,49.88,51H47V15h2.88  C51.6,15,53,13.6,53,11.88v-0.76C53,9.4,51.6,8,49.88,8z"/></svg>'
  }
}
</script>
