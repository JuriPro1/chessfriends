import React from 'react';
import {connect} from 'react-redux';
import {addAvaInfo} from '../actions';
import {ScrollView} from 'react-native';
import MyHeader from '../components/MyHeader';
import {Container, Content} from 'native-base';
import {Button, Spinner} from '../components/common';
import Availability from '../components/Availability';

class EditAva extends React.Component {

  renderButtonOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    return <Button style={{marginTop: 10, marginBottom: 10}} onPress={this.sendInfo.bind(this)}>SAVE</Button>
  }

  sendInfo() {
    const {available, region, marker, availableToMove, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable} = this.props
    this.props.addAvaInfo({
      available, region, marker, availableToMove, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable
    })
  }

  showError() {
    if(this.props.error=='ADD AVA INFO FAILED') {
      alert(this.props.error)
    }
  }

  render() {
    return (
      <Container>
        <MyHeader/>
        <Content>
          <ScrollView>
            <Availability/>
            {this.renderButtonOrSpinner()}
            {this.showError()}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {available, region, marker, availableToMove, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable, loading, error} = state.avaR
  return {
    available, region, marker, availableToMove, radius, timeToWait, selectedTime, selectedDate, chessSetAvailable, loading, error
  }
}

export default connect(mapStateToProps,{addAvaInfo})(EditAva);
