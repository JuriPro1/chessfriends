import {EMAIL_CHANGED, PASSWORD_CHANGED,
        LOGIN_USER, L_U_S, L_U_F,
        SIGNIN_USER, S_U_S, S_U_F,
        LOGOUT_USER, LO_U_C, LO_U_A, LO_U_S, LO_U_F,
        ADD_INFO, A_I_SUCCESS, A_I_FAILED} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const EmailChanged = text => (
  {
    type: EMAIL_CHANGED,
    payload: text
  }
)

export const PasswordChanged = text => (
  {
    type: PASSWORD_CHANGED,
    payload: text
  }
)

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFailed(dispatch))
  }
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: L_U_S,
    payload: user
  })
  firebase.database().ref(`/UserInfo/${user.uid}/`)
  .on('value', snapshot => {
    const data = snapshot.val()
    if(data && data.Profile && data.Profile.info && data.Profile.rating) {
      Actions.main()
    } else {
      Actions.editProfile()
    }
  })
}

const loginUserFailed = dispatch => {
  dispatch({type: L_U_F, payload: 'LOG IN FAILED'})
}

export const signinUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: SIGNIN_USER})

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signinUserSuccess(dispatch, user))
      .catch(() => signinUserFailed(dispatch))
  }
}

const signinUserSuccess = (dispatch, user) => {
  dispatch({
    type: S_U_S,
    payload: user
  })
  Actions.editProfile()
}

const signinUserFailed = dispatch => {
  dispatch({type: S_U_F, payload: 'SIGN IN FAILED'})
}

export const logoutUser = () => (
  {
    type: LOGOUT_USER
  }
)

export const logoutUserConfirmed = () => {
  return (dispatch) => {
    dispatch({type: LO_U_C})

    firebase.auth().signOut()
      .then(() => logoutUserSuccess(dispatch))
      .catch(() => logoutUserFailed(dispatch))
  }
}

export const logoutUserAborted = () => (
  {
    type: LO_U_A
  }
)

const logoutUserSuccess = dispatch => {
  dispatch({type: LO_U_S})
  Actions.popTo("auth")
}

const logoutUserFailed = dispatch => {
  dispatch({type: LO_U_F, payload: 'LOG OUT FAILED'})
}
