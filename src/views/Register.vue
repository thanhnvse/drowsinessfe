<template>
  <v-app>
    <v-main style="background-color: #fafbfe !important">
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-container class="fill-height" v-if="!isLoading">
        <v-dialog v-model="dialog" max-width="40%">
          <v-card style="background-color: #fedee5 !important; border-color: #fed1da; !important">
            <v-card-text
              style="color: #823040 !important; font-family: 'Nunito', sans-serif !important"
              class="pa-4 d-flex justify-center text-subtitle-1"
            >
              <span class="font-weight-bold mr-1">Lỗi </span>
              - Số điện thoại này đã được đăng kí</v-card-text
            >
          </v-card>
        </v-dialog>
        <div v-show="!showRenterInfor" style="width: 100%">
          <div v-show="!showRole" style="width: 100%">
            <v-row class="d-flex justify-center align-center red" style="position: relative">
              <v-col cols="11" xl="4" lg="4" sm="8" md="4" class="pa-0" style="position: absolute">
                <!-- account -->
                <v-card
                  v-show="!vetify"
                  style="width: 100%; box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important"
                  class="pb-4"
                >
                  <div
                    class="py-4 d-flex align-center"
                    style="
                      background-color: #727cf5 !important;
                      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
                    "
                  >
                    <div
                      style="height: 55px; width: 55px; border-radius: 50%"
                      class="white d-flex flex-column justify-center align-center ml-5"
                    >
                      <v-img
                        alt="Hostel Renting"
                        class="shrink ml-1"
                        contain
                        src="@/assets/logo-sac.png"
                        transition="scale-transition"
                        max-width="50"
                        max-height="35"
                      />
                    </div>
                    <span class="font-nunito font-weight-bold ml-14" style="font-size: 1.5rem"
                      >nhà trọ SAC</span
                    >
                  </div>
                  <v-card-text class="d-flex flex-column">
                    <span
                      class="align-self-center font-weight-bold font-nunito brow-text"
                      style="font-size: 1.125rem"
                      >ĐĂNG KÝ</span
                    >
                    <v-form
                      ref="formUsernamePassword"
                      v-model="valid.usernamePassword"
                      :lazy-validation="lazy.usernamePassword"
                      class="pa-4 d-flex flex-column"
                    >
                      <v-text-field
                        class="register"
                        v-model="name"
                        solo
                        label="Nhập họ tên của bạn"
                        prepend-icon="mdi mdi-account-outline"
                        color="#727cf5"
                        :rules="[rules.required]"
                      />
                      <v-text-field
                        class="register py-0"
                        v-model="password"
                        solo
                        label="Nhập mật khẩu"
                        prepend-icon="mdi mdi-shield-lock-outline"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPass ? 'text' : 'password'"
                        @click:append="showPass = !showPass"
                        color="#727cf5"
                        :rules="[rules.required, rules.password.minLength]"
                        hint="Ít nhất 6 kí tự"
                      ></v-text-field>
                      <v-text-field
                        class="register py-0"
                        v-model="phone"
                        solo
                        label="Nhập số điện thoại"
                        prepend-icon="mdi mdi-phone"
                        color="#727cf5"
                        :rules="[rules.phoneNumber]"
                      ></v-text-field>

                      <v-btn
                        min-width="100%"
                        :disabled="!valid.usernamePassword"
                        class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center"
                        @click="verifyPhoneNumber()"
                      >
                        <v-icon small class="mr-2">mdi mdi-account-arrow-right-outline</v-icon>Tiếp
                        theo
                      </v-btn>
                    </v-form>
                    <span
                      class="font-nunito text-gray align-self-center mt-1"
                      style="font-size: 16px !important"
                      >Đăng ký bằng</span
                    >
                  </v-card-text>
                  <v-card-actions class="d-flex justify-center mt-n2">
                    <v-btn disabled outlined fab color="#39afd1" x-small class="register mx-2">
                      <v-icon small class="icon-phone">mdi mdi-phone</v-icon>
                    </v-btn>
                    <v-btn disabled outlined fab color="#727cf5" x-small class="register mx-2">
                      <v-icon small class="icon-fb">mdi mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn disabled outlined fab color="#fa5c7c" x-small class="register mx-2">
                      <v-icon small class="icon-gmail">mdi mdi-google</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-text class="d-flex justify-center align-center py-0">
                    <span class="text-muted">Đã có tài khoản?</span>
                    <v-btn text link color="#727cf5" @click="goToLoginPage">Đăng nhập</v-btn>
                  </v-card-text>
                  <v-card-text class="d-flex justify-center align-center py-0">
                    <v-btn text link color="#727cf5" to="/">Quay về trang chủ</v-btn>
                  </v-card-text>
                </v-card>
                <!-- vetify -->
                <v-card
                  v-show="vetify"
                  _v-show="true"
                  style="width: 100%; box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important"
                  class="pb-4"
                >
                  <div
                    class="py-4 d-flex align-center"
                    style="
                      background-color: #727cf5 !important;
                      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
                    "
                  >
                    <div
                      style="height: 55px; width: 55px; border-radius: 50%"
                      class="white d-flex flex-column justify-center align-center ml-5"
                    >
                      <v-img
                        alt="Hostel Renting"
                        class="shrink ml-1"
                        contain
                        src="@/assets/logo-sac.png"
                        transition="scale-transition"
                        max-width="50"
                        max-height="35"
                      />
                    </div>
                    <span class="font-nunito font-weight-bold ml-14" style="font-size: 1.5rem"
                      >nhà trọ SAC</span
                    >
                  </div>
                  <v-card-text class="d-flex flex-column px-10 py-4">
                    <span
                      class="align-self-center font-weight-bold font-nunito brow-text mt-4"
                      style="font-size: 1.125rem"
                      >Nhập mã xác nhận</span
                    >
                    <span
                      class="font-nunito mt-3 align-self-center"
                      _style="font-size: 17px!important;"
                      >Mã xác nhận được gửi qua số điện thoại</span
                    >
                    <span class="align-self-center text-body-1 font-nunito text-primary">{{
                      phone
                    }}</span>
                    <v-form class="d-flex flex-column mt-3">
                      <v-text-field
                        class="register"
                        v-model="vetifyCode"
                        solo
                        label="Nhập mã xác nhận"
                        color="#727cf5"
                      ></v-text-field>
                      <span class="font-nuntio red--text size-caption" v-if="showErrorWrongOTP"
                        >Sai mã xác nhận</span
                      >
                      <span class="text-gray-dark font-nunito">
                        Gửi lại mã sau: <span class="font-weight-bold">{{ timeleft }}</span
                        >s
                      </span>
                      <div class="d-flex justify-space-between">
                        <v-btn
                          style="letter-spacing: 0.01rem !important"
                          class="pl-0"
                          text
                          link
                          :disabled="disableResendOTP"
                          color="#fa5c7c"
                          @click="verifyPhoneNumber()"
                          >Gửi lại mã xác nhận</v-btn
                        >
                        <v-btn
                          @click="rollback()"
                          class="pr-0"
                          text
                          link
                          color="#727cf5"
                          style="letter-spacing: 0.01rem !important"
                          >Nhập lại số điện thoại</v-btn
                        >
                      </div>
                      <v-btn
                        @click="showRoleConfirmation()"
                        min-width="100%"
                        class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 mt-5 bt-primary-hover d-flex align-center"
                        >XÁC NHẬN</v-btn
                      >
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
              <div id="recaptcha-container" style="position: absolute"></div>
            </v-row>
          </div>
          <!-- confirm role -->
          <div v-show="showRole" style="width: 100%">
            <v-row class="d-flex justify-center mb-4">
              <v-col cols="11" md="11" class="d-flex flex-column justify-center align-center">
                <span style="color: #4250f2; font-size: 2.125rem" class="font-nunito"
                  >Chào mừng bạn đến với Nhà trọ SAC!</span
                >
                <span class="font-nunito text-gray" style="font-size: 1.15rem"
                  >Để chúng tôi phục vụ nhu cầu của bạn hiệu quả nhất, vui lòng chọn mục đích sử
                  dụng/vai trò của mình trong Nhà trọ SAC!</span
                >
              </v-col>
            </v-row>
            <v-row class="d-flex justify-space-around align-center">
              <v-col cols="11" xl="4" lg="4" sm="8" md="4">
                <v-card
                  style="width: 100%; box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important"
                  class="pb-4"
                  min-height="300"
                >
                  <div
                    class="py-4 d-flex justify-center align-center"
                    style="
                      background-color: #727cf5 !important;
                      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
                    "
                  >
                    <v-img
                      alt="Hostel Renting"
                      class="shrink mr-2"
                      contain
                      src="@/assets/renter.png"
                      max-height="40"
                    />
                    <span class="white--text font-nunito" style="font-size: 1.3rem"
                      >Khách thuê</span
                    >
                  </div>
                  <v-card-text class="d-flex flex-column px-10 py-4" style="min-height: 250px">
                    <div class="d-flex">
                      <v-icon class="mr-2" color="#727cf5">mdi mdi-check-bold</v-icon>
                      <span class="font-nunito">Tìm kiếm nhà trọ theo nhu cầu</span>
                    </div>
                    <div class="d-flex mt-1">
                      <v-icon class="mr-2" color="#727cf5">mdi mdi-check-bold</v-icon>
                      <span class="font-nunito">Hỗ trợ trả giá và đặt lịch hẹn xem phòng</span>
                    </div>
                    <v-btn
                      @click="chooseRenter()"
                      min-width="100%"
                      class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 mt-auto bt-primary-hover d-flex align-center"
                      >XÁC NHẬN</v-btn
                    >
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="11" xl="4" lg="4" sm="8" md="4">
                <v-card
                  style="width: 100%; box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important"
                  class="pb-4"
                >
                  <div
                    class="py-4 d-flex justify-center align-center"
                    style="
                      background-color: #727cf5 !important;
                      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
                    "
                  >
                    <v-img
                      alt="Hostel Renting"
                      class="shrink mr-2"
                      contain
                      src="@/assets/vendor.png"
                      max-height="40"
                    />
                    <span class="white--text font-nunito" style="font-size: 1.3rem">Chủ trọ</span>
                  </div>
                  <v-card-text
                    class="d-flex flex-column align-end px-10 py-4"
                    style="min-height: 250px"
                  >
                    <div class="d-flex">
                      <v-icon class="mr-2" color="#727cf5">mdi mdi-check-bold</v-icon>
                      <span class="font-nunito"
                        >Đăng tin bán và thuê chuyên nghiệp, tăng khả năng tiếp cận tin đăng đến
                        khách hàng</span
                      >
                    </div>
                    <div class="d-flex mt-1">
                      <v-icon class="mr-2" color="#727cf5">mdi mdi-check-bold</v-icon>
                      <span class="font-nunito"
                        >Công cụ quản lý phòng thuê dễ sử dụng và đạt hiệu quả cao</span
                      >
                    </div>
                    <v-btn
                      @click="registerVendor()"
                      min-width="100%"
                      class="mt-auto bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center"
                      >XÁC NHẬN</v-btn
                    >
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- fill schoolmate and hometown -->
        <div v-show="showRenterInfor" style="width: 100%">
          <v-row v-show="true" v-if="!isLoading" class="d-flex justify-center align-center">
            <v-col cols="11" xl="4" lg="4" sm="8" xs="11" md="6" class="pa-0">
              <v-card
                style="box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important"
                class="pb-4"
              >
                <div
                  class="py-4 d-flex align-center"
                  style="
                    background-color: #727cf5 !important;
                    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
                  "
                >
                  <div
                    style="height: 55px; width: 55px; border-radius: 50%"
                    class="white d-flex flex-column justify-center align-center ml-5"
                  >
                    <v-img
                      alt="Hostel Renting"
                      class="shrink ml-1"
                      contain
                      src="@/assets/logo-sac.png"
                      transition="scale-transition"
                      max-width="50"
                      max-height="35"
                    />
                  </div>
                  <span class="font-nunito font-weight-bold ml-14" style="font-size: 1.5rem"
                    >nhà trọ SAC</span
                  >
                </div>
                <v-card-text class="d-flex flex-column pa-10">
                  <v-form class="d-flex flex-column">
                    <v-autocomplete
                      v-model="school"
                      :items="filter.schools.items"
                      item-text="schoolName"
                      item-value="schoolId"
                      label="Bạn học trường"
                      class="text-body-2"
                      filled
                      cache-items
                      dense
                      color="indigo"
                      clearable
                      background-color="white"
                      no-data-text="Không có kết quả phù hợp"
                      :style="{
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                      }"
                    >
                      <template slot="selection" slot-scope="{ item }">
                        <span class="font-nunito font-weight-medium text-body-2">{{
                          item.schoolName
                        }}</span>
                        <span class="font-nunito font-italic text-body-2"
                          >- {{ item.address.districtName }},
                          {{ item.address.province.provinceName }}</span
                        >
                      </template>
                      <template slot="item" slot-scope="{ item }">
                        <span class="font-nunito font-weight-medium text-body-2">{{
                          item.schoolName
                        }}</span>
                        <span class="font-nunito font-italic text-body-2"
                          >- {{ item.address.districtName }},
                          {{ item.address.province.provinceName }}</span
                        >
                      </template>
                    </v-autocomplete>
                    <v-autocomplete
                      v-model="hometown"
                      :items="filter.hometown.items"
                      label="Quê ở"
                      item-text="provinceName"
                      item-value="provinceId"
                      class="text-body-2"
                      filled
                      cache-items
                      dense
                      color="indigo"
                      clearable
                      background-color="white"
                      no-data-text="Không có kết quả phù hợp"
                      :style="{
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                      }"
                    ></v-autocomplete>
                    <v-btn
                      @click="registerRenter()"
                      min-width="100%"
                      :loading="isCreate"
                      class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center"
                    >
                      <v-icon small class="mr-2">mdi mdi-account-circle</v-icon>Đăng ký
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex';
import authenticationMixins from '../components/mixins/authentication';
import firebase from '../config/firebase';

