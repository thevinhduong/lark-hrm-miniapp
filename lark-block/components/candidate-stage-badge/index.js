const STAGE_CONFIG = {
  applied: { label: 'Ứng tuyển', className: 'stage-applied' },
  screening: { label: 'Sàng lọc', className: 'stage-screening' },
  interview: { label: 'Phỏng vấn', className: 'stage-interview' },
  offer: { label: 'Đề xuất', className: 'stage-offer' },
  hired: { label: 'Đã tuyển', className: 'stage-hired' },
  rejected: { label: 'Từ chối', className: 'stage-rejected' },
}

Component({
  properties: {
    stage: { type: String, value: 'applied' },
  },
  data: {
    label: '',
    badgeClass: '',
  },
  observers: {
    'stage'(stage) {
      const config = STAGE_CONFIG[stage] || STAGE_CONFIG.applied
      this.setData({
        label: config.label,
        badgeClass: config.className,
      })
    },
  },
})