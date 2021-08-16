const myState = () => ({
  usersChatList: {
    data: [],
    isLoading: false,
    error: null,
    success: null,
  },
});

const myGetters = {
  getUserById: (state) => (id) => {
    const result = state.usersChatList.data.filter((user) => user.userId === Number(id));
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
};
const mutationTypes = {
  GET_USERSCHATLIST_REQUEST: 'GET_USERSCHATLIST_REQUEST',
  GET_USERSCHATLIST_SUCCESS: 'GET_USERSCHATLIST_SUCCESS',
  GET_USERSCHATLIST_FAILURE: 'GET_USERSCHATLIST_FAILURE',
  ADD_USER_TO_LIST_REQUEST: 'ADD_USER_TO_LIST_REQUEST',
  ADD_USER_TO_LIST_SUCCESS: 'ADD_USER_TO_LIST_SUCCESS',
  ADD_USER_TO_LIST_FAILURE: 'ADD_USER_TO_LIST_FAILURE',
};
const mutations = {
  GET_USERSCHATLIST_REQUEST(state) {
    state.usersChatList.isLoading = true;
  },
  GET_USERSCHATLIST_SUCCESS(state, users) {
    state.usersChatList.data = state.usersChatList.data.concat(users);
    state.usersChatList.isLoading = false;
    state.usersChatList.success = true;
  },
  GET_USERSCHATLIST_FAILURE(state, error) {
    state.usersChatList.isLoading = false;
    state.usersChatList.success = false;
    state.usersChatList.error = error;
  },
  ADD_USER_TO_LIST_REQUEST(state) {
    state.usersChatList.isLoading = true;
  },
  ADD_USER_TO_LIST_SUCCESS(state, user) {
    state.usersChatList.data.push(user);
    state.usersChatList.isLoading = false;
    state.usersChatList.success = true;
  },
  ADD_USER_TO_LIST_FAILURE(state, error) {
    state.usersChatList.isLoading = false;
    state.usersChatList.success = false;
    state.usersChatList.error = error;
  },
};

const actions = {
  async getUserByIds({ commit, state }, ids) {
    // ids is a list of user id
    try {
      commit(mutationTypes.GET_USERSCHATLIST_REQUEST);
      const currentRenterIds = state.usersChatList.data.map((renter) => renter.userId);
      console.log(`current ${currentRenterIds}`);
      const newRenterIds = ids.filter((id) => !currentRenterIds.includes(id));
      console.log(`new ids: ${newRenterIds}`);
      if (newRenterIds.length > 0) {
        const url = `/api/v1/renters?renterIds=${newRenterIds.join(',')}`;
        const res = await window.axios.get(url);
        if (res.status === 200) {
          commit(mutationTypes.GET_USERSCHATLIST_SUCCESS, res.data.data);
        } else {
          throw Error('response is not successed');
        }
      } else {
        commit(mutationTypes.GET_USERSCHATLIST_SUCCESS, []);
        console.log('there are no new id');
      }
    } catch (error) {
      commit(mutationTypes.GET_USERSCHATLIST_FAILURE, error);
    }
  },
  async addUserToListById({ commit }, id) {
    try {
      commit(mutationTypes.GET_USERSCHATLIST_REQUEST);
      const res = await window.axios.get(`/api/v1/renters/${id}`);
      if (res.status === 200) {
        commit(mutationTypes.GET_USERSCHATLIST_SUCCESS, res.data.data);
      } else {
        throw Error('response is not successed');
      }
    } catch (error) {
      commit(mutationTypes.GET_USERSCHATLIST_FAILURE, error);
    }
  },
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  getters: myGetters,
  actions,
};
