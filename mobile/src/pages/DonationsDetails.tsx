import React, {useEffect, useState} from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import {useRoute} from '@react-navigation/native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface DonationDetailsRouteParms {
  id: number;
}

interface DonationLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  objects: string;
  available_hours: string ;
  available_to_attend: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function DonationsDetails() {

  const route = useRoute()
  const [donationLocation, setDonationLocation] = useState<DonationLocation>()

  const params = route.params as DonationDetailsRouteParms;

  useEffect(() => {
    api.get(`donations/${params.id}`).then(response => {
      setDonationLocation(response.data)
    })
  }, [params.id])

  if(!donationLocation) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando</Text>
      </View>
    )
  } 

  function handleOpenGoogleMapRoute() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${donationLocation?.latitude},${donationLocation?.longitude}`)
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone${999010507}&text=Tenho interesse em ministrar sua aula`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {donationLocation.images.map(image =>{
            return (
              <Image
              key={image.id}
              style={styles.image} 
              source={{ uri: image.url }} />
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{donationLocation.name}</Text>
        <Text style={styles.description}>{donationLocation.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
                latitude: donationLocation.latitude,
                longitude: donationLocation.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarker}
              coordinate={{ 
                latitude: donationLocation.latitude,
                longitude: donationLocation.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapRoute} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
            <Text style={styles.description}>{donationLocation.objects}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {donationLocation.available_hours}</Text>
          </View>
          
          {console.log(donationLocation.available_to_attend)}
          {donationLocation.available_to_attend ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
            </View>
          ): (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não Atendemos fim de semana</Text>
            </View>
          )}
          
        </View>

        <RectButton style={styles.contactButton} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Jost_700Bold',
  },

  description: {
    fontFamily: 'Jost_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Jost_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FEF6F9',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },


  scheduleText: {
    fontFamily: 'Jost_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Jost_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})