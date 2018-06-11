import React from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, CardSection} from '../components/common';
import {Header, Item, Icon, Input, Spinner} from 'native-base';
import {profilesFetch, StringChanged, ShowOthersProfile} from '../actions';
import {FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';

class SearchUser extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.profilesFetch()
    }
  }

  renderSearchOrSpinner() {
    if(this.props.loading) {
      return  <Spinner color='white'/>
    }
    if(this.props.noData || (this.props.fetched && Object.keys(this.props.data).length==0)) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 18, color: 'white'}}>DB seems empty.</Text></View>
    }

    return (
      <Item>
        <Icon name='ios-search'/>
        <Input placeholder='Search' onChangeText={string => {this.props.StringChanged(string)}} value={this.props.inputString}/>
        <Icon name='ios-people'/>
      </Item>
    )
  }

  renderList() {
    const inputString = this.props.inputString
    if(this.props.fetched && !this.props.noData && inputString != null) {
      const thekeys = Object.keys(this.props.data)
      const source = Object.values(this.props.data)
      for(obj in source) {
        source[obj]["profkey"]=thekeys[obj]
      }
      return <FlatList
                data={source}
                renderItem={({item}) => {
                  const namesur = item.Profile.info.name+' '+item.Profile.info.surname
                  if(namesur.toUpperCase().includes(inputString.toUpperCase())) {
                      return (
                        <CardSection style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                          <View style={{width: 250}}>
                            <ScrollView horizontal>
                              <Text style={{fontSize: 18, marginLeft: 5}}>
                                {namesur}
                              </Text>
                            </ScrollView>
                          </View>
                          <TouchableOpacity onPress={() =>this.props.ShowOthersProfile(item)} style={{marginRight: 5}}>
                            <Icon name="ios-information-circle-outline" style={{color: '#00ccdd'}}/>
                          </TouchableOpacity>
                        </CardSection>
                      )
                    }
                  }
                }
                keyExtractor={item => item.profkey}
              />
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Header searchBar rounded style={{marginTop: StatusBar.currentHeight, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderSearchOrSpinner()}
        </Header>

        <ScrollView>
          {this.renderList()}
        </ScrollView>

        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("search")}>GO BACK</Button>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {loading, fetched, data, noData, inputString} = state.searchR
  return {loading, fetched, data, noData, inputString}
}

export default connect(mapStateToProps, {profilesFetch, StringChanged, ShowOthersProfile})(SearchUser);
