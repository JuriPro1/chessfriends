import {ADD_AVA_INFO, ANSWERPRESSED, AVATOMOVE, AVATOPLAY, AVA_FETCH, A_A_I_FAILED, A_A_I_SUCCESS, A_F_FAILED, A_F_SUCCESS, DPREQ, DSEL, DTPCLOSE, MAPPRESSED, RADVALCH, REGIONCHANGED, TPREQ, TSEL, TTWCHANGED} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const AnswerPressed = () => (
  {
    type: ANSWERPRESSED
  }
)

export const MapPressed = coordinate => (
  {
    type: MAPPRESSED,
    payload: coordinate
  }
)

export const RadValCh = radius => (
  {
    type: RADVALCH,
    payload: radius
  }
)

export const RegionChanged = region => (
  {
    type: REGIONCHANGED,
    payload: region
  }
)

export const Switched1 = booleano => (
  {
    type: AVATOPLAY,
    payload: booleano
  }
)

export const Switched2 = booleano => (
  {
    type: AVATOMOVE,
    payload: booleano
  }
)

export const DTpClose = () => (
  {
    type: DTPCLOSE
  }
)

export const TpReq = () => (
  {
    type: TPREQ
  }
)

export const DpReq = () => (
  {
    type: DPREQ
  }
)

export const TtwChanged = timeToWait => (
  {
    type: TTWCHANGED,
    payload: timeToWait
  }
)

export const TimeSelected = time => (
  {
    type: TSEL,
    payload: time
  }
)

export const DateSelected = date => (
  {
    type: DSEL,
    payload: date
  }
)

export const addAvaInfo = DataToPush => {

  const {currentUser} = firebase.auth();

  return (dispatch) => {
    dispatch({type: ADD_AVA_INFO})

    firebase.database().ref(`/UserInfo/${currentUser.uid}/Availability/`)
      .set(DataToPush)
      .then(() => addAvaInfoSuccess(dispatch))
      .catch(() => addAvaInfoFailed(dispatch))
  }
}

const addAvaInfoSuccess = dispatch => {
  dispatch({type: A_A_I_SUCCESS})
  Actions.popTo("ava")
}

const addAvaInfoFailed = dispatch => {
  dispatch({type: A_A_I_FAILED, payload: 'ADD AVA INFO FAILED'})
}

export const avaFetch = () => {
  const {currentUser} = firebase.auth();
  return (dispatch) => {
    dispatch({type: AVA_FETCH});

    firebase.database().ref(`/UserInfo/${currentUser.uid}/Availability/`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: A_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({
          type: A_F_FAILED,
          payload: 'AVAILABILITY FETCH FAILED'
        })
      }
    })

  }
}
