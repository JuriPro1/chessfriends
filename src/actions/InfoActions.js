import {NAMECHANGED, SURNAMECHANGED, YEARCHANGED, SEXSEL, COUNTRYCHANGED, PHONECHANGED, TITLECHANGED} from '../actions/types';
import firebase from 'firebase';

export const NameChanged = name => (
  {
    type: NAMECHANGED,
    payload: name
  }
)

export const SurnameChanged = surname => (
  {
    type: SURNAMECHANGED,
    payload: surname
  }
)

export const YearChanged = year => (
  {
    type: YEARCHANGED,
    payload: year
  }
)

export const SexSel = sex => (
  {
    type: SEXSEL,
    payload: sex
  }
)

export const CountryChanged = country => (
  {
    type: COUNTRYCHANGED,
    payload: country
  }
)

export const PhoneChanged = phone => (
  {
    type: PHONECHANGED,
    payload: phone
  }
)

export const TitleChanged = title => (
  {
    type: TITLECHANGED,
    payload: title
  }
)
