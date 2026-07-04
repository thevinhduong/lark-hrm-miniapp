Component({
  properties: {
    title: { type: String, value: '' },
    rightIcon: { type: String, value: '' },
  },
  methods: {
    onBack() {
      this.triggerEvent('back')
    },
    onRightTap() {
      this.triggerEvent('righttap')
    },
  },
})