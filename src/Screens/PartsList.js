import React from 'react';
import {Button, Card, CardSection, Spinner} from '../components/common';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import {profilesFetch, FromMyEvent} from '../actions';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {countries} from '../components/strings'

class PartsList extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.profilesFetch()
    }
  }

  renderListOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(!this.props.partecipating && (this.props.noData || (this.props.fetched && Object.keys(this.props.data).length==0))) {
      return <Card>
                <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>DB seems empty.</Text>
                </CardSection>
              </Card>
    }
    if(this.props.fetched) {
      const KeyP = Object.keys(this.props.partecipations)
      const KeyD = Object.keys(this.props.data)
      const array = []
      const cnt = 0
      for(singleD in KeyD) {
        for(singleP in KeyP) {
          if(KeyD[singleD]==KeyP[singleP]) {
            array.push(Object.values(this.props.data)[singleD])
            array[cnt++]["profKey"] = KeyD[singleD]
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
            keyExtractor={item => item.profKey}
          />
          {this.showYou(KeyP, array)}
        </ScrollView>
      )
    }
  }

  showYou(KeyP, array) {
    if(KeyP.length==array.length+1) {
      return (
        <CardSection style={{height: 85, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, marginLeft: 5}}>YOU</Text>
        </CardSection>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader/>
        {this.renderListOrSpinner()}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => {this.props.fromMyEvent ? this.props.FromMyEvent(false):Actions.popTo("visitOeve")}}>GO BACK</Button>
        </View>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {loading, fetched, data, noData} = state.searchR
  const {partecipations, partecipating, fromMyEvent} = state.eveR
  return {loading, fetched, data, noData, partecipations, partecipating, fromMyEvent}
}

export default connect(mapStateToProps, {profilesFetch, FromMyEvent})(PartsList);
