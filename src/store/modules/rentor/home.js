const myState = () => ({
  hostelTypes: {
    data: [],
    isLoading: false,
  },
  hostelGroups: {
    data: [],
    isLoading: false,
  },
  facilities: {
    data: [],
    isLoading: false,
  },
  services: {
    data: [],
    isLoading: false,
  },
  topView: {
    data: [],
    isLoading: false,
  },
  topViewHostelGroup: {
    data: [],
    isLoading: false,
  },
  categories: {
    data: [],
    isLoading: false,
  },
});
const getters = {
  getHostelGroupById: (state) => (id) => {
    const result = state.hostelGroups.data.filter(
      (group) => group.groupId === id,
    );
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
  getHostelTypeById: (state) => (id) => {
    const result = state.hostelTypes.data.filter(
      (type) => type.typeId === Number(id),
    );
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
  getTopViewHostelGroupById: (state) => (id) => {
    const result = state.topViewHostelGroup.data.filter(
      (group) => group.groupId === id,
    );
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
};
const mutationTypes = {
  GET_HOSTEL_TYPES_SUCCESS: 'GET_HOSTEL_TYPES_SUCCESS',
  GET_HOSTEL_TYPES_FAILURE: 'GET_HOSTEL_TYPES_FAILURE',
  GET_HOSTEL_TYPES_REQUEST: 'GET_HOSTEL_TYPES_REQUEST',

  GET_TOP_VIEW_SUCCESS: 'GET_TOP_VIEW_SUCCESS',
  GET_TOP_VIEW_FAILURE: 'GET_TOP_VIEW_FAILURE',
  GET_TOP_VIEW_REQUEST: 'GET_TOP_VIEW_REQUEST',

  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'GET_CATEGORIES_FAILURE',
  GET_CATEGORIES_REQUEST: 'GET_CATEGORIES_REQUEST',
};
const mutations = {
  // hostel type
  GET_HOSTEL_TYPES_SUCCESS(state, inputData) {
    state.hostelTypes.data = inputData.types;
    state.hostelTypes.isLoading = false;
    state.hostelGroups.data = inputData.groups;
    state.hostelGroups.isLoading = false;
  },
  GET_HOSTEL_TYPES_FAILURE(state) {
    state.hostelTypes.isLoading = false;
    state.hostelGroups.isLoading = false;
  },
  GET_HOSTEL_TYPES_REQUEST(state) {
    state.hostelTypes.isLoading = true;
    state.hostelGroups.isLoading = true;
  },
  // top view
  GET_TOP_VIEW_SUCCESS(state, inputData) {
    state.topView.data = inputData.types;
    state.topView.isLoading = false;
    state.topViewHostelGroup.data = inputData.groups;
    state.topView.isLoading = false;
  },
  GET_TOP_VIEW_FAILURE(state) {
    state.topView.isLoading = false;
    state.topViewHostelGroup.isLoading = false;
  },
  GET_TOP_VIEW_REQUEST(state) {
    state.topView.isLoading = true;
    state.topViewHostelGroup.isLoading = true;
  },
  // categories
  GET_CATEGORIES_SUCCESS(state, inputData) {
    state.categories.data = inputData;
    state.categories.isLoading = false;
  },
  GET_CATEGORIES_FAILURE(state) {
    state.categories.isLoading = false;
  },
  GET_CATEGORIES_REQUEST(state) {
    state.categories.isLoading = true;
  },
};
const actions = {
  async getHostelTypes({ commit }, params) {
    // params = { page, size }
    commit(mutationTypes.GET_HOSTEL_TYPES_REQUEST);
    const response = await window.axios.get(
      `/api/v1/types?page=${params.page}&size=${params.size}`,
    );
    if (response.status >= 200 && response.status <= 299) {
      commit(mutationTypes.GET_HOSTEL_TYPES_SUCCESS, response.data.data);
    } else {
      commit(mutationTypes.GET_HOSTEL_TYPES_FAILURE);
    }
  },
  async getTopViewHostelTypes({ commit }, params) {
    // params = { size }
    try {
      commit(mutationTypes.GET_TOP_VIEW_REQUEST);
      const response = await window.axios.get(
        `/api/v1/types?sortBy=view&size=${params.size}`,
      );
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_TOP_VIEW_SUCCESS, response.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_TOP_VIEW_FAILURE);
    }
  },
  async getAllCategories({ commit }) {
    // no param
    try {
      commit(mutationTypes.GET_CATEGORIES_REQUEST);
      const response = await window.axios.get('/api/v1/categories');
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_CATEGORIES_SUCCESS, response.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_CATEGORIES_FAILURE);
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
