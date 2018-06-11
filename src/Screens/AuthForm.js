import React from 'react';
import {View, Text} from 'react-native';
import MyHeader from '../components/MyHeader';
import {Button, Card, CardSection, Input, Spinner} from '../components/common';
import {EmailChanged, PasswordChanged, loginUser, signinUser} from '../actions';
import {connect} from 'react-redux';

class AuthForm extends React.Component {

  onEmailChange(text){
    this.props.EmailChanged(text)
  }

  onPasswordChange(text){
    this.props.PasswordChanged(text)
  }

  renderError(){
    if(this.props.error){
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  renderButtonsOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    return (
      <View>
        <Button onPress={this.onLogPress.bind(this)}>
          LOG IN
        </Button>
        <Button onPress={this.onSignPress.bind(this)}>
          SIGN IN
        </Button>
      </View>
    )
  }

  onLogPress(){
    const {email, password} = this.props

    this.props.loginUser({email, password})
  }

  onSignPress(){
    const {email, password} = this.props

    this.props.signinUser({email, password})
  }

  render(){

    console.ignoredYellowBox = ['Setting a timer']
    //unofficial solution for yellow warning on the app

    return(
      <View>

        <MyHeader/>

        <Card>

          <CardSection>
            <Input
              labelText="Email"
              placeholder="email"
              onChangeText={this.onEmailChange.bind(this)}
            />
          </CardSection>

          <CardSection>
            <Input
              hidden
              labelText="Password"
              placeholder="password"
              onChangeText = {this.onPasswordChange.bind(this)}
            />
          </CardSection>

          {this.renderError()}

          <CardSection style={{height: 140, justifyContent: 'space-around'}}>
            {this.renderButtonsOrSpinner()}
          </CardSection>

        </Card>

      </View>
    )
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = state => {
  return {
    email: state.authR.email,
    password: state.authR.password,
    loading: state.authR.loading,
    error: state.authR.error
  }
}// to understand .authR. see RootReducer

export default connect(mapStateToProps, {
  EmailChanged, PasswordChanged, loginUser, signinUser
})(AuthForm);
