const myState = () => ({
  provinces: {
    data: [],
    isLoading: false,
  },
  districts: {
    data: [],
  },
  wards: {
    data: [],
  },
  categories: {
    data: [],
    isLoading: false,
  },
});
const getters = {
  getCategoryId: (state) => (id) => {
    const result = state.categories.data.find((category) => category.categoryId === Number(id));
    return result;
  },
  getWardById: (state) => (id) => state.wards.data.find((ward) => ward.wardId === Number(id)),
  // eslint-disable-next-line arrow-body-style
  getDistrictByWardId: (state) => (id) => {
    // eslint-disable-next-line arrow-body-style
    return state.districts.data.find((district) => {
      return district.wards.find((ward) => ward.wardId === Number(id));
    });
  },
  // eslint-disable-next-line arrow-body-style
  getProvinceByDistrictId: (state) => (id) => {
    // eslint-disable-next-line arrow-body-style
    return state.provinces.data.find((province) => {
      return province.districts.find((district) => district.districtId === Number(id));
    });
  },
};
const mutationTypes = {
  GET_PROVINCES_REQUEST: 'GET_PROVINCES_REQUEST',
  GET_PROVINCES_SUCCESS: 'GET_PROVINCES_SUCCESS',
  GET_PROVINCES_FAILURE: 'GET_PROVINCES_FAILURE',
  GET_CATEGORIES_REQUEST: 'GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'GET_CATEGORIES_FAILURE',
};
const mutations = {
  GET_CATEGORIES_REQUEST(state) {
    state.categories.isLoading = true;
  },
  GET_CATEGORIES_SUCCESS(state, categories) {
    state.categories.data = categories;
    state.categories.isLoading = false;
  },
  GET_CATEGORIES_FAILURE(state) {
    state.categories.isLoading = false;
  },
  GET_PROVINCES_REQUEST(state) {
    state.provinces.isLoading = true;
  },
  GET_PROVINCES_SUCCESS(state, provinces) {
    // get all districts from provinces
    let districts = provinces.map((province) => province.districts);
    districts = districts.flat();
    // get all wards from districts
    let wards = districts.map((district) => district.wards);
    wards = wards.flat();
    // set data
    state.provinces.data = provinces;
    state.districts.data = districts;
    state.wards.data = wards;
    state.provinces.isLoading = false;
  },
  GET_PROVINCES_FAILURE(state) {
    state.provinces.isLoading = false;
  },
};
const actions = {
  async getCategories({ commit, state }) {
    if (state.categories.data.length === 0) {
      commit(mutationTypes.GET_CATEGORIES_REQUEST);
      const res = await window.axios.get('/api/v1/categories');
      if (res.status === 200) {
        commit(mutationTypes.GET_CATEGORIES_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_PROVINCES_FAILURE);
      }
    }
  },
  async getProvinces({ commit, state }) {
    if (state.provinces.data.length === 0) {
      commit(mutationTypes.GET_PROVINCES_REQUEST);
      const res = await window.axios.get('/api/v1/provinces');
      if (res.status === 200) {
        commit(mutationTypes.GET_PROVINCES_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_PROVINCES_FAILURE);
      }
    }
  },
};
export default {
  namespaced: true,
  state: myState,
  mutations,
  getters,
  actions,
};
