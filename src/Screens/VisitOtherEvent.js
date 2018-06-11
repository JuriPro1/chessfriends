import React from 'react';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import ShowEvent from '../components/ShowEvent';
import {Actions} from 'react-native-router-flux';
import {profilesFetch, SearchManager, partFetch, takePart, declinePart} from '../actions';
import {Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, CardSection, Spinner, TitledCard} from '../components/common';

class VisitOtherEvent extends React.Component {

  componentWillMount() {
    this.props.partFetch(this.props.eventToVisit.evekey)

    if(this.props.eventToVisit.fromevesearch) {
      if(!this.props.fetched) {
        this.props.profilesFetch()
      }
      if(this.props.data && !this.props.noData) this.props.SearchManager(this.props.eventToVisit.uid, this.props.data)
    }

  }

  showManager() {
    if(this.props.eventToVisit.fromevesearch) {
      if(this.props.profileToShow) {
        const {info} = this.props.profileToShow.Profile
        return (
          <Card>
            <CardSection style={{justifyContent: 'center'}}>
              <Text style={{marginLeft: 5}}>Manager</Text>
              <Text style={{fontSize: 18, marginLeft: 5}}>{info.name} {info.surname}</Text>
            </CardSection>
          </Card>
        )
      }
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
  }

  renderPartecipants() {
    if(this.props.partecipants) {
      return (
        <TouchableOpacity onPress={() => Actions.partsList()}>
          <Card>
            <CardSection style={{justifyContent: 'center'}}>
              <Text style={{marginLeft: 5}}>#Partecipants</Text>
              <Text style={{fontSize: 18, marginLeft: 5, color: 'blue'}}>{this.props.partecipants}</Text>
            </CardSection>
          </Card>
        </TouchableOpacity>
      )
    }
    return (
      <Card>
        <CardSection style={{justifyContent: 'center'}}>
          <Text style={{marginLeft: 5}}>#Partecipants</Text>
          <Text style={{fontSize: 18, marginLeft: 5}}>{this.props.partecipants}</Text>
        </CardSection>
      </Card>
    )
  }

  showButtonOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(this.props.partecipating) {
      return  <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.declinePart(this.props.eventToVisit.evekey)}>
                <Text style={{fontSize: 18, color: 'red'}}>DECLINE</Text>
              </Button>
    }
    if(this.props.error=='TAKE PART FAILED' || this.props.error=='DECLINE PART FAILED') {alert(this.props.error)}
    return  <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.takePart(this.props.eventToVisit.evekey)}>
              <Text style={{fontSize: 18}}>PARTECIPATE</Text>
            </Button>
  }

  showEvent() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    if(this.props.eventToVisit) {
      const {name, answer, choice, address, dayStart, rounds, dtdsel, link, evekey} = this.props.eventToVisit
      return (
        <View>
          <ShowEvent
            name={name}
            answer={answer}
            choice={choice}
            address={address}
            dayStart={dayStart}
            rounds={rounds}
            dtdsel={dtdsel}
            link={link}
          />
          {this.renderPartecipants()}
          {this.showManager()}
          {this.showButtonOrSpinner()}
        </View>
      )
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <MyHeader/>
        <ScrollView>
          {this.showEvent()}
          <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.pop()}>GO BACK</Button>
        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const {loading, fetched, data, noData, profileToShow, eventToVisit, partecipating, error, partecipants} = state.searchR
  return {loading, fetched, data, noData, profileToShow, eventToVisit, partecipating, error, partecipants}
}

export default connect(mapStateToProps, {profilesFetch, SearchManager, partFetch, takePart, declinePart})(VisitOtherEvent);
