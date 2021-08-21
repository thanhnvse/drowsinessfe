<template>
  <v-row no-gutters class="d-flex justify-center ma-0 pa-0 font-nunito">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false"> Close </v-btn>
      </template>
    </v-snackbar> -->
    <v-container v-if="!isLoading" class="pa-0 hidden-xs-only">
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="12" md="12" lg="12" xl="11">
          <v-row class="d-flex align-center ma-0">
            <v-spacer></v-spacer>
            <v-col cols="3" class="d-flex align-center">
              <v-text-field
                label="Search by tracking"
                v-model="searchQuery"
                solo
                dense
                hide-details
                class="text-muted py-1 size-sub-2 light-text-field font-nunito"
                clearable
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
              ></v-text-field>
              <!-- <v-btn icon>
                <v-icon>event</v-icon>
              </v-btn> -->
              <v-menu top offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="#727CF5" icon v-bind="attrs" v-on="on" @click="reset">
                    <v-icon>event</v-icon>
                  </v-btn>
                </template>

                <v-date-picker v-model="dates" color="#727CF5" no-title range></v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col cols="1" class="d-flex align-center">
              <v-select
                v-model="roomStatus.selected"
                :items="roomStatus.items"
                color="#727cf5"
                hide-details
                solo
                background-color="#777CF5"
                dark
                dense
                class="size-sub-2 font-nunito"
              ></v-select>
            </v-col> -->
          </v-row>
          <v-card class="mt-5 px-5 py-4">
            <div class="d-flex pb-5">
              <span
                style="letter-spacing: 0.02em; font-weight: 800"
                class="text-gray font-nunito size9rem mt-2"
                >Tracking Management</span
              >
            </div>
            <v-data-table
              :headers="headers"
              :items="changeTrackings"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              class="elevation-1"
            >
              <template v-slot:[`item.no`]="{ item }">
                {{ item.no }}
              </template>
              <template v-slot:[`item.trackingAt`]="{ item }">
                {{ new Date(item.trackingAt).toLocaleString() }}
              </template>
              <template v-slot:[`item.fullName`]="{ item }">
                {{ item.user.fullName }}
              </template>
              <template v-slot:[`item.deviceName`]="{ item }">
                {{ item.device.deviceName }}
              </template>
              <!-- dialog for active user -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="activeUser(item)"> fas fa-eye </v-icon>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" color="#727cf5" :total-visible="7"></v-pagination>
            </div>
          </v-card>
          <v-dialog
            v-model="dialog"
            max-width="660px"
            scrollable
            transition="dialog-bottom-transition"
          >
            <v-card
              class="d-flex flex-column white font-nunito"
              max-width="660px"
              min-width="660px"
              style="border-radius: 0px !important"
            >
              <v-card
                class="d-flex px-4 py-3 align-center ma-0 justify-space-between main-bg"
                style="
                  border-color: rgb(255, 255, 255);
                  box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
                  border-radius: 0px !important;
                  background-color: #727cf5;
                "
              >
                <v-icon class="ml-4" color="rgb(255, 255, 255, 0.8)">person</v-icon>

                <span
                  class="font-nunito white--text font-weight-bold"
                  style="font-size: 1.125rem !important"
                  >Tracking Information
                </span>
                <v-btn icon @click="dialog = false" class="mr-4"
                  ><v-icon color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
                >
              </v-card>
              <v-card>
                <v-col
                  cols="12"
                  md="12"
                  style="border-left: 1px solid lightgray"
                  class="mt-3 pa-0 py-0"
                >
                  <v-row no-gutters>
                    <v-col cols="1"></v-col>
                    <v-col cols="10" class="pa-3">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Tracking Date</v-card-text
                              >
                            </v-col>
                            <v-col
                              cols="9"
                              class="d-flex justify-center"
                              style="background-color: #faf8f0"
                            >
                              <v-card color="#FAF8F0" outlined>
                                <v-card-text
                                  style="font-size: 16px"
                                  class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                                  >{{
                                    new Date(selectedItem.trackingAt).toLocaleString()
                                  }}</v-card-text
                                >
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pt-5">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Full name</v-card-text
                              >
                            </v-col>
                            <v-col
                              cols="9"
                              class="d-flex justify-center"
                              style="background-color: #faf8f0"
                            >
                              <v-card color="#FAF8F0" outlined>
                                <v-card-text
                                  style="font-size: 16px"
                                  class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                                  >{{ selectedItem.user.fullName }}</v-card-text
                                >
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pt-5">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Email</v-card-text
                              >
                            </v-col>
                            <v-col
                              cols="9"
                              class="d-flex justify-center"
                              style="background-color: #faf8f0"
                            >
                              <v-card color="#FAF8F0" outlined>
                                <v-card-text
                                  style="font-size: 16px"
                                  class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                                  >{{ selectedItem.user.email }}</v-card-text
                                >
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                        <!-- <v-col cols="12" class="pt-5">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Status</v-card-text
                              >
                            </v-col>
                            <v-col cols="9" class="d-flex justify-center">
                              <v-chip
                                style="font-size: 16px"
                                class="font-weight-bold ma-2"
                                :color="getColor(selectedItem.active)"
                                >{{ selectedItem.active ? 'Active' : 'Inactive' }}</v-chip
                              >
                            </v-col>
                          </v-row>
                        </v-col> -->
                        <v-col cols="12" class="pt-5">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Device Name</v-card-text
                              >
                            </v-col>
                            <v-col
                              cols="9"
                              class="d-flex justify-center"
                              style="background-color: #faf8f0"
                            >
                              <v-card color="#FAF8F0" outlined>
                                <v-card-text
                                  style="font-size: 16px"
                                  class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                                  >{{ selectedItem.device.deviceName }}</v-card-text
                                >
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pt-5">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Evidence</v-card-text
                              >
                            </v-col>
                            <v-col cols="9" class="d-flex justify-center">
                              <v-card color="#FAF8F0" outlined>
                                <v-img
                                  max-height="150"
                                  max-width="250"
                                  :src="selectedItem.imageUrl"
                                ></v-img>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                </v-col>
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn depressed color="success" @click="dialogConfirm = true">
                    {{ selectedItem.active ? 'Inactive' : 'Active' }}
                  </v-btn>
                  <v-btn depressed color="error" @click="dialog = false"> Close </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-card>
          </v-dialog>
          <!-- <v-dialog v-model="dialogConfirm" persistent max-width="290">
            <v-card>
              <v-card
                class="d-flex px-4 py-3 align-center ma-0 justify-center main-bg"
                style="
                  border-color: rgb(255, 255, 255);
                  box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
                  border-radius: 0px !important;
                  background-color: #727cf5;
                "
              >
                <v-icon left color="rgb(255, 255, 255, 0.8)">beenhere</v-icon>
                <span
                  class="font-nunito white--text font-weight-bold"
                  style="font-size: 1.125rem !important"
                  >Confirm change status
                </span>
              </v-card>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="grey darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                <v-btn color="#727CF5" text @click="updateUserInfo"> Agree </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import snackBarMixin from '../../components/mixins/snackBar';

