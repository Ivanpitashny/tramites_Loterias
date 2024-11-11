import React, {useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../components/config';

const HomeAdministrador = ({ navigation }) => {
    const [decodedToken, setDecodedToken] = useState(null);
    const [tramites, setTramites] = useState([]);  // Estado para los trámites
    const [errorMessage, setErrorMessage] = useState(null); 

    const screenWidth = Dimensions.get('window').width;

    const calculateColumnWidth = (percentage) => {
    return screenWidth * (percentage / 100);
    };
    const fetchData = async () => {    
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
                const response = await fetch(`${BASE_URL}/v1/tramites`, { //cambiar segun la ip de cada uno
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

    const getColorByEstado = (estado) => {
        switch (estado) {
        case 'Para Revisión':
            return 'lightblue';
        case 'Rechazado':
            return 'lightcoral';
        case 'Aprobado':
            return 'lightgreen';
        default:
            return 'white';
        }
    };
    
    const renderTramite = ({ item }) => (
        <View style={styles.row}>
        <Text style={[styles.cell, { width: calculateColumnWidth(25)}]}>{item.tipo === "cambio_domicilio" ? "Cambio Domicilio" : "Cambio Titular"}</Text>
        <Text style={[styles.cell, { width: calculateColumnWidth(20) }]}>{item.id}</Text>
        <Text style={[styles.cell, { width: calculateColumnWidth(20) }]}>{item.fechaInicio}</Text>
        <Text style={[styles.cell, { width: calculateColumnWidth(20), backgroundColor: '#cfcfcf', borderRadius: 1000, backgroundColor: getColorByEstado(item.estado) }]}>{item.estado}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => {item.tipo === "cambio_titular" ? navigation.navigate('RevisionTitular1', { tramiteId: item.id }):navigation.navigate('RevisionDomicilio1', { tramiteId: item.id }) }}>
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
        await fetchData(); // Refresca los trámites llamando nuevamente a decodeToken
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
                <Text style={styles.title}>Trámites</Text>
                {/* Botón de refrescar */}
                <Feather name="refresh-ccw" size={24} color="black" onPress={refreshData} style={styles.refreshIcon} />
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Lista de Trámites */}
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, { width: calculateColumnWidth(25) }]}>Tipo</Text>
                    <Text style={[styles.headerText, { width: calculateColumnWidth(20) }]}>N° Comprobante</Text>
                    <Text style={[styles.headerText, { width: calculateColumnWidth(20),textAlign:'center' }]}>Fecha</Text>
                    <Text style={[styles.headerText, { width: calculateColumnWidth(20),textAlign:'center' }]}>Estado</Text>
                    <Text style={[styles.headerText, { width: calculateColumnWidth(10),textAlign:'right' }]}>Editar</Text>
                </View>
                <FlatList
                    data={tramites}
                    renderItem={renderTramite}
                    keyExtractor={item => item.id.toString()} // Asegúrate de que `item.id` es único y está presente
                    ListEmptyComponent={<Text>No hay trámites disponibles</Text>}
                />
            </View>


            {/* <Button
                mode="contained"
                style={styles.newTramiteButton}
                onPress={() => navigation.navigate('SeleccionTramite')}
                buttonColor="#ff5a00" 
                textColor="#fff" 
            >
                INICIAR NUEVO TRÁMITE
            </Button> */}

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
        paddingHorizontal: 2,
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
        textAlign: 'left',
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

export default HomeAdministrador