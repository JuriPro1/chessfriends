import {STCHANGED, RPCHANGED, BLCHANGED, P_F_SUCCESS, LO_U_S} from '../actions/types';

const INITIAL_STATE = {
  standard: "0",
  rapid: "0",
  blitz: "0"
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case STCHANGED:
      return {...state, standard: action.payload}
    case RPCHANGED:
      return {...state, rapid: action.payload}
    case BLCHANGED:
      return {...state, blitz: action.payload}

    case P_F_SUCCESS:
      const {standard, rapid, blitz} = action.payload.rating
      return {...INITIAL_STATE, standard, rapid, blitz}

    case LO_U_S:
      return {...INITIAL_STATE}

    default:
      return state
  }
}
