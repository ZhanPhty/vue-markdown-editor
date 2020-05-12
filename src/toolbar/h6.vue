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
    name: 'h6',
    title: '六级标题',
    prefix: '###### ',
    subfix: '',
    keyCode: '6',
    isCtrl: true,
    isShift: false,
    isAlt: false,
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="h6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 65" class="svg-inline--fa fa-h6 fa-w-18"><path d="M49.88,8H36.12C34.4,8,33,9.4,33,11.12v0.76C33,13.6,34.4,15,36.12,15H39v14H17V15h2.88C21.6,15,23,13.6,23,11.88v-0.76  C23,9.4,21.6,8,19.88,8H6.12C4.4,8,3,9.4,3,11.12v0.76C3,13.6,4.4,15,6.12,15H9v36H6.12C4.4,51,3,52.4,3,54.12v0.76  C3,56.6,4.4,58,6.12,58h13.76C21.6,58,23,56.6,23,54.88v-0.76C23,52.4,21.6,51,19.88,51H17V37h22v14h-2.88C34.4,51,33,52.4,33,54.12  v0.76C33,56.6,34.4,58,36.12,58h13.76C51.6,58,53,56.6,53,54.88v-0.76C53,52.4,51.6,51,49.88,51H47V15h2.88  C51.6,15,53,13.6,53,11.88v-0.76C53,9.4,51.6,8,49.88,8z"/><path d="M87.86,17.48L87.86,17.48c0-4.85-3.96-8.81-8.81-8.81H68.48c-4.85,0-8.81,3.96-8.81,8.81v31.71c0,4.85,3.96,8.81,8.81,8.81  h10.57c4.85,0,8.81-3.96,8.81-8.81V38.62c0-4.85-3.96-8.81-8.81-8.81H68.48c-0.97,0-1.76-0.79-1.76-1.76V17.48  c0-0.97,0.79-1.76,1.76-1.76h10.57c0.97,0,1.76,0.79,1.76,1.76v0c0,0.97,0.79,1.76,1.76,1.76h3.52  C87.07,19.24,87.86,18.45,87.86,17.48z M80.81,38.62v10.57c0,0.97-0.79,1.76-1.76,1.76H68.48c-0.97,0-1.76-0.79-1.76-1.76V38.62  c0-0.97,0.79-1.76,1.76-1.76h10.57C80.02,36.86,80.81,37.65,80.81,38.62z"/></svg>'
  }
}
</script>