const { auth, authNamespace } = firebase;

export default {
  name: 'register',
  mixins: [authenticationMixins],
  data: () => ({
    prevRoute: null,
    appVerifier: '',
    vetify: false,
    showRole: false,
    showRenterInfor: false,
    showPass: false,
    disableResendOTP: true,
    timeleft: 80,
    vetifyCode: '',
    dialog: false,
    // user infomation
    name: '',
    username: '',
    password: '',
    phone: '',
    role: '',
    school: '',
    hometown: '',
    showErrorWrongOTP: false,
    rules: {
      required: (value) => !!value || 'Xin đừng để trống!',
      password: {
        minLength: (value) => value.length >= 6 || 'Ít nhất 6 kí tự',
      },
      phoneNumber: (value) => {
        const pattern = /^[0]{1}[0-9]{8,10}$/;
        return pattern.test(value) || 'Số điện thoại không hợp lệ';
      },
    },
    valid: {
      usernamePassword: true,
    },
    lazy: {
      usernamePassword: false,
    },
  }),
  methods: {
    ...mapActions({
      getAllSchools: 'renter/filterResult/getAllSchools',
      getAllProvinces: 'renter/filterResult/getAllProvinces',
      createRenter: 'user/registerRenter',
      createVendor: 'user/registerVendor',
    }),
    verifyPhoneNumber() {
      this.showErrorWrongOTP = false;
      this.validateFormUsernamePassword();
      this.sendOtp();
    },
    sendOtp() {
      const countryCode = '+84'; // vietnam
      const phoneNumber = countryCode + this.phone.substring(1);
      //
      const { appVerifier } = this;
      //
      auth
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.vetify = true; // switch to the vetify code UI
          // eslint-disable-next-line
          alert('Đã gửi mã xác thực');
          this.countdownTime();
          setTimeout(() => {
            this.disableResendOTP = false;
          }, 80000);
        })
        .catch((error) => {
          console.log(error);
          // eslint-disable-next-line
          alert('Lỗi ! Mã xác thực không gửi được');
        });
    },
    verifyOtp() {
      // const vm = this;
      const code = this.vetifyCode;
      //
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const { user } = result;
          console.log(user);
          // ...
          // route to set password !
          this.showRole = true;
        })
        .catch((error) => {
          this.showErrorWrongOTP = true;
          console.log(error);
        });
    },
    initReCaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new authNamespace.RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
          callback(response) {
            console.log(response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          // eslint-disable-next-line
          'expired-callback': function () {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        });
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
    rollback() {
      this.vetify = false;
    },
    showRoleConfirmation() {
      this.verifyOtp();
    },
    chooseRenter() {
      this.role = 'renter';
      this.showRenterInfor = true;
    },
    validateFormUsernamePassword() {
      this.$refs.formUsernamePassword.validate();
    },
    countdownTime() {
      let time = this.timeleft;
      const downloadTimer = setInterval(() => {
        if (time <= 0) {
          clearInterval(downloadTimer);
        }
        this.timeleft = time;
        time -= 1;
      }, 1000);
    },
    async registerRenter() {
      const renter = {
        username: this.name,
        password: this.password,
        phone: this.phone,
      };
      if (this.hometown) {
        const hometown = { provinceId: this.hometown };
        renter.hometown = hometown;
      }
      if (this.school) {
        const school = { schoolId: this.school };
        renter.school = school;
      }
      await this.createRenter(renter);
      await this.login();
    },
    async registerVendor() {
      const vendor = {
        username: this.name,
        password: this.password,
        phone: this.phone,
      };
      await this.createVendor(vendor);
      await this.login();
    },
    goToLoginPage() {
      this.$router.push('/login');
    },
  },
  computed: {
    isLoading() {
      const hometown = this.$store.state.renter.filterResult.filter.hometown.isLoading;
      const schools = this.$store.state.renter.filterResult.filter.schools.isLoading;
      return hometown || schools;
    },
    isCreate() {
      return this.$store.state.user.user.isLoading;
    },
    filter() {
      return this.$store.state.renter.filterResult.filter;
    },
    duppicateError() {
      return this.$store.state.user.user.error;
    },
    registerStatus() {
      return this.$store.state.user.user.success;
    },
    userData() {
      return this.$store.state.user.user.data;
    },
  },
  created() {
    if (this.filter.schools.items.length === 0) {
      this.getAllSchools();
    }
    this.getAllProvinces().then(() => this.initReCaptcha());
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from; // eslint-disable-line
    });
  },
};
</script>
<style>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.brow-text {
  color: #6c757d;
}
.register .v-input__slot {
  border: 1px solid #dee2e6 !important;
  box-shadow: none !important;
  border-radius: 0.25rem;
  height: calc(2.25rem + 2px) !important;
  height: 30px !important;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
}
.register.v-text-field.v-text-field--solo .v-label {
  color: #bfb9b9 !important;
  font-family: 'Nunito', sans-serif !important;
  font-weight: lighter !important;
}
.mdi-eye::before {
  font-size: 0.9rem !important;
}
.mdi-eye-off::before {
  font-size: 0.9rem !important;
}
.register.v-btn--outlined {
  border: 2px solid currentColor;
}
.icon-fb.v-icon:hover {
  color: #2b3af0 !important;
}
.icon-gmail.v-icon:hover {
  color: #f81240 !important;
}
.icon-phone.v-icon:hover {
  color: #247f9a !important;
}
</style>
