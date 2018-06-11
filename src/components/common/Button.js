import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, children, style}) => {

  const {buttonStyle, textStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}> {children} </Text>
    </TouchableOpacity>
  )

}

const styles = {

  buttonStyle: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00ccdd',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },

  textStyle: {
    alignSelf: 'center',
    color: '#00ccdd',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10
  }

}

export default Button
