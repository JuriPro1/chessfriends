import React from 'react';
import {connect} from 'react-redux';
import {profilesFetch} from '../actions';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {Button, Card, CardSection} from '../components/common';

class OtFriendsList extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.profilesFetch()
    }
  }

  renderSpinnerOrList() {
    const {loading, fetched, data, noData, otherFriends} = this.props
    if(loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(noData || data == null) {
      return (
        <Card>
          <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>DB seems empty.</Text>
          </CardSection>
        </Card>
      )
    }
    if(fetched) {
      const allKeys = Object.keys(data), allVals = Object.values(data), array = [], cnt=0;
      for(i in otherFriends) {
        for(j in allKeys) {
          if(otherFriends[i]==allKeys[j]) {
            array.push(allVals[j])
            array[cnt++]["profkey"] = allKeys[j]
          }
        }
      }
      return (
        <ScrollView>
          <FlatList
            data={array}
            renderItem={({item}) => {
              const {info, rating} = item.Profile
              return (
                <CardSection style={{height: 85, justifyContent: 'space-around'}}>
                    <ScrollView horizontal>
                      <Text style={{fontSize: 18, marginLeft: 5}}>
                        {info.name+" "+info.surname}
                      </Text>
                    </ScrollView>
                    <Text style={{marginLeft: 5}}>
                      {info.country}
                    </Text>
                    <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={{marginLeft: 5}}>{rating.standard} - {rating.rapid}/{rating.blitz}</Text>
                      {info.title!=" " ? <Text style={{marginRight: 5}}>{info.title}</Text>:null}
                    </View>
                </CardSection>
              )
            }}
            keyExtractor={item => item.profkey}
          />
          {this.showYou(otherFriends, array)}
        </ScrollView>
      )
    }
  }

  showYou(otherFriends, array) {
    if(otherFriends.length>array.length) {
      return (
        <CardSection style={{height: 85, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, marginLeft: 5}}>YOU</Text>
        </CardSection>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <MyHeader/>
        {this.renderSpinnerOrList()}
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("showUser")}>GO BACK</Button>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {loading, fetched, data, noData} = state.searchR
  return {loading, fetched, data, noData, otherFriends: state.searchR.otherFriends}
}

export default connect(mapStateToProps, {profilesFetch})(OtFriendsList);
