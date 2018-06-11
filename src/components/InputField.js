import React from 'react';
import {CardSection} from './common';
import {Item, Input, Label} from 'native-base';

const InputField = ({label, numeric, onChangeText, value}) => {
  return (
    <CardSection>
      <Item floatingLabel>
        <Label>{label}</Label>
        {numeric ? <Input onChangeText={onChangeText} value={value} keyboardType={"numeric"}/>:<Input onChangeText={onChangeText} value={value}/>}
      </Item>
    </CardSection>
  )
}

export default InputField;
