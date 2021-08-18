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
                label="Search by name"
                v-model="searchQuery"
                solo
                dense
                hide-details
                class="text-muted py-1 size-sub-2 light-text-field font-nunito"
                clearable
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="d-flex align-center">
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
            </v-col>
          </v-row>
          <v-card class="mt-5 px-5 py-4">
            <v-row>
              <v-col cols="10">
                <div class="pb-5">
                  <span
                    style="letter-spacing: 0.02em; font-weight: 800"
                    class="text-gray font-nunito size9rem mt-2"
                    >Device Management</span
                  >
                </div>
              </v-col>
              <v-col cols="2">
                <v-btn
                  color="#727cf5"
                  dark
                  class="mb-2"
                  @click="
                    dialog = true;
                    createItem.deviceName = '';
                    createItem.serialId = '';
                    createItem.active = true;
                    check.checkName = true;
                    check.checkId = false;
                    check.checkIdFormat = true;
                    check.checkIdDup = false;
                  "
                >
                  New Device
                </v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="changeDevices"
              :search="searchQuery"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              class="elevation-1"
            >
              <template v-slot:[`item.no`]="{ item }">
                {{ item.no }}
              </template>
              <template v-slot:[`item.createdAt`]="{ item }">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </template>
              <template v-slot:[`item.serialId`]="{ item }">
                {{ item.serialId }}
              </template>
              <template v-slot:[`item.active`]="{ item }">
                <v-chip
                  :color="getColor(item.active)"
                  dark
                  style="width: 80px"
                  class="d-flex justify-center"
                >
                  {{ item.active ? 'Active' : 'Inactive' }}
                </v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="
                    viewUser(item);
                    dialogView = true;
                  "
                >
                  fas fa-users
                </v-icon>
                <v-icon small class="mr-2" @click="editDevice(item)"> mdi-pencil </v-icon>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" color="#727cf5"></v-pagination>
            </div>
          </v-card>
          <v-dialog v-model="dialog" persistent max-width="500">
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
                <v-icon left color="rgb(255, 255, 255, 0.8)">fas fa-plus-circle</v-icon>
                <span
                  class="font-nunito white--text font-weight-bold"
                  style="font-size: 1.125rem !important"
                  >Create new device
                </span>
              </v-card>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Device name</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-text-field
                      v-model="createItem.deviceName"
                      placeholder="Fill in device name"
                      style="font-size: 16px"
                      class="font-weight-thin pa-0 py-0 pt-2 font-nunito"
                      solo
                      @change="changeValue"
                      :error-messages="!getCheckName ? 'The device name can not blank' : ''"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Serial ID</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-text-field
                      v-model="createItem.serialId"
                      placeholder="Fill in serial ID"
                      style="font-size: 16px"
                      class="font-weight-thin pa-0 py-0 pt-2 font-nunito"
                      solo
                      @change="changeValue"
                      :error-messages="
                        getCheckId
                          ? 'The Serial ID can not blank'
                          : !getCheckIdFormat
                          ? 'The Serial ID has format XX:XX:XX:XX:XX:XX'
                          : !getCheckIdDup
                          ? ''
                          : 'The serial ID has existed'
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  color="grey darken-1"
                  text
                  @click="
                    dialog = false;
                    this.check.checkName = true;
                    this.check.checkId = false;
                    this.check.checkIdFormat = true;
                    this.check.checkIdDup = false;
                  "
                >
                  Cancel
                </v-btn>
                <v-btn color="#727CF5" text @click="createDeviceInfo"> Create </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogView" persistent max-width="1200">
            <v-card>
              <v-card
                class="px-4 py-3 align-center ma-0 main-bg"
                style="
                  border-color: rgb(255, 255, 255);
                  box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
                  border-radius: 0px !important;
                  background-color: #727cf5;
                "
              >
                <v-row no-gutters>
                  <v-col md="5" offset-md="3" class="d-flex justify-center align-center">
                    <v-icon left color="rgb(255, 255, 255, 0.8)">fas fa-user-circle</v-icon>
                    <span
                      class="font-nunito white--text font-weight-bold"
                      style="font-size: 1.125rem !important"
                      >Drivers Information
                    </span>
                  </v-col>
                  <v-col md="1" offset-md="3" class="d-flex justify-end">
                    <v-btn icon @click="dialogView = false" class="mr-4"
                      ><v-icon color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
              <v-col cols="12">
                <v-row no-gutters class="d-flex justify-center ma-0 pa-0 font-nunito">
                  <!-- <v-overlay :value="isLoadingDrivers" absolute>
                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                  </v-overlay>
                  <v-container v-if="!isLoadingDrivers" class="pa-0 hidden-xs-only"> -->
                  <!-- <UserManagementInDevice :driverList="drivers" /> -->
                  <v-row justify="center" class="ma-0 pa-0">
                    <v-col cols="12" sm="12" md="12" lg="12" xl="11">
                      <v-row class="d-flex align-center ma-0">
                        <v-spacer></v-spacer>
                        <v-col cols="3" class="d-flex align-center">
                          <v-text-field
                            label="Search by email"
                            v-model="searchQuery1"
                            solo
                            hide-details
                            class="text-muted py-1 size-sub-2 light-text-field font-nunito"
                            clearable
                            dense
                            style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2" class="d-flex align-center">
                          <v-select
                            v-model="roomStatus1.selected"
                            :items="roomStatus1.items"
                            color="#727cf5"
                            hide-details
                            solo
                            background-color="#777CF5"
                            dark
                            dense
                            class="size-sub-2 font-nunito"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-card class="mt-5 px-5 py-4">
                        <div class="d-flex pb-5">
                          <span
                            style="letter-spacing: 0.02em; font-weight: 800"
                            class="text-gray font-nunito size9rem mt-2"
                            >User Management</span
                          >
                        </div>
                        <v-data-table
                          :headers="headers1"
                          :items="drivers"
                          :search="searchQuery1"
                          :page.sync="page1"
                          :items-per-page="itemsPerPage1"
                          hide-default-footer
                          @page-count="pageCount1 = $event"
                          class="elevation-1"
                        >
                          <template v-slot:[`item.no`]="{ item }">
                            {{ item.no }}
                          </template>
                          <template v-slot:[`item.connected`]="{ item }">
                            <v-chip
                              :color="getColor(item.connected)"
                              dark
                              style="width: 100px"
                              class="d-flex justify-center"
                            >
                              {{ item.connected ? 'Connected' : 'Disconnected' }}
                            </v-chip>
                          </template>
                          <!-- dialog for active user -->
                          <!-- <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="activeUser(item)"> mdi-pencil </v-icon>
                          </template> -->
                        </v-data-table>
                        <div class="text-center pt-2">
                          <v-pagination
                            v-model="page1"
                            :length="pageCount1"
                            color="#727cf5"
                          ></v-pagination>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!-- </v-container> -->
                </v-row>
              </v-col>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogUpdate" persistent max-width="500">
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
                <v-icon left color="rgb(255, 255, 255, 0.8)">fas fa-plus-circle</v-icon>
                <span
                  class="font-nunito white--text font-weight-bold"
                  style="font-size: 1.125rem !important"
                  >Update device
                </span>
              </v-card>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Device name</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-text-field
                      v-model="updateItem.data.deviceName"
                      @change="changeValue"
                      :error-messages="!getCheckName ? 'The device name can not blank' : ''"
                      placeholder="Fill in device name"
                      style="font-size: 16px"
                      class="font-weight-thin pa-0 py-0 pt-2 font-nunito"
                      solo
                      color="#727cf5"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Serial ID</v-card-text
                    >
                  </v-col>
                  <v-col cols="5" class="d-flex justify-center">
                    <v-text-field
                      v-model="updateItem.data.serialId"
                      @change="changeValue"
                      :error-messages="
                        getCheckId
                          ? 'The Serial ID can not blank'
                          : !getCheckIdFormat
                          ? 'The Serial ID has format XX:XX:XX:XX:XX:XX'
                          : !getCheckIdDup
                          ? ''
                          : 'The serial ID has existed'
                      "
                      placeholder="Fill in serial ID"
                      style="font-size: 16px"
                      class="font-weight-thin pa-0 py-0 pt-2 font-nunito"
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="4" md="4" class="pl-5">
                    <v-switch
                      v-model="updateItem.data.active"
                      :label="updateItem.data.active ? 'Active' : 'Inactive'"
                      color="success"
                      hide-details
                      @change="changeValue"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  color="grey darken-1"
                  text
                  @click="
                    dialogUpdate = false;
                    this.check.checkName = true;
                    this.check.checkId = false;
                    this.check.checkIdFormat = true;
                    this.check.checkIdDup = false;
                  "
                >
                  Cancel
                </v-btn>
                <v-btn color="#727CF5" text @click="updateDeviceInfo" :disabled="!this.updatable">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar v-model="snackbar" :timeout="timeout" color="green">
            Create new device successfully!
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false" outlined>
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarFail" :timeout="timeout" color="red">
            Create new device failed!
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false" outlined>
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarUpdate" :timeout="timeout" color="green">
            Update device successfully!
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false" outlined>
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarUpdateFail" :timeout="timeout" color="red">
            Update device failed!
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false" outlined>
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import snackBarMixin from '../../components/mixins/snackBar';
// import UserManagementInDevice from './UserManagementInDevice.vue';

