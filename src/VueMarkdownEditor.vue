<template>
  <div class="vmarkdown-main" :style="{ height: height }" :class="className" ref="vmarkdownBox">
    <!-- 工具栏 -->
    <div class="vmarkdown-toolbar">
      <div class="vmarkdown-toolbar-item vmarkdown-toolbar-left">
        <span
          v-for="(toolBar, index) in allToolBars"
          :key="index"
          :ref="`toolbar_${toolBar.name}_${toolBar.key}`"
        />
      </div>
      <div class="vmarkdown-toolbar-item vmarkdown-toolbar-right"></div>
    </div>

    <!-- 编辑器区域 -->
    <div class="vmarkdown-cnt" @mousemove="handleMouseMoveEditor" @mouseup="isStarMove = false">
      <div class="vmarkdown-cnt--textarea" ref="vmarkdownEditor" @scroll="handleScrollEditor">
        <div class="vmarkdown-cnt--textarea__gap">
          <div class="vmarkdown-cnt--textarea__box">
            <pre class="vmarkdown-cnt--textarea__block">{{ content }}</pre>
            <textarea
              ref="vmarkdownTextarea"
              class="vmarkdown-cnt--textarea__cnt"
              :placeholder="placeholder"
              spellcheck="false"
              v-model="content"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="vmarkdown-cnt--subject" @mousedown="handleMouseDownEditor">
        ||
      </div>
      <div class="vmarkdown-cnt--preview" :class="previewStyle">
        <div ref="vmarkdownPreview" class="vmarkdown-cnt--preview__html" v-html="contentHtml"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import markdownIt from './utils/markdown-it'
import toolbarDefault from './utils/toolbar-option'
import { insertTextAtCaret, scrollLink } from './utils/extra-function'
import { keyDown, listenerKeyDown } from './utils/keydown'

@Component({})
export default class VueMarkdownEditor extends Vue {
  @Prop() value!: string
  @Prop() className!: string
  @Prop({ default: 'markdown-body' }) previewStyle!: string
  @Prop({ default: '80vh' }) height!: string
  @Prop({ default: true }) bordered!: boolean
  @Prop({ default: '请输入内容...' }) placeholder!: string
  @Prop({ default: () => toolbarDefault }) toolbars!: string[]
  @Prop({ default: true }) syncScroll!: boolean

  // $data()
  md = markdownIt
  isStarMove = false
  movePos = null
  allToolBars: Array<any> = []
  content = ''
  contentHtml = ''
  editScrollHeight = -1

  @Watch('content')
  onWatchContent(val) {
    this.renderContent(val)
    this.$emit('input', val)
  }

  created() {
    this.content = this.value
    // 初始化toolbar
    this.initToolBars()

    // 添加全局监控事件
    this.$nextTick(() => {
      // listenerKeyDown(this)
    })
  }

  /**
   * 初始化toolbar
   */
  initToolBars() {
    this.toolbars.map((item: string) => {
      const vueComp = require(`./toolbar/${item}.vue`)

      this.registerToolBar(item, vueComp)
    })
  }

  /**
   * 注册toolbar
   */
  registerToolBar(name: string, component: any, index?: number) {
    const extComp = Vue.extend(component.default)
    const instance = new extComp({
      data: {
        parentEvent: this
      }
    })
    const vueMount = {
      name,
      instance,
      key: this.allToolBars.length
    }

    if (index) {
      this.allToolBars.splice(index, 0, vueMount as any)
    } else {
      this.allToolBars.push(vueMount)
    }
    // 挂载toolbar组件
    this.$nextTick(() => {
      const toolKey = `toolbar_${vueMount.name}_${vueMount.key}`
      instance.$mount(this.$refs[toolKey][0])
    })
  }

  /**
   * 注册快捷键，监控keydown
   */
  registerKeyDown(textAt) {
    keyDown(this, textAt)
  }

  /**
   * 鼠标在编辑器上移动
   * 计算鼠标移动距离
   */
  handleMouseMoveEditor(event) {
    if (this.isStarMove) {
      const screenX = event.screenX - (this as any).movePos.screenX
      const vEl = (this as any).$refs.vmarkdownEditor
      vEl.style.width = `${vEl.offsetWidth + screenX}px`
      this.movePos = event
    }
  }

  /**
   * 鼠标按下事件
   * 按下控制器，准备开始开始拖动
   */
  handleMouseDownEditor(event) {
    this.isStarMove = true
    this.movePos = event
  }

