export interface IToolbar {
  icon: string
  name: string
  title: string
  alias?: string
  prefix: string
  subfix: string
  keyCode?: string
  isCtrl?: boolean
  isShift?: boolean
  isAlt?: boolean
  isSelect?: boolean
}
