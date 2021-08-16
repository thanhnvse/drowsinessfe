const validateMixins = {
  data: () => ({
    isPositiveInt: [
      (num) => Math.sign(Number(num)) === 1,
      (num) => Number.isInteger(Number(num)),
      (num) => console.log(num),
    ],
    isPositiveNum: [(num) => !Number.isNaN(Number(num)), (num) => Math.sign(Number(num)) === 1],
  }),
  methods: {
    allowedDates: (dayStr) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectDay = new Date(dayStr);
      selectDay.setHours(0, 0, 0, 0);
      return selectDay.getTime() >= today.getTime();
    },
    isNum(input) {
      const num = Number(input);
      if (Number.isNaN(num)) {
        return false;
      }
      return true;
    },
  },
};

export default validateMixins;
