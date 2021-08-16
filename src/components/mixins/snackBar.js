const snackBarMixin = {
  data: () => ({
    snackBarMixin: {
      show: false,
      message: '',
      timeout: 5000,
      absolute: true,
      color: undefined,
      multiLine: false,
    },
  }),
  methods: {
    showSnackBar(message, options) {
      this.snackBarMixin.message = message;
      this.snackBarMixin.show = true;
      this.snackBarMixin.color = options.color;
    },
  },
};

export default snackBarMixin;
