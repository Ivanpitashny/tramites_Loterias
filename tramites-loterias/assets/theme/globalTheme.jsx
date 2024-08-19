import { StyleSheet } from "react-native";

export const globalTheme = StyleSheet.create({
    boton:{
        backgroundColor: "#F08377",
        width: 300,
        margin: 10,
    },
    input: {
        height: 30, // Puedes ajustar este valor
        fontSize: 14, // Aumenta ligeramente el tamaño de la fuente
        backgroundColor: "#D9D9D9", // Asegúrate de que el color esté bien definido
        textAlign: 'auto',
        width: 300,
        margin: 10, 
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