  /**
   * 滚动编辑器，滚动联动
   */
  handleScrollEditor($event) {
    if (this.syncScroll) {
      scrollLink($event, this)
    }
  }

  /**
   * 插入内容
   */
  insertContent(textAt) {
    insertTextAtCaret(this.$refs.vmarkdownTextarea, textAt, this)
  }

  /**
   * 插入图片
   */
  insertImage(url = '') {
    insertTextAtCaret(
      this.$refs.vmarkdownTextarea,
      {
        icon: '',
        name: 'image',
        title: url,
        prefix: '![](',
        subfix: ')'
      },
      this
    )
  }

  /**
   * 监控图片上传事件
   */
  handleUploadImage(files, e) {
    this.$emit('on-upload-image', files, this.insertImage)
    e.preventDefault()
  }

  /**
   * 使用markdown-it渲染内容
   */
  renderContent(content: string) {
    this.contentHtml = this.md.render(content || '')
  }

  /**
   * 清空内容
   */
  clearContent() {
    this.content = ''
    this.renderContent('')
  }
}
</script>

<style lang="less" scoped>
@borderColor: #eff3f9;
@paddingGap: 30px;
@fontSize: 14px;
@lineHeight: 1.8;
@fontFamily: Menlo, 'Ubuntu Mono', Consolas, 'Courier New', 'Microsoft Yahei', 'Hiragino Sans GB',
  'WenQuanYi Micro Hei', sans-serif;

// main区域
.vmarkdown-main {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 360px;
  background-color: #fff;
}

// toolbar区域
.vmarkdown-toolbar {
  position: relative;
  display: flex;
  padding: 0 12px;
  border-bottom: 1px solid #f2f6fc;
  background-color: #fff;

  .vmarkdown-toolbar-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
  }

  .vmarkdown-toolbar-right {
    padding-left: 20px;
  }
}

// 编辑器区域
.vmarkdown-cnt {
  position: relative;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &--textarea {
    position: relative;
    width: 50%;
    min-width: 240px;
    padding: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;

    &__gap {
      padding: 0 @paddingGap;
      height: 100%;
    }

    &__box {
      position: relative;
      width: 100%;
      min-height: 100%;
      margin: 0;
      padding: 0;
      font-size: 14px;
    }

    &__block {
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word !important;
      visibility: hidden;
      overflow: hidden;
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      padding: @paddingGap / 2 4px;
      font-family: @fontFamily;
      font-size: @fontSize;
      line-height: @lineHeight;
    }

    &__cnt {
      position: absolute;
      outline: none;
      border: none;
      resize: none;
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      margin: 0;
      padding: 0;
      top: 0;
      left: 0;

      padding: @paddingGap / 2 4px;
      font-family: @fontFamily;
      font-size: @fontSize;
      line-height: @lineHeight;
    }
  }

  &--subject {
    width: 12px;
    cursor: col-resize;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #999;
    user-select: none;
    border-left: 1px solid @borderColor;
    border-right: 1px solid @borderColor;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  }

  &--preview {
    flex: 1 1 0%;
    width: 50%;
    overflow-y: auto;
    padding: 0;

    &__html {
      width: 100%;
      height: 100%;
      padding: @paddingGap / 2 @paddingGap;
      overflow-y: auto;
      box-sizing: border-box;
      overflow-x: hidden;
      background-color: #fff;
    }
  }
}

.auto-textarea-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: normal;
}
.auto-textarea-wrapper .auto-textarea-block {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word !important;
  visibility: hidden;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 100%;
}
.auto-textarea-wrapper .auto-textarea-input {
  font-family: Menlo, 'Ubuntu Mono', Consolas, 'Courier New', 'Microsoft Yahei', 'Hiragino Sans GB',
    'WenQuanYi Micro Hei', sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
  color: #2c3e50;
}
.auto-textarea-wrapper .auto-textarea-input.no-border {
  outline: 0 none;
  border: none !important;
}
.auto-textarea-wrapper .auto-textarea-input.no-resize {
  resize: none;
}
</style>

<style lang="less">
.vmarkdown-toolbar-item {
  & > div {
    display: inline-block;
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.4s;

    .h1,
    .h2,
    .h3,
    .h4 {
      height: 18px;
      margin-right: 2px;
      margin-left: 2px;
    }

    &:hover,
    &.toolbar-active {
      background-color: #e9eaee;
      transition: all 0.4s;
    }
  }
}

.vmarkdown-cnt--preview {
  .txt-center {
    text-align: center;
  }

  .txt-right {
    text-align: right;
  }

  .txt-left {
    text-align: left;
  }
}
</style>
