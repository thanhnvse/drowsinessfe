import { mapActions } from 'vuex';
import firebase from '../../config/firebase';
// import pushNotiMixins from './pushNotification';

const { auth } = firebase;

const authenticationMixins = {
  data: () => ({
    loging: false,
  }),
  // mixins: [pushNotiMixins],
  computed: {
    userData() {
      return this.$store.state.user.user.data;
    },
    loginSuccess() {
      return this.$store.state.user.user.success;
    },
  },
  methods: {
    ...mapActions({
      loginRequest: 'user/login',
    }),
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$cookies.remove('role');
          this.$cookies.remove('userId');
          this.$cookies.remove('jwt');
          this.$cookies.remove('firebaseIdToken');
          this.$cookies.remove('messagingToken');
          this.clearUserData();
          this.$router.push('/');
        })
        .catch((error) => console.log(error));
    },
    async getTokenIdFromFirebase(jwtToken) {
      try {
        await auth.setPersistence(firebase.authNamespace.Auth.Persistence.LOCAL);
        await auth.signInWithCustomToken(jwtToken);
        const { currentUser } = auth;
        console.log('firebase user data:', currentUser);
        const idToken = await currentUser.getIdToken(true);
        console.log(idToken);
        const { refreshToken } = currentUser;
        return { idToken, refreshToken };
      } catch (error) {
        console.log('firebase login error: ', error);
      }
      return null;
    },
    async afterLogin(keepCurrentRoute) {
      if (this.loginSuccess) {
        const { token } = this.userData;
        console.log(`token: ${token}`);
        this.$cookies.set('token', token);
        // const idToken = await this.getTokenIdFromFirebase(jwtToken);
        // this.$cookies.set('firebaseIdToken', idToken);
        // this.$cookies.set('firebaseRefreshToken', refreshToken);
        const role = 'ROLE_ADMIN';
        const id = this.userData.userId;
        // switch (this.userData.role) {
        //   case 'VENDOR':
        //     role = 'vendors';
        //     break;
        //   case 'RENTER':
        //     role = 'renters';
        //     break;
        //   case 'ADMIN':
        //     role = 'admin';
        //     break;
        //   case 'MANAGER':
        //     role = 'manager';
        //     break;
        //   default:
        //     break;
        // }
        // this.$cookies.set('role', role);
        this.$cookies.set('userId', id);
        if (!keepCurrentRoute) {
          console.log(this.$route.params);
          const { nextUrl } = this.$route.params;
          if (nextUrl) {
            this.$router.push(nextUrl);
          } else {
            switch (role) {
              case 'ROLE_ADMIN':
                this.$router.push('/');
                break;
              default:
                this.$router.push('/404-error');
            }
          }
        }
        // this.doGetMessagingToken();
      } else {
        this.message = 'Error username or password!';
      }
    },
    async login(keepCurrentRoute) {
      this.loging = true;
      await this.loginRequest({
        username: this.username,
        password: this.password,
      });
      await this.afterLogin(keepCurrentRoute);
      this.loging = false;
    },
  },
};

export default authenticationMixins;
