const myState = () => ({
  user: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  drivers: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
  },
  devices: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
  },
  trackings: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
  },
  firmwares: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
    newlyCreated: null,
  },
  driversInDevice: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
  },
  dataset: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  loading: {
    loadingTraining: false,
    loadingNotification: false,
  },
});

const myGetters = {
  // get lasted deal
  // findLastedDeal: (state) => (renterId, vendorId, typeId) => {
  //   let result = state.deals.data.filter((deal) => {
  //     if (deal.renter.renterId === renterId &&
  //       deal.vendor.vendorId === vendorId &&
  //       deal.type.typeId === typeId &&
  //       deal.status === 'CREATED') {
  //       return true;
  //     }
  //     return false;
  //   });
  //   result = result.sort((deal1, deal2) => deal1.creationTime - deal2.creationTime);
  //   console.log(`lasted deal: ${result[0]}`);
  //   return result[0];
  // },
  // findPendingBooking: (state) => (renterId, vendorId, typeId) => {
  //   const result = state.bookings.data.filter((booking) => {
  //     if (booking.renter.renterId === renterId &&
  //       booking.vendor.vendorId === vendorId &&
  //       booking.type.typeId === typeId &&
  //       booking.status === 'INCOMING') {
  //       return true;
  //     }
  //     return false;
  //   });
  //   console.log(`pending booking ${result[0]}`);
  //   return result[0];
  // },
};
const mutationTypes = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  GET_DRIVERS_REQUEST: 'GET_DRIVERS_REQUEST',
  GET_DRIVERS_SUCCESS: 'GET_DRIVERS_SUCCESS',
  GET_DRIVERS_FAILURE: 'GET_DRIVERS_FAILURE',
  GET_DEVICES_REQUEST: 'GET_DEVICES_REQUEST',
  GET_DEVICES_SUCCESS: 'GET_DEVICES_SUCCESS',
  GET_DEVICES_FAILURE: 'GET_DEVICES_FAILURE',
  CREATE_DEVICE_REQUEST: 'CREATE_DEVICE_REQUEST',
  CREATE_DEVICE_SUCCESS: 'CREATE_DEVICE_SUCCESS',
  CREATE_DEVICE_FAILURE: 'CREATE_DEVICE_FAILURE',
  UPDATE_DEVICE_REQUEST: 'UPDATE_DEVICE_REQUEST',
  UPDATE_DEVICE_SUCCESS: 'UPDATE_DEVICE_SUCCESS',
  UPDATE_DEVICE_FAILURE: 'UPDATE_DEVICE_FAILURE',
  GET_TRACKINGS_REQUEST: 'GET_TRACKINGS_REQUEST',
  GET_TRACKINGS_SUCCESS: 'GET_TRACKINGS_SUCCESS',
  GET_TRACKINGS_FAILURE: 'GET_TRACKINGS_FAILURE',
  GET_FIRMWARES_REQUEST: 'GET_FIRMWARES_REQUEST',
  GET_FIRMWARES_SUCCESS: 'GET_FIRMWARES_SUCCESS',
  GET_FIRMWARES_FAILURE: 'GET_FIRMWARES_FAILURE',
  CREATE_FIRMWARE_REQUEST: 'CREATE_FIRMWARE_REQUEST',
  CREATE_FIRMWARE_SUCCESS: 'CREATE_FIRMWARE_SUCCESS',
  CREATE_FIRMWARE_FAILURE: 'CREATE_FIRMWARE_FAILURE',
  UPDATE_FIRMWARE_REQUEST: 'UPDATE_FIRMWARE_REQUEST',
  UPDATE_FIRMWARE_SUCCESS: 'UPDATE_FIRMWARE_SUCCESS',
  UPDATE_FIRMWARE_FAILURE: 'UPDATE_FIRMWARE_FAILURE',
  UPDATE_FIRMWAREINFO_REQUEST: 'UPDATE_FIRMWAREINFO_REQUEST',
  UPDATE_FIRMWAREINFO_SUCCESS: 'UPDATE_FIRMWAREINFO_SUCCESS',
  UPDATE_FIRMWAREINFO_FAILURE: 'UPDATE_FIRMWAREINFO_FAILURE',
  GET_DRIVERSINDEVICE_REQUEST: 'GET_DRIVERSINDEVICE_REQUEST',
  GET_DRIVERSINDEVICE_SUCCESS: 'GET_DRIVERSINDEVICE_SUCCESS',
  GET_DRIVERSINDEVICE_FAILURE: 'GET_DRIVERSINDEVICE_FAILURE',
  CREATE_DATASET_REQUEST: 'CREATE_DATASET_REQUEST',
  CREATE_DATASET_SUCCESS: 'CREATE_DATASET_SUCCESS',
  CREATE_DATASET_FAILURE: 'CREATE_DATASET_FAILURE',
  UPDATE_LOADING_NOTIFICATION: 'UPDATE_LOADING_NOTIFICATION',
  UPDATE_LOADING_SUCCESS: 'UPDATE_LOADING_SUCCESS',
};
const mutations = {
  CLEAR_USER_DATA(state) {
    state.user.data = null;
    state.user.isLoading = false;
    state.user.success = false;
  },
  GET_USER_REQUEST(state) {
    state.user.isLoading = true;
  },
  GET_USER_SUCCESS(state, user) {
    state.user.data = user;
    state.user.isLoading = false;
    state.user.success = true;
  },
  GET_USER_FAILURE(state, error) {
    state.user.isLoading = false;
    state.user.success = false;
    state.user.error = error;
  },
  GET_DRIVERS_REQUEST(state) {
    state.drivers.isLoading = true;
  },
  GET_DRIVERS_SUCCESS(state, drivers) {
    state.drivers.data = drivers;
    state.drivers.isLoading = false;
    state.drivers.success = true;
  },
  GET_DRIVERS_FAILURE(state, error) {
    state.drivers.isLoading = false;
    state.drivers.success = false;
    state.drivers.error = error;
  },
  GET_DEVICES_REQUEST(state) {
    state.devices.isLoading = true;
  },
  GET_DEVICES_SUCCESS(state, devices) {
    state.devices.data = devices;
    state.devices.data.sort((a, b) => b - a);
    state.devices.isLoading = false;
    state.devices.success = true;
  },
  GET_DEVICES_FAILURE(state, error) {
    state.devices.isLoading = false;
    state.devices.success = false;
    state.devices.error = error;
  },
  GET_DRIVERSINDEVICE_REQUEST(state) {
    state.driversInDevice.isLoading = true;
  },
  GET_DRIVERSINDEVICE_SUCCESS(state, driversInDevice) {
    state.driversInDevice.data = driversInDevice;
    // state.devices.data.sort((a, b) => b - a);
    state.devices.isLoading = false;
    state.devices.success = true;
  },
  GET_DRIVERSINDEVICE_FAILURE(state, error) {
    state.driversInDevice.isLoading = false;
    state.driversInDevice.success = false;
    state.driversInDevice.error = error;
  },
  CREATE_DEVICE_REQUEST(state) {
    state.devices.isLoading = true;
  },
  CREATE_DEVICE_SUCCESS(state, device) {
    console.log(state.devices);
    state.devices.data.results.push(device);
    // state.devices.data.results.sort((a, b) => b - a);
    // state.bookings.newlyCreated = booking;
    state.devices.isLoading = false;
    state.devices.success = true;
  },
  CREATE_DEVICE_FAILURE(state, error) {
    state.devices.isLoading = false;
    state.devices.success = false;
    state.devices.error = error;
  },
  UPDATE_DEVICE_REQUEST(state) {
    state.devices.isLoading = true;
  },
  UPDATE_DEVICE_SUCCESS(state, device) {
    state.devices.data.results = state.devices.data.results.filter(
      (item) => device.deviceId !== item.deviceId,
    );
    state.devices.data.results.push(device);
    state.devices.success = true;
    state.devices.isLoading = false;
  },
  UPDATE_DEVICE_FAILURE(state, error) {
    state.devices.error = error;
    state.devices.success = false;
    state.devices.isLoading = false;
  },
  GET_TRACKINGS_REQUEST(state) {
    state.trackings.isLoading = true;
  },
  GET_TRACKINGS_SUCCESS(state, trackings) {
    state.trackings.data = trackings;
    state.trackings.isLoading = false;
    state.trackings.success = true;
  },
  GET_TRACKINGS_FAILURE(state, error) {
    state.trackings.isLoading = false;
    state.trackings.success = false;
    state.trackings.error = error;
  },
  CREATE_FIRMWARE_REQUEST(state) {
    state.firmwares.isLoading = true;
  },
  CREATE_FIRMWARE_SUCCESS(state, firmware) {
    console.log(state.firmwares);
    state.firmwares.data.results.push(firmware);
    state.firmwares.data.results = [...state.firmwares.data.results];
    state.firmwares.data.results.sort((a, b) => b - a);
    state.firmwares.newlyCreated = firmware;
    state.firmwares.isLoading = false;
    state.firmwares.success = true;
  },
  CREATE_FIRMWARE_FAILURE(state, error) {
    state.firmwares.isLoading = false;
    state.firmwares.success = false;
    state.firmwares.error = error;
  },
  UPDATE_FIRMWARE_REQUEST(state) {
    state.firmwares.isLoading = true;
  },
  UPDATE_FIRMWARE_SUCCESS(state, firmware) {
    state.firmwares.newlyCreated = state.firmwares.data.results;
    state.firmwares.newlyCreated = state.firmwares.newlyCreated
      .filter((item) => item.active)
      .map((items) => ({ ...items, active: false }));
    state.firmwares.data.results = state.firmwares.data.results
      .filter((item) => !item.active)
      .filter((item) => firmware.firmwareId !== item.firmwareId);

    state.firmwares.data.results.push(state.firmwares.newlyCreated[0]);

    state.firmwares.data.results.push(firmware);
    state.firmwares.data.results = [...state.firmwares.data.results];
    state.firmwares.data.results.sort((a, b) => b - a);
    state.firmwares.newlyCreated = firmware;
    state.firmwares.isLoading = false;
    state.firmwares.success = true;
  },
  UPDATE_FIRMWARE_FAILURE(state, error) {
    state.firmwares.isLoading = false;
    state.firmwares.success = false;
    state.firmwares.error = error;
  },
  UPDATE_FIRMWAREINFO_REQUEST(state) {
    state.firmwares.isLoading = true;
  },
  UPDATE_FIRMWAREINFO_SUCCESS(state, firmware) {
    // state.firmwares.newlyCreated = state.firmwares.data.results;
    // state.firmwares.newlyCreated = state.firmwares.newlyCreated
    //   .filter((item) => item.active)
    //   .map((items) => ({ ...items, active: false }));
    // state.firmwares.data.results = state.firmwares.data.results
    //   .filter((item) => !item.active)
    //   .filter((item) => firmware.firmwareId !== item.firmwareId);

    // state.firmwares.data.results.push(state.firmwares.newlyCreated[0]);

    state.firmwares.data.results = state.firmwares.data.results.filter(
      (item) => firmware.firmwareId !== item.firmwareId,
    );

    state.firmwares.data.results.push(firmware);
    state.firmwares.data.results = [...state.firmwares.data.results];
    state.firmwares.data.results.sort((a, b) => b - a);
    state.firmwares.newlyCreated = firmware;
    state.firmwares.isLoading = false;
    state.firmwares.success = true;
  },
  UPDATE_FIRMWAREINFO_FAILURE(state, error) {
    state.firmwares.isLoading = false;
    state.firmwares.success = false;
    state.firmwares.error = error;
  },
  GET_FIRMWARES_REQUEST(state) {
    state.firmwares.isLoading = false;
  },
  GET_FIRMWARES_SUCCESS(state, firmwares) {
    state.firmwares.data = firmwares;
    state.firmwares.isLoading = false;
    state.firmwares.success = true;
  },
  GET_FIRMWARES_FAILURE(state, error) {
    state.firmwares.isLoading = false;
    state.firmwares.success = false;
    state.firmwares.error = error;
  },
  CREATE_DATASET_REQUEST(state) {
    state.dataset.isLoading = true;
  },
  CREATE_DATASET_SUCCESS(state, data) {
    state.dataset.data = data;
    state.dataset.isLoading = false;
    state.dataset.success = true;
  },
  CREATE_DATASET_FAILURE(state, error) {
    state.dataset.isLoading = false;
    state.dataset.success = false;
    state.dataset.error = error;
  },
  UPDATE_USER_REQUEST(state) {
    state.drivers.isLoading = true;
  },
  UPDATE_USER_SUCCESS(state, driver) {
    state.drivers.data.results = state.drivers.data.results.filter(
      (item) => driver.userId !== item.userId,
    );
    state.drivers.data.results.push(driver);
    state.drivers.data.results((a, b) => a.createdAt - b.createdAt);
    state.drivers.success = true;
    state.drivers.isLoading = false;
  },
  UPDATE_USER_FAILURE(state, error) {
    state.drivers.error = error;
    state.drivers.success = false;
    state.drivers.isLoading = false;
  },
  UPDATE_LOADING_SUCCESS(state, loading) {
    console.log('UPDATE_LOADING_SUCCESS');
    state.loading.loadingTraining = loading;
  },
  UPDATE_LOADING_NOTIFICATION(state, loading) {
    console.log('UPDATE_LOADING_NOTIFICATION');
    state.loading.loadingTraining = false;
    state.loading.loadingNotification = loading;
  },
};

