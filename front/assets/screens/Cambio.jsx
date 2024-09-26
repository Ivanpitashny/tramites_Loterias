import React, { useState } from 'react';
import { View, StyleSheet,Image,Text, ScrollView, Dimensions } from 'react-native';
// import { Feather } from '@expo/vector-icons';
import { TextInput, Button, IconButton, Card, Title } from 'react-native-paper';

const Cambio = ({route, navigation}) => {
  const { tipo } = route.params;
  const{width, height} = Dimensions.get('screen');
  const [step, setStep] = useState(1);
  const[nombre, setNombre]= useState('');
  const[nroDoc, setNroDoc]= useState('');

  const nextStep = () =>{
    setStep(step+1);
  };

  const prevStep = () =>{
    setStep(step-1);
  };

  const tipoTramite = (tipo) => {
    if (tipo == 1) {
      return'Domicilio';
    }else{
      return 'Titular';
    }
  };
  return (
    <View style={styles.container}>
        {/* Logo y Título */}
        <View style={styles.header}>
                    {/* <Feather name="chevron-left" size={24} color="black" onPress={BackHandler} style={styles.logoutIcon}/> */}
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inicio Tramite</Text>  
                </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Cambio de {tipoTramite(tipo)}</Title>
            <ScrollView style={{height: height*0.35}}>
            <TextInput
              label="Nombre Completo"
              value={nombre}
              mode="outlined"
              style={styles.input}
              onChangeText={text => setNombre(text)} 
              activeOutlineColor= "#ff5a00"
            />

            <TextInput
              label="N° Documento"
              value={nroDoc}
              mode="outlined"
              style={styles.input}
              onChangeText={text => setNroDoc(text)} 
              activeOutlineColor= "#ff5a00"
            />
            <TextInput
              label="N° Permiso del Usuario"
              value=""
              mode="outlined"
              style={styles.input}
              activeOutlineColor= "#ff5a00"
            />
            <TextInput
              label="N° Registro (Nuevo Titular)"
              value=""
              mode="outlined"
              style={styles.input}
              activeOutlineColor= "#ff5a00"
            />
            <TextInput
              label="N° Registro (Nuevo Titular)"
              value=""
              mode="outlined"
              style={styles.input}
              activeOutlineColor= "#ff5a00"
            />
            <TextInput
              label="N° Registro (Nuevo Titular)"
              value=""
              mode="outlined"
              style={styles.input}
              activeOutlineColor= "#ff5a00"
            />
            <TextInput
              label="N° Registro (Nuevo Titular)"
              value=""
              mode="outlined"
              style={styles.input}
              activeOutlineColor= "#ff5a00"
            />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <IconButton
                icon="paperclip"
                size={20}
                onPress={() => {}}
              />
              <IconButton
                icon="check"
                size={20}
                onPress={() => {}}
              />
            </View>
          {/* </View> */}
          <Button 
                    mode="contained"
                    style={styles.newTramiteButton}
                    buttonColor="#ff5a00" 
                    textColor="#fff"  >
                    SIGUENTE
                </Button>
          <Button mode="outlined" onPress={() => navigation.navigate("HomeAgenciero")} style={styles.button}>
            CANCELAR
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  logoutIcon: {
    position: 'absolute',
    top: 15,
    left: 10,
},
logo: {
    borderRadius: 10,
    width: 80,
    height: 80,
},
title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
},
header: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
},
});

export default Cambio;
