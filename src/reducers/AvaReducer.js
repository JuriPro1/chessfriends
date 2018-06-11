import {ADD_AVA_INFO, ANSWERPRESSED, AVATOMOVE, AVATOPLAY, AVA_FETCH, A_A_I_FAILED, A_A_I_SUCCESS, A_F_FAILED, A_F_SUCCESS, DPREQ, DSEL, DTPCLOSE, LO_U_S, MAPPRESSED, RADVALCH, REGIONCHANGED, TPREQ, TSEL, TTWCHANGED} from '../actions/types';

const datetime = new Date()

const INITIAL_STATE = {
  available: false,
  region: {
    longitudeDelta: 0.0250555,
    latitudeDelta: 0.0250555,
    longitude: 15.084362,
    latitude: 37.517636
  },
  marker: {
    latlng: {
      latitude: 37.517636,
      longitude: 15.084362
    }
  },
  availableToMove: false,
  radius: 0,
  timeToWait: "15'",
  tpVisible: false,
  dpVisible: false,
  selectedTime: datetime.getHours()+":"+datetime.getMinutes(),
  selectedDate: datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear(),
  chessSetAvailable: false,
  loading: false,
  fetched: false,
  noData: false,
  error: ''
}

export default (state=INITIAL_STATE, action) => {

  switch(action.type) {
    case AVATOPLAY:
      return {...state, available: action.payload, availableToMove: false, radius: 0}
    case REGIONCHANGED:
      return{...state, region: action.payload}
    case MAPPRESSED:
      const {longitude, latitude} = action.payload
      return {
        ...state,
        marker: {
          latlng: {
            latitude,
            longitude
          }
        }
      }
    case AVATOMOVE:
      return {...state, availableToMove: action.payload, radius: 0}
    case RADVALCH:
      return {...state, radius: action.payload}
    case TTWCHANGED:
      return {...state, timeToWait: action.payload}
    case TPREQ:
      return {...state, tpVisible: true}
    case DPREQ:
      return {...state, dpVisible: true}
    case DTPCLOSE:
      return {...state, tpVisible: false, dpVisible: false}
    case TSEL:
      return {...state, selectedTime: getTime(action.payload), tpVisible: false}
    case DSEL:
      return {...state, selectedDate: getDate(action.payload), dpVisible: false}
    case ANSWERPRESSED:
      return {...state, chessSetAvailable: !state.chessSetAvailable}
    case ADD_AVA_INFO:
      return {...state, loading: true}
    case A_A_I_SUCCESS:
      return {...state, loading: false}
    case A_A_I_FAILED:
      return {...state, loading: false, error: action.payload}
    case AVA_FETCH:
      return {...INITIAL_STATE, loading: true}
    case A_F_SUCCESS:
      const {available, region, marker, availableToMove, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable} = action.payload
      return {...INITIAL_STATE,
              available, region, marker, availableToMove, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable,
              fetched: true}
    case A_F_FAILED:
      return {...INITIAL_STATE, noData: true}

    case LO_U_S:
      return {...INITIAL_STATE}

    default:
      return state;
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

const getTime = obj => {
  converted2 = JSON.stringify(obj)
  time = converted2.substring(converted2.indexOf("T")+1, converted2.lastIndexOf(":"))
  hours = time.substring(0, time.indexOf(":"))
  if(Number(hours)==22)       {fixedHours="00"}
  else if(Number(hours)==23)  {fixedHours="01"}
  else                        {fixedHours=(Number(hours)+2).toString()}
  return time.replace(hours, fixedHours)
}
