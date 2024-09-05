import React from 'react';
import { Text, SafeAreaView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        style={{borderRadius:20 ,width: 200, height: 200, margin: 20, justifyContent: 'center' }}
        source={require('../images/logo_loteria.jpg')}
      />
      <Text style={{ fontSize: 24,marginTop: 40, fontWeight: 'bold', marginBottom: 20 }}>Trámites Loteria</Text>
      
      <CustomInput title="Usuario" holder=" Ingrese su usuario" />
      <CustomInput title="Contraseña" holder=" Ingrese su contraseña" inputType={2} />

      <CustomButton   
        title="Ingresar"
        onPress={() => navigation.navigate('HomeAgenciero')}  // Navegar a HomeAgenciero
      />

    </SafeAreaView>
  );
};

export default Login;
