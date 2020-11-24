export default {
  data() {
    return {
      currentStatus: false
    };
  },
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    details: {
      type: Object,
      default: {}
    }
  },
  watch: {
    value(val) {
      this.currentStatus = val;
    },
    currentStatus(val) {
      this.$emit("input", val);
    }
  }
};
