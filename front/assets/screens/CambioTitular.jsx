import React from 'react';
import { View, StyleSheet,Image,BackHandler,Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput, Button, IconButton, Card, Title } from 'react-native-paper';

const CambioDeTitular = () => {
  return (
    <View style={styles.container}>
        {/* Logo y Título */}
        <View style={styles.header}>
                    <Feather name="chevron-left" size={24} color="black" onPress={BackHandler} style={styles.logoutIcon}/>
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inicio Tramite</Text>  
                </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Cambio de Titular</Title>
          <TextInput
            label="Nombre Completo"
            value="Lautaro Cortez"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="N° Documento"
            value="documento"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="N° Permiso del Usuario"
            value=""
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="N° Registro (Nuevo Titular)"
            value=""
            mode="outlined"
            style={styles.input}
          />
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
          <Button 
                    mode="contained"
                    style={styles.newTramiteButton}
                    buttonColor="#ff5a00" 
                    textColor="#fff"  >
                    ENVIAR SOLICITUD
                </Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
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
    marginTop: 80,
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

export default CambioDeTitular;
