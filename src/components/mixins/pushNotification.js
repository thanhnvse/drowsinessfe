import { mapState, mapActions } from 'vuex';

import firebase from '../../config/firebase';
import constant from '../../config/constant';

const { messaging } = firebase;

const pushNotificationMixins = {
  data: () => ({}),
  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
      updateUserFirebaseToken: 'user/updateUserFirebaseToken',
      getUser: 'user/getUser',
    }),
    getMessagingToken() {
      messaging
        .getToken({ vapidKey: constant.PUBLIC_VAPID_KEY })
        .then(async (token) => {
          if (token) {
            // const currentMessageToken = window.localStorage.getItem('messagingToken');
            const currentMessageToken = this.userDataForChecking.firebaseToken;
            console.log('token will be updated', currentMessageToken !== token);
            if (currentMessageToken !== token) {
              await this.saveToken(token);
            }
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
            this.notificationsPermisionRequest();
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    },
    notificationsPermisionRequest() {
      Notification.requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });
    },
    saveToken(token) {
      console.log('tokens', token);
      const newUser = { ...this.userDataForChecking };
      newUser.firebaseToken = token;
      this.updateUserFirebaseToken(token)
        .then((response) => {
          window.localStorage.setItem('messagingToken', token);
          console.log(response);
        })
        .catch((err) => {
          window.localStorage.setItem('messagingToken', token);
          console.log(err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem('messagingToken');
      console.log('currentMessageToken', currentMessageToken);
      if (!currentMessageToken) {
        messaging.onTokenRefresh(() => {
          messaging
            .getToken()
            .then((token) => {
              this.saveToken(token);
            })
            .catch((err) => {
              console.log('Unable to retrieve refreshed token ', err);
            });
        });
      }
    },
    doGetMessagingToken() {
      if (!this.userDataForChecking) {
        console.log('user data is null. cannot get and save firebase fcm token.');
      }
      if (messaging && this.userDataForChecking) {
        this.getMessagingToken();
      }
    },
  },
  computed: {
    ...mapState({
      userDataForChecking: (state) => state.user.user.data,
    }),
  },
};

export default pushNotificationMixins;
