import {LO_U_S,
        PROS_FETCH, PS_F_SUCCESS, PS_F_FAILED,
        STRINGCHANGED,
        SHOWOTHERSPROFILE,
        NEWREGION, NEWMARKER, NEWRADIUS,
        E_F_SUCCESS, VISITOEVE, MANAGERFOUND,
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
        } from '../actions/types';
import firebase from 'firebase';

const INITIAL_STATE = {
  loading: false,
  fetched: false,
  data: null,
  noData: false,
  inputString: null,
  profileToShow: null,
  region: {
    longitudeDelta: 118,
    latitudeDelta: 84,
    longitude: 15.084362,
    latitude: 37.517636
  },
  mapPressed: false,
  marker: {
    latlng: {
      latitude: 0,
      longitude: 0
    }
  },
  radius: 0,
  events: null,
  eventToVisit: null,
  partecipations: null,
  partecipants: 0,
  partecipating: false,
  error: null,
  sent: false,
  recreq: null,
  showAlert: false,
  otherFriends: null
}

export default (state=INITIAL_STATE, action) => {

  info = action.payload

  switch(action.type) {
    case PROS_FETCH:
      return {...state, loading: true, fetched: false, data: null, noData: false}
    case PS_F_SUCCESS:
      return {...state, loading: false, fetched: true, data: allExceptMyself(info)}
    case PS_F_FAILED:
      return {...state, loading: false, fetched: true, noData: true}
    case STRINGCHANGED:
      return {...state, inputString: (info=='' ? null:info)}
    case NEWREGION:
      return {...state, region: info}
    case NEWMARKER:
      const {latitude, longitude} = info
      return {...state, mapPressed: true, marker: {latlng: {latitude, longitude}}}
    case NEWRADIUS:
      return {...state, radius: info}
    case SHOWOTHERSPROFILE:
      return {...state, profileToShow: info, sent: false}
    case E_F_SUCCESS:
      return {...state, events: OtherEvents(info)}
    case VISITOEVE:
      return {...state, eventToVisit: info}
    case MANAGERFOUND:
      return {...state, profileToShow: info}
    case PA_FETCH:
      return {...state, loading: true, partecipations: null, partecipants: 0, partecipating: false}
    case PA_F_SUCCESS:
      return {
                ...state,
                loading: false,
                partecipations: info,
                partecipants: Object.keys(info).length,
                partecipating: CheckPartecipating(info)
              }
    case PA_F_FAILED:
      return {...state, loading: false, partecipants: 0}
    case TAKE_PART:
      return {...state, loading: true, partecipating: false, error: null}
    case T_P_SUCCESS:
      return {...state, loading: false, partecipating: true}
    case T_P_FAILED:
      return {...state, loading: false, error: info}
    case DECLINE_PART:
      return {...state, loading: true, partecipating: true, error: null}
    case D_P_SUCCESS:
      return {...state, loading: false, partecipating: false}
    case D_P_FAILED:
      return {...state, loading: false, error: info}
    case SEND_REQ:
      return {...state, loading: true, error: null}
    case S_R_SUCCESS:
      return {...state, loading: false, sent: true}
    case S_R_FAILED:
      return {...state, loading: false, error: info}
    case UNDO_REQ:
      return {...state, loading: true, error: null}
    case U_R_SUCCESS:
      return {...state, loading: false, profileToShow: removeRequests(state.profileToShow), sent: false}
    case U_R_FAILED:
      return {...state, loading: false, error: info}
    case RECREQ_FETCH:
      return {...state, loading: true, recreq: null}
    case RR_F_SUCCESS:
      return {...state, loading: false, recreq: Object.keys(info)}
    case RR_F_FAILED:
      return {...state, loading: false}
    case ACC_REQ:
      return {...state, loading: true, error: null}
    case A_R_SUCCESS:
      return {...state, loading: false}
    case A_R_FAILED:
      return {...state, loading: false, error: info}
    case DECL_REQ:
      return {...state, loading: true, error: null}
    case D_R_SUCCESS:
      return {...state, loading: false}
    case D_R_FAILED:
      return {...state, loading: false, error: info}
    case RFREQ:
      return {...state, showAlert: !state.showAlert}
    case REMOVE_F:
      return {...state, loading: true, showAlert: !state.showAlert, error: null}
    case R_F_SUCCESS:
      return {...state, loading: false}
    case R_F_FAILED:
      return {...state, loading: false, error: info}
    case OTFRIENDS_FETCH:
      return {...state, loading: true, otherFriends: null}
    case OTF_F_SUCCESS:
      return {...state, loading: false, otherFriends: Object.keys(info)}
    case OTF_F_FAILED:
      return {...state, loading: false}
    case LO_U_S:
      return {...INITIAL_STATE}
    default:
      return state
  }

}

const allExceptMyself = info => {
  const {currentUser} = firebase.auth()
  delete info[currentUser.uid]
  return info
}

const OtherEvents = info => {
  const {currentUser} = firebase.auth()
  const evekeys = Object.keys(info)
  if(evekeys.length==0) {return null}
  var events = {}
  for (skey in evekeys) {
    if(info[evekeys[skey]].uid != currentUser.uid) {
      events[evekeys[skey]] = info[evekeys[skey]]
    }
  }
  return events
}

const CheckPartecipating = info => {
  const {currentUser} = firebase.auth()
  return Object.keys(info).indexOf(currentUser.uid)>-1
}

const removeRequests = info => {
  delete info["Requests"]
  return info
}
