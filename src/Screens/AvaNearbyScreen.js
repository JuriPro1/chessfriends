import React from 'react';
import geolib from 'geolib';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import {Slider, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection, Spinner, TitledCard} from '../components/common';
import {profilesFetch, NewRegion, NewMarker, NewRadius, ShowOthersProfile} from '../actions';

class AvaNearbyScreen extends React.Component {

  componentWillMount() {
    if(!this.props.fetched || this.props.noData) {
      this.props.profilesFetch()
    }
  }

  renderComponentsOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }

    if(this.props.fetched && !this.props.noData) {
      return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <TitledCard title="Others Availability">
            <CardSection style={{height: 350}}>
              <Text>Select where to play</Text>
              {this.renderCorrectMap()}
            </CardSection>
            {this.showSlider()}
          </TitledCard>
          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("search")}>GO BACK</Button>
        </View>
      )
    }
    if(this.props.fetched && this.props.noData) {
      return (
        <Card>
          <CardSection style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>No one gives his availability yet.</Text>
          </CardSection>
        </Card>
      )
    }
  }

  renderCorrectMap() {
    if(!this.props.mapPressed) {
      return (
        <MapView
          style={{flex: 1}}
          region={this.props.region}
          onRegionChangeComplete={region => this.props.NewRegion(region)}
          onPress={input => {this.props.NewMarker(input.nativeEvent.coordinate)}}
        />
      )
    }
    const thekeys = Object.keys(this.props.data)
    const source = Object.values(this.props.data)
    for(obj in source) {
      source[obj]["profkey"]=thekeys[obj]
    }
    const coords = {latitude: this.props.marker.latlng.latitude, longitude: this.props.marker.latlng.longitude}
    const latlng = {latlng: coords}
    const marker = {marker: latlng}
    const Availability = {Availability: marker}
    source.push(Availability)
    return (
      <MapView
        style={{flex: 1}}
        region={this.props.region}
        onRegionChangeComplete={region => this.props.NewRegion(region)}
        onPress={input => {this.props.NewMarker(input.nativeEvent.coordinate)}}
      >
        {
          source.map((element, i) => {
            if(element["Availability"] && this.props.mapPressed) {
              const distance = Math.abs(geolib.getDistance(element["Availability"]["marker"]["latlng"], this.props.marker.latlng))
              if(distance <=this.props.radius) {
                if(distance==0) {
                  return <MapView.Marker coordinate={this.props.marker.latlng} pinColor={"#00ccdd"} key={i}/>
                }
                if(element["Availability"]["available"]) {
                  return <MapView.Marker
                          coordinate={element["Availability"]["marker"]["latlng"]}
                          title={element["Availability"]["timeToWait"]+" from "+element["Availability"]["selectedTime"]+" of "+element["Availability"]["selectedDate"]}
                          description={"click to show Profile"}
                          onCalloutPress={() =>this.props.ShowOthersProfile(element)}
                          key={i}/>
                }
              }
            }
          })
        }
        <MapView.Circle
          center={this.props.marker.latlng}
          radius={this.props.radius}
          fillColor="#rgba(0, 122, 255, 0.1)"
        />
      </MapView>
    )
  }

  showSlider() {
    if(this.props.mapPressed) {
      return (
        <CardSection>
          <Slider minimumValue={0} maximumValue={1000} onValueChange={radius => this.props.NewRadius(radius)}/>
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
      <View style={{flex: 1}}>
        <MyHeader/>
        {this.renderComponentsOrSpinner()}
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {loading, fetched, data, noData, region, mapPressed, marker, radius} = state.searchR
  return {region, marker, radius, loading, fetched, data, noData, region, mapPressed, marker, radius}
}

export default connect(mapStateToProps, {profilesFetch, NewRegion, NewMarker, NewRadius, ShowOthersProfile})(AvaNearbyScreen);
