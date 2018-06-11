import React from 'react';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import {eventsFetch, VisitOtherEvent} from '../actions';
import {Button, Card, CardSection, Spinner} from '../components/common';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';

class OtherEveList extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.eventsFetch()
    }
  }

  renderListOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(this.props.profileToShow) {
      if(this.props.noData || (this.props.fetched && (this.props.events && !Object.keys(this.props.events).length))) {
        return  <Card>
                  <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>DB seems empty.</Text>
                  </CardSection>
                </Card>
      }
      if(this.props.fetched && (this.props.events && Object.keys(this.props.events).length)) {
        const thekeys = Object.keys(this.props.events)
        const source = []
        const obj = {}
        const cnt = 0
        for(key in thekeys) {
          if(this.props.events[thekeys[key]]["uid"]==this.props.profileToShow.profkey) {
            obj = this.props.events[thekeys[key]]
            obj["evekey"] = thekeys[key]
            obj["fromevesearch"] = false
            source[cnt++] = obj
          }
        }
        if(source.length==0) {
          return (
            <Card>
              <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>0 events created by this user.</Text>
              </CardSection>
            </Card>
          )
        }
        return <FlatList
                  data={source}
                  renderItem={({item}) =>
                              <CardSection style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{width: 250}}>
                                  <ScrollView horizontal>
                                    <Text style={{fontSize: 18, marginLeft: 5}}>
                                      {item.name}
                                    </Text>
                                  </ScrollView>
                                </View>
                                <TouchableOpacity onPress={() => this.props.VisitOtherEvent(item)} style={{marginRight: 5}}>
                                  <Icon name="ios-information-circle-outline" style={{color: '#00ccdd'}}/>
                                </TouchableOpacity>
                              </CardSection>
                            }
                  keyExtractor={item => item.evekey}
                />
      }
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader/>
        <ScrollView style={{flex: 1}}>
          {this.renderListOrSpinner()}
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("showUser")}>GO BACK</Button>
          </View>
        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {profileToShow, events} = state.searchR
  const {loading, fetched, noData} = state.eveR
  return {profileToShow, events, loading, fetched, noData}
}

export default connect(mapStateToProps, {eventsFetch, VisitOtherEvent})(OtherEveList)
