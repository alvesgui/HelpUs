import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import normalize from 'react-native-normalize';

import {Feather as Icon} from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

import api from '../services/api';

interface DonationLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function DonationsMap() {
    const [donationLocations, setDonationLocations] = useState<DonationLocation[]>([])
    const  navigation = useNavigation();

    useFocusEffect(() => {
      api.get('donations').then(response => {
        setDonationLocations(response.data);
      })
    });

    function handleNavigateToDonationDetails(id: number) {
        navigation.navigate('DonationsDetails', {id});
    }

    function handleNavigateToCreateDonation() {
        navigation.navigate('SelectMapPosition');
    }

    function handleNavigateBack() {
      navigation.goBack();
    }

    return(
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={20} color="#15c3d6" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Bem vindo.</Text>
          <Text style={styles.description}>Encontre no mapa alguém que precisa de ajuda ou cadastre seu ponto e receba ajuda..</Text>
          
          <View style={styles.mapContainer}>
            <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map} 
            initialRegion={{
                latitude: -3.78117,
                longitude: -38.6263497,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
            }}
            >
            {donationLocations.map(donationLocation => {
              return (
                <Marker
                  key={donationLocation.id}
                  icon={mapMarker}
                  calloutAnchor={{
                    x: 2.1,
                    y: 0.8,
                  }}
                  coordinate={{
                    latitude: donationLocation.latitude,
                    longitude: donationLocation.longitude,
                  }}
                >
                  <Callout tooltip onPress={() => handleNavigateToDonationDetails(donationLocation.id)}>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{donationLocation.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            })}
            </MapView>
          </View>
    
            
            <View style={styles.itemsContainer}>     
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}

                >
                <TouchableOpacity style={styles.item}
                          onPress={() => {}}>
                  <Image style={styles.img} source={require('../images/book.png')} />
                  <Text style={styles.itemTitle}>Programação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}
                          onPress={() => {}}>
                  <Image style={styles.img} source={require('../images/book.png')} />
                  <Text style={styles.itemTitle}>Cáculo I</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}
                          onPress={() => {}}>
                  <Image style={styles.img} source={require('../images/book.png')} />
                  <Text style={styles.itemTitle}>Física</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}
                          onPress={() => {}}>
                  <Image style={styles.img} source={require('../images/book.png')} />
                  <Text style={styles.itemTitle}>Estatística</Text>
                </TouchableOpacity>
              </ScrollView>                       
            </View>

            <View style={styles.footer}>
            <Text style={styles.footerText}>{donationLocations.length} locais encontrados</Text>
    
            <RectButton style={styles.createDoacao} onPress={handleNavigateToCreateDonation}>
                <Icon name="plus" size={20} color="#ffffff"></Icon>
            </RectButton>
            </View>
        </View>
      </>
      )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
    
    map: {
      width: Dimensions.get('window').width,
      height: '85%',
    },
   
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      
    },
    calloutText:{
      fontFamily: 'Jost_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 10,
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 7,
    },
    footerText: {
      fontFamily: 'Jost_700Bold',
      color:'#000'
    },
    createDoacao: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius:28,
      justifyContent: 'center',
      alignItems: 'center',
    },

    title: {
      fontSize: 20,
      fontFamily: 'Jost_700Bold',
      marginTop: 15,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Jost_600SemiBold',
    },

    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },

    itemsContainer: {
      flexDirection: 'row',
      bottom: 80,

    },

    item: { 
      backgroundColor: '#FFF',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 26,
      paddingTop: 20,
      paddingBottom: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',

    },

    itemTitle: {
      fontFamily: 'Jost_600SemiBold',
      textAlign: 'center',
      fontSize: 13,

    },

    img:{
      width: normalize(50),
      height: normalize(50),
      resizeMode: 'contain',

    }
  
  });