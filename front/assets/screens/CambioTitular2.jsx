import {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, Alert, Platform, Pressable, Keyboard } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import { BASE_URL } from '../components/config';

const CambioTitular2 = ({route,navigation}) => {
    const {tramiteId} = route.params;
    const [conductaFile, setConductaFile] = useState(null);
    const [deudoresFile, setDeudoresFile] = useState(null);
    const [libreDeudaFile, setLibreDeudaFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tramite, setTramite] = useState([]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await fetch(`${BASE_URL}/v1/cambioTitular/tramite/${tramiteId}`, { //cambiar segun la ip de cada uno
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }); 
            if (response.ok) {
                const data = await response.json();
              
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch data. Please try again later.');
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    
    /**
     * Función para enviar datos y archivo al servidor.
     * @param {Object} file - El archivo a enviar (debe contener `uri`, `type` y `name`).
     * @param {string} tipoArchivo - Tipo de archivo para clasificar en el servidor.
     * @param {number} tramiteId - ID del trámite asociado al archivo.
     */
    const sendData = async (file, tipoArchivo) => {
        
        
        try {
            // Validar que todos los parámetros necesarios estén disponibles
            if (!file || !file.uri || !file.type || !file.name) {
                throw new Error('El archivo no es válido. Asegúrate de que tenga uri, type y name.');
            }
            if (!tipoArchivo || !tramiteId) {
                throw new Error('Tipo de archivo o ID del trámite no especificado.');
            }
    
            // Obtener el token de autenticación desde AsyncStorage
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                throw new Error('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.');
            }
    
            // Preparar los datos del formulario
            const formData = new FormData();
            formData.append('archivo', {
                uri: file.uri,
                type: file.mimeType,
                name: file.name,
            });
            formData.append('tipoArchivo', tipoArchivo);
    
            // Hacer la solicitud al servidor
            const response = await fetch(`${BASE_URL}/archivos/guardar/${tramiteId}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            // Procesar la respuesta
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error(responseData.message || 'Error al enviar los datos al servidor.');
            }
    
            // Mostrar mensaje de éxito al usuario
            Alert.alert('Éxito', 'Archivo enviado correctamente.');
            console.log('Respuesta del servidor:', responseData);
    
        } catch (error) {
            console.error('Error enviando datos:', error.message);
            Alert.alert('Error', `No se pudo enviar el archivo: ${error.message}`);
        }
    };
    

    const createFormData = () => {
        const formData = new FormData();
        if (conductaFile) {
            appendFileToFormData(formData, conductaFile, 'conductaFile');
        }
        if (deudoresFile) {
            appendFileToFormData(formData, deudoresFile, 'deudoresFile');
        }
        if (libreDeudaFile) {
            appendFileToFormData(formData, libreDeudaFile, 'libreDeudaFile');
        }
        return formData;
    }

    const appendFileToFormData = (formData, file, tipoArchivo) => {
        formData.append('archivo', {
            uri: file.uri,
            type: file.type,
            name: file.name,
        });
        formData.append('tipoArchivo', tipoArchivo);
    }


    const pickDocument = async (setFile) => {
        setLoading(true);
        try {
            const res = await DocumentPicker.getDocumentAsync({});
            if (!res.canceled && res.assets && res.assets.length > 0) {
                const file = res.assets[0];
                file.type = file.mimeType; // Ensure type is set
                setFile(file);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
return (
            <SafeAreaView style={styles.container}>
                {/* Logo y Título */}
                <View style={styles.header}>
                    {/* <Feather name="chevron-left" size={24} color="black" onPress={BackHandler} style={styles.logoutIcon}/> */}
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inicio Tramite</Text>  
                </View>
                    <View style={styles.iconContainer}>
                        <IconButton icon="upload" size={30} onPress={() => pickDocument(setConductaFile)} />
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Button mode="text" onPress={() => pickDocument(setConductaFile)}>
                                {conductaFile ? conductaFile.name : 'Certificado de Conducta Titular Propuesta'}
                            </Button>
                        )}
                        {conductaFile && (
                            <Button mode="contained" onPress={() => sendData(conductaFile, 'conductaFile')}>
                                Guardar
                            </Button>
                        )}
                    </View>
                    <View style={styles.iconContainer}>
                        <IconButton icon="upload" size={30} onPress={() => pickDocument(setDeudoresFile)} />
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Button mode="text" onPress={() => pickDocument(setDeudoresFile)}>
                                <Text>
                                    {deudoresFile ? deudoresFile.name : 'Certificado Negativo del Registro de Deudores alimentarios'}
                                </Text>
                            </Button>
                        )}
                        {deudoresFile && (
                            <Button mode="contained" onPress={() => sendData(deudoresFile, 'deudoresFile')}>
                                Guardar
                            </Button>
                        )}
                    </View>

                    <View style={styles.iconContainer}>
                        <IconButton icon="upload" size={30} onPress={() => pickDocument(setLibreDeudaFile)} />
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Button mode="text" onPress={() => pickDocument(setLibreDeudaFile)}>
                                {libreDeudaFile ? libreDeudaFile.name : 'Nota Libre Deuda'}
                            </Button>
                        )}
                        {libreDeudaFile && (
                            <Button mode="contained" onPress={() => sendData(libreDeudaFile, 'libreDeudaFile')}>
                                Guardar
                            </Button>
                        )}
                    </View>
                    <View style={styles.newTramiteButtonContainer}>
                    <Pressable 
                        style={styles.newTramiteButton} 
                        onPress={() => {
                            if (conductaFile) sendData(conductaFile, 'conductaFile');
                            if (deudoresFile) sendData(deudoresFile, 'deudoresFile');
                            if (libreDeudaFile) sendData(libreDeudaFile, 'libreDeudaFile');
                        }}
                    >
                        <Text style={styles.newTramiteButtonText}>ENVIAR SOLICITUD</Text>
                    </Pressable>
                </View>

                {/* <Button title="ATRÁS" onPress={() => {}} color="#808080" /> */}
            </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        width: 'auto',
        height:'auto'
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
    newTramiteButtonContainer: {
        alignItems: 'center', // Centra el botón horizontalmente
        marginVertical: 20,
    },
    newTramiteButton: {
        width: '80%', // Tamaño relativo al contenedor
        height: 45,
        justifyContent: 'center',
        alignItems: 'center', // Centra el contenido del botón
        borderRadius: 25,
        backgroundColor: '#ff5a00',
    },
    newTramiteButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
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

export default CambioTitular2;