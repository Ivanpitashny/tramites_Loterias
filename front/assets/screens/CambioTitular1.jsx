import * as React from 'react';
import { View, StyleSheet,Image,Text, SafeAreaView } from 'react-native';
import { Appbar, TextInput, Button, IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { ActivityIndicator } from 'react-native';

const CambioDeTitular1 = () => {
    const [nombre, setNombre] = React.useState('');
    const [identificacion, setIdentificacion] = React.useState('');
    const [registroCivil, setRegistroCivil] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const pickDocument = async () => {
        console.log('pickDocument called');
        setLoading(true);
        try {
          const res = await DocumentPicker.getDocumentAsync({});
          console.log('File selection result:', res);
          if (!res.canceled) {
            const file = res.assets[0].file; // Get the file object from the assets array
            setFile(file);
            console.log(file);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      const uploadFile = async () => {
        if (!file) {
          Alert.alert('No file selected', 'Please select a file first');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.mimeType,
          name: file.name,
        });
    
        try {
          const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.ok) {
            Alert.alert('Success', 'File uploaded successfully');
          } else {
            Alert.alert('Error', 'File upload failed');
          }
        } catch (err) {
          console.error(err);
          Alert.alert('Error', 'An error occurred while uploading the file');
        }
      };

      const fileIndicator = file ? (
        <Button mode="text" onPress={pickDocument}>{file.name}</Button>
      ) : (
        <Button mode="text" onPress={pickDocument}>Ingresar Examen</Button>
      );
      
      const loadingIndicator = loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        fileIndicator
      );
      
return (
    <SafeAreaView style={styles.container}>
       {/* Logo y Título */}
        <View style={styles.header}>
                    {/* <Feather name="chevron-left" size={24} color="black" onPress={BackHandler} style={styles.logoutIcon}/> */}
                    <Image
                        source={require('../images/logo_loteria.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inicio Tramite</Text>  
                </View>
    <View style={styles.form}>
        <TextInput
            label="Nombre Completo"
            value={nombre}
            onChangeText={text => setNombre(text)}
            style={styles.input}
        />
        <TextInput
            label="N° Identificación"
            value={identificacion}
            onChangeText={text => setIdentificacion(text)}
            style={styles.input}
        />
        <TextInput
            label="N° Registro Civil o Tarjeta"
            value={registroCivil}
            onChangeText={text => setRegistroCivil(text)}
            style={styles.input}
        />
        <View style={styles.iconContainer}>
            <IconButton icon="upload" size={40}
            onPress={pickDocument}/>
            {loadingIndicator}
        </View>
    </View>

        <View style={styles.footer}>
            <Button 
                mode="outlined" 
                onPress={() => console.log('Cancelar')} 
                style={styles.button}>
                CANCELAR
            </Button>
            <Button 
                mode="contained" 
                onPress={() => console.log('Tramitar Registro')} 
                style={styles.button}
                buttonColor="#ff5a00" 
                textColor="#fff">
                TRAMITAR REGISTRO
            </Button>
        </View>
    </SafeAreaView>
);
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
form: {
    flex: 1,
    padding: 16,
},
logo: {
    borderRadius: 10,
    marginTop: 80,
    width: 80,
    height: 80,
},
input: {
    marginBottom: 16,
},
iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
});

export default CambioDeTitular1;
