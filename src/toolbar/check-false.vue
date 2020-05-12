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
export default class CheckFalse extends Vue {
  iconItem = {
    name: 'check-false',
    title: '未完成列表',
    prefix: '- [ ] ',
    subfix: '',
    keyCode: 'U',
    isCtrl: true,
    isShift: false,
    isAlt: true,
    icon:
      '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-square fa-w-14"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z" class=""></path></svg>'
  }
}
</script>
