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

import api from '../../services/api';

interface User {
    id: number;
    name: string;
    email: string;
    password: string
  }

function Login() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params as User;

  function handleGoBack() {
    navigation.navigate('DonationsMap');
  }

  function handleExit() {
    navigation.navigate('Home');
  }

  async function handleLogin(){

    
    const response = await api.post('login', {
        email: email,
        password: password
    })
    setEmail(email);
    setPassword(password);

    
    if(response.data) {
        setLoggedIn(false);
       navigation.navigate('DonationsMap', {loggedIn})
    }
    else {
        setLoggedIn(true);
        navigation.navigate('Login')
      }
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

            <View style={styles.main}>
                <Image style={styles.img} source={require('../../images/logo.png')} />
            
                <View style={styles.container}>
              
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                autoCompleteType="email"
                keyboardType={'email-address'}
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                autoCompleteType='password'
                secureTextEntry={true}
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />

              <RectButton style={styles.button} onPress={handleLogin}>
                  <View style={styles.buttonIcon}>
                      <Text>
                          <Icon name="arrow-right" color="#FFF" size={24} />
                      </Text>
                  </View>
                  <Text style={styles.buttonText}>
                      Entrar
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

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
},
    img:{
        width: 200,
        height: 200,
    },
  input: {
    height: 50,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 30,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#15c3d6',
    height: 60,
    width: 140,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
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
  }
});

export default Login;
