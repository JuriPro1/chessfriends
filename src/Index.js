import React from 'react';
import firebase from 'firebase';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Switcher from './Switcher';

class Index extends React.Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCs6-SzB9wKnsZIPb-doCT_jegNQwQfmDw",
      authDomain: "chessfriends-348e3.firebaseapp.com",
      databaseURL: "https://chessfriends-348e3.firebaseio.com",
      projectId: "chessfriends-348e3",
      storageBucket: "chessfriends-348e3.appspot.com",
      messagingSenderId: "703470073084"
    })
  }

  render() {

    const mystore = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return(
      <Provider store={mystore}>
        <Switcher/>
      </Provider>
    )
  }

}

export default Index;
