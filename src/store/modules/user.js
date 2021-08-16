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
  // deals: {
  //   data: [],
  //   isLoading: false,
  //   success: null,
  //   error: null,
  //   newlyCreated: null,
  // },
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
  GET_DRIVERSINDEVICE_REQUEST: 'GET_DRIVERSINDEVICE_REQUEST',
  GET_DRIVERSINDEVICE_SUCCESS: 'GET_DRIVERSINDEVICE_SUCCESS',
  GET_DRIVERSINDEVICE_FAILURE: 'GET_DRIVERSINDEVICE_FAILURE',
  // GET_DEALS_REQUEST: 'GET_DEALS_REQUEST',
  // GET_DEALS_SUCCESS: 'GET_DEALS_SUCCESS',
  // GET_DEALS_FAILURE: 'GET_DEALS_FAILURE',
  // CREATE_DEAL_REQUEST: 'CREATE_DEAL_REQUEST',
  // CREATE_DEAL_SUCCESS: 'CREATE_DEAL_SUCCESS',
  // CREATE_DEAL_FAILURE: 'CREATE_DEAL_FAILURE',
  // GET_DEAL_REQUEST: 'GET_DEAL_REQUEST',
  // GET_DEAL_SUCCESS: 'GET_DEAL_SUCCESS',
  // GET_DEAL_FAILURE: 'GET_DEAL_FAILURE',
  // CANCEL_DEAL_REQUEST: 'CANCEL_DEAL_REQUEST',
  // CANCEL_DEAL_SUCCESS: 'CANCEL_DEAL_SUCCESS',
  // CANCEL_DEAL_FAILURE: 'CANCEL_DEAL_FAILURE',
  // CANCEL_BOOKING_REQUEST: 'CANCEL_BOOKING_REQUEST',
  // CANCEL_BOOKING_SUCCESS: 'CANCEL_BOOKING_SUCCESS',
  // CANCEL_BOOKING_FAILURE: 'CANCEL_BOOKING_FAILURE',
  // DONE_BOOKING_REQUEST: 'DONE_BOOKING_REQUEST',
  // DONE_BOOKING_SUCCESS: 'DONE_BOOKING_SUCCESS',
  // DONE_BOOKING_FAILURE: 'DONE_BOOKING_FAILURE',
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
    state.devices.data.results.sort((a, b) => b - a);
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
    console.log(state.firmwares);
    state.firmwares.data.results = state.firmwares.data.results
      .filter(
        (item) => item.active,
      )
      .filter(
        (item) => firmware.firmwareId !== item.firmwareId,
      );
    // state.firmwares.data.results.push(firmware);
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
  // CREATE_DEAL_REQUEST(state) {
  //   state.deals.isLoading = false;
  // },
  // CREATE_DEAL_SUCCESS(state, deal) {
  //   state.deals.data.push(deal);
  //   state.deals.newlyCreated = deal;
  //   state.deals.success = true;
  //   state.deals.isLoading = false;
  // },
  // CREATE_DEAL_FAILURE(state, error) {
  //   state.deals.success = false;
  //   state.deals.error = error;
  // },
  // GET_DEAL_REQUEST(state) {
  //   state.deals.isLoading = false;
  // },
  // GET_DEAL_SUCCESS(state, deal) {
  //   state.deals.data.push(deal);
  //   state.deals.newlyCreated = deal;
  //   state.deals.success = true;
  //   state.deals.isLoading = false;
  // },
  // GET_DEAL_FAILURE(state, error) {
  //   state.deals.success = false;
  //   state.deals.error = error;
  // },
  // CANCEL_DEAL_REQUEST(state) {
  //   state.deals.isLoading = true;
  // },
  // CANCEL_DEAL_SUCCESS(state, dealId) {
  //   state.deals.isLoading = false;
  //   state.deals.success = true;
  //   const res = state.deals.data.filter((deal) => deal.dealId === dealId);
  //   res[0].status = 'CANCEL';
  // },
  // CANCEL_DEAL_FAILURE(state, error) {
  //   state.deals.isLoading = false;
  //   state.deals.error = error;
  // },
  // CANCEL_BOOKING_REQUEST(state) {
  //   state.bookings.isLoading = true;
  // },
  // CANCEL_BOOKING_SUCCESS(state, bookingId) {
  //   state.bookings.isLoading = false;
  //   state.bookings.success = true;
  //   const res = state.bookings.data.filter((book) => book.bookingId === bookingId);
  //   res[0].status = 'CANCEL';
  // },
  // CANCEL_BOOKING_FAILURE(state, error) {
  //   state.bookings.isLoading = false;
  //   state.bookings.error = error;
  // },
  // DONE_BOOKING_REQUEST(state) {
  //   state.bookings.isLoading = true;
  // },
  // DONE_BOOKING_SUCCESS(state, bookingId) {
  //   state.bookings.isLoading = false;
  //   state.bookings.success = true;
  //   const res = state.bookings.data.filter((book) => book.bookingId === bookingId);
  //   res[0].status = 'DONE';
  // },
  // DONE_BOOKING_FAILURE(state, error) {
  //   state.bookings.isLoading = false;
  //   state.bookings.error = error;
  // },
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

  // async getOneBooking({ commit, state }, bookingId) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   if (userId && role && state.user.data) {
  //     try {
  //       const currentIds = state.bookings.data.map((booking) => booking.bookingId);
  //       if (!currentIds.includes(bookingId)) {
  //         commit(mutationTypes.GET_BOOKING_REQUEST);
  //         const res = await window.axios.get(`/api/v1/bookings/${bookingId}`);
  //         if (res.status === 200) {
  //           res.data.data.new = true;
  //           commit(mutationTypes.GET_BOOKING_SUCCESS, res.data.data);
  //         } else {
  //           commit(mutationTypes.GET_BOOKING_FAILURE);
  //         }
  //       } else {
  //         console.log('this booking is already in store');
  //       }
  //     } catch (error) {
  //       commit(mutationTypes.GET_BOOKING_FAILURE, error);
  //     }
  //   } else {
  //     throw new Error('You have to login before get a new booking');
  //   }
  // },
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

  async updateFirmware({ commit }, id) {
    const userId = window.$cookies.get('userId');
    if (userId) {
      try {
        commit(mutationTypes.UPDATE_FIRMWARE_REQUEST);
        const res = await window.axios.put(`/api/v1/firmwares/${id}`);
        if (res.status === 200) {
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
  // async getDeals({ commit, state }) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   if (userId && role && state.user.data) {
  //     try {
  //       commit(mutationTypes.GET_DEALS_REQUEST);
  //       const res = await window.axios.get(`/api/v1/${role}/${userId}/deals`);
  //       if (res.status === 200) {
  //         commit(mutationTypes.GET_DEALS_SUCCESS, res.data.data);
  //       } else {
  //         commit(mutationTypes.GET_DEALS_FAILURE);
  //       }
  //     } catch (error) {
  //       commit(mutationTypes.GET_DEALS_FAILURE, error);
  //     }
  //   } else {
  //     throw new Error('You have to login before get deals');
  //   }
  // },
  // async createDeal({ commit, state }, deal) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   if (userId && role && state.user.data) {
  //     try {
  //       commit(mutationTypes.CREATE_DEAL_REQUEST);
  //       const res = await window.axios.post('/api/v1/deals', deal);
  //       if (res.status === 201) {
  //         commit(mutationTypes.CREATE_DEAL_SUCCESS, res.data.data);
  //       } else {
  //         commit(mutationTypes.CREATE_DEAL_FAILURE);
  //       }
  //     } catch (error) {
  //       commit(mutationTypes.CREATE_DEAL_FAILURE, error);
  //     }
  //   } else {
  //     throw new Error('You have to login before get deals');
  //   }
  // },
  // async getDeal({ commit, state }, dealIds) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   const currentIds = state.deals.data.map((deal) => deal.dealId);
  //   const newIds = dealIds.filter((newId) => !currentIds.includes(newId));
  //   if (newIds.lenght > 0) {
  //     if (userId && role && state.user.data) {
  //       try {
  //         commit(mutationTypes.GET_DEAL_REQUEST);
  //         const res = await window.axios.get(`/api/v1/deals/${newIds[0]}`);
  //         if (res.status === 200) {
  //           commit(mutationTypes.GET_DEAL_SUCCESS, res.data.data);
  //         } else {
  //           commit(mutationTypes.GET_DEAL_FAILURE);
  //         }
  //       } catch (error) {
  //         commit(mutationTypes.GET_DEAL_FAILURE, error);
  //       }
  //     } else {
  //       throw new Error('You have to login before get deals');
  //     }
  //   } else {
  //     console.log('not a new deal');
  //   }
  // },
  // async cancelDeal({ commit, state }, dealId) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   if (userId && role && state.user.data) {
  //     try {
  //       const deal = state.deals.data.filter((item) => item.dealId === dealId)[0];
  //       if (deal) {
  //         commit(mutationTypes.CANCEL_DEAL_REQUEST);
  //         const res = await window.axios.put('/api/v1/deals', {
  //           dealId,
  //           renterId: deal.renter.renterId,
  //           vendorId: deal.vendor.vendorId,
  //           typeId: deal.type.typeId,
  //           status: 'CANCELED',
  //           offeredPrice: deal.offeredPrice,
  //         });
  //         if (res.status === 200) {
  //           commit(mutationTypes.CANCEL_DEAL_SUCCESS, res.data.data);
  //         }
  //       } else {
  //         console.log('deal is null');
  //       }
  //     } catch (error) {
  //       commit(mutationTypes.CANCEL_DEAL_FAILURE, error);
  //     }
  //   } else {
  //     throw new Error('you are not loged in');
  //   }
  // },
  // async cancelBooking({ commit, state }, bookingId) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   if (userId && role && state.user.data) {
  //     try {
  //       const booking = state.bookings.data.filter((item) => item.bookingId === bookingId)[0];
  //       if (booking) {
  //         commit(mutationTypes.CANCEL_BOOKING_REQUEST);
  //         const res = await window.axios.put(`/api/v1/bookings/${bookingId}`, {
  //           bookingId,
  //           dealId: booking.deal.dealId,
  //           typeId: booking.type.typeId,
  //           renterId: booking.renter.renterId,
  //           vendorId: booking.vendor.vendorId,
  //           status: 'CANCELLED',
  //           meetTime: booking.meetTime,
  //           qrCode: booking.qrCode,
  //         });
  //         if (res.status === 200) {
  //           commit(mutationTypes.CANCEL_BOOKING_SUCCESS, res.data.data);
  //         }
  //       } else {
  //         console.log(`booking ${bookingId} is not existed in store`);
  //       }
  //     } catch (error) {
  //       commit(mutationTypes.CREATE_BOOKING_FAILURE, error);
  //     }
  //   } else {
  //     throw new Error('you are not loged in');
  //   }
  // },
  // async updateBookingStatus({ commit, state }, bookingId) {
  //   const userId = window.$cookies.get('userId');
  //   const role = window.$cookies.get('role');
  //   if (userId && role && state.user.data) {
  //     try {
  //       const booking = state.bookings.data.filter((item) => item.bookingId === bookingId)[0];
  //       if (booking) {
  //         commit(mutationTypes.DONE_BOOKING_REQUEST);
  //         const res = await window.axios.put(`/api/v1/bookings/${bookingId}`, {
  //           bookingId,
  //           dealId: booking.deal ? booking.deal.dealId : null,
  //           typeId: booking.type.typeId,
  //           renterId: booking.renter.renterId,
  //           vendorId: booking.vendor.vendorId,
  //           status: 'DONE',
  //           meetTime: booking.meetTime,
  //           qrCode: booking.qrCode,
  //         });
  //         if (res.status === 200) {
  //           commit(mutationTypes.DONE_BOOKING_SUCCESS, bookingId);
  //         }
  //       } else {
  //         console.log(`booking ${bookingId} is not existed in store`);
  //       }
  //     } catch (error) {
  //       commit(mutationTypes.DONE_BOOKING_FAILURE, error);
  //     }
  //   } else {
  //     throw new Error('you are not loged in');
  //   }
  // },
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  getters: myGetters,
  actions,
};
