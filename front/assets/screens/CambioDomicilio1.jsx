import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, Alert } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../components/config';

const CambioDomicilio1 = ({ navigation }) => {
    const [step, setStep] = React.useState(1);
    const [permiso, setPermiso] = React.useState('');
    const [agente, setAgente] = React.useState('');
    const [subagente, setSubagente] = React.useState('');
    const [razonSocial, setRazonSocial] = React.useState('');
    const [dependencia, setDependencia] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [userId, setUserId] = React.useState('');

    const nextStep = () => {
        console.log('Siguiente pressed');
    };

    const pickDocument = async () => {
        setLoading(true);
        try {
            const res = await DocumentPicker.getDocumentAsync({});
            if (!res.canceled && res.assets && res.assets.length > 0) {
                const file = res.assets[0];
                setFile(file);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const insertData = async () => {
        if (!file) {
            Alert.alert('No se ha seleccionado archivo', 'Por favor, seleccione un archivo primero');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            type: file.mimeType,
            name: file.name,
        });

        try {
            const response = await fetch(`${BASE_URL}/v1/tramites/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    permiso,
                    agente,
                    subagente,
                    razonSocial,
                    dependencia,
                },
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Ingreso de datos correcto');
                nextStep();
            } else {
                Alert.alert('Error', 'Fallo en la carga del archivo');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Ocurrió un error al cargar el archivo');
        }
    };

    switch (step) {
        case 1:
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            source={require('../images/logo_loteria.jpg')}
                            style={styles.logo}
                        />
                        <Text style={styles.title}>Inicio Cambio de Domicilio</Text>
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            label="Nº Permiso del Usuario"
                            value={permiso}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setPermiso}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Nº de Agente"
                            value={agente}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setAgente}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Nº de Subagente"
                            value={subagente}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setSubagente}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Razón Social"
                            value={razonSocial}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setRazonSocial}
                            activeOutlineColor="#ff5a00"
                        />
                        <TextInput
                            label="Dependencia Local"
                            value={dependencia}
                            mode="outlined"
                            style={styles.input}
                            onChangeText={setDependencia}
                            activeOutlineColor="#ff5a00"
                        />
                        <View style={styles.iconContainer}>
                            <IconButton icon="upload" size={40} onPress={pickDocument} />
                            {loading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Button mode="text" onPress={pickDocument}>
                                    {file ? file.name : 'Ingresar Documento'}
                                </Button>
                            )}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate('HomeAgenciero')}
                            style={styles.button}
                        >
                            CANCELAR
                        </Button>
                        <Button
                            mode="contained"
                            onPress={insertData}
                            style={styles.button}
                            buttonColor="#ff5a00"
                            textColor="#fff"
                        >
                            SIGUIENTE
                        </Button>
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
        backgroundColor: 'white',
    },
    header: {
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
    form: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    footer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
});

export default CambioDomicilio1;
