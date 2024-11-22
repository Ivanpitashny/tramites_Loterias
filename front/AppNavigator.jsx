import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './assets/screens/Login';
import HomeAgenciero from './assets/screens/HomeAgenciero';
import SeleccionTramite from './assets/screens/SeleccionTramite';
import HomeAdministrador from './assets/screens/HomeAdministrador';
import InicioTramites from './assets/screens/InicioTramites';
import Cambio from './assets/screens/Cambio';
import CambioDeTitular1 from './assets/screens/CambioTitular1';
import CambioTitular2 from './assets/screens/CambioTitular2';
import CambioDomicilio1 from './assets/screens/CambioDomicilio1';
import RevisionTitular1 from './assets/screens/RevisionTitular1';
import RevisionTitular2 from './assets/screens/RevisionTitular2';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="HomeAgenciero" component={HomeAgenciero} options={{ headerShown: false }} />
                <Stack.Screen name="SeleccionTramite" component={SeleccionTramite} options={{ headerShown: false }} />
                <Stack.Screen name="HomeAdministrador" component={HomeAdministrador} options={{ headerShown: false }} />
                <Stack.Screen name="InicioTramites" component={InicioTramites} options={{ headerShown: false }} />
                <Stack.Screen name="RevisionTitular1" component={RevisionTitular1} options={{ headerShown: false }} />
                <Stack.Screen name="RevisionTitular2" component={RevisionTitular2} options={{ headerShown: false}}/>
                <Stack.Screen name="CambioDeTitular1" component={CambioDeTitular1} options={{ headerShown: false }} />
                <Stack.Screen name="CambioDeTitular2" component={CambioTitular2} options={{ headerShown: false }} />
                <Stack.Screen name="CambioDeDomicilio1" component={CambioDomicilio1} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;