import {ADD_INFO, A_I_SUCCESS, A_I_FAILED,
        PROFILE_FETCH, P_F_SUCCESS, P_F_FAILED,
        FRIENDS_FETCH, F_F_SUCCESS, F_F_FAILED} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const addUserInfo = (DataToPush) => {

  const {
    name, surname, birthdayYear, isMale, country, phoneNumber, title,
    standard, rapid, blitz,
    idUser
  } = DataToPush

  const currentYear = new Date().getFullYear()

  if(Number(birthdayYear) >= 1900 && Number(birthdayYear) <= Number(currentYear)) {
    if(Number(phoneNumber) >= 0) {
      if (
        Number(standard) >= 0 && Number(standard) < 3001 &&
        Number(rapid) >= 0 && Number(rapid) < 3001 &&
        Number(blitz) >= 0 && Number(blitz) < 3001
      ) {
        return (dispatch) => {
          dispatch({type: ADD_INFO});

          const info = {name, surname, birthdayYear, isMale, country, phoneNumber, title}
          const rating = {standard, rapid, blitz}
          firebase.database().ref(`/UserInfo/${idUser}/Profile/`)
                    .set({info, rating})
                    .then(() => addUserInfoSuccess(dispatch))
                    .catch(() => addUserInfoFailed(dispatch))
        }
      } else {alert("Only numbers from 0 to 3000 in ratings, no symbols.")}
    } else {alert("No letters or symbols in phone number.")}
  } else {alert("Only numbers from 1900 to "+currentYear+" in Birthday Year, no symbols.")}
  return {type: "to any reducer"}

}

const addUserInfoSuccess = (dispatch) => {
  dispatch({type: A_I_SUCCESS})
  Actions.main()
}

const addUserInfoFailed = (dispatch) => {
  dispatch({type: A_I_FAILED, payload: 'ADD INFO FAILED'})
}

export const profileFetch = () => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: PROFILE_FETCH})

    firebase.database().ref(`/UserInfo/${currentUser.uid}/Profile`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: P_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: P_F_FAILED})
      }
    })

  }
}

export const friendsFetch = () => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: FRIENDS_FETCH})
    firebase.database().ref(`/UserInfo/${currentUser.uid}/Friends`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: F_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: F_F_FAILED})
      }
    })

  }
}