export default {
  name: 'DeviceManagement',
  mixins: [snackBarMixin],
  // components: {
  //   UserManagementInDevice,
  // },
  data: () => ({
    dialog: false,
    dialogView: false,
    dialogUpdate: false,
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'no',
      },
      { text: 'Device name', value: 'deviceName' },
      { text: 'Create Date', value: 'createdAt' },
      { text: 'Serial ID', value: 'serialId' },
      { text: 'Active', value: 'active' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    headers1: [
      // {
      //   text: 'No',
      //   align: 'start',
      //   sortable: false,
      //   value: 'no',
      // },
      // { text: 'Username', value: 'username' },
      { text: 'Email', align: 'start', value: 'email' },
      { text: 'Full name', value: 'fullName' },
      { text: 'Status', value: 'connected' },
    ],
    createItem: {
      deviceName: '',
      serialId: '',
      active: true,
    },
    updateItem: {
      deviceId: '',
      data: {
        deviceName: '',
        serialId: '',
        active: true,
      },
    },
    deviceName: '',
    searchQuery: null,
    searchQuery1: null,
    roomStatus: {
      items: ['INACTIVE', 'ACTIVE', 'ALL'],
      selected: 'ALL',
    },
    roomStatus1: {
      items: ['INACTIVE', 'ACTIVE', 'ALL'],
      selected: 'ALL',
    },
    page: 1,
    pageCount: 0,
    itemsPerPage: 7,
    page1: 1,
    pageCount1: 0,
    itemsPerPage1: 7,
    updatable: false,
    snackbar: false,
    snackbarFail: false,
    snackbarUpdate: false,
    snackbarUpdateFail: false,
    timeout: 2000,
    check: {
      checkName: true,
      checkId: false,
      checkIdFormat: true,
      checkIdDup: false,
    },
    serialId: null,
  }),

  computed: {
    isLoading() {
      const devices = this.$store.state.user.devices.isLoading;
      return devices;
    },
    isLoadingDrivers() {
      return this.$store.state.user.driversInDevice.isLoading;
    },

    devices() {
      return this.$store.state.user.devices.data.results;
    },

    success() {
      return this.$store.state.user.devices.success;
    },

    changeDevices() {
      if (this.searchQuery === null) {
        if (this.roomStatus.selected === 'ALL') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return this.devices
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'ACTIVE') {
          return this.devices
            .filter((item) => item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'INACTIVE') {
          return this.devices
            .filter((item) => !item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
      }
      if (this.searchQuery !== null) {
        if (this.roomStatus.selected === 'ALL') {
          return this.devices
            .filter(
              (item) => item.deviceName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
            )
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'ACTIVE') {
          return this.devices
            .filter(
              (item) => item.deviceName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
            )
            .filter((item) => item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'INACTIVE') {
          return this.devices
            .filter(
              (item) => item.deviceName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
            )
            .filter((item) => !item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
      }
      return null;
    },
    token() {
      return window.$cookies.get('token');
    },

    getCheckName() {
      return this.check.checkName;
    },
    getCheckId() {
      return this.check.checkId;
    },

    getCheckIdFormat() {
      return this.check.checkIdFormat;
    },

    getCheckIdDup() {
      return this.check.checkIdDup;
    },

    drivers() {
      return this.$store.state.user.driversInDevice.data.results;
    },
  },

  created() {
    this.getDevices();
  },

  methods: {
    ...mapActions({
      getDevices: 'user/getDevices',
      createDevice: 'user/createDevice',
      updateDevice: 'user/updateDevice',
      getDriversInDevice: 'user/getDriversInDevice',
    }),

    createDeviceInfo() {
      if (this.createItem.deviceName === '' || this.createItem.deviceName === null) {
        this.check.checkName = false;
      } else {
        this.check.checkName = true;
      }
      if (this.createItem.serialId === '' || this.createItem.serialId === null) {
        this.check.checkId = true;
      } else {
        this.check.checkId = false;
        this.check.checkIdFormat = this.getValidSerial(this.createItem.serialId);
        if (this.check.checkIdFormat) {
          this.check.checkIdDup = this.checkDuplicated(this.createItem.serialId);
        }
      }
      if (
        this.check.checkName &&
        !this.check.checkId &&
        this.check.checkIdFormat &&
        !this.check.checkIdDup
      ) {
        this.dialog = false;
        this.createItem.active = true;
        this.createDevice(this.createItem);
        if (this.success) {
          this.snackbar = true;
        } else {
          // this.snackbarFail = true;
          this.snackbar = true;
        }

        // this.check.checkName = true;
        // this.check.checkId = true;
        // this.check.checkIdFormat = true;
        // this.check.checkIdDup = true;
      }
    },

    getValidSerial(value) {
      const pattern = /^\w{2}:\w{2}:\w{2}:\w{2}:\w{2}:\w{2}$/;
      return pattern.test(value);
    },

    checkDuplicated(value) {
      let a = false;
      // eslint-disable-next-line array-callback-return
      this.devices.filter((item) => {
        if (item.serialId === value) {
          a = true;
        }
      });
      console.log(a);
      return a;
    },

    checkDuplicatedUpdate(value) {
      let a = false;
      const rest = this.getRestDevice(this.serialId);
      // console.log(rest);
      // eslint-disable-next-line array-callback-return
      rest.filter((item2) => {
        if (item2.serialId.trim() === value.trim()) {
          a = true;
        }
      });
      return a;
    },

    checkSameValue(value) {
      let a = true;
      // eslint-disable-next-line array-callback-return
      this.getRestDevice(value).filter((item) => {
        if (item.serialId === value) {
          a = false;
        }
      });
      return a;
    },

    getRestDevice(serialId) {
      return this.devices.filter((item) => item.serialId !== serialId);
    },

    editDevice(item) {
      this.updateItem.data.deviceName = item.deviceName;
      this.updateItem.data.serialId = item.serialId;
      this.updateItem.data.active = item.active;
      this.updateItem.deviceId = item.deviceId;
      this.dialogUpdate = true;
      this.updatable = false;
      this.serialId = item.serialId;
      // // default false
      this.check.checkName = true;
      this.check.checkId = false;
      this.check.checkIdFormat = true;
      this.check.checkIdDup = false;
    },

    updateDeviceInfo() {
      if (this.updateItem.data.deviceName === '' || this.updateItem.data.deviceName === null) {
        this.check.checkName = false;
      } else {
        this.check.checkName = true;
      }
      if (this.updateItem.data.serialId === '' || this.updateItem.data.serialId === null) {
        this.check.checkId = true;
      } else {
        this.check.checkId = false;
        this.check.checkIdFormat = this.getValidSerial(this.updateItem.data.serialId);
        if (this.check.checkIdFormat) {
          // if (this.checkSameValue(this.updateItem.data.serialId)) {
          //   this.check.checkIdDup = false;
          // } else {
          //   this.check.checkIdDup = this.checkDuplicatedUpdate(this.updateItem.data.serialId);
          // }
          if (this.checkSameValue || !this.checkDuplicatedUpdate(this.updateItem.data.serialId)) {
            this.check.checkIdDup = false;
          }
          if (this.checkDuplicatedUpdate(this.updateItem.data.serialId)) {
            this.check.checkIdDup = true;
          }
        }
      }

      if (
        this.check.checkName &&
        !this.check.checkId &&
        this.check.checkIdFormat &&
        !this.check.checkIdDup
      ) {
        this.dialogUpdate = false;
        this.updateDevice(this.updateItem);
        if (this.success) {
          this.snackbarUpdate = true;
          // reset value

          // this.check.checkName = true;
          // this.check.checkId = false;
          // this.check.checkIdFormat = true;
          // this.check.checkIdDup = false;
        } else {
          this.snackbarUpdate = true;
          // this.snackbarUpdateFail = true;
        }
      }
    },

    getColor(active) {
      if (active === true) return 'green';
      return 'red';
    },
    changeValue() {
      this.updatable = true;
      return this.updatable;
    },
    changeValue0() {
      this.updatable = true;
      this.check.checkName = true;
      return this.updatable;
    },
    changeValue1() {
      this.updatable = true;
      this.check.checkId = true;
      return this.updatable;
    },
    changeValue2() {
      this.updatable = true;
      this.check.checkId = true;
      return this.updatable;
    },
    viewUser(device) {
      this.getDriversInDevice(device.deviceId);
    },
  },
};
</script>
