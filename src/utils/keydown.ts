const KEY_CODE = {
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  B: 66,
  I: 73,
  H: 72,
  U: 85,
  D: 68,
  M: 77,
  Q: 81,
  O: 79,
  L: 76,
  S: 83,
  Z: 90,
  Y: 89,
  C: 67,
  T: 84,
  R: 82,
  V: 86,
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ONE: 97,
  TWO: 98,
  THREE: 99,
  FOUR: 100,
  FIVE: 101,
  SIX: 102,
  _ONE: 49,
  _TWO: 50,
  _THREE: 51,
  _FOUR: 52,
  _FIVE: 53,
  _SIX: 54
}

export const keyDown = ($vm, textAt) => {
  $vm.$el.addEventListener('keydown', function(event) {
    if (
      (textAt.isCtrl === event.ctrlKey || textAt.isCtrl === event.metaKey) &&
      textAt.isShift === event.shiftKey &&
      textAt.isAlt === event.altKey
    ) {
      if (textAt.keyCode && KEY_CODE[textAt.keyCode] === event.keyCode) {
        event.preventDefault()
        $vm.insertContent(textAt)
      }
    }
  })
}

export const listenerKeyDown = $vm => {
  console.log($vm)
  // $vm.$el.addEventListener('keydown', function (event) {
  //   if ((event.ctrlKey || event.metaKey) && event.keyCode === KEY_CODE['V']) {
  //     const { clipboardData = {} } = $vm
  //     console.log($vm)
  //     console.log(clipboardData)
  //   }
  // })
}
