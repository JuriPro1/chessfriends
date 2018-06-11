import React from 'react';
import {CardSection} from './common';
import {Text, View} from 'react-native';
import {CheckBox} from 'native-base';

const Ask = ({question, value, onPress, style}) => {
  return (
    <CardSection style={style}>
      <View style={{flexDirection: 'row'}}>
        <CheckBox style={{marginRight: 15}} checked={value} onPress={onPress}/>
        <Text>{question}</Text>
      </View>
    </CardSection>
  )
}

export default Ask;
