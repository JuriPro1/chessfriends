import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import AvaReducer from './AvaReducer';
import SearchReducer from './SearchReducer';
import EventReducer from './EventReducer';
import EditProReducer from './EditProReducer';
import InfoReducer from './InfoReducer';
import RatingReducer from './RatingReducer';

const RootReducer = combineReducers (
  {
    authR: AuthReducer,
    avaR: AvaReducer,
    searchR: SearchReducer,
    eveR: EventReducer,
    editproR: EditProReducer,
    infoR: InfoReducer,
    ratingR: RatingReducer
  }
)

export default RootReducer;
