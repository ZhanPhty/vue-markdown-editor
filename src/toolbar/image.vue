<template>
  <div class="vmd-toolbar-item vmd-toolbar-hd" @mouseenter="show = true">
    <toolbar-icon :icons="iconItem" :isDrop="false" />
    <div class="vmd-toolbar-hd--mark" :style="{ display: show ? '' : 'none' }">
      <span @click="bindInsImg">添加图片连接</span>
      <span @click="bindUpload">上传图片</span>
      <input
        type="file"
        ref="uploadInput"
        class="vmd-toolbar-upload"
        @change="upload"
        hidden
        accept="image/*"
        multiple
      />
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
  iconItem = {
    name: 'image',
    title: '图片',
    icon:
      '<svg aria-hidden="true" focusable="false" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-image fa-w-16 fa-3x"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg>'
  }

  created() {
    this.$nextTick(() => {
      this.parentEvent.$el.addEventListener('paste', event => {
        this.onPaste(event)
      })
    })
  }

  onPaste(event) {
    const that = this as any
    const { clipboardData = {} } = event
    const { types = [], items } = clipboardData
    let item = null

    for (let i = 0; i < types.length; i++) {
      if (types[i] === 'Files') {
        item = items[i]
        break
      }
    }
    if (item) {
      const file = (item as any).getAsFile()
      if (/image/gi.test(file.type)) {
        that.parentEvent.handleUploadImage([file], event)
      }
    }
  }

  bindInsImg() {
    this.parentEvent.insertContent({ prefix: '![](', subfix: ')', title: '' })
    this.show = false
  }

  bindUpload() {
    const el: any = this.$refs.uploadInput
    el.click()
  }

  upload(e) {
    const files = Array.from(e.target.files)
    this.parentEvent.handleUploadImage(files, e)
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

  .vmd-toolbar-upload {
    display: none;
    visibility: hidden;
  }
}
</style>
