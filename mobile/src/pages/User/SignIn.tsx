import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

interface User {
    id: number;
    name: string;
    email: string;
    password: string
  }

function SignIn() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [images, setImages] = useState<string[]>([])

  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params as User;

  function handleGoBack() {
    navigation.navigate('DonationsMap');
  }

  function handleExit() {
    navigation.navigate('Home');
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

  async function handleCreateUser(){

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    
    
    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      }as any);
    })

    await api.post('users', data)
    
    navigation.navigate('Login', {data})

  }

      return (
        <KeyboardAvoidingView style={styles.backGround}>

          <View style={styles.header} >
                <TouchableOpacity onPress={handleGoBack}>
                  <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleExit}>
                  <Icon name="log-out" size={20} color="#fff" />
                </TouchableOpacity>
          </View>
          <View style={styles.container}>

            <Text style={styles.titleBold}>Cadastre-se no Help Us.</Text>

           

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
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.label}>Fotos</Text>   
            <View style={styles.inputs}>
                <TextInput
                style={styles.input}
                placeholder="Nome"
                autoCorrect={false}
                value={name}
                onChangeText={setName}
                />

                <TextInput
                style={styles.input}
                keyboardType={'email-address'}
                placeholder="E-mail"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                />

                <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Senha"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                />

                <RectButton style={styles.button} onPress={handleCreateUser}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Criar
                    </Text>
                </RectButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      );
  }

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: '#053A5B',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20

  },

  mainText:{
    flex: 1,
  },
  inputs :{
      marginTop: 60,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 30,
  },

  titleBold: {
    color: '#fff',
    fontSize: 32,
    marginTop: 32,
    fontFamily: 'Jost_700Bold',
    maxWidth: 300,
    lineHeight: 36,
    marginLeft: 40
  },

  input: {
    height: 50,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    marginTop: 10
  },
  button: {
    backgroundColor: '#15c3d6',
    height: 60,
    width: 140,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Jost_700Bold',
    fontSize: 16,
  },

  label: {
    color: '#fff',
    fontFamily: 'Jost_600SemiBold',
    marginBottom: 8,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
    width: 64,
    height: 64,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 30
  },

  uploadedImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 22,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 50,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    marginLeft: 45,
  },

});

export default SignIn;
