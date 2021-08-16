const myState = () => ({
  hostelType: {
    data: null,
    isLoading: false,
  },
  hostelGroup: {
    data: null,
    isLoading: false,
  },
  schedules: {
    data: [],
    isLoading: false,
  },
});

const getters = {
  isLoading: (state) => state.hostelGroup.isLoading ||
    state.hostelType.isLoading ||
    state.schedules.isLoading,
};

const mutationTypes = {
  GET_HOSTEL_TYPE_REQUEST: 'GET_HOSTEL_TYPE_REQUEST',
  GET_HOSTEL_TYPE_SUCCESS: 'GET_HOSTEL_TYPE_SUCCESS',
  GET_HOSTEL_TYPE_FAILURE: 'GET_HOSTEL_TYPE_FAILURE',
  GET_HOSTEL_GROUP_REQUEST: 'GET_HOSTEL_GROUP_REQUEST',
  GET_HOSTEL_GROUP_SUCCESS: 'GET_HOSTEL_GROUP_SUCCESS',
  GET_HOSTEL_GROUP_FAILURE: 'GET_HOSTEL_GROUP_FAILURE',
  GET_SCHEDULES_REQUEST: 'GET_SCHEDULES_REQUEST',
  GET_SCHEDULES_SUCCESS: 'GET_SCHEDULES_SUCCESS',
  GET_SCHEDULES_FAILURE: 'GET_SCHEDULES_FAILURE',
};

const mutations = {
  GET_HOSTEL_TYPE_REQUEST(state) {
    state.hostelType.isLoading = true;
  },
  GET_HOSTEL_GROUP_REQUEST(state) {
    state.hostelGroup.isLoading = true;
  },
  GET_HOSTEL_TYPE_SUCCESS(state, hostelType) {
    state.hostelType.data = hostelType;
    state.hostelType.isLoading = false;
  },
  GET_HOSTEL_GROUP_SUCCESS(state, hostelGroup) {
    state.hostelGroup.data = hostelGroup;
    state.hostelGroup.isLoading = false;
  },
  GET_HOSTEL_TYPE_FAILURE(state) {
    state.hostelType.isLoading = false;
  },
  GET_HOSTEL_GROUP_FAILURE(state) {
    state.hostelGroup.isLoading = false;
  },
  GET_SCHEDULES_REQUEST(state) {
    state.schedules.isLoading = true;
  },
  GET_SCHEDULES_SUCCESS(state, schedules) {
    state.schedules.data = schedules;
    state.schedules.isLoading = false;
  },
  GET_SCHEDULES_FAILURE(state) {
    state.schedules.isLoading = false;
  },
};

const actions = {
  async getTypeAndGroup({ commit }, typeId) {
    commit(mutationTypes.GET_HOSTEL_TYPE_REQUEST);
    commit(mutationTypes.GET_HOSTEL_GROUP_REQUEST);
    const response = await window.axios.get(`/api/v1/types?typeId=${typeId}`);
    if (response.status === 200) {
      commit(mutationTypes.GET_HOSTEL_TYPE_SUCCESS, response.data.data.types[0]);
      commit(mutationTypes.GET_HOSTEL_GROUP_SUCCESS, response.data.data.groups[0]);
    } else {
      commit(mutationTypes.GET_HOSTEL_TYPE_FAILURE);
      commit(mutationTypes.GET_HOSTEL_GROUP_FAILURE);
    }
  },
  async getSchedules({ commit }, groupId) {
    commit(mutationTypes.GET_SCHEDULES_REQUEST);
    const response = await window.axios.get(`/api/v1/schedules?groupId=${groupId}`);
    if (response.status === 200) {
      commit(mutationTypes.GET_SCHEDULES_SUCCESS, response.data.data);
    } else {
      commit(mutationTypes.GET_SCHEDULES_FAILURE);
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
