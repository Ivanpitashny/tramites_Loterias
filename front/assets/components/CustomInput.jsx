import * as React from 'react';
import { TextInput } from 'react-native';
import { globalTheme } from '../theme/globalTheme';

const CustomInput = ({ title, holder, inputType, value, onChangeText }) => {
  return (
    <TextInput
      label={title}
      value={value}
      placeholder={holder}
      onChangeText={onChangeText}
      style = {globalTheme.input}
      secureTextEntry = {inputType === 2}
    />
  );
};

export default CustomInput;