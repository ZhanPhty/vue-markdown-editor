/**
 * 引入markdown-it，以及相关功能插件
 */

// 下标
const sub = require('markdown-it-sub')
// 上标
const sup = require('markdown-it-sup')
// <dl/>
const deflist = require('markdown-it-deflist')
// <abbr/>
const abbr = require('markdown-it-abbr')
// 脚注
const footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
const insert = require('markdown-it-ins')
// 标记
const mark = require('markdown-it-mark')
// taskLists
const taskLists = require('markdown-it-task-lists')
// container 用于创建自定义的块级容器
const container = require('markdown-it-container')
// 目录
const toc = require('markdown-it-toc')
// math katex
const katex = require('markdown-it-katex-external')
// 图片预览
const miip = require('markdown-it-images-preview')

// 代码高亮
import hljsLangs from './lang.hljs'
const hljs = require('highlight.js')

const markdown = require('markdown-it')({
  html: true, // 编译html标签
  xhtmlOut: true, // 使用 '/' 闭合html标签，如：<br />
  breaks: true, // 将段落中的 '\n' 转换为<br>
  langPrefix: 'language-', // 给css添加前缀
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '“”‘’',

  // 高亮函数，会返回转义的 HTML。
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: (str, lang) => {
    const cusLang = hljsLangs[lang || 'js']
    if (hljs.getLanguage(cusLang)) {
      return `<pre class="hljs"><code>${hljs.highlight(cusLang, str, true).value}</code></pre>`
    } else {
      return `<pre><code class="${lang}">${markdown.utils.escapeHtml(str)}</code></pre>`
    }
  }
})

// add target="_blank" to all link
/* eslint-disable @typescript-eslint/camelcase */
const defaultRender =
  markdown.renderer.rules.link_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
markdown.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

markdown
  .use(sup)
  .use(sub)
  .use(container)
  .use(container, 'txt-left') /* align left */
  .use(container, 'txt-center') /* align center */
  .use(container, 'txt-right') /* align right */
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)
  .use(miip)
  .use(katex)
  .use(taskLists)
  .use(toc)

export default markdown
