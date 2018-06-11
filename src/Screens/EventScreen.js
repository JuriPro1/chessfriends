import React from 'react';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import {Actions} from 'react-native-router-flux';
import {eventsFetch, VisitEvent, CreateEvent} from '../actions';
import {Button, Card, CardSection, Spinner} from '../components/common';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';

class EventScreen extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.eventsFetch()
    }
  }

  renderEventsOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(this.props.noData) {
      return  <Card>
                <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>DB seems empty.</Text>
                </CardSection>
              </Card>
    }
    if(this.props.fetched && this.props.data==null) {
      return  <Card>
                <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>0 events created by this user.</Text>
                </CardSection>
              </Card>
    }
    if(this.props.fetched) {
      const thekeys = Object.keys(this.props.data)
      const source = []
      const obj = {}
      for(key in thekeys) {
        obj = this.props.data[thekeys[key]]
        obj["evekey"] = thekeys[key]
        source[key] = obj
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
                              <TouchableOpacity onPress={() =>this.props.VisitEvent(item)} style={{marginRight: 5}}>
                                <Icon name="ios-information-circle-outline" style={{color: '#00ccdd'}}/>
                              </TouchableOpacity>
                            </CardSection>
                          }
                keyExtractor={item => item.evekey}
              />
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader quit/>
          <ScrollView>
            {this.renderEventsOrSpinner()}
            <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.CreateEvent()}><Text>CREATE</Text></Button>
          </ScrollView>
        <MyFooter trophy/>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {loading, fetched, data, noData, showWindow} = state.eveR
  return {loading, fetched, data, noData, showWindow}
}

export default connect(mapStateToProps, {eventsFetch, VisitEvent, CreateEvent})(EventScreen);
