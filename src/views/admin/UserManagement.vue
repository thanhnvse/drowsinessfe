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
                label="Search by email"
                v-model="searchQuery"
                solo
                hide-details
                class="text-muted py-1 size-sub-2 light-text-field font-nunito"
                clearable
                dense
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
            <div class="d-flex pb-5">
              <span
                style="letter-spacing: 0.02em; font-weight: 800"
                class="text-gray font-nunito size9rem mt-2"
                >User Management</span
              >
            </div>
            <v-data-table
              :headers="headers"
              :items="changeDrivers"
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
              <!-- dialog for active user -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="activeUser(item)"> mdi-pencil </v-icon>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" color="#727cf5"></v-pagination>
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
                  >User Information
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
                                  >{{ selectedItem.fullName }}</v-card-text
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
                                  >{{ selectedItem.email }}</v-card-text
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
                        </v-col>
                        <v-col cols="12" class="pt-5">
                          <v-row no-gutters>
                            <v-col cols="3" class="d-flex justify-start">
                              <v-card-text
                                style="font-size: 16px"
                                class="pa-0 py-0 pt-2 font-weight-medium"
                                >Created Date</v-card-text
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
                                    new Date(selectedItem.createdAt).toLocaleDateString()
                                  }}</v-card-text
                                >
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                </v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn depressed color="success" @click="dialogConfirm = true">
                    {{ selectedItem.active ? 'Inactive' : 'Active' }}
                  </v-btn>
                  <v-btn depressed color="error" @click="dialog = false"> Close </v-btn>
                </v-card-actions>
              </v-card>
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
                  >Confirm change status
                </span>
              </v-card>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="grey darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                <v-btn color="#727CF5" text @click="updateUserInfo"> Agree </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar v-model="snackbar" timeout="1000" color="green">
            Update user's status successfully!
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

export default {
  name: 'UserManagement',
  mixins: [snackBarMixin],
  data: () => ({
    dialog: false,
    dialogConfirm: false,
    snackbar: false,
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'no',
      },
      // { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Full name', value: 'fullName' },
      { text: 'Status', value: 'active' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    selectedItem: {
      fullName: '',
      email: '',
      active: true,
      createdAt: 0,
      avatar: '',
    },
    defaultItem: {
      fullName: '',
      email: '',
      active: true,
      createdAt: 0,
      avatar: '',
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
      items: ['INACTIVE', 'ACTIVE', 'ALL'],
      selected: 'ALL',
    },
    page: 1,
    pageCount: 0,
    itemsPerPage: 7,
    updatable: false,
  }),

  computed: {
    isLoading() {
      const drivers = this.$store.state.user.drivers.isLoading;
      return drivers;
    },
    // ...mapState({
    //   drivers: (state) => state.user.drivers,
    // }),
    drivers() {
      return this.$store.state.user.drivers.data.results;
    },
    token() {
      return window.$cookies.get('token');
    },

    changeDrivers() {
      if (this.searchQuery === null) {
        if (this.roomStatus.selected === 'ALL') {
          return this.drivers.map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'ACTIVE') {
          return this.drivers
            .filter((item) => item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'INACTIVE') {
          return this.drivers
            .filter((item) => !item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
      }
      if (this.searchQuery !== null) {
        if (this.roomStatus.selected === 'ALL') {
          return this.drivers
            .filter(
              (item) => item.email.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
            )
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'ACTIVE') {
          return this.drivers
            .filter(
              (item) => item.email.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
            )
            .filter((item) => item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
        if (this.roomStatus.selected === 'INACTIVE') {
          return this.drivers
            .filter(
              (item) => item.email.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
            )
            .filter((item) => !item.active)
            .map((items, no) => ({ ...items, no: no + 1 }));
        }
      }
      return null;
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
  },

  methods: {
    ...mapActions({
      getDrivers: 'user/getDrivers',
      updateUser: 'user/updateUser',
      banUser: 'user/banUser',
    }),
    getColor(active) {
      if (active === true) return 'green';
      return 'red';
    },

    activeUser(item) {
      // set default
      this.selectedItem = { ...this.defaultItem };
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

    updateUserInfo() {
      if (this.selectedItem.active) {
        this.selectedItem.active = false;
      } else {
        this.selectedItem.active = true;
      }
      this.updateItem = { ...this.selectedItem };
      this.dialogConfirm = false;
      this.dialog = false;
      // this.updateUser(this.updateItem).then(() => {
      //   this.updatable = false;
      //   // if (this.drivers.error) {
      //   //   this.showSnackBar('Update user status fail ', { color: 'red' });
      //   // } else if (this.user.success) {
      //   //   this.showSnackBar('Update user status successfully', { color: 'green' });
      //   // }
      // });
      const formData = new FormData();
      formData.append('active', this.selectedItem.active);
      formData.append('userId', this.selectedItem.userId);
      this.banUser(formData).then(() => {
        this.updatable = false;
        // if (this.drivers.error) {
        //   this.showSnackBar('Update user status fail ', { color: 'red' });
        // } else if (this.user.success) {
        //   this.showSnackBar('Update user status successfully', { color: 'green' });
        // }
        this.snackbar = true;
      });
    },
  },
};
</script>
