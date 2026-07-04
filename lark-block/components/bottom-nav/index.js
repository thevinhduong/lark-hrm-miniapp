Component({
  properties: {
    tabs: { type: Array, value: [] },
    activeTab: { type: String, value: '' },
  },
  data: {
    navClass: '',
  },
  observers: {
    'tabs'(tabs) {
      this.setData({ navClass: tabs && tabs.length === 4 ? 'four-tabs' : 'three-tabs' })
    },
  },
  methods: {
    onTabTap(e) {
      const tab = e.currentTarget.dataset.tab
      this.triggerEvent('tabChange', { tab })
    },
  },
})