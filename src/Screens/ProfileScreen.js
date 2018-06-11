import React from 'react';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import {Actions} from 'react-native-router-flux';
import ShowProfile from '../components/ShowProfile';
import {profileFetch, friendsFetch} from '../actions';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, CardSection, Spinner} from '../components/common';

class ProfileScreen extends React.Component {

  componentWillMount() {
    if(!this.props.fetched) {
      this.props.profileFetch()
    }
    if(!this.props.friendsfetched) {
      this.props.friendsFetch()
    }
  }

  renderDataorSpinner() {
    const {loading, data} = this.props
    if(loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(!data) {
      return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Card>
            <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>No Data</Text>
            </CardSection>
          </Card>
          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.editProfile()}>EDIT</Button>
        </View>
      )
    }
    const {availability, info, rating} = data
    return (
        <ScrollView>

          <ShowProfile
            name = {info.name}
            surname = {info.surname}
            birthdayYear = {info.birthdayYear}
            isMale = {info.isMale}
            country = {info.country}
            phoneNumber = {info.phoneNumber}
            title = {info.title}
            standard = {rating.standard}
            rapid = {rating.rapid}
            blitz = {rating.blitz}
          />

          {this.renderFriends()}

          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.editProfile()}>EDIT</Button>
        </ScrollView>
      )
  }

  renderFriends() {
    if(this.props.friends) {
      return (
        <TouchableOpacity onPress={() => Actions.friendsList()}>
          <Card>
            <CardSection style={{justifyContent: 'center'}}>
              <Text style={{marginLeft: 5}}>#Friends</Text>
              <Text style={{fontSize: 18, marginLeft: 5, color: 'blue'}}>{this.props.friends.length}</Text>
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

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader quit/>
        {this.renderDataorSpinner()}
        <MyFooter person/>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {data, fetched, loading, friendsfetched, friends} = state.editproR
  return {data, fetched, loading, friendsfetched, friends}
}

export default connect (mapStateToProps, {profileFetch, friendsFetch})(ProfileScreen);
