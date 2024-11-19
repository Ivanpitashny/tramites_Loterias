import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../components/config';

const SeleccionTramite = ({navigation, route}) => {
    const {usuarioId} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [tramites, setTramites] = useState([]);
    
    const decodeToken = async () =>{
        try {
            const storedToken = await AsyncStorage.getItem('authToken');
            const decodedToken = jwtDecode(storedToken);
            //console.log('Token decodificado:', decodedToken);
    
            // Extraer userId del token 
            const userId = decodedToken.userId; // Asegúrate de que el token tenga el campo userId
            if (userId) {
                return userId;
            } else {
                console.error('userId no encontrado en el token.');
            }
        } catch (decodeError) {
            console.error('Error al decodificar el token:', decodeError);
            setErrorMessage('Error al decodificar el token.');
        }
    }
    const handleInicio = async (id) =>{
        
        const usuarioId = await decodeToken();
        if (usuarioId) {
            if (id == 1){
                navigation.navigate("CambioDomicilio1",{tipo: 1, usuarioId: usuarioId});
            }else{
                navigation.navigate("CambioDeTitular1",{tipo: 2, usuarioId: usuarioId});
            }
        } else {
            console.error('usuarioId no definido');
        }
    }

    return (
        <View style={styles.container}>
            {/* Logo y Título */}
            <View style={styles.header}>
                <Image
                    source={require('../images/logo_loteria.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Selección de Trámite</Text>
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Botones de Trámite */}
            <TouchableOpacity style={styles.tramiteButton} onPress={()=>{handleInicio(1)}}>
                <Text style={styles.tramiteButtonText}>Cambio de domicilio</Text>
                <Text style={styles.tramiteButtonIcon}>🏠</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tramiteButton} onPress={()=>{handleInicio(2)}}>
                <Text style={styles.tramiteButtonText}>Cambio de titular</Text>
                <Text style={styles.tramiteButtonIcon}>👤</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 22,
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
    tramiteButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ff5a00',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '80%',
        marginBottom: 20,
    },
    tramiteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tramiteButtonIcon: {
        color: '#fff',
        fontSize: 20,
    },
});

export default SeleccionTramite;
