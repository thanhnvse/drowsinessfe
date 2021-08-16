<template>
  <div v-if="!refreshFirebaseTokenId">
    <router-view></router-view>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}
    </v-snackbar>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import './assets/css/style.css';
import pushNotificationMixins from './components/mixins/pushNotification';
import snackBarMixin from './components/mixins/snackBar';
import processFCMForeground from './components/mixins/processFCMForeground';
// import utils from './utils/utils';

export default {
  name: 'App',
  mixins: [pushNotificationMixins, snackBarMixin, processFCMForeground],
  components: {},
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
    refreshFirebaseTokenId: false,
  }),
  created() {
    this.getUser().then(() => {
      console.log('get fcm token at app.vue');
      this.doGetMessagingToken();
    });
    document.addEventListener('swUpdated', this.refreshApp, { once: true });
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    }
    // From your client pages:
    const channel = new BroadcastChannel('yoho-sw-messages');
    channel.addEventListener('message', (event) => {
      console.log('Received', event.data);
      this.receiveNewMessage(event.data);
    });
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    refreshApp(e) {
      this.showSnackBar('Đang tải bản cập nhật mới', { color: 'green' });
      this.registration = e.detail;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage('skipWaiting');
    },
  },
  computed: {},
};
</script>
