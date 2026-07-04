Component({
  properties: {
    count: { type: Number, value: 0 },
    label: { type: String, value: '' },
    accent: { type: String, value: 'primary' }, // 'primary' | 'warning' | 'tertiary' | 'success'
  },
  data: {
    accentClass: '',
  },
  observers: {
    'accent'(accent) {
      this.setData({ accentClass: accent })
    },
  },
})