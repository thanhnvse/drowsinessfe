import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';

Vuetify.config.silent = false;
Vue.use(Vuetify);
Vue.use(VueI18n);

// eslint-disable-next-line
const messages = {
  en: {
    $vuetify: {
      dataTable: {
        itemsPerPageText: 'Dòng/trang',
        ariaLabel: {
          sortDescending: 'Giảm dần.',
          sortAscending: 'Tăng dần.',
          sortNone: 'Không sắp xếp',
          activateNone: 'Activate to remove sorting.',
          activateDescending: 'Đang sắp xếp giảm dần.',
          activateAscending: 'Đang sắp xếp Tăng dần.',
        },
        sortBy: 'Sắp xếp theo',
      },
      dataFooter: {
        itemsPerPageText: 'Dòng/trang:',
        itemsPerPageAll: 'Tất cả',
        nextPage: 'Trang tiếp theo',
        prevPage: 'Trang trước',
        firstPage: 'Trang đầu tiên',
        lastPage: 'Trang cuối cùng',
        pageText: '{0}-{1} of {2}',
      },
    },
  },
};
// eslint-disable-next-line
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});

// export default new Vuetify({
//   lang: {
//     t: (key, ...params) => i18n.t(key, params),
//   },
// });
export default new Vuetify({});
