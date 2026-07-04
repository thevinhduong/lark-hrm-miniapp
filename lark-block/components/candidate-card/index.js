function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getPrimaryActionLabel(stage) {
  switch (stage) {
    case 'screening':
    case 'applied':
      return 'Đề xuất'
    case 'interview':
      return 'Phản hồi'
    case 'offer':
      return 'Gửi thư mới'
    case 'hired':
      return 'Đã tuyển'
    case 'rejected':
      return 'Xem lý do'
    default:
      return 'Hành động'
  }
}

Component({
  properties: {
    candidate: { type: Object, value: {} },
    showActions: { type: Boolean, value: false },
  },
  data: {
    initials: '',
    filledStars: 0,
    primaryActionLabel: 'Hành động',
  },
  observers: {
    'candidate'(candidate) {
      if (!candidate) return
      this.setData({
        initials: getInitials(candidate.name),
        filledStars: Math.floor(candidate.rating || 0),
        primaryActionLabel: getPrimaryActionLabel(candidate.stage),
      })
    },
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { candidate: this.data.candidate })
    },
    onDetailTap() {
      this.triggerEvent('detailtap', { candidate: this.data.candidate })
    },
    onPrimaryAction() {
      this.triggerEvent('primaryaction', {
        candidate: this.data.candidate,
        action: this.data.primaryActionLabel,
      })
    },
  },
})