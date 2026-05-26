import { createSlice } from '@reduxjs/toolkit';

const mallSlice = createSlice({
  name: 'mall',
  initialState: {
    avatarPosition: [0, 0, 0],
    avatarRotation: 0,
    currentStore: null,
    stores: [],
    nearbyStores: [],
    isInsideStore: false,
  },
  reducers: {
    setAvatarPosition: (state, action) => {
      state.avatarPosition = action.payload;
    },
    setAvatarRotation: (state, action) => {
      state.avatarRotation = action.payload;
    },
    setCurrentStore: (state, action) => {
      state.currentStore = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setNearbyStores: (state, action) => {
      state.nearbyStores = action.payload;
    },
    enterStore: (state, action) => {
      state.isInsideStore = true;
      state.currentStore = action.payload;
    },
    exitStore: (state) => {
      state.isInsideStore = false;
      state.currentStore = null;
    },
    resetMall: () => initialState,
  },
});

export const {
  setAvatarPosition,
  setAvatarRotation,
  setCurrentStore,
  setStores,
  setNearbyStores,
  enterStore,
  exitStore,
  resetMall,
} = mallSlice.actions;

export default mallSlice.reducer;
