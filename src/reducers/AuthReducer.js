import {EMAIL_CHANGED, PASSWORD_CHANGED,
        LOGIN_USER, L_U_S, L_U_F,
        SIGNIN_USER, S_U_S, S_U_F,
        LOGOUT_USER, LO_U_C, LO_U_A, LO_U_S, LO_U_F,
        ADD_INFO, A_I_SUCCESS, A_I_FAILED} from '../actions/types';

const INITIAL_STATE = {email: '', password: '', user: null, loading: false, error: '', showAlert: false}

export default (state=INITIAL_STATE, action) => {

  switch(action.type) {

    case EMAIL_CHANGED:
      return {...state, email: action.payload}
    case PASSWORD_CHANGED:
      return {...state, password: action.payload}

    case LOGIN_USER:
      return {...state, loading: true, error: ''}
    case L_U_S:
      return {...INITIAL_STATE, user: action.payload}
    case L_U_F:
      return {...state, loading: false, error: action.payload}

    case SIGNIN_USER:
      return {...state, loading: true, error: ''}
    case S_U_S:
      return {...INITIAL_STATE, user: action.payload}
    case S_U_F:
      return {...state, loading: false, error: action.payload}

    case LOGOUT_USER:
      return {...state, showAlert: true, error: ''}
    case LO_U_C:
      return {...state, loading:true, showAlert: false}
    case LO_U_A:
      return {...state, showAlert: false}
    case LO_U_S:
      return {...INITIAL_STATE}
    case LO_U_F:
      return {...state, loading: false, error: action.payload}

    default:
      return state;

  }

}
