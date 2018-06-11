import React from 'react';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import ShowEvent from '../components/ShowEvent';
import {Actions} from 'react-native-router-flux';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, CardSection, Spinner, TitledCard} from '../components/common';
import {partFetch, takePart, declinePart, ModifyEvent, RemoveEvent, confirmRemove, DeclineRemove, FromMyEvent} from '../actions';


class VisitEvent extends React.Component {

  componentWillMount() {
    this.props.partFetch(this.props.evekey)
  }

  renderPartecipants() {
    if(this.props.partecipants) {
      return (
        <TouchableOpacity onPress={() => this.props.FromMyEvent(true)}>
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

  renderButtonsOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    return (
      <View>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => {
          this.props.partecipating ? this.props.declinePart(this.props.evekey):this.props.takePart(this.props.evekey)
        }}>
          {this.props.partecipating ? "DECLINE":"PARTECIPATE"}
        </Button>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.ModifyEvent()}>EDIT</Button>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => this.props.RemoveEvent()}>DELETE</Button>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => Actions.popTo("events")}>GO BACK</Button>
      </View>
    )
  }

  showAlert() {
    if(this.props.showWindow) {
      Alert.alert(
        'Alert',
        'WANT TO DELETE IT ?',
        [
          {text: 'NO', onPress: () => this.props.DeclineRemove()},
          {text: 'YES', onPress: () => {
            this.props.confirmRemove(this.props.evekey, this.props.partecipants)}}
        ],
        { cancelable: false }
      )
    }
  }

  showError() {
    if(this.props.error== 'TAKE PART FAILED'
      || this.props.error == 'DECLINE PART FAILED'
      //|| this.props.error == 'REMOVE PARTECIPANTS FAILED'
      || this.props.error == 'REMOVE EVENT FAILED') {
      alert(this.props.error)
    }
  }

  render() {

    const {name, answer, choice, address, dayStart, rounds, dtdsel, link} = this.props

    return (
      <View style={{flex: 1}}>
        <MyHeader quit/>
        <ScrollView>
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
          {this.renderButtonsOrSpinner()}
        </ScrollView>
        {this.showAlert()}
        {this.showError()}
      </View>
    )

  }
}

const mapStateToProps = state => {
  const {name, answer, choice, address, dayStart, rounds, dtdsel, link, loading, error, evekey, showWindow, partecipants, partecipating} = state.eveR
  return {name, answer, choice, address, dayStart, rounds, dtdsel, link, loading, error, evekey, showWindow, partecipants, partecipating}
}

export default connect(mapStateToProps, {partFetch, takePart, declinePart, ModifyEvent, RemoveEvent, confirmRemove, DeclineRemove, FromMyEvent})(VisitEvent);
