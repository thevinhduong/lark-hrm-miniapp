Component({
  properties: {
    tabs: { type: Array, value: [] },
    activeKey: { type: String, value: 'all' },
  },
  methods: {
    onTabTap(e) {
      const key = e.currentTarget.dataset.key
      if (key === this.data.activeKey) return
      this.triggerEvent('change', { key })
    },
  },
})