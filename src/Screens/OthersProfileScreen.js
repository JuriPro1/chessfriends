import React from 'react';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import ShowProfile from '../components/ShowProfile';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, CardSection, Spinner, TitledCard} from '../components/common';
import {recreqFetch, sendReq, undoReq, acceptReq, declineReq, RemoveReq, removeFriend, otfriendsFetch} from '../actions';

class OtherProfileScreen extends React.Component {

  componentWillMount() {
    this.props.recreqFetch()
    if(this.props.profileToShow) {this.props.otfriendsFetch(this.props.profileToShow.profkey)}
  }

  showPhone() {
    if(this.props.profileToShow) {
      const {info, rating} = this.props.profileToShow.Profile
      if(this.props.otherFriends && this.props.otherFriends.includes(this.props.user.uid)) {
        return (
          <ShowProfile
            name = {info.name}
            surname = {info.surname}
            birthdayYear = {info.birthdayYear}
            isMale = {info.isMale}
            country = {info.country}
            phoneNumber = {info.phoneNumber}
            message
            title = {info.title}
            standard = {rating.standard}
            rapid = {rating.rapid}
            blitz = {rating.blitz}
          />
        )
      }
      return (
        <ShowProfile
          name = {info.name}
          surname = {info.surname}
          birthdayYear = {info.birthdayYear}
          isMale = {info.isMale}
          country = {info.country}
          phoneNumber = {"*****"}
          title = {info.title}
          standard = {rating.standard}
          rapid = {rating.rapid}
          blitz = {rating.blitz}
        />
      )
    }
  }

  renderFriends() {
    if(this.props.otherFriends) {
      return (
        <TouchableOpacity onPress={() => Actions.ofriendList()}>
          <Card>
            <CardSection style={{justifyContent: 'center'}}>
              <Text style={{marginLeft: 5}}>#Friends</Text>
              <Text style={{fontSize: 18, marginLeft: 5, color: 'blue'}}>{this.props.otherFriends.length}</Text>
            </CardSection>
          </Card>
        </TouchableOpacity>
      )
    }
    return (
      <Card>
        <CardSection style={{justifyContent: 'center'}}>
          <Text style={{marginLeft: 5}}>#Friends</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>0</Text>
        </CardSection>
      </Card>
    )
  }

  renderButton() {
    const {loading, profileToShow, recreq, sent, otherFriends, user} = this.props
    if(loading) {
      return <Spinner dim='large'/>
    }
    if(otherFriends && otherFriends.includes(user.uid)) {
      return (
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.RemoveReq()}>
            <Text style={{color: 'green'}}>FRIENDS</Text>
            <Text>/</Text>
            <Text style={{color: 'red'}}>REMOVE</Text>
        </Button>
      )
    }
    if(profileToShow) {
      if(recreq && recreq.includes(profileToShow.profkey)) {
        return (
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <Button style={{flex: 1}} onPress={() => this.props.acceptReq(profileToShow.profkey)}>
              <Text style={{color: 'green'}}>ACCEPT</Text>
            </Button>
            <Button style={{flex: 1}} onPress={() => this.props.declineReq(profileToShow.profkey)}>
              <Text style={{color: 'red'}}>DECLINE</Text>
            </Button>
          </View>
        )
      }
      if(sent || (profileToShow.Requests && Object.keys(profileToShow.Requests).includes(user.uid))) {
        return (
          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.undoReq(profileToShow.profkey)}>
              <Text style={{color: 'green'}}>SENT</Text>
              <Text>/</Text>
              <Text style={{color: 'orange'}}>UNDO</Text>
          </Button>
        )
      }
    }
    return <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.sendReq(profileToShow.profkey)}>SEND REQUEST</Button>
  }

  showError() {
    const error = this.props.error
    if(error=='SEND REQ FAILED'||error=='UNDO REQ FAILED'||error=='DECLINE REQ FAILED'||error=='REMOVE FRIEND FAILED') {
      alert(error)
    }
  }

  showAlert() {
    if(this.props.showAlert) {
      Alert.alert(
        'Alert',
        'WANT TO DELETE IT ?',
        [
          {text: 'NO', onPress: () => this.props.RemoveReq()},
          {text: 'YES', onPress: () => {
            this.props.removeFriend(this.props.profileToShow.profkey)}}
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex:1}}>
          <MyHeader/>
          <ScrollView>

            {this.showPhone()}
            {this.renderFriends()}

            <View style={{flex:1, flexDirection: 'row'}}>
              <Button style={{flex: 1, marginTop: 10, marginBottom: 10}} onPress={() => {
                if(!this.props.profileToShow.Availability) {
                  alert("No Data yet.")
                } else {
                  Actions.showAva()
                }
              }}>Availability</Button>
              <Button style={{flex: 1, marginTop: 10, marginBottom: 10}} onPress={() => {
                Actions.oeveList()
              }}>Tournaments</Button>
            </View>
            {this.renderButton()}
            <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.pop()}>GO BACK</Button>

          </ScrollView>
        </View>
        {this.showError()}
        {this.showAlert()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {profileToShow, loading, error, sent, recreq, showAlert, otherFriends} = state.searchR
  const user = state.authR.user
  return {profileToShow, loading, error, sent, recreq, showAlert, otherFriends, user}
}

export default connect(mapStateToProps, {recreqFetch, sendReq, undoReq, acceptReq, declineReq, RemoveReq, removeFriend, otfriendsFetch})(OtherProfileScreen);
