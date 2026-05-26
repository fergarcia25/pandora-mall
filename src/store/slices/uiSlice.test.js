import reducer, {
  toggleDarkMode,
  setLoading,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
} from './uiSlice';

describe('uiSlice', () => {
  const initialState = {
    isDarkMode: true,
    isLoading: false,
    activeModal: null,
    sidebarOpen: false,
    notifications: [],
    cameraMode: 'C-AVT',
  };

  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('toggles dark mode', () => {
    expect(reducer(initialState, toggleDarkMode()).isDarkMode).toBe(false);
    expect(reducer({ ...initialState, isDarkMode: false }, toggleDarkMode()).isDarkMode).toBe(true);
  });

  it('sets loading state', () => {
    expect(reducer(initialState, setLoading(true)).isLoading).toBe(true);
    expect(reducer(initialState, setLoading(false)).isLoading).toBe(false);
  });

  it('opens and closes modal', () => {
    const withModal = reducer(initialState, openModal('login'));
    expect(withModal.activeModal).toBe('login');
    expect(reducer(withModal, closeModal()).activeModal).toBeNull();
  });

  it('adds notifications', () => {
    const state = reducer(initialState, addNotification({ message: 'Test', type: 'success' }));
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0].message).toBe('Test');
  });

  it('removes notifications', () => {
    const withNotif = reducer(initialState, addNotification({ message: 'Test', type: 'success' }));
    const id = withNotif.notifications[0].id;
    expect(reducer(withNotif, removeNotification(id)).notifications).toHaveLength(0);
  });
});
