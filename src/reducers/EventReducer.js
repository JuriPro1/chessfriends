import {EVENAMECHANGED, ANSWERCHANGED, CHOICECHANGED, ADDRESSCHANGED, DPCALL, DPICKED, DTPHIDDEN, ROUNDSCHANGED, DTDCHANGED, LINKCHANGED, LO_U_S,
        VISITEVENT, REMOVEEVENT, DECLINEREMOVE, MODIFYEVENT, CREATEEVENT,
        ADD_EVENT, A_E_SUCCESS, A_E_FAILED,
        EDIT_EVENT, E_E_SUCCESS, E_E_FAILED,
        CONFIRM_REMOVE, C_R_SUCCESS, C_R_FAILED,
        EVE_FETCH, E_F_SUCCESS, E_F_FAILED,
        PA_FETCH, PA_F_SUCCESS, PA_F_FAILED,
        TAKE_PART, T_P_SUCCESS, T_P_FAILED,
        DECLINE_PART, D_P_SUCCESS, D_P_FAILED,
        FME
      } from '../actions/types';
import firebase from 'firebase';

const datetime = new Date()

const INITIAL_STATE = {
  name: 'DefaultEventName',
  answer: false,
  choice: false,
  address: 'DefaultAddress',
  dayStart: datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear(),
  rounds: '5',
  dtdsel: '0',
  link: 'vesus.org',
  dpVisible: false,
  loading: false,
  error: null,
  fetched: false,
  data: null,
  noData: false,
  evekey: null,
  modify: false,
  create: false,
  showWindow: false,
  partecipations: null,
  partecipants: 0,
  partecipating: false,
  fromMyEvent: false
}

export default (state=INITIAL_STATE, action) => {

  info = action.payload

  switch(action.type) {
    case EVENAMECHANGED:
      return {...state, name: info}
    case ANSWERCHANGED:
      return {...state, answer: !state.answer}
    case CHOICECHANGED:
      return {...state, choice: !state.choice}
    case ADDRESSCHANGED:
      return {...state, address: info}
    case DPCALL:
      return {...state, dpVisible: true}
    case DPICKED:
      return {...state, dpVisible: false, dayStart: getDate(info)}
    case DTPHIDDEN:
      return {...state, dpVisible: false}
    case ROUNDSCHANGED:
      return {...state, rounds: info}
    case DTDCHANGED:
      return {...state, dtdsel: info}
    case LINKCHANGED:
      return {...state, link: info}
    case VISITEVENT:
      const {name, answer, choice, address, dayStart, rounds, dtdsel, link, evekey} = info
      return {...state, name, answer, choice, address, dayStart, rounds, dtdsel, link, evekey}
    case REMOVEEVENT:
      return {...state, showWindow: true}
    case DECLINEREMOVE:
      return {...state, showWindow: false}
    case MODIFYEVENT:
      return {...state, modify: true, create: false}
    case CREATEEVENT:
      return {
        ...state,
        name: 'DefaultEventName',
        answer: false,
        choice: false,
        address: 'DefaultAddress',
        dayStart: datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear(),
        rounds: '5',
        dtdsel: '0',
        link: 'vesus.org',
        dpVisible: false,
        evekey: null,
        modify: false,
        create: true
      }
    case ADD_EVENT:
      return {...state, loading: true, error: null, showWindow: false}
    case A_E_SUCCESS:
      return {
        ...state,
        name: 'DefaultEventName',
        answer: false,
        choice: false,
        address: 'DefaultAddress',
        dayStart: datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear(),
        rounds: '5',
        dtdsel: '0',
        link: 'vesus.org',
        dpVisible: false,
        loading: false,
        error: null,
        evekey: null,
        modify: false,
        create: false
      }
    case A_E_FAILED:
      return {...state, loading: false, error: info}
    case EDIT_EVENT:
      return {...state, loading: true, error: null}
    case E_E_SUCCESS:
      return {
        ...state,
        name: 'DefaultEventName',
        answer: false,
        choice: false,
        address: 'DefaultAddress',
        dayStart: datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear(),
        rounds: '5',
        dtdsel: '0',
        link: 'vesus.org',
        dpVisible: false,
        loading: false,
        error: null,
        evekey: null,
        modify: false,
        create: false
      }
    case E_E_FAILED:
      return {...state, loading: false, error: info}
    case CONFIRM_REMOVE:
      return {...state, loading: true, error: null, showWindow: false}
    case C_R_SUCCESS:
      return {
        ...state,
        name: 'DefaultEventName',
        answer: false,
        choice: false,
        address: 'DefaultAddress',
        dayStart: datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear(),
        rounds: '5',
        dtdsel: '0',
        link: 'vesus.org',
        dpVisible: false,
        loading: false,
        error: null,
        evekey: null,
        modify: false,
        create: false
      }
    case C_R_FAILED:
      return {...state, loading: false, error: info}
    case EVE_FETCH:
      return {...INITIAL_STATE, loading: true}
    case E_F_SUCCESS:
      return {...INITIAL_STATE, fetched: true, data: getEvents(info)}
    case E_F_FAILED:
      return {...INITIAL_STATE, fetched: true, noData: true}
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
      return {...state, loading: true, partecipating: false}
    case T_P_SUCCESS:
      return {...state, loading: false, partecipating: true}
    case T_P_FAILED:
      return {...state, loading: false, error: info}
    case DECLINE_PART:
      return {...state, loading: true}
    case D_P_SUCCESS:
      return {...state, loading: false, partecipating: false}
    case D_P_FAILED:
      return {...state, loading: false, error: info}
    case FME:
      return {...state, fromMyEvent: info}
    case LO_U_S:
      return {...INITIAL_STATE}
    default:
      return state
  }

}

const getDate = obj => {
  converted1 = JSON.stringify(obj)
  date = converted1.substring(1, converted1.indexOf("T"))
  day = date.substring(date.lastIndexOf("-")+1, date.length)
  if(day.charAt(0)=="0")    {day=day.charAt(1)}
  month = date.substring(date.indexOf("-")+1, date.lastIndexOf("-"))
  if(month.charAt(0)=="0")    {month=month.charAt(1)}
  return day + "/" + month + "/" + date.substring(0,date.indexOf("-"))
}

const getEvents = info => {
  const {currentUser} = firebase.auth()
  const thekeys = Object.keys(info)
  var obj = {}
  for(key in thekeys) {
    if(info[thekeys[key]].uid == currentUser.uid) {
      obj[thekeys[key]] = info[thekeys[key]]
    }
  }
  if(Object.keys(obj).length===0) {return null}
  return obj
}

const CheckPartecipating = info => {
  const {currentUser} = firebase.auth()
  return Object.keys(info).indexOf(currentUser.uid)>-1
}
