<template>
  <v-row no-gutters class="d-flex justify-center ma-0 pa-0 font-nunito">
    <v-overlay :value="isLoadingDriver&&isLoadingDevice&&isLoadingTrackings" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- <v-container v-if="!isLoading" class="pa-0 hidden-xs-only"> -->
    <v-container v-if="!isLoadingDriver && !isLoadingDevice && !isLoadingTrackings" class="pa-0 hidden-xs-only">
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="12" md="12" lg="12" xl="11">
          <v-row>
            <v-col cols="6">
              <div style="font-size: 20px; fontweight: bold; color: #777cf5" class="pt-10 pl-12">
                Statistic : Connected Driver
              </div>
              <div id="chart" class="d-flex justify-center pt-10" style="max-height: 500px">
                <apexcharts
                  type="donut"
                  width="520"
                  :options="chartOptions"
                  :series="series1"
                ></apexcharts>
              </div>
              <!-- <v-card-text style="color: #818286" class="d-flex justify-end"
                >Xem thêm >></v-card-text
              > -->
            </v-col>
            <v-col cols="6">
              <columnChart class="pt-4" :inputData="trackings"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12" xl="11">
          <v-row>
            <v-col cols="4">
              <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                <v-card-title>
                  <v-icon large left> fas fa-user </v-icon>
                  <span class="text-h6 font-weight-light">Total Drivers</span>
                </v-card-title>

                <v-card-text class="text-h5 font-weight-bold d-flex justify-center">
                  {{drivers.length}} Drivers
                </v-card-text>
                <v-divider inset></v-divider>
                <v-card-text class="text-h7 font-weight-thin">
                  The number of drivers in Drowsiness Detection System
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="mx-auto" color="#3BCBB2" dark max-width="400">
                <v-card-title>
                  <v-icon large left> fas fa-hdd </v-icon>
                  <span class="text-h6 font-weight-light">Total Devices</span>
                </v-card-title>

                <v-card-text class="text-h5 font-weight-bold d-flex justify-center">
                  {{devices.length}} Devices
                </v-card-text>
                <v-divider inset></v-divider>
                <v-card-text class="text-h7 font-weight-thin">
                  The number of devices in Drowsiness Detection System
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="mx-auto" color="#F3B062 " dark max-width="400">
                <v-card-title>
                  <v-icon large left> fas fa-database </v-icon>
                  <span class="text-h6 font-weight-light">Total Trackings</span>
                </v-card-title>

                <v-card-text class="text-h5 font-weight-bold d-flex justify-center">
                  {{trackings.length}} Trackings
                </v-card-text>
                <v-divider inset></v-divider>
                <v-card-text class="text-h7 font-weight-thin">
                  The number of trackings in Drowsiness Detection System
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { mapActions } from 'vuex';
import ColumnChart from '../../components/core_layout/ColumnChart.vue';

export default {
  name: 'Dashboard',
  components: {
    apexcharts: VueApexCharts,
    columnChart: ColumnChart,
  },
  data() {
    return {
      series: [8, 17, 15],
      chartOptions: {
        chart: {
          width: 300,
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
        },
        labels: ['Disconnected ', 'Connected', 'Inactive'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                },
                value: {
                  show: true,
                },
                total: {
                  show: true,
                  label: 'Total',
                  color: 'Black',
                },
              },
            },
          },
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter(val) {
            return `${val}`;
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  },
  computed: {
    isLoadingDriver() {
      const drivers = this.$store.state.user.drivers.isLoading;
      return drivers;
    },
    isLoadingDevice() {
      const devices = this.$store.state.user.devices.isLoading;
      return devices;
    },
    isLoadingTrackings() {
      const trackings = this.$store.state.user.trackings.isLoading;
      return trackings;
    },
    // ...mapState({
    //   drivers: (state) => state.user.drivers,
    // }),
    drivers() {
      return this.$store.state.user.drivers.data.results;
    },
    devices() {
      return this.$store.state.user.devices.data.results;
    },
    trackings() {
      return this.$store.state.user.trackings.data.results;
    },
    disconnected() {
      return 3;
    },
    connected() {
      return 2;
    },
    inactive() {
      return this.drivers.filter((item) => !item.active).length;
    },
    series1() {
      return [this.disconnected, this.connected, this.inactive];
    },
  },
  methods: {
    ...mapActions({
      getDrivers: 'user/getDrivers',
      getTrackings: 'user/getTrackings',
      getDevices: 'user/getDevices',
    }),
  },
  created() {
    this.getDrivers();
    this.getDevices();
    this.getTrackings();
  },
};
</script>
