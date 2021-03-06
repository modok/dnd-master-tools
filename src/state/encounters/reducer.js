import omit from 'object.omit';
import {
  CREATE_ENCOUNTER,
  ADD_MONSTER,
  REMOVE_MONSTER,
  INCREASE_MONSTER_COUNT,
  DECREASE_MONSTER_COUNT,
} from 'state/encounters/types';

const defaultState = {};

const addMonster = (state, payload) => {
  const mob = state[payload.name] || { ...payload, number: 0 };
  mob.number += 1;
  return {
    ...state,
    [payload.name]: mob,
  };
};

const removeMonster = (state, name) => {
  const returningState = {
    ...state,
  };

  delete returningState[name];

  return returningState;
};

const changeMonsterNumber = (state, name, increase = true) => {
  const returningState = {
    ...state,
  };

  if (!returningState[name]) {
    return state;
  }

  returningState[name].number += increase ? 1 : -1;

  if (returningState[name].number < 1) {
    delete returningState[name];
  }

  return returningState;
};

const reducer = (state = defaultState, action = {}) => {
  // eslint-disable-next-line prefer-destructuring
  const party = action.payload ? action.payload.party : null;
  switch (action.type) {
    case CREATE_ENCOUNTER:
      return {
        ...state,
        [party]: {},
      };
    case ADD_MONSTER:
      return {
        ...state,
        [party]: addMonster(state[party], omit(action.payload.monster, 'party')),
      };
    case REMOVE_MONSTER:
      return {
        ...state,
        [party]: removeMonster(state[party], action.payload.monsterName),
      };
    case INCREASE_MONSTER_COUNT:
      return {
        ...state,
        [party]: changeMonsterNumber(state[party], action.payload.monsterName),
      };
    case DECREASE_MONSTER_COUNT:
      return {
        ...state,
        [party]: changeMonsterNumber(state[party], action.payload.monsterName, false),
      };
    default:
      return state;
  }
};

export default reducer;
