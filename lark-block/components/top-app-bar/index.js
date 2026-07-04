Component({
  properties: {
    title: {
      type: String,
      value: 'Tuyển dụng',
    },
  },

  methods: {
    onMenuTap() {
      this.triggerEvent('menuTap')
    },
    onMoreTap() {
      this.triggerEvent('moreTap')
    },
  },
})
