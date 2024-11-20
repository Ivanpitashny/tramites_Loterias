import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, List, IconButton } from 'react-native-paper';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RevisionTitular5 = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => {}} />
      <View style={styles.header}>
        <Image
          source={require('../images/logo_loteria.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>Revisión de Trámite</Text>
      </View>
      <Text style={styles.subtitle}>Trámite N° A000-0000004 - <Text style={styles.link}>Cambio Titular</Text></Text>
      <Text style={styles.sectionTitle}>Documentación</Text>
      <List.Section>
        <List.Item title="Objeto Social" />
        <List.Item title="Constancia de Inscripción de AFIP" />
        <List.Item title="Constancia de Inscripción API" />
        <List.Item title="Habilitación Municipal/Comunal" />
        <List.Item title="Apertura de Cuenta Bancaria" />
        <List.Item title="Formulario OSER 03" />
      </List.Section>
      <Button icon="download" mode="contained" onPress={() => {}} style={styles.downloadButton}>
        Descargar datos
      </Button>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('HomeAdministrador')} style={styles.rejectButton}>
          Rechazar
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('RevisionTitular6')} style={styles.button}>
          Siguiente
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    color: '#ff5a00',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  downloadButton: {
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rejectButton: {
    backgroundColor: '#ff5a00',
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
});

export default RevisionTitular5;
