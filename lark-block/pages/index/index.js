/**
 * Recruitment List Page - Main Logic
 */

// Mock data
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Backend Developer',
    department: 'Engineering',
    level: 'Senior',
    count: 2,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Nguyễn Văn An',
    requesterAvatar: '',
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
    requesterAvatar: '',
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
    requesterAvatar: '',
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
    requesterAvatar: '',
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
    requesterAvatar: '',
    requestDate: '30/06/2026',
  },
]

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
    this.loadData()
  },

  loadData() {
    this.setData({ loading: true })

    // Filter jobs by current tab
    const { currentTab, searchQuery, selectedDepartment } = this.data
    let filtered = MOCK_JOBS.filter(job => job.status === currentTab)

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
})
