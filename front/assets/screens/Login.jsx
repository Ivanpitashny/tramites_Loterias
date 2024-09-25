import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, SafeAreaView, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../components/config';


const Login = ({ navigation }) => {

  const[usuario, setUsuario]= useState('');
  const[contrasenia, setContrasenia]= useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {

    //console.log('Datos enviados: ',{usuario,contrasenia});

    try {
      const response = await fetch(`${BASE_URL}/v1/authenticate`, { //cambiar segun la ip de cada uno
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

       // Verificar si la respuesta es exitosa
       if (response.ok) {
        const data = await response.json();
        // Limpiar el mensaje de error si la autenticación es exitosa
        setErrorMessage('');
        // Guardar el token o redirigir al usuario a otra pantalla
        //console.log('Success:', data.jwToken);

        await AsyncStorage.setItem('authToken', data.jwToken);
        const storedToken = await AsyncStorage.getItem('authToken');
        //console.log('Token almacenado:', storedToken);

        try {
          const decodedToken = jwtDecode(storedToken);
        //console.log('Token decodificado:', decodedToken);
        if ( decodedToken.rol && decodedToken.rol.authority === 'ROLE_ADMINISTRADOR') {
          navigation.navigate('HomeAdministrador');
        }else{
          navigation.navigate('HomeAgenciero');
        }
        } catch (decodeError) {
          console.error('Error al decodificar el token:', decodeError);
          setErrorMessage('Error al decodificar el token.');
        }
  
      } else if (response.status === 401) {
        // Si la respuesta es 401, mostrar el mensaje de credenciales incorrectas
        setErrorMessage('Usuario o contraseña incorrectos.');
      } else {
        // Para otros errores
        setErrorMessage('Ocurrió un error. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error en la conexión con el servidor.');
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

          {errorMessage ? (
            <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
          ) : null}

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
