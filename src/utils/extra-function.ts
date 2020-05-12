import { IToolbar } from '../models/Toolbar'

/**
 * 处理粗体与斜体冲突问题
 */
function judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos) {
  if (prefix === '*' && subfix === '*') {
    if (
      tmpStr.substring(startPos - 2, startPos - 1) === '*' &&
      tmpStr.substring(endPos + 1, endPos + 2) === '*'
    ) {
      return false
    }
  }
  return true
}

/**
 * 插入内容
 *
 * @param   {HTMLInputElement}  event  [当前textArea节点]
 * @param   {string}  prefix           [md语法前缀]
 * @param   {string}  subfix           [md语法前缀]
 * @param   {string}  title              [md插入默认文本]
 * @param   {boolean}  isSelect        [插入内容后否选中插入的文本]
 */
export const insertTextAtCaret = ($event, { prefix, subfix, title, isSelect = true }: IToolbar, $vm) => {
  if (typeof $event.selectionStart === 'number' && typeof $event.selectionEnd === 'number') {
    const startPos: number = $event.selectionStart
    const endPos: number = $event.selectionEnd
    const tmpContent: string = $event.value

    /**
     * 指针startPos === endPos时，说明未选中内容，在当前指针下直接插入预设内容
     * 否则，指针已选中内容，只插入md语法前缀与后缀
     */
    if (startPos === endPos) {
      // 前文内容 + 语法前缀 + 语法默认值 + 语法后缀 + 后文内容
      $event.value = `${tmpContent.substring(0, startPos)}${prefix}${title}${subfix}${tmpContent.substring(
        endPos,
        tmpContent.length
      )}`

      // 设置指针前后位置，选中添加的内容
      $event.selectionStart = startPos + prefix.length
      $event.selectionEnd = startPos + (title.length + prefix.length)
    } else {
      if (
        tmpContent.substring(startPos - prefix.length, startPos) === prefix &&
        tmpContent.substring(endPos, endPos + subfix.length) === subfix &&
        judgeItalicAndBold(prefix, subfix, tmpContent, startPos, endPos)
      ) {
        // 取消
        $event.value = `${tmpContent.substring(0, startPos - prefix.length)}${tmpContent.substring(
          startPos,
          endPos
        )}${tmpContent.substring(endPos + subfix.length, tmpContent.length)}`
        $event.selectionStart = startPos - prefix.length
        $event.selectionEnd = endPos - prefix.length
      } else {
        // 确定
        $event.value = `${tmpContent.substring(0, startPos)}${prefix}${tmpContent.substring(
          startPos,
          endPos
        )}${subfix}${tmpContent.substring(endPos, tmpContent.length)}`
        $event.selectionStart = startPos + prefix.length
        $event.selectionEnd = startPos + (endPos - startPos + prefix.length)
      }
    }
  } else {
    throw new Error('Browser version is too low')
  }

  if (!isSelect) {
    $event.selectionStart = $event.selectionEnd
  }
  // 设置content值
  $vm.content = $event.value
  $event.focus()
}

/**
 * 滚动联动
 */
export const scrollLink = ($event, $vm) => {
  const element = $event.srcElement ? $event.srcElement : $event.target
  let ratio = element.scrollTop / (element.scrollHeight - element.offsetHeight)

  // 内容变化 导致 高度增加  且滚动条距离底部小于25px 自动滚动到底部
  if (
    $vm.editScrollHeight >= 0 &&
    element.scrollHeight !== $vm.editScrollHeight &&
    element.scrollHeight - element.offsetHeight - element.scrollTop <= 30
  ) {
    $vm.$refs.vmarkdownEditor.scrollTop = element.scrollHeight - element.offsetHeight
    ratio = 1
  }
  $vm.editScrollHeight = element.scrollHeight

  if ($vm.$refs.vmarkdownPreview.scrollHeight > $vm.$refs.vmarkdownPreview.offsetHeight) {
    $vm.$refs.vmarkdownPreview.scrollTop =
      ($vm.$refs.vmarkdownPreview.scrollHeight - $vm.$refs.vmarkdownPreview.offsetHeight) * ratio
  }
}