const actions = {
  async login({ commit }, params) {
    // params {username, password}
    commit(mutationTypes.GET_USER_REQUEST);
    let res = null;
    try {
      res = await window.axios.post('/api/auth/login', params);
      if (res.status === 201) {
        commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_USER_FAILURE);
      }
    } catch (error) {
      commit(mutationTypes.GET_USER_FAILURE, error);
    }
  },
  async clearUserData({ commit }) {
    commit(mutationTypes.CLEAR_USER_DATA);
  },
  async getUser({ commit }) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.GET_USER_REQUEST);
        const res = 1;
        // const res = await window.axios.get(`/api/v1/users/${userId}`);
        if (res.status === 200) {
          commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.GET_USER_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_USER_FAILURE, error);
      }
    } else {
      throw new Error('userId, role or user.data null');
    }
  },
  async updateUser({ commit }, newUser) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.UPDATE_USER_REQUEST);
        const res = await window.axios.put(`/api/v1/users/${userId}`, newUser);
        if (res.status === 200) {
          commit(mutationTypes.UPDATE_USER_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.UPDATE_USER_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.UPDATE_USER_FAILURE, error);
      }
    } else {
      throw new Error('userId or user.data null');
    }
  },

  async getDrivers({ commit }) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.GET_DRIVERS_REQUEST);
        const res = await window.axios.get('/api/v1/users/user');
        console.log(`res :${res.data}`);
        if (res.status === 200) {
          commit(mutationTypes.GET_DRIVERS_SUCCESS, res.data);
        } else {
          commit(mutationTypes.GET_DRIVERS_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_DRIVERS_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get drivers');
    }
  },

  async getDevices({ commit }) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.GET_DEVICES_REQUEST);
        const res = await window.axios.get('/api/v1/devices');
        console.log(`res :${res.data}`);
        if (res.status === 200) {
          commit(mutationTypes.GET_DEVICES_SUCCESS, res.data);
        } else {
          commit(mutationTypes.GET_DEVICES_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_DEVICES_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get drivers');
    }
  },

  async getDriversInDevice({ commit }, deviceId) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.GET_DRIVERSINDEVICE_REQUEST);
        const res = await window.axios.get(`/api/v1/user-devices/users/${deviceId}`);
        if (res.status === 200) {
          commit(mutationTypes.GET_DRIVERSINDEVICE_SUCCESS, res.data);
        } else {
          commit(mutationTypes.GET_DRIVERSINDEVICE_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_DRIVERSINDEVICE_FAILURE, error);
      }
    } else {
      throw new Error('userId, role or user.data null');
    }
  },

  async createDevice({ commit }, device) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.CREATE_DEVICE_REQUEST);
        const res = await window.axios.post('/api/v1/devices', device);
        if (res.status === 201) {
          commit(mutationTypes.CREATE_DEVICE_SUCCESS, res.data.data);
        }
      } catch (error) {
        commit(mutationTypes.CREATE_DEVICE_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get a new booking');
    }
  },

  async updateDevice({ commit }, newDevice) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.UPDATE_DEVICE_REQUEST);
        const res = await window.axios.put(`/api/v1/devices/${newDevice.deviceId}`, newDevice.data);
        if (res.status === 200) {
          commit(mutationTypes.UPDATE_DEVICE_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.UPDATE_DEVICE_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.UPDATE_DEVICE_FAILURE, error);
      }
    } else {
      throw new Error('deviceId or device is null');
    }
  },

  async getTrackings({ commit }) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.GET_TRACKINGS_REQUEST);
        const res = await window.axios.get('/api/v1/data-trackings-infos');
        if (res.status === 200) {
          commit(mutationTypes.GET_TRACKINGS_SUCCESS, res.data);
        } else {
          commit(mutationTypes.GET_TRACKINGS_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_TRACKINGS_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get drivers');
    }
  },
  async getFirmwares({ commit }) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.GET_FIRMWARES_REQUEST);
        const res = await window.axios.get('/api/v1/firmwares');
        if (res.status === 200) {
          commit(mutationTypes.GET_FIRMWARES_SUCCESS, res.data);
        } else {
          commit(mutationTypes.GET_FIRMWARES_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_FIRMWARES_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get firmwares');
    }
  },

  async createFirmware({ commit }, firmware) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.CREATE_FIRMWARE_REQUEST);
        const res = await window.axios.post('/api/v1/firmwares', firmware);
        if (res.status === 201) {
          commit(mutationTypes.CREATE_FIRMWARE_SUCCESS, res.data.data);
        }
      } catch (error) {
        commit(mutationTypes.CREATE_FIRMWARE_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before create a new firmware');
    }
  },

  async createFirmwareFromDataset({ commit }, data) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.CREATE_DATASET_REQUEST);
        const res = await window.axios.post('/api/v1/dataset', data);
        if (res.status === 201) {
          commit(mutationTypes.CREATE_DATASET_SUCCESS, data);
        }
      } catch (error) {
        commit(mutationTypes.CREATE_DATASET_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before create a new firmware');
    }
  },
  async updateFirmware({ commit }, id) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.UPDATE_FIRMWARE_REQUEST);
        const res = await window.axios.put(`/api/v1/firmwares/${id}`);
        if (res.status === 201) {
          commit(mutationTypes.UPDATE_FIRMWARE_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.UPDATE_FIRMWARE_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.UPDATE_FIRMWARE_FAILURE, error);
      }
    } else {
      throw new Error('userId or user.data null');
    }
  },

  async updateFirmwareInfo({ commit }, firmware) {
    const userId = window.$cookies.get('userId');
    const id = firmware.get('firmwareId');
    if (userId) {
      try {
        commit(mutationTypes.UPDATE_FIRMWAREINFO_REQUEST);
        const res = await window.axios.put(`/api/v1/firmwares/${id}/info`, firmware);
        if (res.status === 200) {
          commit(mutationTypes.UPDATE_FIRMWAREINFO_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.UPDATE_FIRMWAREINFO_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.UPDATE_FIRMWAREINFO_FAILURE, error);
      }
    } else {
      throw new Error('userId or user.data null');
    }
  },

  async updateLoading({ commit }, loading) {
    console.log('updateLoading');
    commit(mutationTypes.UPDATE_LOADING_SUCCESS, loading);
  },
  async updateLoadingNotification({ commit }, loading) {
    console.log('updateLoadingNotification');
    commit(mutationTypes.UPDATE_LOADING_NOTIFICATION, loading);
  },
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  getters: myGetters,
  actions,
};
