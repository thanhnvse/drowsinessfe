<template>
  <v-row no-gutters class="d-flex justify-center ma-0 pa-0 font-nunito">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
          </v-row>
          <v-card class="mt-5 px-5 py-4">
            <v-row>
              <v-col cols="8">
                <div class="pb-5">
                  <span
                    style="letter-spacing: 0.02em; font-weight: 800"
                    class="text-gray font-nunito size9rem mt-2"
                    >Firmware Management</span
                  >
                </div>
              </v-col>
              <v-col cols="4">
                <v-btn color="#727cf5" dark class="mb-2 ml-15" @click="dialog = true">
                  Upload Firmware
                </v-btn>
                <v-btn color="#727cf5" dark class="mb-2 ml-3" @click="dialogTrain = true">
                  Train model
                </v-btn>
              </v-col>
              <!-- <v-col cols="2">
                <v-btn color="#727cf5" dark class="mb-2" @click="dialogTrain = true">
                  Train model
                </v-btn>
              </v-col> -->
            </v-row>

            <v-data-table
              :headers="headers"
              :items="firmwares"
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
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="download(item.modelUrl)"> fas fa-download </v-icon>
              </template>
              <template v-slot:[`item.active`]="{ item }">
                <v-icon small color="success" v-if="item.active"> fas fa-check-circle </v-icon>
                <v-icon small v-else @click="activeFirmware(item)"> fas fa-check-circle </v-icon>
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
                  >Create new Firmware
                </span>
              </v-card>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Description</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-textarea
                      solo
                      name="input-7-4"
                      label="Fill in description"
                      class="pt-5"
                      v-model="createItem.description"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Detection Time</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-text-field
                      v-model="createItem.timeDetection"
                      placeholder="Fill in time"
                      type="number"
                      style="font-size: 16px"
                      class="font-weight-thin pa-0 py-0 pt-2 font-nunito"
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Upload model file</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <!-- <v-file-input
                      v-model="createItem.file"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      solo
                      :show-size="1000"
                      @change="preview(createItem.file)"
                    > -->
                    <v-file-input
                      v-model="createItem.file"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      solo
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                          {{ text }}
                        </v-chip>

                        <span
                          v-else-if="index === 2"
                          class="text-overline grey--text text--darken-3 mx-2"
                        >
                          +{{ files.length - 2 }} File(s)
                        </span>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-col>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="grey darken-1" text @click="dialog = false"> Cancel </v-btn>
                <v-btn color="#727CF5" text @click="createFirmwareInfo"> Create </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogTrain" persistent max-width="500">
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
                <v-icon left color="rgb(255, 255, 255, 0.8)">fas fa-spinner</v-icon>
                <span
                  class="font-nunito white--text font-weight-bold"
                  style="font-size: 1.125rem !important"
                  >Train model
                </span>
              </v-card>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Description</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-textarea
                      solo
                      name="input-7-4"
                      label="Fill in description"
                      class="pt-5"
                      v-model="createItem.description"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Detection Time</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <v-text-field
                      v-model="createItem.timeDetection"
                      placeholder="Fill in time"
                      type="number"
                      style="font-size: 16px"
                      class="font-weight-thin pa-0 py-0 pt-2 font-nunito"
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-start">
                    <v-card-text
                      style="font-size: 16px"
                      class="pa-0 py-0 pt-5 font-weight-medium font-nunito"
                      >Upload dataset</v-card-text
                    >
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center">
                    <!-- <v-file-input
                      v-model="createItem.file"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      solo
                      :show-size="1000"
                      @change="preview(createItem.file)"
                    > -->
                    <v-file-input
                      v-model="createItem.file"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      solo
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                          {{ text }}
                        </v-chip>

                        <span
                          v-else-if="index === 2"
                          class="text-overline grey--text text--darken-3 mx-2"
                        >
                          +{{ files.length - 2 }} File(s)
                        </span>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-col>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="grey darken-1" text @click="dialogTrain = false"> Cancel </v-btn>
                <v-btn color="#727CF5" text @click="startTrain"> Train </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogView" persistent max-width="800">
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
                      v-model="deviceName"
                      placeholder="Fill in device name"
                      style="font-size: 16px"
                      class="font-weight-bold pa-0 py-0 pt-2 font-nunito"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogConfirm" persistent max-width="290">
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
                  >Confirm Activation
                </span>
              </v-card>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="grey darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                <v-btn color="#727CF5" text @click="activeFirmwareDone(id)"> Agree </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import snackBarMixin from '../../components/mixins/snackBar';

export default {
  name: 'ModelVersion',
  mixins: [snackBarMixin],
  data: () => ({
    dialog: false,
    dialogTrain: false,
    dialogView: false,
    dialogConfirm: false,
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'no',
      },
      { text: 'Description', value: 'description' },
      { text: 'Detection Time', value: 'timeDetection' },
      { text: 'Create Date', value: 'createdAt' },
      { text: 'Download', value: 'actions', sortable: false },
      { text: 'Newest upload', value: 'active', sortable: false },
    ],
    files: [],
    createItem: {
      description: '',
      file: null,
      timeDetection: null,
    },
    deviceName: '',
    searchQuery: null,
    // roomStatus: {
    //   items: ['INACTIVE', 'ACTIVE', 'ALL'],
    //   selected: 'ALL',
    // },
    page: 1,
    pageCount: 0,
    itemsPerPage: 7,
    updatable: false,
    previews: [],
    errorImage: 'url of an zip to use to indicate an error',
    firmwareId: '',
  }),

  computed: {
    isLoading() {
      const firmwares = this.$store.state.user.firmwares.isLoading;
      return firmwares;
    },
    // ...mapState({
    //   drivers: (state) => state.user.drivers,
    // }),
    firmwares() {
      const test = this.$store.state.user.firmwares.data.results;
      if (test) {
        return test.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.active - a.active).map((items, no) => ({
        // return test.sort((a, b) => b.createdAt - a.createdAt).map((items, no) => ({
          ...items,
          no: no + 1,
        }));
      }
      return [];
    },
    token() {
      return window.$cookies.get('token');
    },
  },

  watch: {
    dialog(val) {
      return val || this.close();
    },
  },

  created() {
    this.getFirmwares();
  },

  methods: {
    ...mapActions({
      getFirmwares: 'user/getFirmwares',
      createFirmware: 'user/createFirmware',
      updateFirmware: 'user/updateFirmware',
    }),

    download(url) {
      window.location.href = url;
    },

    activeFirmware(item) {
      this.dialogConfirm = true;
      this.firmwareId = item.firmwareId;
    },

    createFirmwareInfo() {
      this.dialog = false;
      const formData = new FormData();
      formData.append('file', this.createItem.file);
      formData.append('description', this.createItem.description);
      formData.append('timeDetection', this.createItem.timeDetection);
      this.createFirmware(formData);
    },

    activeFirmwareDone() {
      this.dialogConfirm = false;
      this.updateFirmware(this.firmwareId);
      this.firmwareId = '';
    },

    startTrain() {

    },
  },
};
</script>
