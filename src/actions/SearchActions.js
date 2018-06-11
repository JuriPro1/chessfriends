import {
        PROS_FETCH, PS_F_SUCCESS, PS_F_FAILED,
        STRINGCHANGED,
        SHOWOTHERSPROFILE,
        NEWREGION, NEWMARKER, NEWRADIUS,
        VISITOEVE, MANAGERFOUND,
        PA_FETCH, PA_F_SUCCESS, PA_F_FAILED,
        TAKE_PART, T_P_SUCCESS, T_P_FAILED,
        DECLINE_PART, D_P_SUCCESS, D_P_FAILED,
        SEND_REQ, S_R_SUCCESS, S_R_FAILED,
        UNDO_REQ, U_R_SUCCESS, U_R_FAILED,
        RECREQ_FETCH, RR_F_SUCCESS, RR_F_FAILED,
        ACC_REQ, A_R_SUCCESS, A_R_FAILED,
        DECL_REQ, D_R_SUCCESS, D_R_FAILED,
        RFREQ, REMOVE_F, R_F_SUCCESS, R_F_FAILED,
        OTFRIENDS_FETCH, OTF_F_SUCCESS, OTF_F_FAILED
      } from './types';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

export const profilesFetch = () => {
  return dispatch => {
    dispatch({type: PROS_FETCH})

    firebase.database().ref(`/UserInfo/`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: PS_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: PS_F_FAILED})
      }
    })

  }
}

export const StringChanged = string => (
  {
    type: STRINGCHANGED,
    payload: string
  }
)

export const ShowOthersProfile = profile => {
  Actions.showUser()
  return {
    type: SHOWOTHERSPROFILE,
    payload: profile
  }
}

export const NewRegion = region => (
  {
    type: NEWREGION,
    payload: region
  }
)

export const NewMarker = marker => (
  {
    type: NEWMARKER,
    payload: marker
  }
)

export const NewRadius = radius => (
  {
    type: NEWRADIUS,
    payload: radius
  }
)

export const VisitOtherEvent = info => {
  Actions.visitOeve()
  return {
    type: VISITOEVE,
    payload: info
  }
}

export const SearchManager = (uid, array) => {
  const Keys = Object.keys(array)
  var obj = null
  for(i in Keys) {
    if(Keys[i] == uid) {
      obj = Object.values(array)[i]
    }
  }
  return {
    type: MANAGERFOUND,
    payload: obj
  }
}

export const partFetch = evekey => {
  return dispatch => {
    dispatch({type: PA_FETCH})

    firebase.database().ref(`/Partecipations/${evekey}`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: PA_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: PA_F_FAILED})
      }
    })

  }
}

export const takePart = evekey => {
  const {currentUser} = firebase.auth()

  return dispatch => {
    dispatch({type: TAKE_PART})

    firebase.database().ref(`/Partecipations/${evekey}/${currentUser.uid}`)
              .set(currentUser.uid)
              .then(() => takePartSuccess(dispatch))
              .catch(() => takePartFailed(dispatch))
  }

}

const takePartSuccess = dispatch => {
  dispatch({type: T_P_SUCCESS})
}

const takePartFailed = dispatch => {
  dispatch({type: T_P_FAILED, payload: 'TAKE PART FAILED'})
}

export const declinePart = evekey => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: DECLINE_PART})

    firebase.database().ref(`/Partecipations/${evekey}/${currentUser.uid}`)
              .remove()
              .then(() => declinePartSuccess(dispatch))
              .catch(() => declinePartFailed(dispatch))
  }
}

const declinePartSuccess = dispatch => {
  dispatch({type: D_P_SUCCESS})
}

const declinePartFailed = dispatch => {
  dispatch({type: D_P_FAILED, payload: 'DECLINE PART FAILED'})
}

export const sendReq = user => {
  const {currentUser} = firebase.auth()

  return dispatch => {
    dispatch({type: SEND_REQ})

    firebase.database().ref(`/UserInfo/${user}/Requests/${currentUser.uid}`)
              .set(currentUser.uid)
              .then(() => sendReqSuccess(dispatch))
              .catch(() => sendReqFailed(dispatch))
  }

}

const sendReqSuccess = dispatch => {
  dispatch({type: S_R_SUCCESS})
}

const sendReqFailed = dispatch => {
  dispatch({type: S_R_FAILED, payload: 'SEND REQ FAILED'})
}

export const undoReq = user => {
  const {currentUser} = firebase.auth()

  return dispatch => {
    dispatch({type: UNDO_REQ})

    firebase.database().ref(`/UserInfo/${user}/Requests/${currentUser.uid}`)
              .remove()
              .then(() => undoReqSuccess(dispatch))
              .catch(() => undoReqFailed(dispatch))
  }

}

const undoReqSuccess = dispatch => {
  dispatch({type: U_R_SUCCESS})
}

const undoReqFailed = dispatch => {
  dispatch({type: U_R_FAILED, payload: 'UNDO REQ FAILED'})
}

export const recreqFetch = () => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: RECREQ_FETCH})

    firebase.database().ref(`/UserInfo/${currentUser.uid}/Requests`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: RR_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: RR_F_FAILED})
      }
    })

  }
}

export const acceptReq = user => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: ACC_REQ})

    var updates = {}
    updates['/UserInfo/'+currentUser.uid+'/Requests/'+user] = null
    updates['/UserInfo/'+currentUser.uid+'/Friends/'+user] = user
    updates['/UserInfo/'+user+'/Friends/'+currentUser.uid] = currentUser.uid

    firebase.database().ref().update(updates)
      .then(() => accRSuccess(dispatch))
      .catch(() => accRFailed(dispatch))
  }
}

const accRSuccess = dispatch => {
  dispatch({type: A_R_SUCCESS})
}

const accRFailed = dispatch => {
  dispatch({type: A_R_FAILED, payload: 'ACCEPT REQ FAILED'})
}

export const declineReq = user => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: DECL_REQ})

    firebase.database().ref(`/UserInfo/${currentUser.uid}/Requests/${user}`)
      .remove()
      .then(() => declineReqSuccess(dispatch, user))
      .catch(() => declineReqFailed(dispatch))
  }
}

const declineReqSuccess = dispatch => {
  dispatch({type: D_R_SUCCESS})
}

const declineReqFailed = dispatch => {
  dispatch({type: D_R_FAILED, payload: 'DECLINE REQ FAILED'})
}

export const RemoveReq = () => (
  {
    type: RFREQ
  }
)

export const removeFriend = user => {
  const {currentUser} = firebase.auth()
  return dispatch => {
    dispatch({type: REMOVE_F})

    var updates = {}
    updates['/UserInfo/'+currentUser.uid+'/Friends/'+user] = null
    updates['/UserInfo/'+user+'/Friends/'+currentUser.uid] = null

    firebase.database().ref().update(updates)
      .then(() => removeFSuccess(dispatch))
      .catch(() => removeFFailed(dispatch))
  }
}

const removeFSuccess = dispatch => {
  dispatch({type: R_F_SUCCESS})
}

const removeFFailed = dispatch => {
  dispatch({type: R_F_FAILED, payload: 'REMOVE FRIEND FAILED'})
}

export const otfriendsFetch = uid => {
  return dispatch => {
    dispatch({type: OTFRIENDS_FETCH})
    firebase.database().ref(`/UserInfo/${uid}/Friends`)
    .on('value', snapshot => {
      if(snapshot.val()) {
        dispatch({
          type: OTF_F_SUCCESS,
          payload: snapshot.val()
        })
      }else {
        dispatch({type: OTF_F_FAILED})
      }
    })

  }
}
