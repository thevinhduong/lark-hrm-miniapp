const NAV_ITEMS = [
  { icon: 'add_circle', label: 'Yêu cầu' },
  { icon: 'assignment_ind', label: 'Tuyển dụng' },
  { icon: 'bar_chart', label: 'Báo cáo' },
]

Component({
  properties: {
    activeTab: {
      type: String,
      value: 'Tuyển dụng',
    },
  },

  data: {
    navItems: NAV_ITEMS,
  },

  methods: {
    onNavTap(e) {
      this.triggerEvent('tabChange', { tab: e.currentTarget.dataset.tab })
    },
  },
})
