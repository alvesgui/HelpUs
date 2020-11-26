import React, {useEffect, useState} from 'react';
import { Image, ImageBackground, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import { Feather as Icon } from '@expo/vector-icons';

import giveClassesIcon from '../../images/give-classes.png'
import studyIcon from '../../images/study.png'

const Home = () => {
    const [study, setStudy] = useState(true) 

    const navigation = useNavigation();

    function handleNavigateToMap() {
        navigation.navigate('DonationsMap')
    }

    function handleNavigateToSelectionUfCity() {
      setStudy(false)
      navigation.navigate('SelectionUfCity',  {study})
  }

    return (
        <ImageBackground  
            source={require('../../images/1.png')} 
            style={styles.container}
        >
            <View style={styles.main}>
                <Image source={require('../../images/logo.png')} />
            </View>

            <View style={styles.mainText}>
                <Text style={styles.title}>Seja Bem-vindo</Text>
                <Text style={styles.titleBold}>O que deseja fazer ?</Text>
           
              <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.button} onPress={handleNavigateToSelectionUfCity}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>
                      Estudar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button} 
                onPress={handleNavigateToMap}>

                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>
                      Dar aula
                    </Text>
                </TouchableOpacity>
              </View>
            </View>


        </ImageBackground>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },

    mainText:{
      flex: 1,
      marginBottom: 50
    },


    title: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Jost_600SemiBold',
        maxWidth: 260,
        marginTop: 48,
    },

    titleBold: {
        color: '#fff',
        fontSize: 24,
        marginTop: 16,
        fontFamily: 'Jost_700Bold',
        maxWidth: 260,
        lineHeight: 24,
      },

      containerButtons: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
      },
    
      button: {
        backgroundColor: '#053A5B',
        width: 130,
        height: 150,
        borderRadius: 10,
        padding: 24,
        justifyContent: 'space-between'
      },
    
    
      buttonText: {
        color: '#FFF',
        fontFamily: 'Jost_700Bold',
        fontSize: 20,
      }

})

export default Home;