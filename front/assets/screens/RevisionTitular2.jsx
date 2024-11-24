import { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../components/config';

const RevisionTitular2 = ({navigation,route}) => {
    const {tramiteId} = route.params;
    const [objetoSocial, setObjetoSocial] = useState('');
    const [switchOS, setSwitchOS] = useState(false);
    const [localidad, setLocalidad] = useState('');
    const [switchL, setSwitchL] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [switchDir, setSwitchDir] = useState(false);
    const [dni, setDni] = useState('');
    const [switchD, setSwitchD] = useState(false);
    const [tramite, setTramite] = useState({});
    const [idCambio, setIdCambio] = useState('');
    const [step, setStep] = useState(1);

    const [certificadoDuedores, setCertificadoDeudores] = useState('');
    const [switchDeudores, setSwitchDeudores] = useState(false);
    const [certificadoConducta, setCertificadoConducta] = useState('');
    const [switchConducta, setSwitchConducta] = useState(false);
    const [notaLibreDeuda, setNotaLibreDeuda] = useState('');
    const [switchLibreDeuda, setSwitchLibreDeuda] = useState(false);
    const [loading, setLoading] = useState(false);

    const onToggleOS = () => setSwitchOS(!switchOS);
    const onToggleL = () => setSwitchL(!switchL);
    const onToggleDir = () => setSwitchDir(!switchDir);
    const onToggleD = () => setSwitchD(!switchD);
    const onToggleDeudores = () => setSwitchDeudores(!switchDeudores);
    const onToggleConducta = () => setSwitchConducta(!switchConducta);
    const onToggleLibreDeuda = () => setSwitchLibreDeuda(!switchLibreDeuda);

    const fetchData = async () => {    
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
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
                    const cambioTitular = data.cambioTitularResponse.cambioTitular[0];
                    console.log(cambioTitular);
                    
                    setDireccion(cambioTitular.domicilio_comercial);
                    setDni(cambioTitular.dniNuevoTitular);
                    setSwitchD(cambioTitular.dniNuevoTitularEstado ? true : false)
                    setObjetoSocial(cambioTitular.objetoSocial);
                    setSwitchOS(cambioTitular.objetoSocialEstado ? true : false);
                    setLocalidad(cambioTitular.localidad);
                    setSwitchL(cambioTitular.localidadEstado ? true : false);
                    setIdCambio(cambioTitular.id);
                    setTramite(cambioTitular);
                    setCertificadoDeudores(cambioTitular.certificadoConducta);
                    setSwitchConducta(cambioTitular.certificadoConductaEstado ? true : false);
                    setCertificadoConducta(cambioTitular.certificadoRegistroDeudores);
                    setSwitchConducta(cambioTitular.certificadoRegistroDeudoresEstado ? true : false);
                    setNotaLibreDeuda(cambioTitular.notaLibreDeuda);
                    setSwitchLibreDeuda(cambioTitular.notaLibreDeudaEstado ? true : false);
                }else{
                    console.error('Error en la respuesta:', response.status);
                }
            }else{
                console.log('token no encontrado');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la conexión con el servidor.');
        }
    };

    const handleUpdate = async () => {
        console.log({
            domicilio_comercial: direccion,
            dniNuevoTitular: dni,
            dniNuevoTitularEstado: switchD ? 1 : 0,
            objetoSocial: objetoSocial,
            objetoSocialEstado: switchOS ? 1 : 0,
            localidad: localidad,
            localidadEstado: switchL ? 1 : 0,
            certificadoConductaEstado: switchConducta ? 1 : 0, 
            certificadoRegistroDeudoresEstado: switchDeudores ? 1 : 0,
            notaLibreDeudaEstado: switchLibreDeuda ? 1 : 0,
        });
        
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const response = await fetch(`${BASE_URL}/v1/cambioTitular/${idCambio}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...tramite,
                        domicilio_comercial: direccion,
                        dniNuevoTitular: dni,
                        dniNuevoTitularEstado: switchD ? 1 : 0,
                        objetoSocial: objetoSocial,
                        objetoSocialEstado: switchOS ? 1 : 0,
                        localidad: localidad,
                        localidadEstado: switchL ? 1 : 0,
                        certificadoConductaEstado: switchConducta ? 1 : 0, 
                        certificadoRegistroDeudoresEstado: switchDeudores ? 1 : 0,
                        notaLibreDeudaEstado: switchLibreDeuda ? 1 : 0,
                    }),
                    
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Update successful:', data);
                    alert('Cambios Guardados Correctamente')
                } else {
                    console.error('Error en la respuesta:', response.status);
                }
            } else {
                console.log('token no encontrado');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la conexión con el servidor.');
        }
    };

    const downloadFile = async (filePath) => {
        console.log('Downloading file:', filePath);
        
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const encodedFilePath = encodeURIComponent(`D:\\tramites_Loterias\\assets\\${filePath}`);
                const response = await fetch(`${BASE_URL}/archivos/descargar?filePath=${encodedFilePath}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filePath.split('\\').pop(); // Extract the file name from the path
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                } else {
                    console.error('Error al descargar el archivo:', response.status);
                }
            } else {
                console.log('token no encontrado');
            }
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    useEffect(()=>{
        fetchData();
    }, []); // Empty dependency array ensures fetchData is called only once on mount

