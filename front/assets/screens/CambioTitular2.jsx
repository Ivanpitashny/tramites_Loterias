import {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, Alert, Platform, Pressable, Keyboard } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import { BASE_URL } from '../components/config';

const CambioTitular2 = ({route,navigation}) => {
    const {tramiteId} = route.params;4
    const[motivo, setMotivo]= useState('');
    const[localidad, setLocalidad]= useState('');
    const[agente, setAgente]= useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [address, setAddress] = useState('');
    const [personType, setPersonType] = useState('');
    const [contributionNumber, setContributionNumber] = useState('');
    const [motive, setMotive] = useState('');
    const [selladosFile, setSelladosFile] = useState(null);
    const [dniFile, setDniFile] = useState(null);
    const [conductaFile, setConductaFile] = useState(null);
    const [deudoresFile, setDeudoresFile] = useState(null);
    const [libreDeudaFile, setLibreDeudaFile] = useState(null);
    const [examenFile, setExamenFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendData = ()=>{
        console.log('hola');
    }
    const pickDocument = async (setFile) => {
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
                            <IconButton icon="upload" size={30} onPress={() => pickDocument(setExamenFile)} />
                            {loading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Button mode="text" onPress={() => pickDocument(setExamenFile)}>
                                    {examenFile ? examenFile.name : 'Ingresar Examen'}
                                </Button>
                            )}
                        </View>
                <View style={styles.iconContainer}>
                        <IconButton icon="upload" size={30} onPress={() => pickDocument(setSelladosFile)} />
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Button mode="text" onPress={() => pickDocument(setSelladosFile)}>
                                {selladosFile ? selladosFile.name : 'Sellados'}
                            </Button>
                        )}
                    </View>
                    <View style={styles.iconContainer}>
                        <IconButton icon="upload" size={30} onPress={() => pickDocument(setDniFile)} />
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Button mode="text" onPress={() => pickDocument(setDniFile)}>
                                {dniFile ? dniFile.name : 'DNI Nuevo Permisario'}
                            </Button>
                        )}
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
                    </View>
                    <View style={styles.newTramiteButtonContainer}>
                    <Pressable 
                        style={styles.newTramiteButton} 
                        onPress={sendData}
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