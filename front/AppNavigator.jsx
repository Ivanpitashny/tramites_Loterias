import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './assets/screens/Login';
import HomeAgenciero from './assets/screens/HomeAgenciero';
import SeleccionTramite from './assets/screens/SeleccionTramite';
import HomeAdministrador from './assets/screens/HomeAdministrador';
import InicioTramites from './assets/screens/InicioTramites';
import Cambio from './assets/screens/Cambio';

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
                <Stack.Screen name="Cambio" component={Cambio} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;