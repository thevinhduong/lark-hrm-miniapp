const TABS = [
  { key: 'pending', label: 'Đang xử lý' },
  { key: 'approved', label: 'Đã duyệt' },
  { key: 'cc', label: 'CC cho tôi (3)' },
  { key: 'rejected', label: 'Đã từ chối' },
]

Component({
  properties: {
    tab: { type: String, value: 'approved' },
    searchQuery: { type: String, value: '' },
    department: { type: String, value: 'Tất cả phòng ban' },
    sortLabel: { type: String, value: 'Mới nhất' },
  },

  data: {
    tabs: TABS,
  },

  methods: {
    onSearchInput(e) {
      this.triggerEvent('searchChange', { query: e.detail.value })
    },
    onTabTap(e) {
      this.triggerEvent('tabChange', { tab: e.currentTarget.dataset.tab })
    },
    onDeptTap() {
      this.triggerEvent('departmentChange', { department: this.data.department })
    },
    onSortTap() {
      this.triggerEvent('sortChange', { sort: 'newest' })
    },
  },
})
