import React from 'react';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import {ScrollView, Text, View} from 'react-native';
import {Button, CardSection, TitledCard} from '../components/common';

class OthersAvaScreen extends React.Component {

  showAva() {
    if(this.props.profileToShow) {
      const {available, region, marker, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable} = this.props.profileToShow.Availability
      if(available) {
        return (
          <TitledCard title={'Current Availability'}>
            <CardSection style={{height: 300}}>
              <MapView
                style={{flex: 1}}
                region={region}
              >
                <MapView.Marker coordinate={marker.latlng}/>
                <MapView.Circle
                  center={marker.latlng}
                  radius={radius}
                  fillColor="#rgba(0, 122, 255, 0.1)"
                />
              </MapView>
            </CardSection>
            <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Wait {timeToWait} since {selectedTime} of {selectedDate}</Text>
              <Text style={{fontSize: 18}}>Chess set {chessSetAvailable ? "is":"is NOT"} available</Text>
            </CardSection>
          </TitledCard>
        )
      }
      return (
        <TitledCard title={'Current Availability'}>
          <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>Not currently available to play</Text>
          </CardSection>
        </TitledCard>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader/>
          <ScrollView>
            {this.showAva()}
            <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("showUser")}>GO BACK</Button>
          </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    profileToShow: state.searchR.profileToShow
  }
}

export default connect(mapStateToProps, null)(OthersAvaScreen);
