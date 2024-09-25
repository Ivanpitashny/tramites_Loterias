import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../components/config';

const HomeAgenciero = ({ navigation }) => {
    const [decodedToken, setDecodedToken] = useState(null);
    const [tramites, setTramites] = useState([]);


    const decodeToken = async () =>{
        try {
            const storedToken = await AsyncStorage.getItem('authToken');
            const decodedToken = jwtDecode(storedToken);
            //console.log('Token decodificado:', decodedToken);
    
            // Extraer userId del token
            const userId = decodedToken.userId; // Asegúrate de que el token tenga el campo userId
            if (userId) {
                await fetchData(userId); // Pasamos el userId correctamente a fetchData
            } else {
                console.error('userId no encontrado en el token.');
            }
        } catch (decodeError) {
            console.error('Error al decodificar el token:', decodeError);
            setErrorMessage('Error al decodificar el token.');
        }
    }
    const fetchData = async (userId) => {    
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const url = `${BASE_URL}/v1/tramites/${userId}/usuarios`;
                //console.log(url);
                const response = await fetch(url, { //cambiar segun la ip de cada uno
                    method: 'GET',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTramites(data.tramiteResponse.tramite);
                    //console.log(data);
                }else{
                    console.error('Error en la respuesta:', response.status);
                    console.error('Respuesta del servidor:', response);
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
        decodeToken();
    },[]);

    const renderTramite = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.fechaInicio}</Text>
            <Text style={styles.cell}>{item.estado}</Text>
            <TouchableOpacity style={styles.editButton}>
                <Text>✏️</Text>
            </TouchableOpacity>
        </View>
    );

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            setDecodedToken(null);
            console.log('Token eliminado');
            navigation.navigate('Login');
        } catch (e) {
            console.log('Error al eliminar el token', e);
        }
    };

    const refreshData = async () => {
        await decodeToken(); // Refresca los trámites llamando nuevamente a decodeToken
    };

    return (
        <View style={styles.container}>
            {/* Logo y Título */}
            <View style={styles.header}>
            <Feather name="log-out" size={24} color="black" onPress={removeToken} style={styles.logoutIcon}/>
                <Image
                    source={require('../images/logo_loteria.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Mis trámites</Text>
                {/* Botón de refrescar */}
                <Feather name="refresh-ccw" size={24} color="black" onPress={refreshData} style={styles.refreshIcon} />
            </View>
            
            

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Lista de Trámites */}
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>N° Seguimiento</Text>
                    <Text style={styles.headerText}>Fecha</Text>
                    <Text style={styles.headerText}>Estado</Text>
                    <Text style={styles.headerText}>Editar</Text>
                </View>
                <FlatList
                    data={tramites}
                    renderItem={renderTramite}
                    keyExtractor={item => item.id.toString()} // Asegúrate de que `item.id` es único y está presente
                    ListEmptyComponent={<Text>No hay trámites disponibles</Text>}
                />
            </View>


            <Button
                mode="contained"
                style={styles.newTramiteButton}
                onPress={() => navigation.navigate('SeleccionTramite')}
                buttonColor="#ff5a00" 
                textColor="#fff" 
            >
                INICIAR NUEVO TRÁMITE
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: '100%',
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
        top: 35,
        left: 16,
    },
    refreshIcon: {
        position: 'absolute',
        top: 180,
        right: 16,
    },
});

export default HomeAgenciero