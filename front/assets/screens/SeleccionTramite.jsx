import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SeleccionTramite = () => {
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
            <TouchableOpacity style={styles.tramiteButton}>
                <Text style={styles.tramiteButtonText}>Cambio de domicilio</Text>
                <Text style={styles.tramiteButtonIcon}>🏠</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tramiteButton}>
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
