import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();


import DonationsMap from './pages/DonationsMap';
import DonationsDetails from './pages/DonationsDetails';
import Home from './pages/Home/index'
import SelectionUfCity from './pages/Home/SelectionUfCity'
import SelectMapPosition from './pages/CreateDonation/SelectMapPosition'
import DonationData from './pages/CreateDonation/DonationData'
import Header from './components/Header';
import GiveClasses from './pages/Home/GiveClasses'

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle:{backgroundColor: '#f2f3f5'} }}>

                <Screen 
                    name="Home" 
                    component={Home} 
                />

                 <Screen 
                    name="SelectionUfCity" 
                    component={SelectionUfCity} 
                />

                 <Screen 
                    name="GiveClasses" 
                    component={GiveClasses} 
                />     
        
                <Screen 
                    name="DonationsMap" 
                    component={DonationsMap} 
                />

                <Screen
                    name="DonationsDetails" 
                    component={DonationsDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header  showCancel={false} title="Detalhes do Doador" />
                    }} 
                />

                <Screen
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione seu local no mapa" />
                    }} 
                />

                <Screen
                    name="DonationData" 
                    component={DonationData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Preencha seus dados" />
                    }}  
                />
            </Navigator>
        </NavigationContainer>
    )
}