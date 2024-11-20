import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, List, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const RevisionTitular3 = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../images/logo_loteria.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>Revisión de Trámite</Text>
      </View>
      <List.Section>
        <List.Subheader>Documentacion</List.Subheader>
        <List.Item title="Sellados" />
        <Divider />
        <List.Item title="DNI Nuevo Permisario" />
        <Divider />
        <List.Item title="Certificado de Conducta Titular Propuesto" />
        <Divider />
        <List.Item title="Certificado Negativo del Registro de Deudores Alimentarios" />
        <Divider />
        <List.Item title="Nota Libre Deuda" />
        <Divider />
        <List.Item title="Imagen Interior Local" />
      </List.Section>
      <Button icon="download" mode="contained" onPress={() => console.log('Descargar datos')}>
        Descargar datos
      </Button>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('HomeAdministrador')} style={styles.button}>
          Rechazar
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('RevisionTitular4')} style={styles.button}>
          Siguiente
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#ff5a00',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    borderRadius: 10,
    marginTop: 20,
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});

export default RevisionTitular3;
