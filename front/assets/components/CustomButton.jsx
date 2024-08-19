import React from 'react';
import { Button } from 'react-native-paper';
import { globalTheme } from '../theme/globalTheme';


const CustomButton = ({ title, onPress }) => {
  return (
    <Button mode="contained" onPress={onPress} style={globalTheme.boton}>
      {title}
    </Button>
  );
};


export default CustomButton;