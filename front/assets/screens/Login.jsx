import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, SafeAreaView, Image, Platform, Pressable, Dimensions , StyleProp, ViewStyle} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../components/config';
import { TextInput, Card } from 'react-native-paper';


const Login = ({ navigation }) => {
  const{width, height} = Dimensions.get('screen')
  const[usuario, setUsuario]= useState('');
  const[contrasenia, setContrasenia]= useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

        setErrorMessage('');

        await AsyncStorage.setItem('authToken', data.jwToken);
        const storedToken = await AsyncStorage.getItem('authToken');

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
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <Pressable style= {{flex:1}} onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image 
            style={{borderRadius:20 ,width: width*0.5, height: height*0.25, margin: 20, justifyContent: 'center' }}
            source={require('../images/logo_loteria.jpg')}
          />
          <Text style={{ fontSize: 24,marginTop: 40, fontWeight: 'bold', marginBottom: 20 }}>Trámites Loteria</Text>
          <Card style={{ padding: 16, height: height*0.3}}>
            <Card.Content>
              <TextInput 
              label="Usuario" 
              mode='outlined'
              holder="Ingrese su usuario" 
              value={usuario}
              onChangeText={text => setUsuario(text)}
              style={{marginBottom:16, borderRadius: 100}}
              activeOutlineColor= "#ff5a00"
            />

            <TextInput 
              label="Contraseña" 
              holder="Ingrese su contraseña" 
              mode='outlined'
              value={contrasenia}
              onChangeText={text => setContrasenia(text)} 
              style={{marginBottom:16}}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"}  // Cambia el ícono entre "eye" y "eye-off"
                  onPress={() => setShowPassword(!showPassword)}  // Cambia el estado al hacer clic
                />}
                activeOutlineColor= "#ff5a00"
            />

          <CustomButton   
            title="Ingresar"
            onPress={handleLogin}  // Navegar a HomeAgenciero
          />

          {errorMessage ? (
            <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
          ) : null}
            </Card.Content>
          </Card>
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Login;
