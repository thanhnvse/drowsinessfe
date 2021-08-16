const myState = () => ({
  bookings: {
    data: null,
    isLoading: false,
  },
});

const getters = {};
const mutationTypes = {
  GET_BOOKINGS_REQUEST: 'GET_BOOKINGS_REQUEST',
  GET_BOOKINGS_SUCCESS: 'GET_BOOKINGS_SUCCESS',
  GET_BOOKINGS_FAILURE: 'GET_BOOKINGS_FAILURE',
};
const mutations = {
  GET_BOOKINGS_REQUEST(state) {
    state.bookings.isLoading = true;
  },
  GET_BOOKINGS_SUCCESS(state, booking) {
    state.bookings.data = booking;
    state.bookings.isLoading = false;
    state.bookings.success = true;
  },
  GET_BOOKINGS_FAILURE(state, error) {
    state.bookings.isLoading = false;
    state.bookings.success = false;
    state.bookings.error = error;
  },
};

const actions = {
  async getBookings({ commit }, renterId) {
    try {
      commit(mutationTypes.GET_BOOKINGS_REQUEST);
      const res = await window.axios.get(`/api/v1/renters/${renterId}/bookings`);
      if (res.status === 200) {
        commit(mutationTypes.GET_BOOKINGS_SUCCESS, res.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_BOOKINGS_FAILURE, error);
    }
  },
  async getBookingsVendor({ commit }, vendorId) {
    commit(mutationTypes.GET_BOOKINGS_REQUEST);
    const res = await window.axios.get(`/api/v1/vendors/${vendorId}/bookings`);
    if (res.status === 200) {
      commit(mutationTypes.GET_BOOKINGS_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_BOOKINGS_FAILURE);
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
