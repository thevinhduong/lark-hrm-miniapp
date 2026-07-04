/**
 * Candidate Management Page
 * Route: /pages/candidates/index?jobId={jobOrderId}&title={encodedTitle}
 */

const app = getApp()

const STAGE_TAB_DEFS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'screening', label: 'Chờ phỏng vấn' },
  { key: 'interview', label: 'Đang phỏng vấn' },
  { key: 'offer', label: 'Đang đánh giá' },
  { key: 'hired', label: 'Đã tuyển' },
]

const SORT_OPTIONS = [
  { value: 'recent', label: 'Gần đây' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'experience', label: 'Kinh nghiệm' },
  { value: 'name', label: 'Theo tên' },
]

Page({
  data: {
    pageTitle: 'Quản lý ứng viên',
    jobId: '',
    jobTitle: '',
    candidates: [],
    filteredCandidates: [],
    activeStage: 'all',
    stageTabs: STAGE_TAB_DEFS,
    sortOptions: SORT_OPTIONS,
    sortBy: 'recent',
    sortLabel: 'Gần đây',
    sortOpen: false,
    searchQuery: '',
    loading: true,
    bottomNavTab: 'Tuyển dụng',
    stats: {
      applied: 0,
      screening: 0,
      interview: 0,
      offer: 0,
      hired: 0,
      rejected: 0,
      total: 0,
    },
  },

  onLoad(query) {
    const jobId = (query && query.jobId) || ''
    const jobTitle = (query && query.title) || ''
    if (jobTitle) {
      this.setData({ pageTitle: `Hồ sơ · ${decodeURIComponent(jobTitle)}` })
    }
    this.setData({ jobId })
    if (jobId) {
      this.loadCandidates()
    } else {
      this.setData({ loading: false })
    }
  },

  loadCandidates() {
    this.setData({ loading: true })
    const summary = app.globalData.summarizeCandidateStages(this.data.jobId)
    const candidates = app.globalData.getCandidatesByJobId(this.data.jobId)
    this.setData({
      stats: summary,
      candidates,
      filteredCandidates: this.applySort(candidates, this.data.sortBy),
      loading: false,
    })
    this.applyFilters()
  },

  applyFilters() {
    let list = [...this.data.candidates]

    // Stage filter
    if (this.data.activeStage !== 'all') {
      list = list.filter(c => c.stage === this.data.activeStage)
    }

    // Search filter
    const q = (this.data.searchQuery || '').toLowerCase().trim()
    if (q) {
      list = list.filter(c => {
        const haystack = [
          c.name,
          c.currentTitle,
          c.currentCompany,
          c.source,
          ...(c.skills || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    // Sort
    list = this.applySort(list, this.data.sortBy)

    this.setData({ filteredCandidates: list })
  },

  applySort(list, sortBy) {
    const sorted = [...list]
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'experience':
        sorted.sort((a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0))
        break
      case 'name':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi'))
        break
      case 'recent':
      default:
        sorted.sort((a, b) => this.parseDate(b.appliedDate) - this.parseDate(a.appliedDate))
    }
    return sorted
  },

  parseDate(d) {
    if (!d) return 0
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, month - 1, day).getTime()
  },

  onTabChange(e) {
    const key = e.detail.key
    this.setData({ activeStage: key })
    this.applyFilters()
  },

  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value })
    this.applyFilters()
  },

  onFilterTap() {
    tt.showToast({ title: 'Bộ lọc nâng cao đang phát triển', icon: 'none' })
  },

  onSortTap() {
    this.setData({ sortOpen: !this.data.sortOpen })
  },

  onSortSelect(e) {
    const value = e.currentTarget.dataset.value
    const option = SORT_OPTIONS.find(s => s.value === value)
    this.setData({
      sortBy: value,
      sortLabel: option ? option.label : 'Gần đây',
      sortOpen: false,
    })
    this.applyFilters()
  },

  onCandidateTap(e) {
    // Open detail sheet / modal — for now toast
    const candidate = e.detail.candidate
    tt.showToast({
      title: `Hồ sơ: ${candidate.name}`,
      icon: 'none',
      duration: 1500,
    })
  },

  onCandidateDetail(e) {
    const candidate = e.detail.candidate
    tt.showModal({
      title: candidate.name,
      content: `Vị trí: ${candidate.currentTitle}\nCông ty: ${candidate.currentCompany}\nKinh nghiệm: ${candidate.yearsOfExperience} năm\nNguồn: ${candidate.source}`,
      showCancel: false,
      confirmText: 'Đóng',
    })
  },

  onCandidateAction(e) {
    const { candidate, action } = e.detail
    tt.showToast({
      title: `${action} → ${candidate.name}`,
      icon: 'none',
      duration: 1500,
    })
  },

  onAddCandidate() {
    tt.showToast({ title: 'Tính năng thêm ứng viên đang phát triển', icon: 'none' })
  },

  onBack() {
    tt.navigateBack({ delta: 1 })
  },

  onBottomNavChange(e) {
    this.setData({ bottomNavTab: e.detail.tab })
    const tab = e.detail.tab
    if (tab === 'Tuyển dụng') {
      tt.navigateBack({ delta: 1 })
    } else {
      tt.showToast({ title: `Mở ${tab}`, icon: 'none' })
    }
  },
})