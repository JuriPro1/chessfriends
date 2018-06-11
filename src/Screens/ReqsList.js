import React from 'react';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {Button, Card, CardSection, Spinner} from '../components/common';
import {profilesFetch, ShowOthersProfile, acceptReq, declineReq} from '../actions';

class ReqsList extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.profilesFetch()
    }
  }

  renderDataOrSpinner() {
    const {loading, fetched, data, noData, recreq} = this.props
    if(loading) {
      return  <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(noData || (fetched && Object.keys(data).length==0)) {
      return <Card>
                <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>DB seems empty.</Text>
                </CardSection>
              </Card>
    }
    if(fetched) {
      const dataKeys = Object.keys(data), dataVals = Object.values(data), array = [], cnt = 0
      for(val in recreq) {
        for(item in dataKeys) {
          if(recreq[val]==dataKeys[item]) {
            array.push(dataVals[item])
            array[cnt++]["profkey"] = dataKeys[item]
          }
        }
      }
      return (
        <ScrollView>
          <FlatList
            data={array}
            renderItem={({item}) => {
              const {info} = item.Profile
              return (
                <CardSection style={{height: 180, justifyContent: 'space-around'}}>
                    <ScrollView horizontal style={{height: 5}}>
                      <Text style={{fontSize: 18, marginLeft: 5}}>
                        {info.name+" "+info.surname}
                      </Text>
                    </ScrollView>
                    <Button style={{flex: 1}} onPress={() => this.props.ShowOthersProfile(item)}>VISIT PROFILE</Button>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                      <Button style={{flex: 1}} onPress={() => this.props.acceptReq(item.profkey)}>
                        <Text style={{color: 'green'}}>ACCEPT</Text>
                      </Button>
                      <Button style={{flex: 1}} onPress={() => this.props.declineReq(item.profkey)}>
                        <Text style={{color: 'red'}}>DECLINE</Text>
                      </Button>
                    </View>
                </CardSection>
              )
            }}
            keyExtractor={item => item.profkey}
          />
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <MyHeader/>
        {this.renderDataOrSpinner()}
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("main")}>GO BACK</Button>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {loading, fetched, data, noData, recreq} = state.searchR
  return {loading, fetched, data, noData, recreq}
}

export default connect(mapStateToProps, {profilesFetch, ShowOthersProfile, acceptReq, declineReq})(ReqsList);
