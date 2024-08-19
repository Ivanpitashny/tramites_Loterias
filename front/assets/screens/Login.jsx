import React from 'react'
import { Text, SafeAreaView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export const Login = () => {
  return (
    <SafeAreaView>
      <Image 
      style = {{width: 200, height: 200, margin: 20, justifyContent:'center'}}
      source = {require('../images/logo_loteria.jpg')}
        />
        <Text> Tramites </Text>
        

        <CustomInput title = {"Usuario"} holder={"Usuario"}/>
        <CustomInput title={"Contraseña"} holder={'Contraseña'} inputType={2}/>
        <CustomButton   
        title={"ingresar"}
        onPress={() => alert('texto guardado')}
        />
    </SafeAreaView>
  )
}
