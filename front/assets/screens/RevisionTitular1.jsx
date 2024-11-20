import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable, SafeAreaView, Switch,BackHandler } from 'react-native';
import { Button,IconButton,TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { BASE_URL } from '../components/config';

const RevisionTitular1 = ({navigation,route}) => {
    const {tramiteId}  = route.params;
    const [nombreCompleto, setNombreCompleto] = useState(null);
    const [nombreSwitch, setNombreSwitch] = useState(0);
    const [permisoUsuario, setPermisoUsuario] = useState(false);
    const [permisoSwitch, setPermisoSwitch] = useState(0);
    const [registro,setRegistro] = useState();
    const [registroSwitch, setRegsitroSwitch] = useState(0)
    const [registroNuevoTitular, setRegistroNuevoTitular] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [estado, setEstado] =  useState(null);
    const [id, setId] = useState(null);
    const [fechaInicio, setFechaInicio]= useState(null);
    const [fechaFin, setFechaFin]= useState(null);
    const [tipo, setTipo]= useState(null);
    const [usuarioId, setUsuarioId] = useState(null);  

    const toggleNombre = () => setNombreSwitch(!nombreSwitch);
    const togglePermiso = () => setPermisoSwitch(!permisoSwitch);
    const toggleRegistro= () => setRegsitroSwitch(!registroSwitch);

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
                    setNombreCompleto(cambioTitular.nuevoTitular);
                    setNombreSwitch(cambioTitular.dniNuevoTitularEstado);
                    setRegsitroSwitch(cambioTitular.nuevoTitularEstado);
                    setPermisoUsuario(cambioTitular.permiso);
                    setRegistro(cambioTitular.dniNuevoTitular);
                    setEstado(cambioTitular.tramite.estado);
                    setFechaFin(cambioTitular.tramite.fechaFin);
                    setFechaInicio(cambioTitular.tramite.fechaInicio);
                    setTipo(cambioTitular.tramite.tipo);
                    setUsuarioId(cambioTitular.tramite.usuarioId);
                    console.log(data);
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

      useEffect(() => {
        fetchData();
      },[]);

      useEffect(() => {
        if (nombreCompleto) {
            
        }
    }, [nombreCompleto]);
    useEffect(() => {
        if (registro) {
            
        }
    }, [registro]);
    
    useEffect(() => {
        if (permisoUsuario) {
            
        }
    }, [permisoUsuario]);


    const handleDescargarExamen = () => {
        console.log('Descargar Examen');
    };

    const handleRechazar = async () => {
        setEstado("Rechazado");
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const response = await fetch(`${BASE_URL}/v1/tramites/${tramiteId}`, { //cambiar segun la ip de cada uno
                    method: 'PUT',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        estado,fechaFin,fechaInicio,id,tipo,usuarioId
                    }),
                });
                if (response.ok) {
                    const data = await response.json();

                    setErrorMessage('');
                    navigation.navigate('HomeAdministrador');
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

    const handlePreAprobar = async () => {
        const newEstado = "Para Revisión";
        setEstado(newEstado);
        
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const response = await fetch(`${BASE_URL}/v1/tramites/${tramiteId}`, { //cambiar segun la ip de cada uno
                    method: 'PUT',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id,
                        tipo,
                        estado: newEstado,
                        fechaInicio,
                        fechaFin,
                        usuarioId
                    }),
                });

                
                if (response.ok) {
                    const data = await response.json();

                    setErrorMessage('');
                    navigation.navigate('RevisionTitular2', { tramiteId });
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
    const handleBackPress = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Pressable onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                    <Feather name="chevron-left" size={24} color="black" onPress={handleBackPress} style={styles.logoutIcon}/>
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Revisión de Tramite</Text>  
                </View>
                    {/* Body */}
                    <View style={styles.body}>
                        <Text style={styles.tramiteText}>Trámite N° {tramiteId} - {tipo === 'cambio_titular' ? 'Cambio Titular' : 'Cambio Domicilio'}</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nombre Completo</Text>
                            <Text style={styles.value}>{nombreCompleto ? (
                                    <Text style={styles.value}>
                                        {nombreCompleto}
                                    </Text>
                                ) : (
                                    <Text>Cargando nombre completo...</Text>
                                )}</Text>
                            <Switch value={nombreSwitch} onValueChange={toggleNombre} style={styles.switch}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Permiso del Usuario</Text>
                            <Text style={styles.value}>{permisoUsuario ? (
                                    <Text style={styles.value}>
                                        {permisoUsuario}
                                    </Text>
                                ) : (
                                    <Text>Cargando Permiso...</Text>
                                )}</Text>
                            <Switch value={permisoSwitch} onValueChange={togglePermiso} style={styles.switch}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>N° Registro (Nuevo Titular)</Text>
                            <Text style={styles.value}>{registro ? (
                                    <Text style={styles.value}>
                                        {registro}
                                    </Text>
                                ) : (
                                    <Text>Cargando Registro...</Text>
                                )}</Text>
                            <Switch value={registroSwitch} onValueChange={toggleRegistro} style={styles.switch}/>
                        </View>
                        <IconButton icon="download" size={40} onPress={handleDescargarExamen}
                        />
                        <View style={styles.buttonContainer}>
                            <Button mode="contained" onPress={handleRechazar} style={styles.rejectButton}>
                                Rechazar
                            </Button>
                            <Button mode="contained" onPress={handlePreAprobar} style={styles.approveButton}>
                                Pre Aprobar
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    logo: {
        borderRadius: 10,
        marginTop: 20,
        width: 80,
        height: 80,
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        marginTop: 20,
    },
    tramiteText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nombreText: {
        fontSize: 16,
        marginBottom: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logoutIcon: {
        position: 'absolute',
        top: 15,
        left: 10,
    },
    switchText: {
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#ff5a00',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    rejectButton: {
        backgroundColor: 'red',
    },
    approveButton: {
        backgroundColor: 'green',
    },
    switch: {
        alignSelf: 'flex-end',
        color: 'ff5a00' // Alinea el switch a la derecha
    },
});

export default RevisionTitular1;
