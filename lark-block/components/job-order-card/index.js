Component({
  properties: {
    jobOrder: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { jobOrder: this.data.jobOrder })
    },
  },
})
