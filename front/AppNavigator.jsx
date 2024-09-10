import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './assets/screens/Login';
import HomeAgenciero from './assets/screens/HomeAgenciero';
import SeleccionTramite from './assets/screens/SeleccionTramite';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="HomeAgenciero" component={HomeAgenciero} options={{ headerShown: false }} />
                <Stack.Screen name="SeleccionTramite" component={SeleccionTramite} options={{ headerShown: false }} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;