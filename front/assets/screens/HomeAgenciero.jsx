import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const HomeAgenciero = () => {
    const tramites = [
        { id: '1', comprobante: 'A00-0000001', fecha: '07-01-2024', estado: 'Finalizado' },
        { id: '2', comprobante: 'A00-0000002', fecha: '29-01-2024', estado: 'En trámite' },
    ];

    const renderTramite = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.comprobante}</Text>
            <Text style={styles.cell}>{item.fecha}</Text>
            <Text style={styles.cell}>{item.estado}</Text>
            <TouchableOpacity style={styles.editButton}>
                <Text>✏️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Logo y Título */}
            <View style={styles.header}>
                <Image
                    source={require('../images/logo_loteria.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Mis trámites</Text>
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Lista de Trámites */}
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>N° Comprobante</Text>
                    <Text style={styles.headerText}>Fecha</Text>
                    <Text style={styles.headerText}>Estado</Text>
                    <Text style={styles.headerText}>Editar</Text>
                </View>
                <FlatList
                    data={tramites}
                    renderItem={renderTramite}
                    keyExtractor={item => item.id}
                />
            </View>


            <Button
                mode="contained"
                style={styles.newTramiteButton}
                onPress={() => alert('Nuevo Trámite')}
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
});

export default HomeAgenciero