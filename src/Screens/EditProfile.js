import React from 'react';
import {connect} from 'react-redux';
import {addUserInfo} from '../actions';
import {ScrollView} from 'react-native';
import MyHeader from '../components/MyHeader';
import {Container, Content} from 'native-base';
import InfoSection from '../components/InfoSection';
import {Button, Spinner} from '../components/common';
import RatingSection from '../components/RatingSection';

class EditProfile extends React.Component {

  renderButtonOrSpinner() {
    if(this.props.loading) {
      return <Spinner dim='large' style={{marginTop: 10, marginBottom: 10}}/>
    }
    return <Button style={{marginTop: 10, marginBottom: 10}} onPress={this.sendInfo.bind(this)}>SAVE</Button>
  }

  sendInfo() {
    this.props.addUserInfo({
      ...this.myInfoSection.selector.props,
      ...this.myRatingSection.selector.props,
      idUser: this.props.user.uid
    })
  }

  showError() {
    if(this.props.error=='ADD INFO FAILED') {
      alert(this.props.error)
    }
  }

  render() {
    return (
      <Container>
        <MyHeader/>
        <Content>
          <ScrollView>
            <InfoSection ref={(ref) => this.myInfoSection = ref}/>
            <RatingSection ref={(ref) => this.myRatingSection = ref}/>
            {this.renderButtonOrSpinner()}
            {this.showError()}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {error, loading} = state.editproR
  return {
    error,
    loading,
    user: state.authR.user
  }
}

export default connect(mapStateToProps,{addUserInfo})(EditProfile);