export default {
  name: 'TrackingManagement',
  mixins: [snackBarMixin],
  data: () => ({
    dialog: false,
    dialogConfirm: false,
    dates: [],
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'no',
      },
      { text: 'Tracking Time', value: 'trackingAt' },
      { text: 'Driver Name', value: 'fullName' },
      { text: 'Device Name', value: 'deviceName' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    selectedItem: {
      dataTrackingId: '',
      device: {
        createdAt: 0,
        deviceId: '',
        deviceName: '',
        updatedAt: 0,
        imageUrl: '',
        isDeleted: false,
        trackingAt: 0,
      },
      user: {
        active: true,
        avatar: '',
        createdAt: 0,
        email: '',
        fullName: '',
        password: '',
        phoneNumber: '',
        updatedAt: 0,
        userId: '',
        username: '',
        userDeviceId: '',
      },
      userDeviceId: '',
      trackingAt: 0,
      isDeleted: false,
      imageUrl: '',
    },
    defaultItem: {
      dataTrackingId: '',
      device: {
        createdAt: 0,
        deviceId: '',
        deviceName: '',
        updatedAt: 0,
        imageUrl: '',
        isDeleted: false,
        trackingAt: 0,
      },
      user: {
        active: true,
        avatar: '',
        createdAt: 0,
        email: '',
        fullName: '',
        password: '',
        phoneNumber: '',
        updatedAt: 0,
        userId: '',
        username: '',
        userDeviceId: '',
      },
      userDeviceId: '',
      trackingAt: 0,
      isDeleted: false,
      imageUrl: '',
    },
    updateItem: {
      active: true,
      avatar: '',
      email: '',
      fullName: '',
      password: '',
    },
    searchQuery: null,
    roomStatus: {
      items: ['WEEK', 'MONTH', 'ALL'],
      selected: 'ALL',
    },
    page: 1,
    pageCount: 0,
    itemsPerPage: 7,
    updatable: false,
    allTrackings: [],
  }),

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
    isLoading() {
      // eslint-disable-next-line no-undef
      //   return isLoadingDriver && isLoadingDevice && isLoadingTrackings;
      return this.$store.state.user.trackings.isLoading;
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
    token() {
      return window.$cookies.get('token');
    },
    getTrackingData() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.allTrackings = [];
      this.trackings.map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const dataTrackingId = item.dataTrackingId;
        const isDeleted = item.deleted;
        const device = this.getDeviceById(item.deviceId)[0];
        const { imageUrl } = item;
        const { trackingAt } = item;
        const { userDeviceId } = item;
        const user = this.getDriverById(item.userId)[0];
        this.allTrackings.push({
          dataTrackingId,
          isDeleted,
          device,
          imageUrl,
          trackingAt,
          userDeviceId,
          user,
        });
        return null;
      });
      return this.allTrackings;
    },
    // changeTrackings() {
    //   if (this.searchQuery === null) {
    //     if (this.roomStatus.selected === 'ALL') {
    //       if (this.dates !== []) {
    //         if (this.dates.length === 1) {
    //           const dateMili = new Date(this.dates[0]);
    //           const milliToday = dateMili.getTime();
    //           const nextDateMili = new Date(milliToday + 86400000);
    //           const miliNext = nextDateMili.getTime();
    //           return this.getTrackingData
    //             .filter((item) => item.trackingAt >= milliToday && item.trackingAt < miliNext)
    //             .map((items, no) => ({ ...items, no: no + 1 }));
    //         }
    //         if (this.dates.length === 2) {
    //           const dateMili = new Date(this.dates[0]);
    //           const milliToday = dateMili.getTime();
    //           const dateMili2 = new Date(this.dates[1]);
    //           const milliToday2 = dateMili2.getTime();
    //           if (milliToday < milliToday2) {
    //             return this.getTrackingData
    //               .filter((item) => item.trackingAt >= milliToday && item.trackingAt < milliToday2)
    //               .sort((a, b) => b.trackingAt - a.trackingAt)
    //               .map((items, no) => ({ ...items, no: no + 1 }));
    //           }
    //           if (milliToday > milliToday2) {
    //             return this.getTrackingData
    //               .filter((item) => item.trackingAt < milliToday && item.trackingAt >= milliToday2)
    //               .sort((a, b) => b.trackingAt - a.trackingAt)
    //               .map((items, no) => ({ ...items, no: no + 1 }));
    //           }
    //         }
    //       }
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       return this.getTrackingData
    //         .sort((a, b) => b.trackingAt - a.trackingAt)
    //         .map((items, no) => ({ ...items, no: no + 1 }));
    //     }
    //     if (this.roomStatus.selected === 'WEEK') {
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       this.dates = [];
    //       const date = Date.now();
    //       const weekly = this.getWeekly(date);
    //       console.log(`${date}  ${weekly}`);
    //       return this.getTrackingData
    //         .filter((item) => item.trackingAt >= weekly)
    //         .sort((a, b) => b.trackingAt - a.trackingAt)
    //         .map((items, no) => ({ ...items, no: no + 1 }));
    //     }
    //     if (this.roomStatus.selected === 'MONTH') {
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       this.dates = [];
    //       const date = Date.now();
    //       const month = this.getMonth(date);
    //       return this.getTrackingData
    //         .filter((item) => item.trackingAt >= month)
    //         .sort((a, b) => b.trackingAt - a.trackingAt)
    //         .map((items, no) => ({ ...items, no: no + 1 }));
    //     }
    //   }
    //   if (this.searchQuery !== null) {
    //     if (this.roomStatus.selected === 'ALL') {
    //       if (this.dates !== []) {
    //         if (this.dates.length === 1) {
    //           const dateMili = new Date(this.dates[0]);
    //           const milliToday = dateMili.getTime();
    //           const nextDateMili = new Date(milliToday + 86400000);
    //           const miliNext = nextDateMili.getTime();
    //           return this.getTrackingData
    //             .filter((item) => item.trackingAt >= milliToday && item.trackingAt < miliNext)
    //             .filter((item) => item.user.fullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
    //             .map((items, no) => ({ ...items, no: no + 1 }));
    //         }
    //         if (this.dates.length === 2) {
    //           const dateMili = new Date(this.dates[0]);
    //           const milliToday = dateMili.getTime();
    //           const dateMili2 = new Date(this.dates[1]);
    //           const milliToday2 = dateMili2.getTime();
    //           if (milliToday < milliToday2) {
    //             return this.getTrackingData
    //               .filter((item) => item.trackingAt >= milliToday && item.trackingAt < milliToday2)
    //               .filter((item) => item.user.fullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
    //               .sort((a, b) => b.trackingAt - a.trackingAt)
    //               .map((items, no) => ({ ...items, no: no + 1 }));
    //           }
    //           if (milliToday > milliToday2) {
    //             return this.getTrackingData
    //               .filter((item) => item.trackingAt < milliToday && item.trackingAt >= milliToday2)
    //               .filter((item) => item.user.fullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
    //               .sort((a, b) => b.trackingAt - a.trackingAt)
    //               .map((items, no) => ({ ...items, no: no + 1 }));
    //           }
    //         }
    //       }
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       return this.getTrackingData
    //         .filter(
    //           (item) => item.user.fullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
    //         )
    //         .sort((a, b) => b.trackingAt - a.trackingAt)
    //         .map((items, no) => ({ ...items, no: no + 1 }));
    //     }
    //     if (this.roomStatus.selected === 'WEEK') {
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       this.dates = [];
    //       const date = Date.now();
    //       const weekly = this.getWeekly(date);
    //       return this.getTrackingData
    //         .filter(
    //           (item) => item.user.fullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
    //         )
    //         .sort((a, b) => b.trackingAt - a.trackingAt)
    //         .filter((item) => item.trackingAt >= weekly)
    //         .map((items, no) => ({ ...items, no: no + 1 }));
    //     }
    //     if (this.roomStatus.selected === 'MONTH') {
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       this.dates = [];
    //       const date = Date.now();
    //       const month = this.getMonth(date);
    //       return this.getTrackingData
    //         .filter(
    //           (item) => item.user.fullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
    //         )
    //         .sort((a, b) => b.trackingAt - a.trackingAt)
    //         .filter((item) => item.trackingAt >= month)
    //         .map((items, no) => ({ ...items, no: no + 1 }));
    //     }
    //   }
    //   return null;
    // },
    changeTrackings() {
      if (this.searchQuery === null) {
        if (this.dates !== []) {
          if (this.dates.length === 1) {
            const dateMili = new Date(this.dates[0]);
            const milliToday = dateMili.getTime();
            const nextDateMili = new Date(milliToday + 86400000);
            const miliNext = nextDateMili.getTime();
            return this.getTrackingData
              .filter((item) => item.trackingAt >= milliToday && item.trackingAt < miliNext)
              .map((items, no) => ({ ...items, no: no + 1 }));
          }
          if (this.dates.length === 2) {
            const dateMili = new Date(this.dates[0]);
            const milliToday = dateMili.getTime();
            const dateMili2 = new Date(this.dates[1]);
            const milliToday2 = dateMili2.getTime();
            if (milliToday < milliToday2) {
              return this.getTrackingData
                .filter((item) => item.trackingAt >= milliToday && item.trackingAt < milliToday2)
                .sort((a, b) => b.trackingAt - a.trackingAt)
                .map((items, no) => ({ ...items, no: no + 1 }));
            }
            if (milliToday > milliToday2) {
              return this.getTrackingData
                .filter((item) => item.trackingAt < milliToday && item.trackingAt >= milliToday2)
                .sort((a, b) => b.trackingAt - a.trackingAt)
                .map((items, no) => ({ ...items, no: no + 1 }));
            }
          }
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.getTrackingData
          .sort((a, b) => b.trackingAt - a.trackingAt)
          .map((items, no) => ({ ...items, no: no + 1 }));
      }
      if (this.searchQuery !== null) {
        if (this.dates !== []) {
          if (this.dates.length === 1) {
            const dateMili = new Date(this.dates[0]);
            const milliToday = dateMili.getTime();
            const nextDateMili = new Date(milliToday + 86400000);
            const miliNext = nextDateMili.getTime();
            return this.getTrackingData
              .filter((item) => item.trackingAt >= milliToday && item.trackingAt < miliNext)
              .filter(
                (item) => item.user.fullName.toLowerCase().trim().indexOf(this.searchQuery.toLowerCase().trim()) !== -1,
              )
              .map((items, no) => ({ ...items, no: no + 1 }));
          }
          if (this.dates.length === 2) {
            const dateMili = new Date(this.dates[0]);
            const milliToday = dateMili.getTime();
            const dateMili2 = new Date(this.dates[1]);
            const milliToday2 = dateMili2.getTime();
            if (milliToday < milliToday2) {
              return this.getTrackingData
                .filter((item) => item.trackingAt >= milliToday && item.trackingAt < milliToday2)
                .filter(
                  (item) => item.user.fullName.toLowerCase().trim().indexOf(this.searchQuery.toLowerCase().trim()) !== -1,
                )
                .sort((a, b) => b.trackingAt - a.trackingAt)
                .map((items, no) => ({ ...items, no: no + 1 }));
            }
            if (milliToday > milliToday2) {
              return this.getTrackingData
                .filter((item) => item.trackingAt < milliToday && item.trackingAt >= milliToday2)
                .filter(
                  (item) => item.user.fullName.toLowerCase().trim().indexOf(this.searchQuery.toLowerCase().trim()) !== -1,
                )
                .sort((a, b) => b.trackingAt - a.trackingAt)
                .map((items, no) => ({ ...items, no: no + 1 }));
            }
          }
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.getTrackingData
          .filter((item) => item.user.fullName.toLowerCase().trim().indexOf(this.searchQuery.toLowerCase().trim()) !== -1)
          .sort((a, b) => b.trackingAt - a.trackingAt)
          .map((items, no) => ({ ...items, no: no + 1 }));
      }
      return null;
    },

    test() {
      return this.getTrackingData
        .filter((item) => item.user.fullName.toLowerCase().trim().indexOf(this.searchQuery.toLowerCase().trim()) !== -1);
    },
  },

  watch: {
    dialog(val) {
      return val || this.close();
    },
    updateItem: {
      handler(newVal, oldVal) {
        if (oldVal === null) {
          console.log(newVal);
        } else {
          this.updatable = true;
        }
      },
      deep: true,
    },
  },

  created() {
    this.getDrivers();
    this.getDevices();
    this.getTrackings();
  },

  methods: {
    ...mapActions({
      getDrivers: 'user/getDrivers',
      getTrackings: 'user/getTrackings',
      getDevices: 'user/getDevices',
    }),
    reset() {
      this.dates = [];
    },
    getColor(active) {
      if (active === true) return 'green';
      return 'red';
    },
    getDriverById(userId) {
      return this.drivers.filter((item) => item.userId === userId);
    },
    getDeviceById(deviceId) {
      return this.devices.filter((item) => item.deviceId === deviceId);
    },
    activeUser(item) {
      // set default
      this.selectedItem = {};
      // set new item
      this.selectedItem = { ...item };
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItem = { ...this.defaultItem };
      });
    },

    getWeekly(time) {
      const date = new Date(time); // some mock date
      const milliseconds = date.getTime();
      return milliseconds - 24 * 60 * 60 * 1000 * 7;
    },

    getMonth(time) {
      const date = new Date(time); // some mock date
      const milliseconds = date.getTime();
      return milliseconds - 24 * 60 * 60 * 1000 * 30;
    },
  },
};
</script>
