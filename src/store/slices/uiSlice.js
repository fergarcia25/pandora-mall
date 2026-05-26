import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDarkMode: true,
    isLoading: false,
    activeModal: null,
    sidebarOpen: false,
    notifications: [],
    cameraMode: 'C-AVT',
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleCameraMode: (state) => {
      state.cameraMode = state.cameraMode === 'C-FULL' ? 'C-AVT' : 'C-FULL';
    },
    setCameraMode: (state, action) => {
      state.cameraMode = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const {
  toggleDarkMode,
  setLoading,
  openModal,
  closeModal,
  toggleSidebar,
  toggleCameraMode,
  setCameraMode,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
