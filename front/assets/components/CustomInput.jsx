import * as React from 'react';
import { TextInput } from 'react-native';
import { globalTheme } from '../theme/globalTheme';

const CustomInput = ({title, holder, inputType}) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label={title}
      value={text}
      placeholder= {holder}
      onChangeText={text => setText(text)}
      style = {globalTheme.input}
      secureTextEntry = {inputType === 2}
    />
  );
};

export default CustomInput;