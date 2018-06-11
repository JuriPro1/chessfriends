import React from 'react';
import {CardSection, TitledCard} from './common';
import {MapView} from 'expo';
import {Picker} from 'native-base';
import {times} from './strings';
import {Slider, Switch, Text, TouchableOpacity, View} from 'react-native';
import Ask from './Ask';
import {AnswerPressed, DateSelected, DTpClose, DpReq, TpReq, MapPressed, RadValCh, RegionChanged, Switched1, Switched2, TimeSelected, TtwChanged} from '../actions';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

class Availability extends React.Component {

  showMap() {
    if(this.props.available) {
      return (
        <View>
          <CardSection style={{height: 300}}>
            <Text>Select where to play</Text>
            <MapView
              style={{flex: 1}}
              region={this.props.region}
              onRegionChangeComplete={region => {this.props.RegionChanged(region)}}
              onPress={input => {this.props.MapPressed(input.nativeEvent.coordinate)}}
            >
              <MapView.Marker coordinate={this.props.marker.latlng}/>
              <MapView.Circle
                center={this.props.marker.latlng}
                radius={this.props.radius}
                fillColor="#rgba(0, 122, 255, 0.1)"
              />
            </MapView>
          </CardSection>
          <CardSection  style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Available to Move</Text>
            <Switch
              value={this.props.availableToMove}
              onValueChange={value => {this.props.Switched2(value)}}
            />
          </CardSection>
          {this.showSlider()}
          <CardSection style={{height: 150, alignItems: 'center', justifyContent: 'space-around'}}>
            <Text>Wait </Text>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.props.timeToWait}
              onValueChange={value => {this.props.TtwChanged(value)}}
              style={{width: 120}}
            >
              {times.map((time, i) => <Picker.Item label={time} value={time} key={i}/>)}
            </Picker>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text> from </Text>
              <TouchableOpacity onPress={() => {this.props.TpReq()}}>
                <Text style={{color: 'blue'}}>{this.props.selectedTime}</Text>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text>of day </Text>
              <TouchableOpacity onPress={() => {this.props.DpReq()}}>
                <Text style={{color: 'blue'}}>{this.props.selectedDate}</Text>
              </TouchableOpacity>
            </View>
          </CardSection>
          <Ask
            question={"Chess Set Available"}
            value={this.props.chessSetAvailable}
            onPress={() => {this.props.AnswerPressed()}}
            style={{justifyContent: 'center', alignItems: 'center'}}
          />
        </View>
      )
    }
  }

  showSlider() {
    if(this.props.available && this.props.availableToMove) {
      return (
        <CardSection style={{justifyContent: 'center'}}>
          <Slider minimumValue={0} maximumValue={1000} onValueChange={radius => {this.props.RadValCh(radius)}}/>
          <View style={{justifyContent: "space-between",flexDirection: "row"}}>
            <Text>from 0 ...</Text>
            <Text>... to 1000 meters</Text>
          </View>
        </CardSection>
      )
    }
  }

  render() {
    return (
      <TitledCard title={"Current Availability"}>
        <CardSection  style={{alignItems: 'center', justifyContent: 'center'}}>
          <Switch
            value={this.props.available}
            onValueChange={value => {this.props.Switched1(value)}}
          />
        </CardSection>
        {this.showMap()}
        <DateTimePicker
          isVisible={this.props.tpVisible}
          mode={"time"}
          datePickerModeAndroid={'spinner'}
          onConfirm={time => this.props.TimeSelected(time)}
          onCancel={() => {this.props.DTpClose()}}
        />
        <DateTimePicker
          isVisible={this.props.dpVisible}
          mode={"date"}
          datePickerModeAndroid={'spinner'}
          onConfirm={date => this.props.DateSelected(date)}
          onCancel={() => {this.props.DTpClose()}}
        />
      </TitledCard>
    )
  }
}

const mapStateToProps = state => {
  const {available, availableToMove, chessSetAvailable, marker, radius, region, selectedDate, selectedTime, timeToWait, dpVisible, tpVisible} = state.avaR
  return {
    available,
    availableToMove,
    chessSetAvailable,
    marker,
    radius,
    region,
    selectedDate,
    selectedTime,
    timeToWait,
    tpVisible,
    dpVisible,
  }
}// to understand .avaR. see RootReducer

export default connect(mapStateToProps, {
  AnswerPressed,
  DateSelected,
  DpReq,
  DTpClose,
  TpReq,
  MapPressed,
  RadValCh,
  RegionChanged,
  Switched1,
  Switched2,
  TimeSelected,
  TtwChanged
})(Availability);
