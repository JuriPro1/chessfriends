import React from 'react';
import Card from './Card';
import {Text} from 'react-native';

const TitledCard = props => {
  return (
    <Card>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </Card>
  )
}

const styles = {
  title: {
    marginLeft: 7,
    fontSize: 17
  }
}

export default TitledCard;
