import * as React from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, Alert, Platform, Pressable, Keyboard } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import { BASE_URL } from '../components/config';


const CambioDeTitular1 = ({ navigation }) => {
  const [step, setStep] = React.useState(1);
  const [nombre, setNombre] = React.useState('');
  const [identificacion, setIdentificacion] = React.useState('');
  const [registroCivil, setRegistroCivil] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [customerNumber, setCustomerNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [personType, setPersonType] = React.useState('');
  const [motive, setMotive] = React.useState('');
  const [localidad,setLocalidad] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };

  const decodeToken = async () =>{
    try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const decodedToken = jwtDecode(storedToken);
        //console.log('Token decodificado:', decodedToken);

        // Extraer userId del token
        const userId = decodedToken.userId; // Asegúrate de que el token tenga el campo userId
        if (userId) {
            setUserId(userId);
        } else {
            console.error('userId no encontrado en el token.');
        }
    } catch (decodeError) {
        console.error('Error al decodificar el token:', decodeError);
        setErrorMessage('Error al decodificar el token.');
    }
  }
  const pickDocument = async () => {
      setLoading(true);
      try {
          const res = await DocumentPicker.getDocumentAsync({});
          if (!res.canceled && res.assets && res.assets.length > 0) {
              const file = res.assets[0];
              setFile(file);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  const insertData = async () => {
    decodeToken();
      if (!file) {
          Alert.alert('No file selected', 'Please select a file first');
          return;
      }

      const formData = new FormData();
      formData.append('file', {
          uri: file.uri,
          type: file.mimeType,
          name: file.name,
      });

      try {
          const response = await fetch(`${BASE_URL}/v1/tramites/`, {
              method: 'POST',
              body: formData,
              headers: {
                  'Content-Type': 'multipart/form-data',
                  nombre,
                  registroCivil,
                  identificacion,
              },
          });

          if (response.ok) {
              Alert.alert('Success', 'Ingreso de datos Correcto');
              nextStep(); // Avanzar al siguiente paso
          } else {
              Alert.alert('Error', 'File upload failed');
          }
      } catch (err) {
          console.error(err);
          Alert.alert('Error', 'An error occurred while uploading the file');
      }
  };

  const sendData = () => {
    const data = {
      nombreCompleto: nombre,           // Nombre completo
      identificacion: identificacion,   // Número de identificación
      registroCivil: registroCivil,     // Número de registro civil o tarjeta
      archivo: file ? file.name : null, // Nombre del archivo seleccionado
      customerNumber: customerNumber,   // Número de cliente o CUIT/CUIL
      address: address,                 // Dirección
      personType: personType,           // Tipo de persona (jurídica/persona)
      motive: motive,                   // Motivo
      // Puedes agregar aquí el userId si lo obtienes de AsyncStorage
  };
  navigation.navigate('HomeAgenciero');
  console.log("Datos a enviar:", data);
};


  switch (step) {
      case 1:
          return (
              <SafeAreaView style={styles.container}>
                  <View style={styles.header}>
                      <Image
                          source={require('../images/logo_loteria.jpg')}
                          style={styles.logo}
                      />
                      <Text style={styles.title}>Inicio Tramite</Text>
                  </View>
                  <View style={styles.form}>
                      <TextInput
                          label="Nombre Completo"
                          value={nombre}
                          mode="outlined"
                          style={styles.input}
                          onChangeText={text => setNombre(text)}
                          activeOutlineColor="#ff5a00"
                      />
                      <TextInput
                          label="N° Identificación"
                          value={identificacion}
                          mode="outlined"
                          style={styles.input}
                          onChangeText={text => setIdentificacion(text)}
                          activeOutlineColor="#ff5a00"
                      />
                      <TextInput
                          label="N° Registro Civil o Tarjeta"
                          value={registroCivil}
                          mode="outlined"
                          style={styles.input}
                          onChangeText={text => setRegistroCivil(text)}
                          activeOutlineColor="#ff5a00"
                      />
                      <View style={styles.iconContainer}>
                          <IconButton icon="upload" size={40} onPress={pickDocument} />
                          {loading ? (
                              <ActivityIndicator size="small" color="#0000ff" />
                          ) : (
                              <Button mode="text" onPress={pickDocument}>
                                  {file ? file.name : 'Ingresar Examen'}
                              </Button>
                          )}
                      </View>
                  </View>

                  <View style={styles.footer}>
                      <Button
                          mode="outlined"
                          onPress={() => navigation.navigate('HomeAgenciero')}
                          style={styles.button}
                      >
                          CANCELAR
                      </Button>
                      <Button
                          mode="contained"
                          onPress={() => {
                              if (!nombre || !identificacion || !registroCivil || !file) {
                                  Alert.alert('Error', 'Por favor completa todos los campos y selecciona un archivo.');
                                  return;
                              }
                              nextStep();
                          }}
                          style={styles.button}
                          buttonColor="#ff5a00"
                          textColor="#fff"
                      >
                          Siguiente
                      </Button>
                  </View>
              </SafeAreaView>
          );

      case 2:
          return (
                      <SafeAreaView style={styles.container}>
                          <View style={styles.header}>
                              <Feather
                                  name="chevron-left"
                                  size={24}
                                  color="black"
                                  onPress={prevStep}
                                  style={styles.logoutIcon}
                              />
                              <Image
                                  source={require('../images/logo_loteria.jpg')}
                                  style={styles.logo}
                              />
                              <Text style={styles.title}>Inicio </Text>
                          </View>
                          <View style={styles.container2}>
                              <TextInput
                                  label= "Número de Cliente o CUIT/CUIL"
                                  style={styles.input}
                                  placeholder="Número de Cliente o CUIT/CUIL"
                                  value={customerNumber}
                                  onChangeText={setCustomerNumber}
                                  mode='outlined'
                                  activeOutlineColor="#ff5a00"
                              />
                              <TextInput
                                  label="Localidad"
                                  value={localidad}
                                  mode="outlined"
                                  style={styles.input}
                                  onChangeText={text => setLocalidad(text)}
                                  activeOutlineColor="#ff5a00"
                              />
                              <TextInput
                                  label="Dirrecion Comercial"
                                  style={styles.input}
                                  value={address}
                                  onChangeText={setAddress}
                                  mode='outlined'
                                  activeOutlineColor="#ff5a00"
                              />
                              <View style={styles.radioContainer2}>
                                  <Button
                                      onPress={() => setPersonType('juridica')}
                                      buttonColor="#ff5a00"
                                      textColor="#fff"
                                      style={{ width: '45%' }}
                                  >
                                      Juridica
                                  </Button>
                                  <Button
                                      onPress={() => setPersonType('persona')}
                                      buttonColor="#ff5a00"
                                      textColor="#fff"
                                      style={{ width: '45%' }}
                                  >
                                      Persona
                                  </Button>
                              </View>
                              <TextInput
                                  label = "Motivo"
                                  style={styles.textArea2}
                                  placeholder="Motivo"
                                  value={motive}
                                  onChangeText={setMotive}
                                  multiline
                                  mode='outlined'
                                  activeOutlineColor="#ff5a00"
                              />
                          </View>
                          <View style={styles.footer}>
                          <Button
                              mode="contained"
                              onPress={sendData}
                              style={styles.button}
                              buttonColor="#ff5a00"
                              textColor="#fff"
                              >
                              ENVIAR SOLICITUD
                          </Button>
                          </View>
                      </SafeAreaView>
          );
      default:
          return null;
  }
};


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
},
header: {
    alignItems: 'center',
    marginBottom: 20,
},
form: {
    flex: 1,
    padding: 16,
},
logo: {
    borderRadius: 10,
    marginTop: 80,
    width: 80,
    height: 80,
},
input: {
    marginBottom: 16,
},
iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
},
footer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
},
button: {
    flex: 1,
    marginHorizontal: 8,
},
container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      width: '100%',
      height: 'auto'
  },
  header: {
      marginTop: 10,
      alignItems: 'center',
      marginBottom: 20,
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
  divider: {
      width: '90%',
      height: 1,
      backgroundColor: '#ddd',
      alignSelf: 'center',
      marginBottom: 20,
  },
  table: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingBottom: 10,
  },
  tableHeader: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
  },
  headerText: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
  },
  cell: {
      flex: 1,
      textAlign: 'center',
  },
  editButton: {
      flex: 0.5,
      alignItems: 'center',
  },
  newTramiteButton: {
      marginVertical: 20,
      borderRadius: 25,
      paddingVertical: 10,
      marginBottom: 50,
  },
  logoutIcon: {
      position: 'absolute',
      top: 15,
      left: 10,
  },
  refreshIcon: {
      position: 'absolute',
      top: 180,
      right: 16,
  },
      container2: {
          padding: 20,
          flex: 1
      },
      title2: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
      },
      label2: {
          fontSize: 16,
          marginBottom: 5,
      },
      input2: {
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          width: 300
      },
      radioContainer2: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
      },
      radio2: {
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
          width: '48%',
      },
      textArea2: {
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          height: 100,
      },
});

export default CambioDeTitular1;
