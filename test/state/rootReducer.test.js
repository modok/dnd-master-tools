import reducer from 'state/rootReducer';

describe('state root reducer', () => {
  it('returns the default state', () => {
    const state = reducer();
    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(4);
    expect(state).toHaveProperty('encounters');
    expect(state).toHaveProperty('parties');
    expect(state).toHaveProperty('form');
    expect(state).toHaveProperty('savedEncounters');
  });
});
