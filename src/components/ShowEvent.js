import React from 'react';
import {CardSection, TitledCard} from './common';
import {Linking, Text, TouchableOpacity, View} from 'react-native';

const ShowEvent = ({name, answer, choice, address, dayStart, rounds, dtdsel, link}) => {
  return (
    <TitledCard title='Description'>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>Name</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{name}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>Official</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{answer ? "Yes":"No"}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>Type</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{choice ? "Standard":"Rapid/Blitz"}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>Address</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{address}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>Starts</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{dayStart}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>#Rounds</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{rounds}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center'}}>
        <Text style={{marginLeft: 5}}>#Double Turn Days</Text>
        <Text style={{fontSize: 18, marginLeft: 5}}>{dtdsel}</Text>
      </CardSection>
      <CardSection style={{justifyContent: 'center', height: 100}}>
        <Text style={{marginLeft: 5}}>Subscription Link</Text>
        <TouchableOpacity onPress={() => Linking.openURL(link).catch(() => {
          alert("Incorrect link, mistake of the organizer.")
          return null
        })}>
          <Text style={{fontSize: 18, marginLeft: 5, color: 'blue'}}>{link}</Text>
        </TouchableOpacity>
      </CardSection>
    </TitledCard>
  )
}

export default ShowEvent;
