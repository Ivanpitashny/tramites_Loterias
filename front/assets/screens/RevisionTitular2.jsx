import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Switch, List, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const RevisionTitular2 = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../images/logo_loteria.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>Revisión de Trámite</Text>
      </View>
      <Text style={styles.subtitle}>Trámite N° A000-00000004 - <Text style={styles.link}>Cambio Titular</Text></Text>
      <List.Section>
        <List.Item
          title="DNI Agenciero"
          description="4548945"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
        <List.Item
          title="Dirección"
          description="San Martín 4567"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
        <List.Item
          title="Persona"
          description="Humana"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
        <List.Item
          title="Número de AFIP"
          description="000000000000000"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
        <List.Item
          title="Motivo"
          description="..."
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
      </List.Section>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => console.log('Atras pressed')} style={styles.button}>
          Atras
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('RevisionTitular3')} style={styles.button}>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    color: '#ff5a00',
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
});

export default RevisionTitular2;
