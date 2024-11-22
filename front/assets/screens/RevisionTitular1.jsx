import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { BASE_URL } from '../components/config';

const RevisionTitular1 = ({ navigation, route }) => {
    const { tramiteId } = route.params;
    const [nombreCompleto, setNombreCompleto] = useState(null);
    const [nombreSwitch, setNombreSwitch] = useState(0);
    const [motivo, setMotivo] = useState(false);
    const [motivoSwitch, setMotivoSwitch] = useState(0);
    const [registro, setRegistro] = useState();
    const [registroSwitch, setRegsitroSwitch] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [estado, setEstado] = useState(null);
    const [id, setId] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [usuarioId, setUsuarioId] = useState(null);
    const [tramite, setTramite] = useState([]);
    const [idtitular, setIdtitular] = useState(null);
    const [certificadoConducta, setCertificadoConducta] = useState('');
    const [certificadoConductaEstado, setCertificadoConductaEstado] = useState(false);

    const toggleNombre = () => setNombreSwitch(!nombreSwitch);
    const toggleMotivo = () => setMotivoSwitch(!motivoSwitch);
    const toggleRegistro = () => setRegsitroSwitch(!registroSwitch);
    const toggleCertificadoConductaEstado = () => setCertificadoConductaEstado(!certificadoConductaEstado);

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
                    setMotivo(cambioTitular.motivo);
                    setRegistro(cambioTitular.dniNuevoTitular);
                    setEstado(cambioTitular.tramite.estado);
                    setFechaFin(cambioTitular.tramite.fechaFin);
                    setFechaInicio(cambioTitular.tramite.fechaInicio);
                    setTipo(cambioTitular.tramite.tipo);
                    setUsuarioId(cambioTitular.tramite.usuarioId);
                    setTramite(cambioTitular);
                    setIdtitular(cambioTitular.id);
                    setCertificadoConducta(cambioTitular.certificadoConducta);
                    setCertificadoConductaEstado(cambioTitular.certificadoConductaEstado ? true : false);
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

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (nombreCompleto) {

        }
    }, [nombreCompleto]);
    useEffect(() => {
        if (registro) {

        }
    }, [registro]);

    useEffect(() => {
        if (motivo) {

        }
    }, [motivo]);


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
                        estado, fechaFin, fechaInicio, id, tipo, usuarioId
                    }),
                });
                if (response.ok) {
                    const data = await response.json();

                    setErrorMessage('');
                    navigation.navigate('HomeAdministrador');
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

    const handlePreAprobar = async () => {
        const newEstado = "Para Revisión";
        setEstado(newEstado);

        try {
            // Obtener el token de autenticación
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token no encontrado.');
                return;
            }

            // Primera llamada: Registrar el cambio de titular
            const secondResponse = await fetch(`${BASE_URL}/v1/cambioTitular/${idtitular}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tramite: { id: tramiteId },
                    nro_seguimiento: '',
                    motivo: motivo,
                    localidad: tramite.localidad,
                    agente: '',
                    subagente: '',
                    razon_social: '',
                    domicilio_comercial: tramite.domicilio_comercial,
                    nuevoTitular: nombreCompleto,
                    nuevoTitularEstado: nombreSwitch ? 1 : 0,
                    dniNuevoTitular: registro,
                    dniNuevoTitularEstado: registroSwitch ? 1 : 0,
                    certificadoConducta: certificadoConducta,
                    certificadoConductaEstado: certificadoConductaEstado ? 1 : 0,
                    certificadoRegistroDeudores: '',
                    certificadoRegistroDeudoresEstado: '',
                    notaLibreDeuda: '',
                    notaLibreDeudaEstado: '',
                    contratoSocial: '',
                    contratoSocialEstado: '',
                    objetoSocial: tramite.objetoSocial,
                    objetoSocialEstado: 0,
                    cuentaBancaria: '',
                    cuentaBancariaEstado: '',
                }),
            });

            if (!secondResponse.ok) {
                console.error('Error en la respuesta de la segunda API:', secondResponse.status);
                return;
            }

            const secondData = await secondResponse.json();
            console.log('Respuesta de la segunda API:', secondData);

            // Segunda llamada exitosa, proceder con la primera
            const response = await fetch(`${BASE_URL}/v1/tramites/${tramiteId}`, {
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
                    usuarioId,
                }),
            });

            if (!response.ok) {
                console.error('Error en la respuesta de la primera API:', response.status);
                return;
            }

            const data = await response.json();
            console.log('Respuesta de la primera API:', data);
            setErrorMessage(''); // Limpiar mensajes de error si los había

            // Navegar tras ambas llamadas exitosas
            navigation.navigate('HomeAdministrador');
        } catch (error) {
            console.error('Error en el proceso:', error);
            setErrorMessage('Error en la conexión con el servidor.');
        }
    };


    const handleBackPress = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Feather name="chevron-left" size={24} color="black" onPress={handleBackPress} style={styles.logoutIcon} />
                <Image
                    source={require('../images/logo_loteria.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Revisión de Trámite</Text>
            </View>

            <Text style={styles.subtitle}>
                Trámite N° {tramiteId} - {tipo === 'cambio_titular' ? 'Cambio Titular' : 'Cambio Domicilio'}
            </Text>

            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>Nombre Completo</Text>
                    <Text style={styles.itemDescription}>{nombreCompleto ? nombreCompleto : 'Cargando nombre completo...'}</Text>
                </View>
                <Switch value={nombreSwitch} onValueChange={toggleNombre} />
            </View>

            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>Motivo</Text>
                    <Text style={styles.itemDescription}>{motivo ? motivo : 'Cargando motivo...'}</Text>
                </View>
                <Switch value={motivoSwitch} onValueChange={toggleMotivo} />
            </View>

            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>N° Registro (Nuevo Titular)</Text>
                    <Text style={styles.itemDescription}>{registro ? registro : 'Cargando Registro...'}</Text>
                </View>
                <Switch value={registroSwitch} onValueChange={toggleRegistro} />
            </View>

            <View style={styles.item}>
                <IconButton icon="download" size={40} onPress={handleDescargarExamen} />
                <Text style={styles.itemDescription}>{certificadoConducta ? certificadoConducta : 'Cargando certificado...'}</Text>
                <Switch value={certificadoConductaEstado} onValueChange={toggleCertificadoConductaEstado} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRechazar}>
                    <Text style={styles.buttonText}>Rechazar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePreAprobar}>
                    <Text style={styles.buttonText}>Pre Aprobar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        marginBottom: 0,
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 0,
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
    logoutIcon: {
        position: 'absolute',
        top: 15,
        left: 10,
    },
});

export default RevisionTitular1;
