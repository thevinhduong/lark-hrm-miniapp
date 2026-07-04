import promisify from './libs/api-promise';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const ALL_JOBS = [
  {
    id: '1',
    title: 'Backend Developer',
    department: 'Engineering',
    level: 'Senior',
    count: 2,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Nguyễn Văn An',
    avatar: '',
    requestDate: '03/07/2026',
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Product',
    level: 'Mid-level',
    count: 1,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Trần Thị Mai',
    avatar: '',
    requestDate: '01/07/2026',
  },
  {
    id: '3',
    title: 'QA Engineer',
    department: 'Quality Assurance',
    level: 'Junior',
    count: 1,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Lê Minh Đức',
    avatar: '',
    requestDate: '28/06/2026',
  },
  {
    id: '4',
    title: 'Frontend Developer',
    department: 'Engineering',
    level: 'Mid-level',
    count: 3,
    status: 'pending',
    statusLabel: 'Đang xử lý',
    requesterName: 'Phạm Hương Lan',
    avatar: '',
    requestDate: '02/07/2026',
  },
  {
    id: '5',
    title: 'Data Analyst',
    department: 'Data',
    level: 'Senior',
    count: 1,
    status: 'pending',
    statusLabel: 'Đang xử lý',
    requesterName: 'Hoàng Đức Anh',
    avatar: '',
    requestDate: '30/06/2026',
  },
  {
    id: '6',
    title: 'HR Business Partner',
    department: 'Human Resources',
    level: 'Lead',
    count: 1,
    status: 'cc',
    statusLabel: 'CC cho tôi',
    requesterName: 'Đỗ Thanh Tâm',
    avatar: '',
    requestDate: '25/06/2026',
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    department: 'Engineering',
    level: 'Senior',
    count: 2,
    status: 'rejected',
    statusLabel: 'Đã từ chối',
    requesterName: 'Vũ Minh Tuấn',
    avatar: '',
    requestDate: '20/06/2026',
  },
]

const TABS = [
  { key: 'pending', label: 'Đang xử lý' },
  { key: 'approved', label: 'Đã duyệt' },
  { key: 'cc', label: 'CC cho tôi (3)' },
  { key: 'rejected', label: 'Đã từ chối' },
]

const NAV_ITEMS = [
  { icon: 'add_circle', label: 'Yêu cầu' },
  { icon: 'assignment_ind', label: 'Tuyển dụng' },
  { icon: 'bar_chart', label: 'Báo cáo' },
]

// ─── Block Entry ────────────────────────────────────────────────────────────
Block({
  data: {
    // Filters
    currentTab: 'approved',
    searchQuery: '',
    selectedDept: 'Tất cả phòng ban',
    sortLabel: 'Mới nhất',
    sortBy: 'newest',
    tabs: TABS,

    // Data
    allJobs: ALL_JOBS,
    filteredJobs: [],
    loading: false,

    // Navigation
    activeNavTab: 'Tuyển dụng',
    navItems: NAV_ITEMS,
  },

  onLoad(options) {
    promisify()
    console.log('[HRM Block] onLoad', options)
    tt.hideBlockLoading()
    this.filterJobs()
  },

  onReady() {
    console.log('[HRM Block] onReady')
  },

  onActivate(state) {
    promisify()
    if (state) this.setData(state)
  },

  onInactivate() {
    tt.saveState({ state: this.data })
  },

  onResourceChange(sourceData) {
    console.log('[HRM Block] onResourceChange', sourceData)
  },

  // ─── Methods ─────────────────────────────────────────────────────────────

  filterJobs() {
    const { currentTab, searchQuery, selectedDept, sortBy, allJobs } = this.data
    let jobs = allJobs.filter(job => job.status === currentTab)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      jobs = jobs.filter(
        job =>
          job.title.toLowerCase().includes(q) ||
          job.requesterName.toLowerCase().includes(q) ||
          job.department.toLowerCase().includes(q),
      )
    }

    if (selectedDept !== 'Tất cả phòng ban') {
      jobs = jobs.filter(job => job.department === selectedDept)
    }

    // Sort
    if (sortBy === 'oldest') {
      jobs.sort((a, b) => {
        const [da, ma, ya] = a.requestDate.split('/').map(Number)
        const [db, mb, yb] = b.requestDate.split('/').map(Number)
        return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db)
      })
    } else if (sortBy === 'department') {
      jobs.sort((a, b) => a.department.localeCompare(b.department))
    }

    this.setData({ filteredJobs: jobs, loading: false })
  },

  // ─── Event Handlers ──────────────────────────────────────────────────────

  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value, loading: true })
    setTimeout(() => this.filterJobs(), 200)
  },

  onTabTap(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab, loading: true })
    setTimeout(() => this.filterJobs(), 200)
  },

  onDeptFilterTap() {
    // In production: show a picker modal
    const depts = ['Tất cả phòng ban', 'Engineering', 'Product', 'Quality Assurance', 'Data', 'Human Resources']
    const current = depts.indexOf(this.data.selectedDept)
    const next = depts[(current + 1) % depts.length]
    this.setData({ selectedDept: next, loading: true })
    setTimeout(() => this.filterJobs(), 200)
  },

  onSortFilterTap() {
    const sorts = [
      { value: 'newest', label: 'Mới nhất' },
      { value: 'oldest', label: 'Cũ nhất' },
      { value: 'department', label: 'Phòng ban' },
    ]
    const current = sorts.findIndex(s => s.value === this.data.sortBy)
    const next = sorts[(current + 1) % sorts.length]
    this.setData({ sortBy: next.value, sortLabel: next.label, loading: true })
    setTimeout(() => this.filterJobs(), 200)
  },

  onNavTap(e) {
    this.setData({ activeNavTab: e.currentTarget.dataset.tab })
  },

  onCardTap(e) {
    const id = e.currentTarget.dataset.id
    console.log('[HRM Block] Card tapped:', id)
    // In production: navigate to job detail page
    tt.showToast({ title: 'Job #' + id, icon: 'none', duration: 1000 })
  },

  onMenuTap() {
    console.log('[HRM Block] Menu tapped')
  },

  onMoreTap() {
    console.log('[HRM Block] More tapped')
  },
})
