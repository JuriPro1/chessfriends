import {NAMECHANGED, SURNAMECHANGED, YEARCHANGED, SEXSEL, COUNTRYCHANGED, PHONECHANGED, TITLECHANGED, P_F_SUCCESS, LO_U_S} from '../actions/types';

const INITIAL_STATE = {
  name: "DefaultName",
  surname: "DefaultSurname",
  birthdayYear: "1900",
  isMale: true,
  country: "Afghanistan",
  phoneNumber: "0000000000",
  title: " "
}

export default (state=INITIAL_STATE, action) => {

  info = action.payload

  switch(action.type) {
    case NAMECHANGED:
      return {...state, name: info}
    case SURNAMECHANGED:
      return {...state, surname: info}
    case YEARCHANGED:
      return {...state, birthdayYear: info}
    case SEXSEL:
      return {...state, isMale: info}
    case COUNTRYCHANGED:
      return {...state, country: info}
    case PHONECHANGED:
      return {...state, phoneNumber: info}
    case TITLECHANGED:
      return {...state, title: info}

    case P_F_SUCCESS:
      const {name, surname, birthdayYear, isMale, country, phoneNumber, title} = action.payload.info
      return {...INITIAL_STATE, name, surname, birthdayYear, isMale, country, phoneNumber, title}

    case LO_U_S:
      return {...INITIAL_STATE}

    default:
      return state
  }

}
