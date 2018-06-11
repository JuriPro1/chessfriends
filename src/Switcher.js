import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import {AuthForm,
        MainScreen, AvaScreen, SearchScreen, EventScreen, VisitEvent, ProfileScreen,
        ReqsList, EditAva, SearchUser, OthersProfileScreen, AvaNearbyScreen, OtFriendsList, OthersAvaScreen, OthersEveList, VisitOtherEvent, SearchEvent, PartsList, SetEvent, FriendsList, EditProfile} from './Screens';

const Switcher = () => {
  return (
    <Router backAndroidHandler={() => {}}>
      <Scene key="root" hideNavBar>

      <Scene key="first" initial hideNavBar>
        <Scene key="auth" component={AuthForm}/>
      </Scene>

      <Scene key="second" hideNavBar>
        <Scene key="main" component={MainScreen}/>
        <Scene key="ava" component={AvaScreen}/>
        <Scene key="search" component={SearchScreen}/>
        <Scene key="events" component={EventScreen}/>
        <Scene key="specevent" component={VisitEvent}/>
        <Scene key="profile" component={ProfileScreen}/>
      </Scene>

      <Scene key="third" hideNavBar>
        <Scene key="reqsList" component={ReqsList}/>
        <Scene key="editAva" component={EditAva}/>
        <Scene key="sUser" component={SearchUser}/>
        <Scene key="showNearby" component={AvaNearbyScreen}/>
        <Scene key="showUser" component={OthersProfileScreen}/>
        <Scene key="ofriendList" component={OtFriendsList}/>
        <Scene key="showAva" component={OthersAvaScreen}/>
        <Scene key="oeveList" component={OthersEveList}/>
        <Scene key="visitOeve" component={VisitOtherEvent}/>
        <Scene key="sEvent" component={SearchEvent}/>
        <Scene key="partsList" component={PartsList}/>
        <Scene key="setEvent" component={SetEvent}/>
        <Scene key="friendsList" component={FriendsList}/>
        <Scene key="editProfile" component={EditProfile}/>
      </Scene>

      </Scene>
    </Router>
  )
}

export default Switcher;
