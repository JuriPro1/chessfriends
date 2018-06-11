import React from 'react';
import {CardSection, TitledCard} from './common';
import Communications from 'react-native-communications';
import {Text, TouchableOpacity, View} from 'react-native';

const ShowProfile = props => {
  const {name, surname, birthdayYear, isMale, country, phoneNumber, message, title, standard, rapid, blitz} = props
  return (
    <View>
      <TitledCard title="Info">
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Name</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{name}</Text>
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Surname</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{surname}</Text>
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Birthday Year</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{birthdayYear}</Text>
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Sex</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{isMale ? 'Male':'Female'}</Text>
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Country</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{country}</Text>
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Phone Number</Text>
          {message ? <TouchableOpacity onPress={() => Communications.text(phoneNumber)}><Text style={{fontSize: 18, marginLeft: 5, color: 'blue'}}>{phoneNumber}</Text></TouchableOpacity>:<Text style={{fontSize: 18, marginLeft: 5}}>{phoneNumber}</Text>}
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Title</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{title}</Text>
        </CardSection>
      </TitledCard>

      <TitledCard title="FIDE Ratings">
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Standard</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{standard}</Text>
        </CardSection>
        <CardSection style={{justifyContent: 'space-around'}}>
          <Text style={{marginLeft: 5}}>Rapid</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{rapid}</Text>
        </CardSection>
        <CardSection>
          <Text style={{marginLeft: 5}}>Blitz</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{blitz}</Text>
        </CardSection>
      </TitledCard>
    </View>
  )
}

export default ShowProfile;
