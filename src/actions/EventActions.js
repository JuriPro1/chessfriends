import {EVENAMECHANGED, ANSWERCHANGED, CHOICECHANGED, ADDRESSCHANGED, ROUNDSCHANGED, DTDCHANGED, LINKCHANGED, DPCALL, DPICKED, DPHIDDEN,
        VISITEVENT, REMOVEEVENT, DECLINEREMOVE, MODIFYEVENT, CREATEEVENT,
        ADD_EVENT, A_E_SUCCESS, A_E_FAILED,
        CONFIRM_REMOVE, C_R_SUCCESS, C_R_FAILED,
        EDIT_EVENT, E_E_SUCCESS, E_E_FAILED,
        EVE_FETCH, E_F_SUCCESS, E_F_FAILED,
        FME} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const EventNameChanged = name => (
  {
    type: EVENAMECHANGED,
    payload: name
  }
)

export const AnswerChanged = () => (
  {
    type: ANSWERCHANGED
  }
)

export const ChoiceChanged = () => (
  {
    type: CHOICECHANGED
  }
)

export const AddressChanged = address => (
  {
    type: ADDRESSCHANGED,
    payload: address
  }
)

export const RoundsChanged = rounds => (
  {
    type: ROUNDSCHANGED,
    payload: rounds
  }
)

export const DtdChanged = Dtd => (
  {
    type: DTDCHANGED,
    payload: Dtd
  }
)

export const LinkChanged = link => (
  {
    type: LINKCHANGED,
    payload: link
  }
)

export const DpCall = () => (
  {
    type: DPCALL
  }
)

export const DPicked = date => (
  {
    type: DPICKED,
    payload: date
  }
)

export const DpHidden = () => (
  {
    type: DPHIDDEN
  }
)

export const CreateEvent = () => {
  Actions.setEvent()
  return {
    type: CREATEEVENT
  }
}

export const VisitEvent = info => {
  Actions.specevent()
  return {
    type: VISITEVENT,
    payload: info
  }
}

export const RemoveEvent = () => (
  {
    type: REMOVEEVENT
  }
)

export const DeclineRemove = () => (
  {
    type: DECLINEREMOVE
  }
)

export const ModifyEvent = () => {
  Actions.setEvent()
  return {
    type: MODIFYEVENT
  }
}

export const addEvent = DataToPush => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: ADD_EVENT});

    firebase.database().ref(`/Events/`)
              .push({...DataToPush, uid: currentUser.uid})
              .then(() => addEventSuccess(dispatch))
              .catch(() => addEventFailed(dispatch))
  }

}

const addEventSuccess = dispatch => {
  dispatch({type: A_E_SUCCESS})
  Actions.popTo("events")
}

const addEventFailed = dispatch => {
  dispatch({type: A_E_FAILED, payload: 'ADD EVENT FAILED'})
}

export const confirmRemove = (evekey, partecipants) => {
  return dispatch => {
    dispatch({type: CONFIRM_REMOVE})

    if(partecipants==0) {
      firebase.database().ref(`/Events/${evekey}`)
                .remove()
                .then(() => removeEventSuccess(dispatch))
                .catch(() => removeEventFailed(dispatch))
    }else {
      var updates = {}
      updates['/Partecipations/'+evekey] = null
      updates['/Events/'+evekey] = null

      firebase.database().ref().update(updates)
                .then(() => removeEventSuccess(dispatch))
                .catch(() => removeEventFailed(dispatch))
    }

  }
}

const removeEventSuccess = dispatch => {
  dispatch({type: C_R_SUCCESS})
  Actions.popTo("events")
}

const removeEventFailed = dispatch => {
  dispatch({type: C_R_FAILED, payload: 'REMOVE EVENT FAILED'})
}

export const editEvent = (evekey, DataToPush) => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: EDIT_EVENT})

    firebase.database().ref(`/Events/${evekey}/`)
      .set({...DataToPush, uid: currentUser.uid})
      .then(() => editEventSuccess(dispatch))
      .catch(() => editEventSuccess(dispatch))
  }
}

const editEventSuccess = dispatch => {
  dispatch({type: E_E_SUCCESS})
  Actions.popTo("events")
}

const editEventFailed = dispatch => {
  dispatch({type: E_E_FAILED, payload: 'EDIT EVENT FAILED'})
}

export const eventsFetch = () => {
  return dispatch => {
    dispatch({type: EVE_FETCH})

    firebase.database().ref(`/Events/`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: E_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: E_F_FAILED})
      }
    })

  }
}

export const FromMyEvent = bool => {
  if(bool)  {Actions.partsList()}
  if(!bool) {Actions.popTo("specevent")}
  return {
    type: FME,
    payload: bool
  }
}
