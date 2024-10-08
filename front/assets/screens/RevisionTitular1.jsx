import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable, SafeAreaView, Switch,BackHandler } from 'react-native';
import { Button,IconButton,TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

const RevisionTitular1 = ({navigation}) => {
    const [nombreCompleto, setNombreCompleto] = useState(false);
    const [nombreSwitch, setNombreSwitch] = useState(0);
    const [permisoUsuario, setPermisoUsuario] = useState(false);
    const [permisoSwitch, setPermisoSwitch] = useState(0);
    const [registro,setRegistro] = useState();
    const [registroSwitch, setRegsitroSwitch] = useState(0)
    const [registroNuevoTitular, setRegistroNuevoTitular] = useState(false);

    const toggleNombre = () => setNombreSwitch(!nombreSwitch);
    const togglePermiso = () => setPermisoSwitch(!permisoSwitch);
    const toggleRegistro= () => setRegsitroSwitch(!registroSwitch);

    const handleDescargarExamen = () => {
        console.log('Descargar Examen');
    };

    const handleRechazar = () => {
        console.log('Rechazar');
    };

    const handlePreAprobar = () => {
        console.log('Pre Aprobar');
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
                        <Text style={styles.tramiteText}>Trámite N° A000-9000694 - Cambio Titular</Text>
                        <Text style={styles.nombreText}>Lautaro Cotz</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nombre Completo</Text>
                            <Text style={styles.value}>Gonzalo Lodigiani</Text>
                            <Switch value={nombreSwitch} onValueChange={toggleNombre} style={styles.switch}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Permiso del Usuario</Text>
                            <Text style={styles.value}>1254622</Text>
                            <Switch value={permisoSwitch} onValueChange={togglePermiso} style={styles.switch}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>N° Registro (Nuevo Titular)</Text>
                            <Text style={styles.value}>0001</Text>
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
