import React from 'react';
import {Button, Footer, FooterTab, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';

const MyFooter = ({home, navigate, search, trophy, person}) => {
  return (
    <Footer>
      <FooterTab>
        <Button active={home} onPress={() => Actions.main()}>
          <Icon active={home} name="home"/>
        </Button>
        <Button active={navigate} onPress={() => Actions.ava()}>
          <Icon active={navigate} name="navigate"/>
        </Button>
        <Button active={search} onPress={() => Actions.search()}>
          <Icon active={search} name="search"/>
        </Button>
        <Button active={trophy} onPress={() => Actions.events()}>
          <Icon active={trophy} name="trophy"/>
        </Button>
        <Button active={person} onPress={() => Actions.profile()}>
          <Icon active={person} name="person"/>
        </Button>
      </FooterTab>
    </Footer>
  )
}

export default MyFooter;
