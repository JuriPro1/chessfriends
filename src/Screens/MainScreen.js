import React from 'react';
import {connect} from 'react-redux';
import {recreqFetch} from '../actions';
import {Badge, Icon} from 'native-base';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import {Actions} from 'react-native-router-flux';
import {Text, TouchableOpacity, View} from 'react-native';

class MainScreen extends React.Component {

  componentWillMount() {
    this.props.recreqFetch()
  }

  renderBadge() {
    if(this.props.recreq) {
      return (
        <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: '#00ccdd', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}
        onPress={() => Actions.reqsList()}>
          <Icon name="ios-person-add"/>
          <Badge>
            <Text>{this.props.recreq.length}</Text>
          </Badge>
        </TouchableOpacity>
      )
    }
    return (
      <Text style={{fontSize: 18}}>
        Hello World !
      </Text>
    )
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <MyHeader quit/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.renderBadge()}
        </View>
        <MyFooter home/>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {recreq: state.searchR.recreq}
}

export default connect(mapStateToProps, {recreqFetch})(MainScreen);
