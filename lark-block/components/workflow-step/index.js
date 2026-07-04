Component({
  properties: {
    status: { type: String, value: 'pending' }, // 'done' | 'active' | 'pending'
    title: { type: String, value: '' },
    meta: { type: String, value: '' },
    stepNumber: { type: Number, value: 1 },
    isLast: { type: Boolean, value: false },
  },
  data: {
    statusClass: '',
    dotClass: '',
  },
  observers: {
    'status'(status) {
      this.setData({
        statusClass: status,
        dotClass: status,
      })
    },
  },
})