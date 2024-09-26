import React, {useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, Platform, Pressable, SafeAreaView, BackHandler, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import { BASE_URL } from '../components/config';
import CustomInput from '../components/CustomInput';
const InicioTramites = () => {
    const[motivo, setMotivo]= useState('');
    const[localidad, setLocalidad]= useState('');
    const[agente, setAgente]= useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [address, setAddress] = useState('');
    const [personType, setPersonType] = useState('');
    const [contributionNumber, setContributionNumber] = useState('');
    const [motive, setMotive] = useState('');

    const sendData = ()=>{
        console.log('hola');
    }
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%' }}>
        <Pressable onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                {/* Logo y Título */}
                <View style={styles.header}>
                    <Feather name="chevron-left" size={24} color="black" onPress={BackHandler} style={styles.logoutIcon}/>
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inicio Tramite</Text>  
                </View>
                <View style={styles.container2}>
                    <Text style={styles.title2}>Cambio de Titular</Text>

                    <Text style={styles.label2}>Número de Cliente o CUIT/CUIL:</Text>
                    <TextInput
                        style={styles.input2}
                        placeholder="Número de Cliente o CUIT/CUIL"
                        value={customerNumber}
                        onChangeText={setCustomerNumber}
                    />

                    <Text style={styles.label2}>Dirección:</Text>
                    <TextInput
                        style={styles.input2}
                        placeholder="Dirección"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Text style={styles.label2}>Persona:</Text>
                    <View style={styles.radioContainer2}>
                        <Button
                            onPress={() => {setPersonType('juridica')}}buttonColor="#ff5a00" 
                            textColor="#fff"
                            style={{width:'45%'}}
                        >Juridica</Button>  

                        <Button
                            onPress={() => {setPersonType('persona')}} 
                            buttonColor="#ff5a00" 
                            textColor="#fff"
                            style={{width:'45%'}}
                        >Persona</Button>               
                    </View>
                    <Text style={styles.label2}>Motivo:</Text>
                    <TextInput
                            style={styles.textArea2}
                            placeholder="Motivo"
                            value={motive}
                            onChangeText={setMotive}
                            multiline
                        />
                </View>
                <Button 
                    mode="contained"
                    title="ENVIAR SOLICITUD" 
                    onPress={sendData()} 
                    style={styles.newTramiteButton}
                    buttonColor="#ff5a00" 
                    textColor="#fff"  >
                    ENVIAR SOLICITUD
                </Button>
                {/* <Button title="ATRÁS" onPress={() => {}} color="#808080" /> */}
            </SafeAreaView>
        </Pressable>
    </KeyboardAvoidingView>
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

export default InicioTramites;