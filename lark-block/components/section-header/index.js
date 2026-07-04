Component({
  properties: {
    icon: { type: String, value: 'description' },
    title: { type: String, value: '' },
    actionLabel: { type: String, value: '' },
  },
  methods: {
    onActionTap() {
      this.triggerEvent('actiontap')
    },
  },
})