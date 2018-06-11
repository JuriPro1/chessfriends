import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Button} from '../components/common';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';

const SearchScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <MyHeader quit/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button style={{width: 120, marginTop: 10, marginBottom: 10}} onPress={() => Actions.sUser()}>
            <Icon name="search" style={{color: '#00ccdd'}}/>
            <Text style={{fontSize: 18}}> User</Text>
          </Button>
          <Button style={{width: 120, marginTop: 10, marginBottom: 10}} onPress={() => Actions.showNearby()}>
            <Icon name="search" style={{color: '#00ccdd'}}/>
            <Text style={{fontSize: 18}}> Player</Text>
          </Button>
          <Button style={{width: 140, marginTop: 10, marginBottom: 10}} onPress={() => Actions.sEvent()}>
            <Icon name="search" style={{color: '#00ccdd'}}/>
            <Text style={{fontSize: 18}}> Tournament</Text>
          </Button>
        </View>
      <MyFooter search/>
    </View>
  )
}

export default SearchScreen;
