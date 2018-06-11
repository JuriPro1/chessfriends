import React from 'react';
import {CardSection} from './common';
import {Text, View} from 'react-native';
import {Radio} from 'native-base';

const Choice = ({booleano, onPress, t1, t2}) => {
  return(
    <CardSection style={{justifyContent: 'space-around'}}>
      <View style={{flexDirection: 'row'}}>
        <Radio style={{marginRight: 15}} selected={booleano} onPress={onPress}/>
        <Text>{t1}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Radio style={{marginRight: 15}} selected={!booleano} onPress={onPress}/>
        <Text>{t2}</Text>
      </View>
    </CardSection>
  )
}

export default Choice;
