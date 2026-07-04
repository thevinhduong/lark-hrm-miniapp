/**
 * Recruitment List Page - Main Logic
 */

const app = getApp()

// Status → label mapping (for jobs that don't have statusLabel set)
const STATUS_LABELS = {
  approved: 'Đã duyệt',
  pending: 'Đang xử lý',
  rejected: 'Đã từ chối',
  cc: 'CC cho tôi',
}

// Build initial mock jobs list (combines app global + any extras)
function buildInitialJobs() {
  const globalJobs = (app.globalData && app.globalData.MOCK_JOB_ORDERS) || []
  return globalJobs.map(j => ({
    ...j,
    statusLabel: j.statusLabel || STATUS_LABELS[j.status] || j.status,
  }))
}

const TABS = [
  { key: 'pending', label: 'Đang xử lý' },
  { key: 'approved', label: 'Đã duyệt' },
  { key: 'cc', label: 'CC cho tôi (3)' },
  { key: 'rejected', label: 'Đã từ chối' },
]

const DEPARTMENTS = [
  'Tất cả phòng ban',
  'Engineering',
  'Product',
  'Design',
  'Quality Assurance',
  'Data',
  'Human Resources',
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'department', label: 'Phòng ban' },
]

Page({
  data: {
    currentTab: 'approved',
    searchQuery: '',
    selectedDepartment: 'Tất cả phòng ban',
    sortLabel: 'Mới nhất',
    sortBy: 'newest',
    jobOrders: [],
    loading: false,
    bottomNavTab: 'Tuyển dụng',
    tabs: TABS,
    departments: DEPARTMENTS,
    sortOptions: SORT_OPTIONS,
  },

  onLoad() {
    // Hydrate from global data
    this._allJobs = buildInitialJobs()
    this.loadData()
  },

  loadData() {
    this.setData({ loading: true })

    // Filter jobs by current tab
    const { currentTab, searchQuery, selectedDepartment } = this.data
    let filtered = (this._allJobs || []).filter(job => job.status === currentTab)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(q) ||
          job.requesterName.toLowerCase().includes(q) ||
          job.department.toLowerCase().includes(q),
      )
    }

    if (selectedDepartment !== 'Tất cả phòng ban') {
      filtered = filtered.filter(job => job.department === selectedDepartment)
    }

    setTimeout(() => {
      this.setData({
        jobOrders: filtered,
        loading: false,
      })
    }, 300)
  },

  onTabChange(e) {
    this.setData({ currentTab: e.detail.tab })
    this.loadData()
  },

  onSearchChange(e) {
    this.setData({ searchQuery: e.detail.query })
    this.loadData()
  },

  onDepartmentChange(e) {
    this.setData({ selectedDepartment: e.detail.department })
    this.loadData()
  },

  onSortChange(e) {
    const option = SORT_OPTIONS.find(s => s.value === e.detail.sort)
    this.setData({
      sortBy: e.detail.sort,
      sortLabel: option ? option.label : 'Mới nhất',
    })
    this.loadData()
  },

  onBottomNavChange(e) {
    this.setData({ bottomNavTab: e.detail.tab })
  },

  onJobOrderTap(e) {
    const jobOrder = e.detail.jobOrder
    if (!jobOrder || !jobOrder.id) return
    tt.navigateTo({
      url: `/pages/detail/index?id=${jobOrder.id}`,
    })
  },
})
