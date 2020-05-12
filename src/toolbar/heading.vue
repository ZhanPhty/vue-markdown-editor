<template>
  <div class="vmd-toolbar-item vmd-toolbar-hd" @mouseenter="show = true">
    <toolbar-icon :icons="iconItem" :isDrop="false" />
    <div class="vmd-toolbar-hd--mark" :style="{ display: show ? '' : 'none' }">
      <span v-for="head in headOpts" :key="head.title" @click="bindClick(head)">
        {{ head.title }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ToolbarIcon from '../components/ToolbarIcon.vue'

@Component({
  components: { ToolbarIcon }
})
export default class Heading extends Vue {
  parentEvent: any = null
  show = false
  headOpts = [
    { title: '一级标题', prefix: '# ', subfix: '' },
    { title: '二级标题', prefix: '## ', subfix: '' },
    { title: '三级标题', prefix: '### ', subfix: '' },
    { title: '四级标题', prefix: '#### ', subfix: '' },
    { title: '五级标题', prefix: '##### ', subfix: '' },
    { title: '六级标题', prefix: '###### ', subfix: '' }
  ]
  iconItem = {
    name: 'heading',
    title: '标题',
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="heading" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heading fa-w-16"><path fill="currentColor" d="M432 80v352h32a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H336a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h32V280H144v152h32a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h32V80H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-32v152h224V80h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16z"></path></svg>'
  }

  bindClick(val) {
    this.show = false
    this.parentEvent.insertContent({ ...val, title: '' })
  }
}
</script>

<style lang="less" scoped>
.vmd-toolbar-hd {
  position: relative;

  &--mark {
    display: none;
    position: absolute;
    left: -50px + 13;
    z-index: 110;
    min-width: 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(10, 10, 10, 0.2);

    & > span {
      font-size: 14px;
      display: block;
      padding: 4px 4px;
      user-select: none;

      &:hover {
        background-color: #f0f2f6;
      }
    }
  }

  &:hover {
    .vmd-toolbar-hd--mark {
      display: block;
    }
  }
}
</style>
