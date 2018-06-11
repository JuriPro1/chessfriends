import {STCHANGED, RPCHANGED, BLCHANGED} from './types';

export const StandardChanged = standard => (
  {
    type: STCHANGED,
    payload: standard
  }
)

export const RapidChanged = rapid => (
  {
    type: RPCHANGED,
    payload: rapid
  }
)

export const BlitzChanged = blitz => (
  {
    type: BLCHANGED,
    payload: blitz
  }
)
