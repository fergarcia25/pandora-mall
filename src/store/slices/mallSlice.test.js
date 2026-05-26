import reducer, {
  setAvatarPosition,
  setAvatarRotation,
  setStores,
  enterStore,
  exitStore,
  setNearbyStores,
} from './mallSlice';

describe('mallSlice', () => {
  const initialState = {
    avatarPosition: [0, 0, 0],
    avatarRotation: 0,
    currentStore: null,
    stores: [],
    nearbyStores: [],
    isInsideStore: false,
  };

  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('sets avatar position', () => {
    const state = reducer(initialState, setAvatarPosition([5, 0, 3]));
    expect(state.avatarPosition).toEqual([5, 0, 3]);
  });

  it('sets avatar rotation', () => {
    const state = reducer(initialState, setAvatarRotation(1.57));
    expect(state.avatarRotation).toBe(1.57);
  });

  it('sets stores', () => {
    const stores = [{ id: 's1', name: 'Store 1' }];
    expect(reducer(initialState, setStores(stores)).stores).toEqual(stores);
  });

  it('enters a store', () => {
    const state = reducer(initialState, enterStore({ id: 's1', name: 'Tech World' }));
    expect(state.isInsideStore).toBe(true);
    expect(state.currentStore.name).toBe('Tech World');
  });

  it('exits a store', () => {
    const inside = reducer(initialState, enterStore({ id: 's1' }));
    const state = reducer(inside, exitStore());
    expect(state.isInsideStore).toBe(false);
    expect(state.currentStore).toBeNull();
  });
});
