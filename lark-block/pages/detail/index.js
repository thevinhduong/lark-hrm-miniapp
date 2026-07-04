/**
 * Recruitment Detail Page
 * Route: /pages/detail/index?id={jobOrderId}
 */

const app = getApp()

Page({
  data: {
    jobOrder: null,
    candidateSummary: {
      applied: 0,
      screening: 0,
      interview: 0,
      offer: 0,
      hired: 0,
      rejected: 0,
      total: 0,
    },
    commentText: '',
    bottomNavTab: 'Tuyển dụng',
    loading: true,
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

    const candidateSummary = app.globalData.summarizeCandidateStages(id)

    this.setData({
      jobOrder,
      candidateSummary,
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

  onViewAllCandidates() {
    const { jobOrder } = this.data
    if (!jobOrder) return
    tt.navigateTo({
      url: `/pages/candidates/index?jobId=${jobOrder.id}&title=${encodeURIComponent(jobOrder.title)}`,
    })
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value })
  },

  onAttachTap() {
    tt.showToast({ title: 'Tính năng đang phát triển', icon: 'none' })
  },

  onSubmitComment() {
    const text = (this.data.commentText || '').trim()
    if (!text) {
      tt.showToast({ title: 'Vui lòng nhập bình luận', icon: 'none' })
      return
    }
    tt.showToast({ title: 'Đã thêm bình luận', icon: 'success' })
    this.setData({ commentText: '' })
  },

  onBottomNavChange(e) {
    this.setData({ bottomNavTab: e.detail.tab })
    const tab = e.detail.tab
    if (tab === 'Yêu cầu') {
      // In production, would navigate to "create request" page
      tt.showToast({ title: 'Tạo yêu cầu mới', icon: 'none' })
    } else if (tab === 'Báo cáo') {
      tt.showToast({ title: 'Mở báo cáo', icon: 'none' })
    }
    // 'Tuyển dụng' is current page — do nothing
  },
})