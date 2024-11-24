import { useState,useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, Alert } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../components/config';

const CambioDomicilio1 = ({ navigation, route }) => {
    const {usuarioId} = route.params;
    const [step, setStep] = useState(1);
    // const [permiso, setPermiso] = React.useState('');\

    const [motivo, setMotivo] = useState('');
    const [agente, setAgente] = useState('');
    const [subagente, setSubagente] =useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [dependencia, setDependencia] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const nextStep = () => {
        console.log('Siguiente pressed');
    };

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
    const obtenerUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                Alert.alert('Error', 'No se ha encontrado el token de autenticación.');
                return;
            }
    
            const response = await fetch(`${BASE_URL}/v1/usuarios/${usuarioId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Verifica si la respuesta es válida
            if (!response.ok) {
                const errorResponse = await response.text(); // Lee la respuesta como texto
                console.error('Error status:', response.status); // Imprime el código de estado
                console.error('Error response:', errorResponse); // Imprime el texto de error
                Alert.alert('Error', `Fallo al obtener el usuario: ${response.statusText}`);
                return; // Sal de la función si hay un error
            }
    
            const data = await response.json(); // Lee y analiza la respuesta como JSON
    
            const usuario = data.usuarioResponse.usuario[0]; // Accede al primer usuario
            const nombre = usuario.nombre || ''; // Obtiene el nombre
            const apellido = usuario.apellido || ''; // Obtiene el apellido
            setRazonSocial(`${nombre} ${apellido}`.trim());          
            
        } catch (error) {
            console.error('Error fetching user:', error);
            Alert.alert('Error', 'Ocurrió un error al obtener la información del usuario.');
        }
    };
    useEffect(() => {
        obtenerUsuario(); 
    }, [usuarioId]);

    const insertData = async () => {

        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const response = await fetch(`${BASE_URL}/v1/tramites`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        tipo: 'cambio_domicilio',
                        estado: 'Iniciado',
                        fechaInicio: new Date(),
                        fechaFin: '',
                        usuarioId: usuarioId,
                    }),
                });
                
                
                if (response.ok) {
                    const data = await response.json();
                    
                    const tramite = data.tramiteResponse?.tramite?.[0];
                    if(!tramite || !tramite.id) {
                        console.error('El objeto tramite no tiene id o es nulo');
                        return
                    }
                    
                    try {
                        const token = await AsyncStorage.getItem('authToken');
                        const segundaRespuesta =await fetch(`${BASE_URL}/v1/cambioDomicilio`, {
                            method:'POST',
                            headers:{
                                Accept:'application/json',
                                'Content-Type':'application/json',
                                'Authorization':`Bearer ${token}`,
                            },
                            body:JSON.stringify({
                                tramite: { id: tramite.id },
                                nro_seguimiento: 12345, 
                                motivo: motivo,
                                localidad: dependencia,
                                agente: agente,
                                sub_agente: subagente,
                                razon_social: razonSocial,
                                domicilio_comercial: "",
                                observaciones: "",
                                nuevoDomicilio: "",
                                nuevoDomicilioEstado: 0,
                                superficie: '',
                                superficieEstado: 0,
                                ubicacion: "",
                                ubicacionEstado: 0,
                                vidriera: "",
                                vidrieraEstado: 0,
                                nivelSocioeconomico: "",
                                nivelSocioeconomicoEstado: 0,
                                mercadoZona: "",
                                mercadoZonaEstado: 0,
                                recaudacionEstimada: '',
                                recaudacionEstimadaEstado: 0,
                                direccion: "",
                                direccionEstado: 0,
                                localidad_da: "",
                                localidadEstado: 0,
                                departamento: "",
                                departamentoEstado: 0
                            }),
                        });
                        if (segundaRespuesta.ok) {
                            const dataDos = await segundaRespuesta.json();
                            navigation.navigate('HomeAgenciero');
                        }else{
                            console.error('Error en la segunda Respuesta');
                            
                        }
                        
                    } catch (error) {
                        console.error('Error en la segunda llamada a la Api: ', error);
                    }
            }
        }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Ocurrió un error al cargar el archivo');
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
                        <Text style={styles.title}>Inicio Cambio de Domicilio</Text>
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            label="Nº de Agente"
                            value={agente}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setAgente}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Nº de Subagente"
                            value={subagente}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setSubagente}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Razón Social"
                            value={razonSocial}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setRazonSocial}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Dependencia Local"
                            value={dependencia}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setDependencia}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Motivo"
                            value={motivo}
                            mode="outlined"
                            multiline
                            style={styles.input}
                            onChangeText={setMotivo}
                            activeOutlineColor="#ff5a00"
                        />
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
                            onPress={insertData}
                            style={styles.button}
                            buttonColor="#ff5a00"
                            textColor="#fff"
                        >
                            SIGUIENTE
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
    form: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 16,
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
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
});

export default CambioDomicilio1;
