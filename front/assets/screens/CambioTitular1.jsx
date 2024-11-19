import { useState,useEffect } from 'react'; 
import { View, StyleSheet, Image, Text, SafeAreaView, Alert, Platform, Pressable, Keyboard } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import { BASE_URL } from '../components/config';


const CambioDeTitular1 = ({ navigation , route }) => {
    const {tipoTramite} = route.params;
    const {usuarioId} = route.params;
    const [step, setStep] = useState(1);
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [registroCivil, setRegistroCivil] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customerNumber, setCustomerNumber] = useState('');
    const [address, setAddress] = useState('');
    const [personType, setPersonType] = useState('');
    const [motive, setMotive] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [userId, setUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const decodeToken = async () => {
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

    const sendData = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token no encontrado');
                return;
            }
    
            const response = await fetch(`${BASE_URL}/v1/tramites`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tipo: 'cambio_titular',
                    estado: 'Iniciado',
                    fechaInicio: new Date(),
                    fechaFin: '',
                    usuarioId: usuarioId,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta completa del primer API:', data);
    
                // Asegúrate de que la respuesta tiene la estructura esperada
                const tramiteResponse = data.tramiteResponse;
                if (!tramiteResponse || !tramiteResponse.tramite || !Array.isArray(tramiteResponse.tramite)) {
                    console.error('Estructura inesperada en la respuesta del primer API:', tramiteResponse);
                    return;
                }
    
                const tramite = tramiteResponse.tramite[0]?.tramite; // Accede al objeto tramite dentro del array
                if (!tramite || !tramite.id) {
                    console.error('El objeto tramite es nulo o no contiene un ID:', tramite);
                    return;
                }
    
                try {
                    const secondToken = await AsyncStorage.getItem('authToken');
                    if (!secondToken) {
                        console.error('Token no válido o ausente en la segunda llamada');
                        return;
                    }
    
                    const secondResponse = await fetch(`${BASE_URL}/v1/cambioTitular`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${secondToken}`,
                        },
                        body: JSON.stringify({
                            tramite: tramite.id, // Utiliza el ID del objeto tramite
                            nro_seguimiento: '',
                            motivo: motive,
                            localidad: localidad,
                            permiso: '',
                            agente: '',
                            subagente: '',
                            razon_social: '',
                            domicilio_comercial: address,
                            nuevoTitular: nombre,
                            nuevoTitularEstado: 0,
                            dniNuevoTitular: registroCivil,
                            dniNuevoTitularEstado: 0,
                            certificadoConducta: '',
                            certificadoConductaEstado: '',
                            certificadoRegistroDeudores: '',
                            certificadoRegistroDeudoresEstado: '',
                            notaLibreDeuda: '',
                            notaLibreDeudaEstado: '',
                            contratoSocial: '',
                            contratoSocialEstado: '',
                            ObjetoSocial: '',
                            objetoSocialEstado: '',
                            cuentaBancaria: '',
                            cuentaBancariaEstado: '',
                        }),
                    });
    
                    if (secondResponse.ok) {
                        const secondData = await secondResponse.json();
                        console.log('Respuesta de la segunda API:', secondData);
                        navigation.navigate('HomeAgenciero');
                    } else {
                        console.error(
                            'Error en la respuesta de la segunda API:',
                            secondResponse.status,
                            secondResponse.statusText
                        );
                    }
                } catch (error) {
                    console.error('Error en la segunda llamada a la API:', error);
                }
            } else {
                console.error('Error en la respuesta del primer API:', response.status);
            }
        } catch (error) {
            console.error('Error en la conexión con la primera API:', error);
        }
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
                            label="Número de Cliente o CUIT/CUIL"
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
                                style={{ width: '35%' }}
                            >
                                Juridica
                            </Button>
                            <Button
                                onPress={() => setPersonType('persona')}
                                buttonColor="#ff5a00"
                                textColor="#fff"
                                style={{ width: '35%' }}
                            >
                                Persona
                            </Button>
                        </View>
                        <TextInput
                            label="Motivo"
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
                            textColor="black"
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
        width:'100%',
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
