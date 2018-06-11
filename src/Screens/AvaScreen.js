import React from 'react';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import {avaFetch} from '../actions';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import {Actions} from 'react-native-router-flux';
import {ScrollView, Text, View} from 'react-native';
import {Button, Card, CardSection, Spinner, TitledCard} from '../components/common';

class AvaScreen extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.avaFetch()
    }
  }

  renderDataorSpinner() {
    const {loading, noData} = this.props
    if(loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if (noData) {
      return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Card>
            <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>No Data</Text>
            </CardSection>
          </Card>
          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.editAva()}>EDIT</Button>
        </View>
      )
    }
    return (
      <ScrollView>
        {this.showAva()}
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.editAva()}>EDIT</Button>
      </ScrollView>
    )
  }

  showAva() {
    const {available, region, marker, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable} = this.props
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

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader quit/>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {this.renderDataorSpinner()}
          <MyFooter navigate/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {loading, fetched, available, region, marker, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable, noData} = state.avaR
  return {loading, fetched, available, region, marker, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable, noData}
}

export default connect (mapStateToProps, {avaFetch})(AvaScreen);
