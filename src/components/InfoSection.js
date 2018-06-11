import React from 'react';
import {Text, View} from 'react-native';
import {CardSection, TitledCard} from './common';
import {Form, Picker} from 'native-base';
import {MT, WT, countries} from './strings';
import InputField from './InputField';
import Choice from './Choice';
import {connect} from 'react-redux';
import {NameChanged, SurnameChanged, YearChanged, SexSel, CountryChanged, PhoneChanged, TitleChanged} from '../actions';

class InfoSection extends React.Component {

  renderTitles() {
    if(this.props.isMale) {
      return (
        <Picker
          iosHeader="Select one"
          mode="dropdown"
          selectedValue={this.props.title}
          onValueChange={title => {this.props.TitleChanged(title)}}
        >
          {MT.map((title, i) => <Picker.Item label={title} value={title} key={i}/>)}
        </Picker>
      )
    }
    return (
      <Picker
        iosHeader="Select one"
        mode="dropdown"
        selectedValue={this.props.title}
        onValueChange={title => {this.props.TitleChanged(title)}}
      >
        {WT.map((title, i) => <Picker.Item label={title} value={title} key={i}/>)}
      </Picker>
    )
  }

  renderCountries() {
    return (
      <Picker
        iosHeader="Select one"
        mode="dropdown"
        selectedValue={this.props.country}
        onValueChange={country => {this.props.CountryChanged(country)}}
      >
        {countries.map((country, i) => <Picker.Item label={country} value={country} key={i}/>)}
      </Picker>
    )
  }

    render() {
      return (
        <View>
          <TitledCard title={"Info"}>
            <Form>
              <InputField label={"Name"} onChangeText={name=> {this.props.NameChanged(name)}} value={this.props.name}/>

              <InputField label={"Surname"} onChangeText={surname=> {this.props.SurnameChanged(surname)}}  value={this.props.surname}/>

              <InputField label={"Birthday Year"} numeric onChangeText={birthdayYear=> {this.props.YearChanged(birthdayYear)}} value={this.props.birthdayYear}/>

              <Choice
                booleano={this.props.isMale}
                onPress={() => {this.props.SexSel(!this.props.isMale)}}
                t1="Male"
                t2="Female"
              />

              <CardSection>
                <Text style={{marginLeft: 5}}>Country</Text>
                {this.renderCountries()}
              </CardSection>

              <InputField label={"Phone Number"} onChangeText={phoneNumber=> {this.props.PhoneChanged(phoneNumber)}} value={this.props.phoneNumber}/>
            </Form>
          </TitledCard>

          <TitledCard title={"FIDE Title"}>
            <CardSection>
              {this.renderTitles()}
            </CardSection>
          </TitledCard>
        </View>
      )
    }

}

const mapStateToProps = state => {
  const {name, surname, birthdayYear, isMale, country, phoneNumber, title} = state.infoR
  return {
    name,
    surname,
    birthdayYear,
    isMale,
    country,
    phoneNumber,
    title
  }
}

export default connect (mapStateToProps, {NameChanged, SurnameChanged, YearChanged, SexSel, CountryChanged, PhoneChanged, TitleChanged})(InfoSection);
