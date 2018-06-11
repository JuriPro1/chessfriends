import React from 'react';
import {Form} from 'native-base';
import {connect} from 'react-redux';
import {TitledCard} from './common';
import InputField from './InputField';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {StandardChanged, RapidChanged, BlitzChanged} from '../actions';

class RatingSection extends React.Component {

  render() {
    return (
      <TitledCard title={"FIDE Ratings"}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingLeft: 5}}>Do not remember?</Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://ratings.fide.com/search.phtml?search="+this.props.surname+"+"+this.props.name).catch(() => {return null})}>
            <Text style={{color: 'blue'}}> Search here</Text>
          </TouchableOpacity>
        </View>
        <Form>
          <InputField label={"Standard"} numeric onChangeText={standard=> {this.props.StandardChanged(standard)}} value={this.props.standard}/>
          <InputField label={"Rapid"} numeric onChangeText={rapid=> {this.props.RapidChanged(rapid)}} value={this.props.rapid}/>
          <InputField label={"Blitz"} numeric onChangeText={blitz=> {this.props.BlitzChanged(blitz)}} value={this.props.blitz}/>
        </Form>
      </TitledCard>
    )
  }
}

const mapStateToProps = state => {
  const { standard, rapid, blitz } = state.ratingR
  const { name, surname } = state.infoR
  return { standard, rapid, blitz, name, surname }
}

export default connect(mapStateToProps, {StandardChanged, RapidChanged, BlitzChanged})(RatingSection);
