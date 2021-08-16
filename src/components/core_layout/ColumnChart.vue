<template>
  <div id="chart">
    <v-row class="d-flex align-center pb-12">
      <v-spacer />
      <v-col cols="3">
        <v-select
          v-model="roomStatus.selected"
          :items="roomStatus.items"
          hide-details
          background-color="#777CF5"
          dark
          dense
          solo
          class="size-sub-3 font-nunito"
        ></v-select>
      </v-col>
    </v-row>
    <apexchart type="bar" height="350" :options="chartOptions" :series="getDataByMonth" v-if="roomStatus.selected==='YEAR'"></apexchart>
    <line-chart v-if="roomStatus.selected==='MONTH'" :inputData2="inputData"/>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import LineChart from './LineChart.vue';

export default {
  name: 'ColumnChart',
  components: {
    apexchart: VueApexCharts,
    lineChart: LineChart,
  },
  props: {
    inputData: Array,
  },
  data: () => ({
    series: [
      {
        name: '',
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter(val) {
          return `${val}`;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter(val) {
            return `${val} trackings`;
          },
        },
      },
      title: {
        text: 'Drowsiness Trackings In This Year',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#777CF5',
        },
      },
    },
    roomStatus: {
      items: ['MONTH', 'YEAR'],
      selected: 'YEAR',
    },
  }),
  methods: {
    getMonth(time) {
      return new Date(time).getMonth() + 1;
    },
    getData(datas) {
      const series1 = [];
      this.series.name = 'Trackings';
      this.series.data = datas;
      series1.pushs(this.series);
      return series1;
    },
  },
  computed: {
    getDataByMonth() {
      const datas = [];
      for (let i = 1; i <= 12; i += 1) {
        datas.push(this.inputData.filter((item) => this.getMonth(item.trackingAt) === i).length);
      }

      return [{ name: 'Trackings', data: datas }];
    },
    getNowMonth() {
      return new Date().getMonth() + 1;
    },
  },
};
</script>
