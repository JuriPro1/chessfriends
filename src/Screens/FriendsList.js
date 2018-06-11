import React from 'react';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import {profilesFetch, friendsFetch, ShowOthersProfile} from '../actions';
import {Button, Card, CardSection, Spinner} from '../components/common';
import {FlatList, TouchableOpacity, ScrollView, Text, View} from 'react-native';

class FriendsList extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.profilesFetch()
    }
  }

  renderFriendsOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(this.props.fetched && this.props.noData) {
      return (
        <Card style={{marginTop: 10, marginBottom: 10}}>
          <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>DB seems empty.</Text>
          </CardSection>
        </Card>
      )
    }
    if(this.props.fetched) {
      const allKeys = Object.keys(this.props.data), allVals = Object.values(this.props.data), array = [], cnt = 0;
      for(i in this.props.friends) {
        for(j in allKeys) {
          if(this.props.friends[i]==allKeys[j]) {
            array.push(allVals[j])
            array[cnt++]["profkey"] = allKeys[j]
          }
        }
      }
      return (
        <FlatList
          data={array}
          renderItem={({item}) =>
                      <CardSection style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{width: 250}}>
                          <ScrollView horizontal>
                            <Text style={{fontSize: 18, marginLeft: 5}}>
                              {item.Profile.info.name} {item.Profile.info.surname}
                            </Text>
                          </ScrollView>
                        </View>
                        <TouchableOpacity onPress={() =>this.props.ShowOthersProfile(item)}>
                          <Icon name="ios-eye-outline" style={{color: '#00ccdd'}}/>
                        </TouchableOpacity>
                      </CardSection>
                    }
          keyExtractor={item => item.profkey}
        />
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <MyHeader/>
        <ScrollView>
          {this.renderFriendsOrSpinner()}
        </ScrollView>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("profile")}>GO BACK</Button>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {loading, fetched, data, noData} = state.searchR
  const {friends} = state.editproR
  return {loading, fetched, data, noData, friends}
}

export default connect(mapStateToProps, {profilesFetch, friendsFetch, ShowOthersProfile})(FriendsList);
