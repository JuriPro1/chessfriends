import React from 'react';
import { View } from 'react-native';

const CardSection = props => {

  return (
    <View style = {[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  )
//style prop can take an array as input, and it will
//be applied in succession (overwriting included)
}

const styles = {

  containerStyle: {
    height: 65,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    borderColor: '#ddd',
    position: 'relative'
  }

}

export default CardSection
