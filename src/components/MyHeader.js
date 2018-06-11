import React from 'react';
import {connect} from 'react-redux';
import {Alert, StatusBar, Text, View} from 'react-native';
import {Button, Header, Right, Spinner} from 'native-base';
import {logoutUser, logoutUserConfirmed, logoutUserAborted} from '../actions';

class MyHeader extends React.Component {

  renderButtonOrSpinner() {
    if(this.props.loading) {
      return (
        <Spinner color='white'/>
      )
    }
    return (
      <Button onPress={() => this.props.logoutUser()}>
        <Text style={{color: 'white'}}>
          QUIT
        </Text>
      </Button>
    )
  }

  showAlert() {
    if(this.props.showAlert) {
      Alert.alert(
        'Alert',
        'WANT TO LOG OUT ?',
        [
          {text: 'NO', onPress: () => this.props.logoutUserAborted()},
          {text: 'YES', onPress: () => this.props.logoutUserConfirmed()},
        ],
        { cancelable: false }
      )
    }
  }

  renderError() {
    if(this.props.error=="LOG OUT FAILED") {
      alert(this.props.error)
    }
  }

  render() {
    if(this.props.quit) {
      return (
        <View>
          <Header style={{marginTop: StatusBar.currentHeight}}>
            <Right>
              {this.renderButtonOrSpinner()}
            </Right>
          </Header>
          {this.showAlert()}
          {this.renderError()}
        </View>
      )
    }
    return (
      <Header style={{marginTop: 24}}/>
    )
  }

}

const mapStateToProps = state => {
  return {
    loading: state.authR.loading,
    error: state.authR.error,
    showAlert: state.authR.showAlert
  }
}

export default connect (mapStateToProps, {
  logoutUser, logoutUserConfirmed, logoutUserAborted
})(MyHeader);
