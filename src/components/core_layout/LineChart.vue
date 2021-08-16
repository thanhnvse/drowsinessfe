<template>
  <!-- <div id="chart-area">
    <apexchart
      type="area"
      height="160"
      :options="chartOptionsArea"
      :series="seriesArea"
    ></apexchart>
  </div> -->
  <div id="chart-area">
    <apexchart
      width="800"
      height="330"
      type="area"
      :options="chartOptions"
      :series="getResultValue"
    ></apexchart>
    <div style="font-size: 20px; fontweight: bold; color: #777cf5" class="d-flex justify-center">
      Drowsiness Trackings In 30 Days Ago
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'LineChart',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    inputData2: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'yt',
          group: 'social',
          type: 'area',
          height: 160,
        },
        xaxis: {
          type: 'datetime',
          //   categories: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003'],
          min: this.getFirstValue,
        },
      },
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        // {
        //   name: 'North',
        //   data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        //     min: 10,
        //     max: 20,
        //   }),
        // },

        // {
        //   name: 'Central',
        //   data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        //     min: 10,
        //     max: 15,
        //   }),
        // },
      ],
    };
  },
  methods: {
    getResult(trackings) {
      const results = [];
      const value = {
        data: trackings,
        name: 'Trackings',
      };
      results.push(value);
      return results;
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
    generateDayWiseTimeSeries(baseval, count, yrange) {
      let i = 0;
      const series = [];
      while (i < count) {
        const x = baseval;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        // eslint-disable-next-line no-param-reassign
        baseval += 86400000;
        i += 1;
      }
      return series;
    },
  },
  computed: {
    get30DaysAgo() {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date.getTime();
    },
    get30DaysEnd() {
      const date = new Date();
      return date.getTime();
    },
    get30DaysFrom() {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date.getTime();
    },
    getDataEachMonth() {
      return this.inputData2
        .filter(
          (item) => item.trackingAt >= this.get30DaysFrom && item.trackingAt <= this.get30DaysEnd,
        )
        .map((item) => ({
          trackingAt: new Date(item.trackingAt).toLocaleDateString(),
        }));
    },
    getResultData() {
      return (
        Array.from(this.groupBy(this.getDataEachMonth, (item) => item.trackingAt))
          .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
          // eslint-disable-next-line array-callback-return
          .map((item) => {
            const arr = [];
            arr.push(new Date(item[0]).getTime());
            arr.push(item[1].length);
            return arr;
          })
      );
    },
    getResultData2() {
      return Array.from(this.groupBy(this.getDataEachMonth, (item) => item.trackingAt))
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map((item) => item[0]);
    },
    getFirstValue() {
      return new Date(this.getResultData2[0]).getTime() - 24 * 60 * 60 * 1000;
    },
    getResultValue() {
      return this.getResult(this.getResultData);
    },
  },
};
</script>
