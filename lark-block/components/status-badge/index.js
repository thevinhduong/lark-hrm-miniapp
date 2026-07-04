const STATUS_MAP = {
  approved: 'badge-approved',
  pending: 'badge-pending',
  rejected: 'badge-rejected',
  cc: 'badge-cc',
}

Component({
  properties: {
    status: {
      type: String,
      value: 'approved',
    },
    label: {
      type: String,
      value: '',
    },
  },

  data: {
    badgeClass: '',
  },

  observers: {
    status(newStatus) {
      this.setData({ badgeClass: STATUS_MAP[newStatus] || 'badge-approved' })
    },
  },
})
