import { PluginObject } from 'vue'
import _VueMarkdownEditor from './VueMarkdownEditor.vue'

const VueMarkdownEditor: PluginObject<_VueMarkdownEditor> = {
  install(Vue) {
    Vue.component(_VueMarkdownEditor.name, _VueMarkdownEditor)
  }
}

export { VueMarkdownEditor }
export default _VueMarkdownEditor
