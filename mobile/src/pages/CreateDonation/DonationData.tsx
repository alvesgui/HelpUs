import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';


interface DonationLocationRouteParams {
  position:{
    latitude: number;
    longitude: number;
  }
}

export default function DonationData() {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [objects, setObjects] = useState('')
  const [available_hours, setAvailableHours] = useState('')
  const [available_to_attend, setAvailableToAttend] = useState(true)
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState<string[]>([])
  
  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params as DonationLocationRouteParams;

  async function handleCreateDonation(){
    const {latitude, longitude} = params.position

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('objects', objects);
    data.append('available_hours', available_hours);
    data.append('available_to_attend', String(available_to_attend));
    data.append('city', city);
    data.append('uf', uf);
    data.append('whatsapp', String(whatsapp));
    data.append('price', price);
    
    
    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      }as any);
    })

    await api.post('donations', data)
    
    navigation.navigate('DonationsMap')
  }

  async function handleSelectImage() {
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos de acesso ás suas fotos...')
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const {uri: image} = result;

    setImages([...images, image]);

  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        keyboardType={'numeric'}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        autoCapitalize={'characters'}
        maxLength={2}
        value={uf}
        onChangeText={setUf}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        autoCapitalize={'words'}
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        keyboardType={'numeric'}
        value={price}
        onChangeText={setPrice}
      />



      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
           <Image
            key={image}
            source={{uri: image}}
            style={styles.uploadedImage}/>
          );
        })}
      </View>


      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImage}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Sobre a aula</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={objects}
        onChangeText={setObjects}
      />

      <Text style={styles.label}>Horario disponivel para aula</Text>
      <TextInput
        style={styles.input}
        value={available_hours}
        onChangeText={setAvailableHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Disponível final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={available_to_attend}
          onValueChange={setAvailableToAttend}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateDonation}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Jost_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Jost_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Jost_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  }
})