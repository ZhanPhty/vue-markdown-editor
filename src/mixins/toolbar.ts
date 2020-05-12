export const toolbarItem = {
  data() {
    return {
      parentEvent: null,
      iconItem: {}
    }
  },
  mounted() {
    const that = this as any
    that.parentEvent.registerKeyDown(that.iconItem)
  },
  methods: {
    /**
     * 点击按钮
     */
    bindClick() {
      const that = this as any
      that.parentEvent.insertContent(that.iconItem)
    }
  }
}
