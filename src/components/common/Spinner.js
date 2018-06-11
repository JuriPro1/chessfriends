import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = props => {

  return (
    <View style={[styles.spinnerContainer, props.style]}>
      <ActivityIndicator size={props.dim || 'large'}/>
    </View>
  )

}

const styles = {

  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

}

export default Spinner
