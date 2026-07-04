/**
 * Block Creator / Settings Page
 * Hiển thị khi admin cấu hình block trong Workplace editor
 */
Creator({
  onLoad(options) {
    console.log('[HRM Creator] onLoad', options)
  },
  onDestroy() {},
  methods: {
    onSave() {
      tt.showToast({
        title: 'Đã lưu cấu hình',
        icon: 'success',
        duration: 1500,
      })
    },
  },
});
