<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex justify-center align-center">
        <v-row class="d-flex justify-center align-center red" style="position: relative">
          <v-col cols="11" xl="4" lg="4" sm="8" md="4" class="pa-0" style="position: absolute">
            <!-- account -->
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
                    src="@/assets/sleepy-driver.png"
                    transition="scale-transition"
                    max-width="50"
                    max-height="35"
                  />
                </div>
                <span
                  class="font-nunito font-weight-bold ml-13"
                  style="font-size: 1.4rem; color: white"
                  >Truck Driver Drowsiness Detection</span
                >
              </div>
              <v-card-text class="d-flex flex-column">
                <!-- <span
                  class="align-self-center font-weight-bold font-nunito brow-text"
                  style="font-size: 1.125rem"
                  >LOGIN</span
                > -->
                <v-form
                  ref="formUsernamePassword"
                  v-model="valid.usernamePassword"
                  :lazy-validation="lazy.usernamePassword"
                  class="pa-4 d-flex flex-column"
                >
                  <v-text-field
                    class="register py-0"
                    v-model="username"
                    solo
                    label="Enter your username"
                    prepend-icon="mdi mdi-account"
                    color="#727cf5"
                  ></v-text-field>
                  <v-text-field
                    class="register py-0"
                    v-model="password"
                    solo
                    label="Enter your password"
                    prepend-icon="mdi mdi-shield-lock-outline"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPass ? 'text' : 'password'"
                    @click:append="showPass = !showPass"
                    color="#727cf5"
                    :rules="[rules.required, rules.password.minLength]"
                    hint="At least 6 characters"
                  ></v-text-field>
                  <span class="red--text font-nunito" style="font-size: 0.9rem; font-weight: 400">{{
                    message
                  }}</span>
                  <!-- <v-btn
                    min-width="100%"
                    :disabled="!valid.usernamePassword"
                    class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center mt-2"
                    :loading="loging"
                    @click="login(false)"
                  >
                    <v-icon small class="mr-2">mdi mdi-account-arrow-right-outline</v-icon>Login
                  </v-btn> -->
                  <v-btn
                    min-width="100%"
                    class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center mt-2"
                    style="background-color: #727cf5"
                    :loading="loging"
                    @click="login(false)"
                  >
                    <v-icon small class="mr-2">mdi mdi-account-arrow-right-outline</v-icon>Login
                  </v-btn>
                  <!-- <v-btn
                    min-width="100%"
                    class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center mt-2"
                    :loading="loging"
                    @click="login2()"
                  >
                    <v-icon small class="mr-2">mdi mdi-account-arrow-right-outline</v-icon>Login
                  </v-btn> -->
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import authenticationMixins from '../components/mixins/authentication';

export default {
  name: 'login',
  mixins: [authenticationMixins],
  data: () => ({
    prevRoute: null,
    username: '',
    phone: '',
    password: '',
    showPass: false,
    message: '',
    rules: {
      empty: (value) => value.length > 0 || 'Cannot be empty.',
      phone: (value) => Number.isInteger(Number(value)) === true || 'Phải là số điện thoại',
      required: (value) => !!value || 'Please not empty!',
      password: {
        minLength: (value) => value.length >= 6 || 'At least 6 characters',
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
  computed: {
    token() {
      return window.$cookies.get('token');
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from; // eslint-disable-line
    });
  },
};
</script>
<style scoped></style>
