/**
 * Recruitment Detail Page — Stitch Polaris layout
 * Route: /pages/detail/index?id={jobOrderId}
 */

const app = getApp()

const BOTTOM_NAV_TABS = [
  { key: 'group', icon: 'group', label: 'Nhóm chat' },
  { key: 'comment', icon: 'comment', label: 'Bình luận', iconFill: true },
  { key: 'share', icon: 'share', label: 'Chia sẻ' },
  { key: 'more', icon: 'more_vert', label: 'Khác' },
]

const STAGE_LABELS = {
  applied: 'Hồ sơ mới',
  screening: 'Sàng lọc',
  interview: 'Phỏng vấn',
  offer: 'Đề xuất',
  hired: 'Đã tuyển',
  rejected: 'Từ chối',
}

const CURRENT_USER = {
  name: 'Bạn (You)',
  avatar: 'https://ui-avatars.com/api/?name=You&background=0055c7&color=fff&bold=true&size=128',
}

Page({
  data: {
    jobOrder: null,
    relatedCandidates: [],
    candidateSummary: {
      applied: 0,
      screening: 0,
      interview: 0,
      offer: 0,
      hired: 0,
      rejected: 0,
      total: 0,
    },
    comments: [],
    userCommentCount: 0,
    draftComment: '',
    currentUser: CURRENT_USER,
    bottomNavTabs: BOTTOM_NAV_TABS,
    bottomNavTab: 'Bình luận',
    loading: true,
    stageLabelMap: STAGE_LABELS,
  },

  onLoad(query) {
    const id = query && query.id
    if (!id) {
      this.setData({ loading: false })
      tt.showToast({ title: 'Thiếu mã yêu cầu', icon: 'none' })
      return
    }
    this.loadJobOrder(id)
  },

  loadJobOrder(id) {
    const jobOrder = app.globalData.getJobOrderById(id)
    if (!jobOrder) {
      this.setData({ loading: false })
      tt.showToast({ title: 'Không tìm thấy yêu cầu', icon: 'none' })
      return
    }

    const workflow = (jobOrder.workflow || []).map((s, idx) => ({
      ...s,
      stepNumber: idx + 1,
    }))

    const candidateSummary = app.globalData.summarizeCandidateStages(id)
    const allCandidates = app.globalData.getCandidatesByJobId(id)
    const relatedCandidates = allCandidates.slice(0, 3)
    const comments = app.globalData.getCommentsByJobId(id)
    const userCommentCount = comments.filter(c => c.author.kind === 'user').length

    this.setData({
      jobOrder: { ...jobOrder, workflow },
      relatedCandidates,
      candidateSummary,
      comments,
      userCommentCount,
      loading: false,
    })
  },

  onBack() {
    tt.navigateBack({ delta: 1 })
  },

  onMoreTap() {
    tt.showActionSheet({
      itemList: ['Chia sẻ', 'Sao chép liên kết', 'Báo cáo'],
      success(res) {
        console.log('[Detail] Action selected', res.tapIndex)
      },
    })
  },

  onCopyCode() {
    const code = this.data.jobOrder && this.data.jobOrder.requestCode
    if (!code) return
    tt.setClipboardData({
      data: code,
      success() {
        tt.showToast({ title: `Đã sao chép ${code}`, icon: 'none', duration: 1500 })
      },
    })
  },

  onViewAllCandidates() {
    const { jobOrder } = this.data
    if (!jobOrder) return
    tt.navigateTo({
      url: `/pages/candidates/index?jobId=${jobOrder.id}&title=${encodeURIComponent(jobOrder.title)}`,
    })
  },

  onCommentInput(e) {
    this.setData({ draftComment: e.detail.value })
  },

  onSubmitComment() {
    const text = (this.data.draftComment || '').trim()
    if (!text) return
    const newComment = app.globalData.addCommentToMock(
      this.data.jobOrder.id,
      text,
      CURRENT_USER,
    )
    const comments = [newComment, ...this.data.comments]
    const userCommentCount = comments.filter(c => c.author.kind === 'user').length
    this.setData({ comments, userCommentCount, draftComment: '' })
    tt.showToast({ title: 'Đã gửi bình luận', icon: 'success' })
  },

  onAttach() {
    tt.showToast({ title: 'Tính năng đính kèm đang phát triển', icon: 'none' })
  },

  onImage() {
    tt.showToast({ title: 'Tính năng ảnh đang phát triển', icon: 'none' })
  },

  onBottomNavChange(e) {
    this.setData({ bottomNavTab: e.detail.tab })
    const tab = e.detail.tab
    if (tab === 'Nhóm chat') {
      tt.showToast({ title: 'Mở nhóm chat', icon: 'none' })
    } else if (tab === 'Chia sẻ') {
      tt.showActionSheet({
        itemList: ['Chia sẻ nội bộ', 'Chia sẻ ra ngoài', 'Sao chép liên kết'],
      })
    } else if (tab === 'Khác') {
      tt.showActionSheet({
        itemList: ['In', 'Xuất PDF', 'Báo cáo'],
      })
    }
  },
})