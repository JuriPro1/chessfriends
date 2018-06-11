import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = props => {

  const {containerStyle, labelStyle, inputStyle} = styles;

  return (
    <View style={containerStyle}>

      <Text style={labelStyle}>{props.labelText}</Text>

      <TextInput
        secureTextEntry={props.hidden}
        placeholder={props.placeholder}
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        style={inputStyle}
      />

    </View>
  )

}

const styles = {

  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },

  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }

}

export default Input
