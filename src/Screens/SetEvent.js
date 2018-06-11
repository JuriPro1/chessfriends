import React from 'react';
import Ask from '../components/Ask';
import {connect} from 'react-redux';
import Choice from '../components/Choice';
import MyHeader from '../components/MyHeader';
import {Actions} from 'react-native-router-flux';
import InputField from '../components/InputField';
import {Rounds, doubleturndays} from '../components/strings';
import {Container, Content, Form, Picker} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, TitledCard, CardSection, Spinner} from '../components/common';
import {EventNameChanged, AnswerChanged, ChoiceChanged, AddressChanged, DpCall, RoundsChanged, DtdChanged, LinkChanged, DPicked, DpHidden, addEvent, editEvent} from '../actions';

class SetEvent extends React.Component {

  renderButtonOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    const {name, answer, choice, address, dayStart, rounds, dtdsel, link, dpVisible, evekey, modify, create} = this.props
    const DataToPush = {name, answer, choice, address, dayStart, rounds, dtdsel, link}
    return (
      <View>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => {
          if(create) {
            this.props.addEvent(DataToPush)
          }
          if(modify) {
            this.props.editEvent(evekey, DataToPush)
          }
        }}>
          {this.showButtonText()}
        </Button>
        <Button style={{marginTop: 10, marginBottom: 10}} onPress={() => {
          if(create) {Actions.popTo("events")}
          if(modify) {Actions.popTo("specevent")}
        }}>GO BACK</Button>
      </View>
    )
  }

  showButtonText() {
    const {create, modify} = this.props
    if(create) return 'SAVE'
    if(modify) return 'SAVE CHANGES'
    return 'wait...'
  }

  showError() {
    if(this.props.error=='ADD EVENT FAILED'||this.props.error=='EDIT EVENT FAILED') {
      alert(this.props.error)
    }
  }

  render() {
    return(
      <Container>
        <MyHeader/>
        <Content>
          <ScrollView>
            <TitledCard title={"Description"}>
              <Form>
                <InputField label={"Event Name"} onChangeText={name => {this.props.EventNameChanged(name)}} value={this.props.name}/>
                <Ask
                  question={"Elo Variation"}
                  value={this.props.answer}
                  onPress={() => {this.props.AnswerChanged()}}
                  style={{justifyContent: 'center'}}
                />
                <Choice
                  booleano={this.props.choice}
                  onPress={() => {this.props.ChoiceChanged()}}
                  t1="Standard"
                  t2="Rapid/Blitz"
                />
                <InputField label={"Address"} onChangeText={address => {this.props.AddressChanged(address)}} value={this.props.address}/>

                <CardSection style={{justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, marginLeft: 5}}>Starting Day </Text>
                    <TouchableOpacity onPress={() => {this.props.DpCall()}}>
                      <Text style={{color: 'blue', fontSize: 18, marginLeft: 5}}>{this.props.dayStart}</Text>
                    </TouchableOpacity>
                  </View>
                </CardSection>

                <CardSection style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <View>
                    <Text style={{fontSize: 18, marginLeft: 5}}>Rounds</Text>
                    <Picker
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.props.rounds}
                      onValueChange={value => {this.props.RoundsChanged(value)}}
                      style={{width: 120}}
                    >
                      {Rounds.map((number, i) => <Picker.Item label={number} value={number} key={i}/>)}
                    </Picker>
                  </View>
                  <View>
                    <Text style={{fontSize: 18, marginLeft: 5}}>Double Turn Days</Text>
                    <Picker
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.props.dtdsel}
                      onValueChange={value => {this.props.DtdChanged(value)}}
                      style={{width: 120}}
                    >
                      {
                          doubleturndays.slice(0, Math.floor(Number(this.props.rounds)/2)+1)
                            .map((number, i) => <Picker.Item label={number} value={number} key={i}/>)
                      }
                    </Picker>
                  </View>
                </CardSection>

                <InputField label={"Subscription Link"} onChangeText={link => {this.props.LinkChanged(link)}} value={this.props.link}/>

                <DateTimePicker
                  isVisible={this.props.dpVisible}
                  mode={"date"}
                  datePickerModeAndroid={'spinner'}
                  onConfirm={date => this.props.DPicked(date)}
                  onCancel={() => {this.props.DpHidden()}}
                />
              </Form>
            </TitledCard>
            {this.renderButtonOrSpinner()}
            {this.showError()}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {name, answer, choice, address, dayStart, rounds, dtdsel, link, dpVisible, loading, error, evekey, modify, create} = state.eveR
  return {
    name,
    answer,
    choice,
    address,
    dayStart,
    rounds,
    dtdsel,
    link,
    dpVisible,
    loading,
    error,
    evekey,
    modify,
    create
  }
}

export default connect(mapStateToProps, {EventNameChanged, AnswerChanged, ChoiceChanged, AddressChanged, DpCall, RoundsChanged, DtdChanged, LinkChanged, DPicked, DpHidden, addEvent, editEvent})(SetEvent);
