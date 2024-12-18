import { useState,useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, Alert } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../components/config';

const CambioDomicilio2 = ({ navigation, route }) => {
    const {usuarioId} = route.params;
    const [step, setStep] = useState(1);
    const [domicilioComercial, setDomicilioComercial] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [nuevoDomicilio, setNuevoDomicilio] = useState('');
    const [nuevoDomicilioEstado, setNuevoDomicilioEstado] = useState(0);
    const [superficie, setSuperficie] = useState('');
    const [superficieEstado, setSuperficieEstado] = useState(0);
    const [ubicacion, setUbicacion] = useState('');
    const [ubicacionEstado, setUbicacionEstado] = useState(0);
    const [vidriera, setVidriera] = useState('');
    const [vidrieraEstado, setVidrieraEstado] = useState(0);
    const [nivelSocioeconomico, setNivelSocioeconomico] = useState('');
    const [nivelSocioeconomicoEstado, setNivelSocioeconomicoEstado] = useState(0);
    const [mercadoZona, setMercadoZona] = useState('');
    const [mercadoZonaEstado, setMercadoZonaEstado] = useState(0);
    const [recaudacionEstimada, setRecaudacionEstimada] = useState('');
    const [recaudacionEstimadaEstado, setRecaudacionEstimadaEstado] = useState(0);
    const [direccion, setDireccion] = useState('');
    const [direccionEstado, setDireccionEstado] = useState(0);
    const [localidad, setLocalidad] = useState('');
    const [localidadEstado, setLocalidadEstado] = useState(0);
    const [departamento, setDepartamento] = useState('');
    const [departamentoEstado, setDepartamentoEstado] = useState(0);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
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
        if (!file) {
            Alert.alert('No se ha seleccionado archivo', 'Por favor, seleccione un archivo primero');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            type: file.mimeType,
            name: file.name,
        });

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
                
            }

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
                        motivo: "Cambio de domicilio",
                        localidad: "Ciudad Ejemplo",
                        agente: "",
                        sub_agente: "",
                        razon_social: razonSocial,
                        domicilio_comercial: "Domicilio Comercial Ejemplo",
                        observaciones: "Observaciones Ejemplo",
                        nuevoDomicilio: "Nuevo Domicilio Ejemplo",
                        nuevoDomicilioEstado: 0,
                        superficie: '',
                        superficieEstado: 0,
                        ubicacion: "Ubicación Ejemplo",
                        ubicacionEstado: 0,
                        vidriera: "Vidriera Ejemplo",
                        vidrieraEstado: 0,
                        nivelSocioeconomico: "Alto",
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
                            label="Domicilio Comercial Actual" 
                            value={domicilioComercial}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setDomicilioComercial}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Observaciones"
                            value={observaciones}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setObservaciones}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Nuevo Domicilio Comercial"
                            value={nuevoDomicilio}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setNuevoDomicilio}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Superficie Nuevo Domicilio"
                            value={superficie}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setSuperficie}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Ubicación Nuevo Domicilio"
                            value={ubicacion}
                            mode='outlined'
                            style={styles.input}
                            onChangeText={setUbicacion}
                            activeOutlineColor='#ff5a00'
                        />
                        
                        <TextInput
                            label="Tamaño de Vidriera en m2"
                            value={vidriera}
                            mode='outlined'
                            style={styles.input}
                            onChangeText={setVidriera}
                            activeOutlineColor='#ff5a00'
                        />
                        
                        <View style={styles.iconContainer}>
                            <IconButton icon="upload" size={40} onPress={pickDocument} />
                            {loading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Button mode="text" onPress={pickDocument}>
                                    {file ? file.name : 'Ingresar Documento'}
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
            case 2:
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
                                label="Nivel Socioeconómico del Nuevo Barrio"
                                value={nivelSocioeconomico}
                                mode='outlined'
                                style={styles.input}
                                onChangeText={setNivelSocioeconomico}
                                activeOutlineColor='#ff5a00'
                            />
            
                            <TextInput
                                label="Zona de Mercado"
                                value={mercadoZona}
                                mode='outlined'
                                style={styles.input}
                                onChangeText={setMercadoZona}
                                activeOutlineColor='#ff5a00'
                            />
                            
                            <TextInput
                                label="Recaudación Estimada"
                                value={recaudacionEstimada}
                                mode='outlined'
                                type='number'
                                style={styles.input}
                                onChangeText={setRecaudacionEstimada}
                                activeOutlineColor='#ff5a00'
                            />
                            
                            <TextInput
                                label="Dirección Nuevo Local"
                                value={direccion}
                                mode='outlined'
                                style={styles.input}
                                onChangeText={setDireccion}
                                activeOutlineColor='#ff5a00'
                            />
                            
                            <TextInput
                                label="Localidad Nuevo Local"
                                value={localidad}
                                mode='outlined'
                                style={styles.input}
                                onChangeText={setLocalidad}
                                activeOutlineColor='#ff5a00'
                            />
                            
                            <TextInput
                                label="Departamento Nuevo Local"
                                value={departamento}
                                mode='outlined'
                                style={styles.input}
                                onChangeText={setDepartamento}
                                activeOutlineColor='#ff5a00'
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

export default CambioDomicilio2;
