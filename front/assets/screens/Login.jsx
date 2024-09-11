import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, SafeAreaView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const Login = ({ navigation }) => {

  const[usuario, setUsuario]= useState('');
  const[contrasenia, setContrasenia]= useState('');
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleLogin = async () => {

    console.log('Datos enviados: ',{usuario,contrasenia});

    try {
      const response = await fetch('http://10.168.128.116:8080/v1/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          contrasenia,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error de autenticación");
      }
  
      const data = await response.json();
      console.log('Success:', data);

      await AsyncStorage.setItem('authToken', data.token);

      navigation.navigate('HomeAgenciero');
    } catch (error) {
      console.error('Error:', error);
      // Display an error message to the user
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        style={{borderRadius:20 ,width: 200, height: 200, margin: 20, justifyContent: 'center' }}
        source={require('../images/logo_loteria.jpg')}
      />
      <Text style={{ fontSize: 24,marginTop: 40, fontWeight: 'bold', marginBottom: 20 }}>Trámites Loteria</Text>
      
      <CustomInput 
        title="Usuario" 
        holder="Ingrese su usuario" 
        value={usuario}
        onChangeText={text => setUsuario(text)}
      />

      <CustomInput 
        title="Contraseña" 
        holder="Ingrese su contraseña" 
        inputType={2} 
        value={contrasenia}
        onChangeText={text => setContrasenia(text)} 
      />

      <CustomButton   
        title="Ingresar"
        onPress={handleLogin}  // Navegar a HomeAgenciero
      />

    </SafeAreaView>
  );
};

export default Login;
