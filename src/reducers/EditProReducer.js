import {
        ADD_INFO, A_I_SUCCESS, A_I_FAILED,
        PROFILE_FETCH, P_F_SUCCESS, P_F_FAILED,
        FRIENDS_FETCH, F_F_SUCCESS, F_F_FAILED,
        LO_U_S
      } from '../actions/types';

const INITIAL_STATE = {data: null, error: '', fetched: false, loading: false, friendsfetched: false, friends: null}

export default (state=INITIAL_STATE, action) => {

  const info = action.payload

  switch(action.type) {

    case PROFILE_FETCH:
      return {...state, loading: true, data: null, fetched: false}
    case P_F_SUCCESS:
      return {...state, loading: false, data: info, fetched: true}
    case P_F_FAILED:
      return {...state, loading: false}

    case FRIENDS_FETCH:
      return {...state, loading: true, friendsfetched: false, friends: null}
    case F_F_SUCCESS:
      return {...state, loading: false, friendsfetched: true, friends: Object.keys(info)}
    case F_F_FAILED:
      return {...state, loading: false, friends: null}

    case ADD_INFO:
      return {...state, loading: true, error: ''}
    case A_I_SUCCESS:
      return {...state, loading: false}
    case A_I_FAILED:
      return {...state, loading: false, error: info}

    case LO_U_S:
      return {...INITIAL_STATE}

    default:
      return state;

  }

}
