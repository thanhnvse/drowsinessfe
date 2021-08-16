<template>
  <div>
    <v-card
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
          >ĐĂNG NHẬP</span
        >
        <v-form
          ref="formUsernamePassword"
          v-model="valid.usernamePassword"
          :lazy-validation="lazy.usernamePassword"
          class="pa-4 d-flex flex-column"
        >
          <v-text-field
            class="register py-0"
            v-model="phone"
            solo
            label="Nhập số điện thoại"
            prepend-icon="mdi mdi-phone"
            color="#727cf5"
            :rules="[rules.phoneNumber]"
          ></v-text-field>
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
          <span class="red--text font-nunito" style="font-size: 0.9rem; font-weight: 400">{{
            message
          }}</span>
          <span class="ml-auto font-nunito text-muted" style="font-size: 0.75rem; font-weight: 400"
            >Quên mật khẩu</span
          >
          <v-btn
            min-width="100%"
            :disabled="!valid.usernamePassword"
            class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center mt-2"
            :loading="loging"
            @click="login(true)"
          >
            <v-icon small class="mr-2">mdi mdi-account-arrow-right-outline</v-icon>Đăng nhập
          </v-btn>
        </v-form>
        <span
          class="font-nunito text-gray align-self-center mt-1"
          style="font-size: 16px !important"
          >Đăng nhập bằng</span
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
        <span class="text-muted">Chưa có tài khoản?</span>
        <v-btn text link color="#727cf5" @click="register()">Đăng ký</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import authenticationMixins from '../mixins/authentication';

export default {
  name: 'loginBox',
  mixins: [authenticationMixins],
  data: () => ({
    phone: '',
    password: '',
    showPass: false,
    message: '',
    rules: {
      empty: (value) => value.length > 0 || 'Không được để trống.',
      phone: (value) => Number.isInteger(Number(value)) === true || 'Phải là số điện thoại',
      required: (value) => !!value || 'Xin đừng để trống!',
      password: {
        minLength: (value) => value.length >= 6 || 'Ít nhất 6 kí tự',
      },
      phoneNumber: (value) => {
        const pattern = /^[0]{1}[0-9]{8,10}$/;
        return pattern.test(value) || 'Số điện thoại không hợp lệ';
      },
    },
    loging: false,
    valid: {
      usernamePassword: true,
    },
    lazy: {
      usernamePassword: false,
    },
  }),
  computed: {
    isLoging() {
      return this.$store.state.user.user.isLoading;
    },
  },
  methods: {
    validateFormUsernamePassword() {
      this.$refs.formUsernamePassword.validate();
    },
    register() {
      this.$router.push('/register');
    },
  },
  created() {},
};
</script>
<style scoped></style>