switch (step) {
    case 1:
        return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../images/logo_loteria.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Revisión de Trámite</Text>
            </View>
            <Text style={styles.subtitle}>
                Trámite N° {idCambio} - <Text style={styles.link}>Cambio Titular</Text>
            </Text>
    
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>DNI Nuevo Titular</Text>
                    <Text style={styles.itemDescription}>{dni}</Text>
                </View>
                <Switch value={switchD} onValueChange={onToggleD}/>
            </View>
    
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>Objeto Social</Text>
                    <Text style={styles.itemDescription}>{objetoSocial}</Text>
                </View>
                <Switch value={switchOS} onValueChange={onToggleOS}/>
            </View>
    
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>Localidad</Text>
                    <Text style={styles.itemDescription}>{localidad}</Text>
                </View>
                <Switch value={switchL} onValueChange={onToggleL} />
            </View>

            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>Dirección</Text>
                    <Text style={styles.itemDescription}>{direccion}</Text>
                </View>
                <Switch value={switchDir} onValueChange={onToggleDir} />
            </View>
    
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    case 2:
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Revisión de Trámite</Text>
                </View>
                <Text style={styles.subtitle}>
                    Trámite N° {idCambio} - <Text style={styles.link}>Cambio Titular</Text>
                </Text>
                <View style={styles.iconContainer}>
                    <IconButton icon="download" size={30} onPress={() => downloadFile(certificadoConducta)} />
                    {loading ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Button mode="text" onPress={() => downloadFile(certificadoConducta)}>
                            Descargar Conducta
                        </Button>
                    )}
                    <Switch value={switchConducta} onValueChange={onToggleConducta}/>
                </View>
                <View style={styles.iconContainer}>
                    <IconButton icon="download" size={30} onPress={() => downloadFile(certificadoDuedores)} />
                    {loading ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Button mode="text" onPress={() => downloadFile(certificadoDuedores)}>
                            Descargar Deudores
                        </Button>
                    )}
                    <Switch value={switchDeudores} onValueChange={onToggleDeudores}/>
                </View>
                <View style={styles.iconContainer}>
                    <IconButton icon="download" size={30} onPress={() => downloadFile(notaLibreDeuda)} />
                    {loading ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Button mode="text" onPress={() => downloadFile(notaLibreDeuda)}>
                            Descargar Libre Deuda
                        </Button>
                    )}
                    <Switch value={switchLibreDeuda} onValueChange={onToggleLibreDeuda}/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => setStep(1)}>
                        <Text style={styles.buttonText}>Atrás</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { handleUpdate(); navigation.navigate('HomeAdministrador'); }}>
                        <Text style={styles.buttonText}>Finalizar</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingTop: 45,
        paddingBottom: 25, 
        paddingHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        borderRadius: 10,
        marginRight: 16,
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
    },
    link: {
        color: '#ff5a00',
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0, // Eliminamos el margen
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 0, // Eliminamos el margen
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        backgroundColor: '#ff6600',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        width: 'auto',
        height:'auto'
    },
});

export default RevisionTitular2;
