import React from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, CardSection} from '../components/common';
import {Header, Item, Icon, Input, Spinner} from 'native-base';
import {eventsFetch, StringChanged, VisitOtherEvent} from '../actions';
import {FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';

class SearchEvent extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.eventsFetch()
    }
  }

  renderSearchOrSpinner() {
    if(this.props.loading) {
      return <Spinner color='white'/>
    }
    if(this.props.noData || (this.props.fetched && (this.props.events && !Object.keys(this.props.events).length))) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: 'white'}}>DB seems empty.</Text>
        </View>
      )
    }
    return (
      <Item>
        <Icon name='ios-search'/>
        <Input placeholder='Search' onChangeText={string => {this.props.StringChanged(string)}} value={this.props.inputString}/>
        <Icon name='trophy'/>
      </Item>
    )
  }

  renderList() {
    if(this.props.inputString && this.props.events) {
      const thekeys = Object.keys(this.props.events)
      const source = []
      const obj = {}
      const cnt = 0
      for(key in thekeys) {
        if(this.props.events[thekeys[key]]["name"].toUpperCase().includes(this.props.inputString.toUpperCase())) {
          obj = this.props.events[thekeys[key]]
          obj["evekey"] = thekeys[key]
          obj["fromevesearch"] = true
          source[cnt++] = obj
        }
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

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Header searchBar rounded style={{marginTop: StatusBar.currentHeight, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderSearchOrSpinner()}
        </Header>

        {this.renderList()}

        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("search")}>GO BACK</Button>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {inputString, events} = state.searchR
  const {loading, fetched, noData} = state.eveR
  return {inputString, events, loading, fetched, noData}
}

export default connect(mapStateToProps, {eventsFetch, StringChanged, VisitOtherEvent})(SearchEvent);
