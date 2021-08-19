<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <side-menu-bar-admin class="d-flex justify-center" />

      <template v-slot:append>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="logout" style="color: #3645f1">
              <span class="font-nunito size-h4">Logout</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      dense
      height="70"
      class="white vendor pa-0 hidden-xs-only"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
        _style="color: #727cf5 !important"
        class="nav-icon"
      >
      </v-app-bar-nav-icon>
      <v-img
        alt="Hostel Renting"
        class="shrink ml-1"
        contain
        src="@/assets/sleepy-driver.png"
        transition="scale-transition"
        max-width="60"
        max-height="40"
      />
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar color="white" width="40" dense v-if="loadingTraining">
        <v-toolbar-title style="color: #727cf5"> Training...</v-toolbar-title>
        <v-progress-linear
          :active="loadingTraining"
          :indeterminate="loadingTraining"
          absolute
          bottom
          color="deep-purple accent-4"
        ></v-progress-linear>
      </v-toolbar>
      <v-card v-if="loadingNotification" color="green">
        <div class="d-flex">
          <v-card-text style="color: white">Finish Training Process</v-card-text>
          <v-btn color="white" outlined class="mt-2 mr-2" @click="change" to="/model-version-management" v-if="!checkRouteName"> View </v-btn>
          <v-btn color="white" outlined class="mt-2 mr-2" @click="change2" v-else> Refresh </v-btn>
        </div>
      </v-card>
      <!--
      <profile-menu v-if="!isLoadingUser" /> -->
    </v-app-bar>
    <!-- Mobile app bar -->
    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      dense
      height="70"
      class="vendor pa-0 hidden-sm-and-up"
      style="background: linear-gradient(135deg, #8f75da 0, #727cf5 60%)"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
        style="color: #fff !important"
      >
      </v-app-bar-nav-icon>
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
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main _style="max-height: calc(100vh); overflow-y: hidden;">
      <v-container
        id="container"
        ref="container"
        fluid
        style="max-height: 100%"
        class="d-flex flex-column"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import SideMenuBarAdmin from '../components/core_layout/SideMenuBarAdmin.vue';
// import profileMenu from '../components/vendor/overview/ProfileMenu.vue';
import authenticationMixins from '../components/mixins/authentication';
// import pushNotificationMixins from '../components/mixins/pushNotification';

export default {
  name: 'AdminView',
  mixins: [authenticationMixins],
  components: {
    SideMenuBarAdmin,
    // profileMenu,
  },
  computed: {
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
    loadingTraining() {
      return this.$store.state.user.loading.loadingTraining;
    },
    loadingNotification() {
      return this.$store.state.user.loading.loadingNotification;
    },
    currentRouteName() {
      return this.$route.name;
    },
    checkRouteName() {
      return this.currentRouteName === 'ModelVersion';
    },
    // hasMessagingToken() {
    //   return localStorage.getItem('messagingToken') != null;
    // },
    token() {
      return window.$cookies.get('token');
    },
  },
  data: () => ({
    primaryDrawer: {
      model: null,
      type: 'temporary',
      clipped: true,
    },
  }),
  methods: {
    ...mapActions({
      clearUserData: 'user/clearUserData',
      updateUser: 'user/updateUser',
      getUser: 'user/getUser',
      updateLoadingNotification: 'user/updateLoadingNotification',
    }),

    logout() {
      this.$router.push('login');
      window.$cookies.remove('token');
    },

    change() {
      this.updateLoadingNotification(false);
    },

    change2() {
      this.updateLoadingNotification(false);
      this.$router.go();
    },
  },
  watch: {
    loadingTraining(val) {
      if (!val) return;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.updateLoadingNotification(true), 1000 * 60 * 3);
    },
  },
  created() {
    // if (!this.user) {
    //   this.getUser().then(() => {
    //     console.log('get fcm token at sideMenuBar.vue');
    //     // this.doGetMessagingToken();
    //   });
    // } else {
    //   this.doGetMessagingToken();
    // }
    if (!this.user) {
      this.getUser();
    }
  },
};
</script>
<style scoped>
.full-height {
  min-height: 100%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
}
.vendor.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important;
}
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
<style>
.primary-box-shadown {
  box-shadow: 0 0 40px 0 rgba(154, 161, 171, 0.15) !important;
}
.badge-danger-lighten {
  color: #fa5c7c;
  background-color: rgba(250, 92, 124, 0.18);
  padding: 0.25em 0.4em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.badge-success-lighten {
  color: #0acf97;
  background-color: rgba(10, 207, 151, 0.18);
  padding: 0.25em 0.4em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.text-right {
  text-align: right !important;
}
.float-right {
  float: right !important;
}
.page-title {
  font-weight: 700 !important;
  font-family: 'Nunito', sans-serif !important;
  color: #6c757d !important;
  font-size: 1.075rem !important;
}
.nav-icon {
  color: #313a46 !important;
}
.nav-icon:hover {
  color: #727cf5 !important;
}
.badge-primary {
  color: #fff;
  background-color: #727cf5;
}
.badge-warning-lighten {
  color: #ffbc00;
  font-weight: 700;
  background-color: rgba(255, 188, 0, 0.18);
}
.badge-info-lighten {
  color: #727cf5;
  font-weight: 700;
  background-color: rgba(57, 175, 209, 0.18);
}
.badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  font-size: 80%;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
</style>
